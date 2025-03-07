from src.models.data import Data
from src.models.message import Message


class Invitation(Data):

    collection_name = "INVITATION_COLLECTION"

    def __init__(self, sender, guest, invitation_type="user_to_user"):
        super().__init__(Invitation.collection_name)
        self.sender = sender
        self.guest = guest
        self.type = invitation_type if invitation_type else "user_to_user"

    def get_as_dict(self, *args: str) -> dict:
        data = {}
        for arg in args:
            if hasattr(self, arg):
                data[arg] = getattr(self, arg)
        return data

    @classmethod
    def get_guests(cls, _id: str) -> list:
        collection = super().get_collection(cls.collection_name)
        guests = []
        for invitation in collection:
            if invitation.guest == _id:
                guests.append(invitation)
        return guests

    @classmethod
    def get_senders(cls, _id: str) -> list:
        collection = super().get_collection(cls.collection_name)
        senders = []
        for invitation in collection:
            if invitation.sender == _id:
                senders.append(invitation)
        return senders

    @classmethod
    def delete_all_invitation(cls, _id: str):
        invitations = cls.get_guests(_id) + cls.get_senders(_id)
        for invitation in invitations:
            cls.delete(_id, invitation.collection_name)

    @classmethod
    def delete_invitation(cls, invitation_id: str):
        super().delete(invitation_id, cls.collection_name)

    @classmethod
    def get_invitation(cls, invitation_id: str) -> "Invitation":
        collection = super().get_collection(cls.collection_name)
        for invitation in collection:
            if invitation._id == invitation_id:
                return invitation

    @classmethod
    def get_invitation_by_sender_and_guest(
        cls, sender_id: str, guest_id: str
    ) -> "Invitation":
        collection = super().get_collection(cls.collection_name)
        for invitation in collection:
            if invitation.sender == sender_id and invitation.guest == guest_id:
                return invitation
