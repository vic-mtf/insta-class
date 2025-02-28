from flask import Flask, make_response, send_from_directory
from flask_socketio import SocketIO
from src.tools.generate_code import generate_hex_code
from src.router.router import router
from src.middlewares.authenticate import authenticate
from flask_cors import CORS
from src.middlewares.socket_token_required import socket_token_required
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = generate_hex_code(32)
socketio = SocketIO(app, cors_allowed_origins="*")
app.before_request(authenticate)

@app.errorhandler(404)
def serve_react(_):
    return send_from_directory(os.path.join(os.getcwd(), 'src/static'), 'index.html')

app.register_blueprint(router, url_prefix='/api')
CORS(app,resources={r"/*":{"origins":"*"}})

@socketio.on("connect")
@socket_token_required
def connected():
    
    print('Client connected')
    # """event listener when client connects to the server"""
    # print(request.sid)
    # print("client has connected")
    # emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on("disconnect")
def disconnected():
    print('Client disconnected')
    # """event listener when client disconnects from the server"""
    # print("client has disconnected")
