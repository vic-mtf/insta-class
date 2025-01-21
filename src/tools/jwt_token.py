import jwt
from datetime import datetime, timezone, timedelta
from flask import request

secret_key = 'djQsdgfQGjhfyrga_nfdfbjhsvjdsquoiehncsdhqisbjd'


def create_token(_id: str, exp: str | float | int = datetime.now(timezone.utc) + timedelta(days=1)) -> str:
    payload = {"user_id": _id, 'exp': exp}
    return jwt.encode(payload, secret_key, algorithm='HS256')


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, secret_key, algorithms=['HS256'])
    except:
        pass


def get_token() -> str:
    return request.headers.get('Authorization').split(' ')[1]
