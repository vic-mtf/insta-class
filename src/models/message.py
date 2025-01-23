from datetime import datetime
from src.tools.generate_code import generate_hex_code


class Message:
    def __init__(self, content, sender, receiver, timestamp, _type='text'):
        self.content = content
        self.sender = sender
        self.receiver = receiver
        self.timestamp = timestamp
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.type = _type
        self.read = False
        self.played = False
        self.edited = False
        self._id = generate_hex_code()
        self.reply = None

    def get_message_as_dict(self, *args: str) -> dict:
        data = {}
        for arg in args:
            data[arg] = getattr(self, arg)
        return data

    def __str__(self):
        args = [
            'content',
            'sender',
            'receiver',
            'timestamp',
            '_type',
            'created_at',
            'updated_at',
            'type',
            'read',
            'played',
            'edited'
            '_id',
            'reply'
        ]
        return self.get_user_infos_as_dict(*args)
