#!flask/bin/python
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys

@app.route('/', methods=['POST'])
def checkuser():
    return jsonify({'user': 'ciaociao'}), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5556)
