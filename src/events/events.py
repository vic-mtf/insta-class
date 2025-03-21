from flask import request
from flask_socketio import SocketIO, emit
from src.tools.jwt_token import decode_token
from src.models.invitation import Invitation
from src.models.user import User
from src.models.message import Message
from src.models.discussion import Discussion
from src.tools.get_clients import manage_client_session


def events(socketio: SocketIO):
    @socketio.on("send-invitation")
    def invite_user(guest):
        token = request.args.get("token")
        sender = decode_token(token).get("user_id")
        invitation = Invitation.get_invitation_by_sender_and_guest(sender, guest)
        status = "create"

        if not invitation:
            invitation = Invitation(sender, guest)
            invitation.save()
        else:
            invitation.delete_invitation(invitation._id)
            status = "remove"

        keys = ["sender", "guest"]
        data = invitation.get_as_dict(*keys)
        data["status"] = status
        print("Bonjour")

        @manage_client_session(guest)
        def send_to_guest(session):
            keys = ["uname", "fname", "lname", "_id", "role", "profile_image"]
            data["sender"] = User.get_user(sender).get_user_infos_as_dict(*keys)
            print(data)
            emit(
                "invitation-received",
                data,
                namespace="/",
                to=session.get("sid"),
            )

        @manage_client_session(sender)
        def send_to_sender(session):
            emit(
                "send-invitation",
                data,
                namespace="/",
                to=session.get("sid"),
            )

    @socketio.on("accept-invitation")
    def accept_invitation(sender):
        token = request.args.get("token")
        guest = decode_token(token).get("user_id")
        invitation = Invitation.get_invitation_by_sender_and_guest(sender, guest)
        discussion = Discussion(None, sender, "direct")
        discussion.add_member(guest)
        message = Message("nouvelle discussion", sender, guest)
        discussion.add_message(message)
        discussion.save()
        Invitation.delete_invitation(invitation._id)
        keys = ["author", "name", "members", "_id", "messages"]
        discussion = discussion.get_as_dict(*keys)
        keys = [
            "content",
            "sender",
            "receiver",
            "timestamp",
            "_type",
            "created_at",
            "updated_at",
            "type",
            "read",
            # "played",
            # "edited" "_id",
            # "reply",
        ]
        discussion["messages"] = [
            message.get_message_as_dict(*keys) for message in discussion["messages"]
        ]
        print(discussion)

        @manage_client_session(guest)
        def send_to_guest(session):
            emit(
                "new-discussion",
                discussion,
                namespace="/",
                to=session.get("sid"),
            )

        @manage_client_session(sender)
        def send_to_sender(session):
            emit(
                "new-discussion",
                discussion,
                namespace="/",
                to=session.get("sid"),
            )

    @socketio.on("send-message")
    def send_message(message):
        token = request.args.get("token")
        author = decode_token(token).get("user_id")
        content = message.get("content")
        receiver = message.get("receiver")
        created_at = message.get("createdAt")
        new_message = Message(content, author, receiver, "text", "user", created_at)
        discussion = Discussion.get_discussion(message.get("target"))
        discussion.messages.append(new_message)
        discussion.save()

        message_to_dict = new_message.get_as_dict()

        data = {
            "target": message.get("target"),
            "message": message_to_dict,
            "author": author,
            "type": "text",
        }

        @manage_client_session(author)
        def send_to_author(session):
            emit(
                "new-message",
                data,
                namespace="/",
                to=session.get("sid"),
            )

        @manage_client_session(receiver)
        def send_to_receiver(session):
            emit(
                "new-message",
                data,
                namespace="/",
                to=session.get("sid"),
            )
