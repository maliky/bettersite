# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp

app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():

    clients = charge_fichier_mtp("bettersite/mots_de_passe.tsv")

    # vérifier que la methode est post
    if request.method == 'POST':
        # récupérer le client du formulaire
        nom = request.form['nom']
        # mtp = ....

        nv_client = # {'nom':..., "mtp": ...}

        # vérifier que le nv_client est dans la base de donnée
        # quelle fonction utiliser ? comment ?
        # s'il n'y est pas...
        # chiffrer son mot de passe (avec quelle fonction ?)
        # l'ajouter à la liste clients
        # écrire la liste des clients sur le disque dur


    return render_template('admin.html', clients = clients)

@app.route('/')
def hello_world():
    return 'Hello from  bettersite!'

# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev
