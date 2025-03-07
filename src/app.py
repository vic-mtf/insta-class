from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO
from src.tools.generate_code import generate_hex_code
from src.tools.jwt_token import decode_token
from src.router.router import router
from src.middlewares.authenticate import authenticate
from flask_cors import CORS
from src.middlewares.socket_token_required import socket_token_required
from src.tools.get_clients import get_clients
from src.events.events import events
import os


app = Flask(__name__, static_url_path="/")
app.config["SECRET_KEY"] = generate_hex_code(32)
app.static_folder = os.path.join(os.getcwd(), "public")

socketio = SocketIO(app, cors_allowed_origins="*")
app.before_request(authenticate)


@app.errorhandler(404)
def serve_react(_):
    return send_from_directory(app.static_folder, "index.html")


app.register_blueprint(router, url_prefix="/api")
CORS(app, resources={r"/*": {"origins": "*"}})


@socketio.on("connect")
@socket_token_required
def connected():
    clients = get_clients()
    token = request.args.get("token")
    client = {
        "sid": request.sid,
        "userAgent": request.headers.get("User-Agent"),
        "_id": decode_token(token).get("user_id"),
    }
    clients.append(client)
    print("new Client connected: ", client.get("sid"))


@socketio.on("disconnect")
def disconnected():
    clients = get_clients()
    for client in clients:
        if client.get("sid") == request.sid:
            clients.remove(client)
            break


events(socketio)
