import bcrypt


def encrypt_password(pwd: str):
    bytes = pwd.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(bytes, salt)


def check_password(hashed: str, pwd: str):
    bytes = pwd.encode('utf-8')
    return bcrypt.checkpw(bytes, hashed)
