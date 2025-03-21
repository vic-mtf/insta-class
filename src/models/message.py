from datetime import datetime
from src.tools.generate_code import generate_hex_code


class Message:

    keys = [
        "content",
        "sender",
        "receiver",
        "timestamp",
        "created_at",
        "updated_at",
        "variant",
        "type",
        "readers",
        "players",
        "read",
        "played",
        "edited",
        "_id",
        "reply",
    ]

    def __init__(
        self,
        content,
        sender,
        receiver,
        _type="text",
        variant="system",  # user
        timestamp=datetime.now(),
    ):
        self.content = content
        self.sender = sender
        self.receiver = receiver
        self.timestamp = timestamp
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()
        self.variant = variant
        self.type = _type
        self.readers = []
        self.players = []
        self.read = False
        self.played = False
        self.edited = False
        self._id = generate_hex_code()
        self.reply = None

    def get_as_dict(self, *_args: str) -> dict:
        data = {}

        args = _args if len(_args) else self.keys
        for arg in args:
            if hasattr(self, arg):
                data[arg] = getattr(self, arg)
        return data

    def __str__(self):

        return self.get_as_dict(*self.keys)
