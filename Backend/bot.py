

chat_flow = {
    "start": {
        "bot": "What do you think—does every person have their own purpose in life?",
        "options": [
            {"text": "Yes, I’m sure that everyone has a unique goal or path that they’re destined for.", "next": "step1"},
            {"text": "I don’t think so. Many people just live as they can, without a clear purpose or mission.", "next": "step1"}
        ]
    },
    "step1": {
        "bot": "Interesting... But if we assume there’s no purpose, doesn’t that justify passivity and inaction? And if there is a purpose, why are so many people dissatisfied with their lives? Could it be that the idea of a grand purpose is just an illusion?",
        "options": [
            {"text": "Yeah, it’s strange. It seems like all this talk about ‘purpose’ often serves as an excuse not to admit that life might just be chaotic.", "next": "step2"},
            {"text": "No, I think the sense of purpose is a real feeling that motivates people. Without it, we’d fall into complete indifference.", "next": "step2"}
        ]
    },
    "step2": {
        "bot": "If life has no pre-written script, does that mean we’re completely free to create our own story? Or are we still limited by genetics, environment, culture, and other factors?",
        "options": [
            {"text": "Maybe we are ‘prisoners’ of circumstances...", "next": "step3"},
            {"text": "I tend to believe that we can create meaning ourselves...", "next": "step3"}
        ]
    },
    "step3": {
        "bot": "But if we invent meaning and purpose ourselves, doesn’t that devalue the whole concept? Doesn’t it need to come from above, or be given by nature/God/the universe?",
        "options": [
            {"text": "Maybe it really is just a story we tell ourselves... but good stories motivate.", "next": "final"},
            {"text": "No, I believe there’s something greater than just a human invention...", "next": "final"}
        ]
    },
    "final": {
        "bot": "It seems like the question of purpose always leaves room for doubt and faith. Perhaps the very attempt to find or create meaning is our shared purpose.",
        "options": [
            {"text": "You’re probably right. Maybe the search for meaning is the hidden driver.", "next": "end"},
            {"text": "I still lean toward the idea that purpose exists independently of our perception.", "next": "end"}
        ]
    },
    "end": {
        "bot": "Thanks for the conversation. No final answers, just a little more clarity. Want to restart?",
        "options": [
            {"text": "Yes, start again", "next": "start"},
            {"text": "No, exit", "next": "exit"}
        ]
    }
}

def get_chat_step(step_id):
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
