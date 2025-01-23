from src.models.data import Data
from src.models.message import Message


class ClassRoom(Data):

    collection_name = "CLASS_ROOM_COLLECTION"

    def __init__(self, name, teacher_id, description=None):
        super().__init__(ClassRoom.collection_name)
        self.name = name
        self.teacher_id = teacher_id
        self.description = description
        self.students = []
        self.messages = []
        self.disciplines = []

    def add_student(self, student_id: str):
        if student_id not in self.students:
            self.students.append(student_id)

    def add_message(self, message: Message):
        if message._id not in [message._id for message in self.messages]:
            self.messages.append(message)

    def get_message(self, _id: str) -> Message:
        for message in self.messages:
            if message._id == _id:
                return message

    def get_class_room(cls, _id: str):
        collection = super().get_collection(cls.collection_name)
        for class_room in collection:
            if class_room._id == _id:
                return class_room

    def get_class_rooms_by_teacher(cls, teacher_id: str) -> list:
        collection = super().get_collection(cls.collection_name)
        for class_room in collection:
            if class_room.teacher_id == teacher_id:
                return class_room
        return []

    get_class_room = classmethod(get_class_room)
    get_class_rooms_by_teacher = classmethod(get_class_rooms_by_teacher)
