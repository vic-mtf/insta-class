from flask import Flask, make_response, send_from_directory
from flask_socketio import SocketIO
from src.tools.generate_code import generate_hex_code
from src.router.router import router
from src.middlewares.authenticate import authenticate
from flask_cors import CORS
from src.middlewares.socket_token_required import socket_token_required
import os
socketio = SocketIO(None, cors_allowed_origins="*")


def cerate_app():
    static_folder =os.path.join(os.getcwd(), 'public')
    print(static_folder)
    app = Flask(__name__, static_url_path='', static_folder='../public')
    app.config['SECRET_KEY'] = generate_hex_code(32)
    CORS(app, resources={
        r"^/api/": {"origins": "*"}  # Allow all origins for this route
    })
    socketio.init_app(app)
    return app


app = cerate_app()
app.before_request(authenticate)


app = Flask(__name__,)


@app.errorhandler(404)
def serve_react(route):
    print(route)
    return send_from_directory(os.path.join(os.getcwd(), 'src/static'), 'index.html')


app.register_blueprint(router, url_prefix='/api')


@socketio.on("connection")
@socket_token_required
def on_connect():
    print("Client connected")
