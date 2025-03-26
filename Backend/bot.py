"""
Chat functions relating to chat bot
"""
from loader import load_json

chat_flow = load_json('chat_flow.json')

def get_chat_step(step_id):
    """
    Gets the text of the current chat
    """
    return chat_flow.get(step_id, chat_flow["start"])

def process_user_choice(current_step, user_choice_index):
    """
    Returns the next step in the chat based on the user's choice
    """
    current_data = get_chat_step(current_step)

    if user_choice_index < 0 or user_choice_index >= len(current_data['options']):
        return current_data

    next_step_id = current_data['options'][user_choice_index]['next']
    return get_chat_step(next_step_id)
