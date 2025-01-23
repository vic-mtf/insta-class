from flask import request, make_response
from src.tools.jwt_token import get_token, decode_token
from src.models.teacher import Teacher
from src.models.class_room import ClassRoom
import json


def create_class_room():
    try:
        data = json.loads(request.data)
        token = get_token()
        teacher_id = decode_token(token).get('user_id')
        teacher = Teacher.get_user(teacher_id)
        response = make_response(
            {'message': "classroom created successfully"},
            201
        )
        if teacher.role == "teacher":
            print(data.get('name'), teacher_id)
            class_room = ClassRoom(data.get('name'), teacher_id)
            class_room.save()
        else:
            response = make_response(
                {'message': 'You must be a teacher for this operation'},
                401
            )
        return response
    except Exception as e:
        return make_response({'message': str(e)}, 500)
