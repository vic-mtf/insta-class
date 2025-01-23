import os
from datetime import datetime
from src.tools.generate_code import generate_hex_code
import pickle

DATA_BASE_FILE_PATH = os.path.join('./data/data.bin')


class Data:
    def __init__(self, collection_name: str):
        self.collection_name = collection_name if collection_name else self.collection_name
        self._id = generate_hex_code()
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def save(self):
        _id = self._id
        collection_name = self.collection_name

        self.updated_at = datetime.now()

        collection = Data.get_collection(collection_name)

        data = Data.find_data(_id, collection)
        if data is None:
            collection.append(self)
            newData = Data.get_all_data()
            newData[collection_name] = collection

        else:
            index = Data.find_index(_id, collection)
            collection[index] = self
        Data.save_data(newData)

    def save_data(cls, data_base={}):
        with open(DATA_BASE_FILE_PATH, 'wb') as file:
            data = pickle.Pickler(file)
            data.dump(data_base)

    def get_all_data(cls) -> dict:

        try:
            with open(DATA_BASE_FILE_PATH, 'rb') as file:
                data = pickle.Unpickler(file)
                return data.load()
        except:
            with open(DATA_BASE_FILE_PATH, 'ab') as file:
                data_base = {}
                data = pickle.Pickler(file)
                data.dump(data_base)
                return data_base

    def get_collection(cls, collection_name: str) -> list:
        raw_data = Data.get_all_data()
        collection = []
        if collection_name in raw_data:
            collection = raw_data[collection_name]
        else:
            raw_data[collection_name] = collection
            Data.save_data(raw_data)
        return collection

    def find_data(cls, _id, data: list):
        for item in data:
            if isinstance(item, Data) and item._id == _id:
                return item

    def find_index(cls, _id, data: list) -> int:
        for i, item in enumerate(data):
            if isinstance(item, Data) and item._id == _id:
                return i
        return -1

    save_data = classmethod(save_data)
    find_data = classmethod(find_data)
    find_index = classmethod(find_index)
    get_collection = classmethod(get_collection)
    get_all_data = classmethod(get_all_data)
