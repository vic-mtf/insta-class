from datetime import datetime
import pickle
import os
from src.tools.generate_code import generate_hex_code

DATA_BASE_FILE_PATH = os.path.join('./data/users.bin')


class User:
    def __init__(self, uname: str, pwd: str, fname: str, lname: str):
        self.uname = uname  # user name
        self.pwd = pwd  # password
        self.fname = fname  # file name
        self.lname = lname  # file name
        self.last_logined_at = datetime.now()
        self.profile_image = None

    def save(self):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self._id = generate_hex_code()
        find_user = User.get_user_by_username(self.uname)
        if find_user:
            raise Exception("Username already exists")
        User.save_user(self)

    def update(self,  uname: str, pwd: str, fname: str, lname: str):
        self.uname = uname if uname else self.uname
        self.pwd = pwd if pwd else self.pwd
        self.fname = fname if fname else self.fname
        self.lname = lname if lname else self.lname
        self.updated_at = datetime.datetime.now()

        User.update_user(self)

    def get_user_infos_as_dict(self, *args: str) -> dict:
        data = {}
        for arg in args:
            data[arg] = getattr(self, arg)
        return data

    def __str__(self):
        return self.get_user_infos_as_dict(['uname', 'pwd', 'fname', 'lname'])

    def set_last_login(self, logined_at: datetime | str | float | int) -> None:
        self.last_logined_at = logined_at

    def update_user(cls, user):
        users = User.get_all_users()
        for i, user in enumerate(users):
            if user._id == user._id:
                users[i] = user
                with open(DATA_BASE_FILE_PATH, 'wb') as file:
                    data = pickle.Pickler(file)
                    data.dump(users)
                break

    def get_all_users(cls) -> list:
        try:
            with open(DATA_BASE_FILE_PATH, 'rb') as file:
                data = pickle.Unpickler(file)
                return data.load()
        except:
            with open(DATA_BASE_FILE_PATH, 'ab') as file:
                users = []
                data = pickle.Pickler(file)
                data.dump(users)
                return users

    def get_user(cls, _id: str):
        users = User.get_all_users()
        for user in users:
            if user._id == _id:
                return user

    def get_user_by_username(cls, username: str):
        users = User.get_all_users()
        for user in users:
            if user.uname == username:
                return user

    def save_user(cls, user):
        users = User.get_all_users()
        users.append(user)
        with open(DATA_BASE_FILE_PATH, 'wb') as file:
            data = pickle.Pickler(file)
            data.dump(users)

    def delete_user(cls, _id: str):
        users = User.get_all_users()
        for i, user in enumerate(users):
            if user._id == _id:
                del users[i]
                with open(DATA_BASE_FILE_PATH, 'wb') as file:
                    data = pickle.Pickler(file)
                    data.dump(users)
                break

    update_user = classmethod(update_user)
    get_all_users = classmethod(get_all_users)
    get_user = classmethod(get_user)
    get_user_by_username = classmethod(get_user_by_username)
    save_user = classmethod(save_user)
    delete_user = classmethod(delete_user)
