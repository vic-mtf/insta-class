from functools import wraps
from flask import  request
from flask_socketio import disconnect

def socket_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        # print(f"*******************************************************************Token: {token}")
        if not token:
            disconnect()  
            return False
        return f(*args, **kwargs)
    return decorated
