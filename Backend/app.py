"""
Main file for backend, run to set up server
"""
from bot import process_user_choice 
from flask import Flask, jsonify, request
from flask_cors import CORS
#from db_connector import DBConnector

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', '*'])

#db = DBConnector()

#@app.route('/login', methods=['GET', 'POST'])
#def login():
#    """
#    Check login credentials of user
#    """
#    user = request.get_json()
#    data = db.login(user['username'], user['password'])
#    return jsonify(data), 200

#@app.route('/register', methods=['GET', 'POST'])
#def register():
#    """
#    Register a new user
#    """
#    new_user = request.get_json()
#    data = db.register(new_user)
#    return jsonify(data), 201


@app.route('/chat', methods=['POST'])
def chat():
    """
    Process user choice and return next step in chat
    """
    data = request.get_json()
    step_id = data.get('step_id', 'start')
    user_choice_index = data.get('choice_index')

    next_step = process_user_choice(step_id, user_choice_index)

    return jsonify(next_step), 200



if __name__ == '__main__':
    app.run()
