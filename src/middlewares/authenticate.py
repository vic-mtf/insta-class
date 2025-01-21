from flask import request, make_response

from src.tools.jwt_token import decode_token, get_token
import re


def check_path(path):
    pattern = r'^(/.*)api/auth(/.*)?$'
    if re.match(pattern, path):
        return True
    else:
        return False


def authenticate():
    if check_path(request.path):
        token = get_token()
        return None if decode_token(token) else make_response({'message': 'Invalid token'}, 401)
