"""
Main file for backend, run to set up server
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from db_connector import db_connector

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', '*'])

db = db_connector()

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
    newUser = request.get_json()
    data = db.register(newUser)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run()
