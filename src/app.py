from flask import Flask, make_response
from flask_socketio import SocketIO
from src.tools.generate_code import generate_hex_code
from src.router.router import router
from src.middlewares.authenticate import authenticate
from flask_cors import CORS

socketio = SocketIO(None, cors_allowed_origins="*")


def cerate_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = generate_hex_code(32)
    CORS(app, resources={
        r"^/api/": {"origins": "*"}  # Allow all origins for this route
    })
    socketio.init_app(app)
    return app


app = cerate_app()
app.before_request(authenticate)
app.register_blueprint(router, url_prefix='/api')


@app.route(r'/*')
def hello_world():
    return make_response({"message": "Hello"}, 200)


@socketio.on("connection")
def on_connect():
    print("Client connected")
