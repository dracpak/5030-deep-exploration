"""
Main connector to backend database
"""
import hashlib
import secrets
import loader
import psycopg2
import psycopg2.extras

class DBConnector:
    """
    Singleton class container storing all functions for api calls
    """
    def __init__(self):
        print("Loading .env")
        config = loader.loadenv()
        print("Done!")
        try:
            # connecting to the PostgreSQL server
            self.connection = psycopg2.connect(database=config['database'],
                                            user=config['user'],
                                            password=config['password'],
                                            host=config['host'],
                                            port=config['port'])
            print('Connected to the PostgreSQL server!')

        except psycopg2.DatabaseError as error:
            print(error)

    def login(self, username, password):
        """
        Checks the user input to saved credentials in DB
        """
        try:
            with self.connection.cursor() as cur:
                sql = f'SELECT password FROM users WHERE username=\'{username}\''
                cur.execute(sql)
                result = cur.fetchone()[0]
        except psycopg2.DatabaseError:
            self.connection.rollback()
            result = None
        finally:
            if cur:
                cur.close()
        salt = result[:32]
        password_hash = result[32:]
        if hashlib.sha256((salt+password).encode()).hexdigest() == password_hash:
            token = secrets.token_hex(128)
            try:
                with self.connection.cursor() as cur:
                    sql = f'''
                    UPDATE users SET token=\'{token}\',
                    expire_date = now() + INTERVAL \'6 HOURS\'
                    WHERE username=\'{username}\';
                    '''
                    cur.execute(sql)
                    self.connection.commit()
            except psycopg2.DatabaseError:
                self.connection.rollback()
                result = None
            finally:
                if cur:
                    cur.close()
            return {'result': 'success', 'token': token}
        return {'result': 'fail'}

    def register(self, new_user):
        """
        Takes new user JSON and stores credentials in DB
        """
        username = new_user['username']
        email = new_user['email']
        salt = secrets.token_hex(16)
        password = salt+hashlib.sha256((salt+new_user['password']).encode()).hexdigest()
        try:
            with self.connection.cursor() as cur:
                sql = f'''
                INSERT INTO users (username, password, email, checkpoint) 
                VALUES ('{username}', '{password}', '{email}', 0);
                '''
                cur.execute(sql)
                self.connection.commit()
        except psycopg2.DatabaseError:
            self.connection.rollback()
        finally:
            if cur:
                cur.close()
        return {'result': 'success'}
    
    def get_checkpoint(self, user):
        """
        Returns all checkpoints user has
        """
        username = user['username']
        result = 0
        try:
            with self.connection.cursor() as cur:
                sql = f'''
                SELECT checkpoint FROM users
                WHERE username=\'{username}\';
                '''
                cur.execute(sql)
                result = cur.fetchone()[0]
        except psycopg2.DatabaseError:
            self.connection.rollback()
        finally:
            if cur:
                cur.close()
        checkpoints = {}
        for i in range(4):
            if result // pow(2, i) % 2 == 1: # left shift by i
                checkpoints.update({f'C{i}': True})
                continue
            checkpoints.update({f'C{i}': False})
        return checkpoints
    
    def update_checkpoint(self, body):
        """
        Adds a checkpoint to a user
        """
        username = body['username']
        checkpoint = body['checkpoint']
        result = None;
        try:
            with self.connection.cursor() as cur:
                sql = f'''
                SELECT checkpoint FROM users
                WHERE username=\'{username}\';
                '''
                cur.execute(sql)
                result = cur.fetchone()[0]
        except psycopg2.DatabaseError:
            self.connection.rollback()
        finally:
            if cur:
                cur.close()

        if result // pow(2, checkpoint) % 2 != 1 and not result == None:
            result += pow(2, checkpoint)
            try:
                with self.connection.cursor() as cur:
                    sql = f'''
                    UPDATE users SET checkpoint={result}
                    WHERE username=\'{username}\';
                    '''
                    cur.execute(sql)
                    self.connection.commit()
            except psycopg2.DatabaseError:
                self.connection.rollback()
            finally:
                if cur:
                    cur.close()
            return {'result': 'success'}
        return {'result': 'fail'}
    
    def signin(self, login):
        """
        Takes login token and returns user profile
        """
        result = None
        if 'token' in login:
            token = login['token']
            try:
                with self.connection.cursor() as cur:
                    sql = f'''
                    SELECT username, email FROM users
                    WHERE token=\'{token}\'
                    AND expire_date > now();
                    '''
                    cur.execute(sql)
                    result = cur.fetchone()
            except psycopg2.DatabaseError:
                self.connection.rollback()
            finally:
                if cur:
                    cur.close()
            result = {'username': result[0], 'email': result[1]}
        return result