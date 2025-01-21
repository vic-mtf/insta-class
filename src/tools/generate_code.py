from random import choice


def generate_hex_code(length=25):
    hex_chars = '0123456789abcdef'
    return ''.join(choice(hex_chars) for _ in range(length))
