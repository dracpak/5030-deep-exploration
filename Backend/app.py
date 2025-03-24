"""
Main file for backend, run to set up server
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from db_connector import DBConnector

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', '*'])

db = DBConnector()

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Check login credentials of user
    """
    user = request.get_json()
    data = db.login(user['username'], user['password'])
    return jsonify(data), 200

@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Register a new user
    """
    new_user = request.get_json()
    data = db.register(new_user)
    return jsonify(data), 201

@app.route('/checkpoint', methods=['GET', 'POST'])
def checkpoint():
    """
    Sets a new checkpoint or checks if a checkpoint is achieved
    """
    user = request.get_json()
    if request.method == 'GET':
        data = db.get_checkpoint(user)
        return jsonify(data), 200
    
    data = db.update_checkpoint(user)
    return jsonify(data), 200

if __name__ == '__main__':
    app.run()
