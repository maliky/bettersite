# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template
from chiffrement import charge_fichier_mtp
app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    clients = charge_fichier_mtp("bd.test.tsv")
    return render_template('admin.html', clients = clients)

@app.route('/')
def hello_world():
    return 'Hello from  bettersite!'

# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev



if __name__ == "__main__":
    app.run(debug=True)
