from flask import request, make_response
from flask_socketio import emit
import json
from src.models.user import User
from src.tools.password_crypt import check_password, encrypt_password
from src.tools.jwt_token import create_token, get_token, decode_token
from src.models.teacher import Teacher
from src.models.student import Student
from src.models.discussion import Discussion
from src.models.invitation import Invitation
from src.tools.get_clients import get_clients, manage_client_session
from src.tools.get_clients import get_client_sessions


def login():
    try:
        data = json.loads(request.data)
        user = User.get_user_by_username(data.get("uname"))
        if user:
            if check_password(user.pwd, data["pwd"]):
                keys = ["fname", "lname", "uname", "profile_image", "_id"]
                user_data = user.get_user_infos_as_dict(*keys)
                print(user_data)
                user_data["token"] = create_token(user._id)
                return make_response(user_data, 200)
        return make_response({"message": "Incorrect username or password"}, 401)
    except Exception as e:
        return make_response({"message": str(e)}, 500)


def signup():
    try:
        data = json.loads(request.data)
        user = User.get_user_by_username(data.get("uname"))

        if user is None:
            data["pwd"] = encrypt_password(data.get("pwd"))
            role = data.get("role")
            identities = ["uname", "pwd", "fname", "lname"]
            data = [data[val] for val in identities]
            user = User(*data)
            user = Teacher(user) if role == "teacher" else Student(user)
            user.save()
            keys = ["fname", "lname", "uname", "role", "profile_image", "_id"]
            new_user = user.get_user_infos_as_dict(*keys)
            print(new_user)
            clients = get_clients()
            print(clients)

            @manage_client_session()
            def notify_new_user(client):
                emit("new-user", new_user, namespace="/", to=client.get("sid"))

            return make_response({"message": "account created successfully"}, 201)
        return make_response(
            {"message": "An account with that username already exists"}, 409
        )
    except Exception as e:
        print(e)
        return make_response({"message": str(e)}, 400)


def delele_account():
    token = get_token()
    _id = decode_token(token)["user_id"]
    if _id:
        User.delete_user(_id)
        return make_response({"message": "Account deleted successfully"}, 200)
    return make_response({"message": "error"}, 401)


def upload_profile_image():
    return {"message": "Profile image uploaded successfully"}


def get_user_info(): ...


def get_users():
    token = get_token()
    _id = decode_token(token)["user_id"]
    user = User.get_user(_id)
    members = []
    for discusion in Discussion.get_discussions_into_member(_id):
        if discusion.type == "direct":
            members += discusion.members
    contacts = user.students if user.role == "teacher" else user.teachers
    contacts += user.colleagues + members

    if _id not in contacts:
        contacts.append(_id)

    invitations = [invitation.guest for invitation in Invitation.get_senders(_id)]
    guests = [invitation.sender for invitation in Invitation.get_guests(_id)]
    if _id:
        users = User.get_all_users()
        user_data = []
        keys = ["fname", "lname", "uname", "role", "profile_image", "_id"]
        for user in users:
            data = user.get_user_infos_as_dict(*keys)
            data["guest"] = True if user._id in invitations else False
            if user._id not in guests and user._id not in contacts:
                user_data.append(data)
        return make_response(user_data, 200)


def get_guests():
    token = get_token()
    _id = decode_token(token).get("user_id")
    keys = ["fname", "lname", "role", "profile_image", "_id"]
    print(_id)
    invitations = [
        User.get_user(invitation.sender).get_user_infos_as_dict(*keys)
        for invitation in Invitation.get_guests(_id)
    ]
    print(invitations)
    return make_response(invitations, 200)


def get_discussions():
    token = get_token()
    _id = decode_token(token).get("user_id")
    discussions = Discussion.get_discussions_into_member(_id)

    discussion_data = []
    keys = [
        "type",
        "name",
        "author",
        "description",
        "subject",
        "delegates",
        "members",
        "messages",
        "disciplines",
        "_id",
    ]

    for discussion in discussions:
        data = discussion.get_as_dict(*keys)
        user_keys = ["fname", "lname", "_id", "profile_image", "last_logined_at"]
        members = [
            User.get_user(member).get_user_infos_as_dict(*user_keys)
            for member in discussion.members
        ]
        members_status = []
        for member in members:
            member["status"] = (
                "online" if get_client_sessions(member.get("_id")) else "offline"
            )
            members_status.append(member)
        data["members"] = members_status
        data["messages"] = [message.get_as_dict() for message in discussion.messages]
        discussion_data.append(data)

    return make_response(discussion_data, 200)
