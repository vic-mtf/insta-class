

__CLIENTS = []

def get_clients ()-> list:
    global __CLIENTS
    if __CLIENTS is None:
        __CLIENTS = []
    return __CLIENTS


def get_client_sessions(_id: str) -> list:
    clients = get_clients()
    return [client for client in clients if client["_id"] == _id]