from datetime import datetime
import pickle
import os
from src.tools.generate_code import generate_hex_code
from typing import Self

DATA_BASE_FILE_PATH = os.path.join("./data/users.bin")


class User:
    def __init__(self, uname: str, pwd: str, fname: str, lname: str):
        self.uname = uname  # user name
        self.pwd = pwd  # password
        self.fname = fname  # file name
        self.lname = lname  # file name
        self.profile_image = None

    def save(self):
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()
        self._id = generate_hex_code()
        self.last_logined_at = datetime.now().isoformat()
        find_user = User.get_user_by_username(self.uname)
        if find_user:
            raise Exception("Username already exists")
        User.save_user(self)

    def update(self, uname: str, pwd: str, fname: str, lname: str):
        self.uname = uname if uname else self.uname
        self.pwd = pwd if pwd else self.pwd
        self.fname = fname if fname else self.fname
        self.lname = lname if lname else self.lname
        self.updated_at = datetime.now().isoformat()
        User.update_user(self)

    def get_user_infos_as_dict(self, *args: str) -> dict:
        data = {}
        for arg in args:
            if hasattr(self, arg):
                data[arg] = getattr(self, arg)
        return data

    def __str__(self) -> str:
        return str(self.get_user_infos_as_dict(*["uname", "pwd", "fname", "lname"]))

    def set_last_login(self, logined_at: datetime | str | float | int) -> None:
        self.last_logined_at = logined_at

    @classmethod
    def update_user(cls, new_user):
        users = User.get_all_users()
        for i, user in enumerate(users):
            if new_user._id == user._id:
                users[i] = new_user
                with open(DATA_BASE_FILE_PATH, "wb") as file:
                    data = pickle.Pickler(file)
                    data.dump(users)
                break

    @classmethod
    def get_all_users(cls) -> list:
        try:
            with open(DATA_BASE_FILE_PATH, "rb") as file:
                data = pickle.Unpickler(file)
                return data.load()
        except:
            with open(DATA_BASE_FILE_PATH, "ab") as file:
                users = []
                data = pickle.Pickler(file)
                data.dump(users)
                return users

    @classmethod
    def get_user(cls, _id: str) -> Self:
        users = User.get_all_users()
        for user in users:
            if user._id == _id:
                return user

    @classmethod
    def get_user_by_username(cls, username: str):
        users = User.get_all_users()
        for user in users:
            if user.uname == username:
                return user

    @classmethod
    def save_user(cls, user):
        users = User.get_all_users()
        users.append(user)
        with open(DATA_BASE_FILE_PATH, "wb") as file:
            data = pickle.Pickler(file)
            data.dump(users)

    @classmethod
    def delete_user(cls, _id: str):
        users = User.get_all_users()
        for i, user in enumerate(users):
            if user._id == _id:
                del users[i]
                with open(DATA_BASE_FILE_PATH, "wb") as file:
                    data = pickle.Pickler(file)
                    data.dump(users)
                break
