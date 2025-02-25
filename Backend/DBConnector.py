import psycopg2
import psycopg2.extras
import hashlib
import secrets

class DBConnector:
   
	def __init__(self):
		try:
			# connecting to the PostgreSQL server
			self.connection = psycopg2.connect('insert login credentials here')
			print('Connected to the PostgreSQL server.')

		except (psycopg2.DatabaseError, Exception) as error:
			print(error)
            
	def login(self, username, password):
		try:
			with self.connection.cursor() as cur:
				sql = f'SELECT password FROM users WHERE username=\'{username}\''
				cur.execute(sql)
				result = cur.fetchone()[0]
		except Exception:
			self.connection.rollback()
			result = None
		finally:
			if cur:
				cur.close()
				
		salt = result[:32]
		passwordHash = result[32:]
		if (hashlib.sha256((salt+password).encode()).hexdigest() == passwordHash):
			return {'result': 'success'}
		else:
			return {'result': 'fail'}
			
	def register(self, newUser):
		
		username = newUser['username']
		email = newUser['email']
		salt = secrets.token_hex(16)
		password = salt+hashlib.sha256((salt+newUser['password']).encode()).hexdigest()
		try:
			with self.connection.cursor() as cur:
				sql = f'''
				INSERT INTO users (username, password, email) 
				VALUES ('{username}', '{password}', '{email}');
				'''
				cur.execute(sql)
				self.connection.commit()
		except Exception:
			self.connection.rollback()
		finally:
			if cur:
				cur.close()
		return {'result': 'success'}
