"""
Main file for backend, run to set up server
"""
from bot import get_chat_step, process_user_choice
from flask import Flask, jsonify, request
from flask_cors import CORS
from db_connector import DBConnector

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', '*'])
db = DBConnector()
DIALOG_ORDER = ['dialog1', 'dialog2', 'dialog3']

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

@app.route('/signin', methods = ['GET', 'POST'])
def signin():
    """
    Takes a login token and returns a user profile
    """
    token = request.get_json()
    data = db.signin(token)
    return jsonify(data), 200

@app.route('/chat', methods=['POST'])
def chat():
    """
    Process user choice and return next step in chat
    """
    data = request.get_json()
    dialog_id = data.get('dialog_id', 'dialog1')
    step_id = data.get('step_id', 'start')
    user_choice_index = data.get('choice_index')

    if user_choice_index is None:
        # No choice_index → return the starting node
        next_step = get_chat_step(dialog_id, step_id)
    else:
        next_step = process_user_choice(dialog_id, step_id, user_choice_index)

    if step_id == 'end':
        idx = DIALOG_ORDER.index(dialog_id)
        dialog_id = DIALOG_ORDER[(idx + 1) % len(DIALOG_ORDER)]
        next_step = get_chat_step(dialog_id, 'start')

    next_step['dialog_id'] = dialog_id

    return jsonify(next_step), 200

if __name__ == '__main__':
    app.run()
