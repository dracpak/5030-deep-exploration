"""
Chat functions relating to chat bot
"""
from loader import load_json

chat_flow = load_json('chat_flow.json')


def get_chat_step(dialog_id: str, step_id: str):
    """
    Gets the text of the current chat
    """
    flow = chat_flow.get(dialog_id) or chat_flow['dialog1']
    return flow.get(step_id) or flow['start']

def process_user_choice(dialog_id: str, current_step: str, user_choice_index: int):
    """
    Returns the next step in the chat based on the user's choice
    """
    current = get_chat_step(dialog_id, current_step)
    options = current.get('options', [])
    if not (0 <= user_choice_index < len(options)):
        return current  # Invalid choice,return current step
    next_id = options[user_choice_index]['next']
    return get_chat_step(dialog_id, next_id)