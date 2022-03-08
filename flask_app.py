# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    clients = [
        {"nom":"Areta F.", "mtp": "ABC"},
        {"nom":"Ernesto Djé djé", "mtp": "1XB"},
        {"nom":"Eminem", "mtp": "123"},
        ]
    return render_template('admin.html', clients = clients)

@app.route('/')
def hello_world():
    return 'Hello from  bettersite!'

# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev



if __name__ == "__main__":
    app.run(debug=True
