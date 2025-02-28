from functools import wraps
from flask import  request
from flask_socketio import disconnect
from src.tools.jwt_token import decode_token
def socket_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        data = decode_token(token)
        if not data:
            disconnect()  
            return False
        return f(*args, **kwargs)
    return decorated
