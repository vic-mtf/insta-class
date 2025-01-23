from flask import request, make_response
import json
from src.models.user import User
from src.tools.password_crypt import check_password, encrypt_password
from src.tools.jwt_token import create_token, get_token, decode_token
from src.models.teacher import Teacher
from src.models.student import Student


def login():
    try:
        data = json.loads(request.data)
        user = User.get_user_by_username(data.get('uname'))
        if user:
            if check_password(user.pwd, data['pwd']):
                keys = ['fname', 'lname', 'uname']
                user_data = user.get_user_infos_as_dict(*keys)
                user_data['token'] = create_token(user._id)
                return make_response(user_data, 200)
        return make_response({"message": "Incorrect username or password"}, 401)
    except Exception as e:
        return make_response({"message": str(e)}, 500)


def signup():
    try:
        data = json.loads(request.data)
        user = User.get_user_by_username(data.get('uname'))

        if user is None:
            data['pwd'] = encrypt_password(data.get('pwd'))
            role = data.get('role')
            identities = ['uname', "pwd", 'fname', 'lname']
            data = [data[val] for val in identities]
            user = User(*data)
            user = Teacher(user) if role == 'teacher' else Student(user)
            user.save()
            return make_response({"message": "account created successfully"}, 201)
        return make_response({"message": "An account with that username already exists"}, 409)
    except Exception as e:
        return make_response({"message": str(e)}, 400)


def delele_account():
    token = get_token()
    _id = decode_token(token)['user_id']
    if _id:
        User.delete_user(_id)
        return make_response({"message": "Account deleted successfully"}, 200)
    return make_response({"message": "error"}, 401)


def upload_profile_image():
    return {
        "message": "Profile image uploaded successfully"
    }
