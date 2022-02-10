
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    return render_template('admin.html')

@app.route('/')
def hello_world():
    return 'Hello from  bettersite!'

# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev
