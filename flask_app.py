
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev
