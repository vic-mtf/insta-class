from flask import Blueprint
from src.middlewares.authenticate import authenticate
from src.controllers.user_controllers import signup
from src.controllers.user_controllers import login
from src.controllers.user_controllers import delele_account
from src.controllers.user_controllers import upload_profile_image
from src.controllers.class_room_controllers import create_class_room

router = Blueprint('router', __name__)

router.route('/signup', methods=["POST"])(signup)
router.route('/login', methods=["POST"])(login)

router.route('/auth/delete-account', methods=["DELETE"])(delele_account)
router.route('/auth/upload-profile-image')(upload_profile_image)
router.route('/auth/create-class-room', methods=["POST"])(create_class_room)
