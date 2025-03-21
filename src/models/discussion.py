from src.models.data import Data
from src.models.user import User
from src.models.message import Message


class Discussion(Data):

    collection_name = "DISCUSSIONS_COLLECTION"

    def __init__(self, name, author, _type, description=None, subject=None):
        super().__init__(Discussion.collection_name)
        self.type = _type  # classroom or discussion or workgroup or direct
        self.name = name
        self.author = author
        self.description = description
        self.subject = subject
        self.delegates = []
        self.members = [author]
        self.messages = []
        self.disciplines = []

    def add_member(self, student_id: str):
        if student_id not in self.members:
            self.members.append(student_id)

    def remove_member(self, student_id: str):
        if student_id in self.members:
            self.members.remove(student_id)

    def add_message(self, message: Message):
        if message._id not in [message._id for message in self.messages]:
            self.messages.append(message)

    def remove_message(self, _id: str):
        if _id in [message._id for message in self.messages]:
            self.messages.remove(self.get_message(_id))

    def update_message(self, message: Message):
        for message in self.messages:
            if message._id == message._id:
                self.messages.remove(message)
                self.messages.append(message)

    def get_message(self, _id: str) -> Message:
        for message in self.messages:
            if message._id == _id:
                return message

    def get_members(self):
        return [User.get_user(member) for member in self.members]

    def get_as_dict(self, *keys) -> dict:
        data = {}
        for key in keys:
            if hasattr(self, key):
                data[key] = getattr(self, key)

        ##################################
        ##################################
        return data

    @classmethod
    def get_discussion(cls, _id: str):
        collection = super().get_collection(cls.collection_name)
        for class_room in collection:
            if class_room._id == _id:
                return class_room

    @classmethod
    def get_discussions_into_member(cls, member: str) -> list:
        collection = super().get_collection(cls.collection_name)
        discussions = []
        for discussion in collection:
            if member in discussion.members:
                discussions.append(discussion)
        return discussions

    @classmethod
    def get_get_discussions_by_author(cls, author: str) -> list:
        collection = super().get_collection(cls.collection_name)
        discussions = []
        for discusion in collection:
            if discusion.author == author:
                discussions.append(discusion)
        return discusion
