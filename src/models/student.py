from src.models.user import User


class Student (User):
    def __init__(self, identiteis: list | User | dict):
        if isinstance(identiteis, list):
            super().__init__(*identiteis)
        if isinstance(identiteis, User):
            super().__init__(identiteis.uname, identiteis.pwd, identiteis.fname, identiteis.lname)
        if isinstance(identiteis, dict):
            super().__init__(
                identiteis.get('uname'),
                identiteis.get('pwd'),
                identiteis.get('fname'),
                identiteis.get('lname')
            )
        self.role = "student"
        self.is_class_delegate = False
        self.class_rooms = []
        self.teachers = []
        self.colleagues = []
