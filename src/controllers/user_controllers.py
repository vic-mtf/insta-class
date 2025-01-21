from flask import request, make_response
import json
from src.tools.user import get_user_by_username, delete_user, User
from src.tools.password_crypt import check_password, encrypt_password
from src.tools.jwt_token import create_token, get_token, decode_token


def login():
    data = json.loads(request.data)
    user = get_user_by_username(data['uname'])
    if user:
        if check_password(user.pwd, data['pwd']):
            keys = ['fname', 'lname', 'uname']
            user_data = user.get_user_infos_as_dict(*keys)
            user_data['token'] = create_token(user._id)
            return make_response(user_data, 200)
    return make_response({"message": "Incorrect username or password"}, 401)


def signup():
    data = json.loads(request.data)
    user = get_user_by_username(data['uname'])
    if user is None:
        pwd = encrypt_password(data['pwd'])
        user = User(data['uname'], pwd, data['fname'], data['lname'])
        user.save()
        return make_response({"message": "account created successfully"}, 201)
    return make_response({"message": "An account with that username already exists"}, 409)


def delele_account():
    token = get_token()
    _id = decode_token(token)['user_id']
    if _id:
        delete_user(_id)
        return make_response({"message": "Account deleted successfully"}, 200)
    return make_response({"message": "error"}, 401)


def upload_profile_image():
    return {
        "message": "Profile image uploaded successfully"
    }
