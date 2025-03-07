from flask import request
from flask_socketio import SocketIO, emit
from src.tools.jwt_token import decode_token
from src.models.invitation import Invitation
from src.models.user import User
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
