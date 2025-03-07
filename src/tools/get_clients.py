__CLIENTS = []


def get_clients() -> list:
    global __CLIENTS
    if __CLIENTS is None:
        __CLIENTS = []
    return __CLIENTS


def get_client_sessions(_id: str) -> list:
    clients = get_clients()
    return [client for client in clients if client["_id"] == _id]


def manage_client_session(client_id: str = ""):
    clients = get_client_sessions(client_id) if client_id else get_clients()

    def decorator(func):
        if clients:
            for client in clients:
                func(client)

        def wrapper(*args, **kwargs):
            pass

        return wrapper()

    return decorator
