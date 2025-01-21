import os
from dotenv import load_dotenv

load_dotenv()

server_config = {
    "host": os.environ.get('HOST'),
    "port": os.environ.get('PORT'),
    "debug": os.environ.get('DEBUG'),
}
