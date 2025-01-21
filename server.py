from configs.evn_configs import server_config
from src.app import socketio, app


if __name__ == '__main__':
    socketio.run(app, **server_config)
