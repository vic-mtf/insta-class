from flask import request
from flask_socketio import SocketIO, emit
from src.tools.jwt_token import decode_token
from src.models.invitation import Invitation
from src.tools.get_clients import get_client_sessions

def events (socketio:SocketIO):
    @socketio.on("send-invitation")
    def invite_user(guest):
        token = request.args.get('token')
        sender = decode_token(token).get('user_id')
        invitation = Invitation.get_invitation_by_sender_and_guest(sender, guest)
        status = 'create'
        
        if not invitation:
            invitation = Invitation(sender, guest)
            invitation.save()
        else:
            invitation.delete_invitation(invitation._id)
            status = 'remove'
        
        keys = ['sender', 'guest']
        data = invitation.get_as_dict(*keys)
        data['status'] = status

        for session in get_client_sessions(guest):
            emit("invitation-received", invitation.get_as_dict(*keys), namespace="/",  to=session.get('sid'))

        for session in get_client_sessions(sender):
            emit("send-invitation", invitation.get_as_dict(*keys), namespace="/",  to=session.get('sid'))