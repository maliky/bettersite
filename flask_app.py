# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp, est_dans_db, crypte_mtp
import os

app = Flask(__name__)
NOM_BD = "bd.test.tsv"
MASTER_KEY = "lRAufiLOsaycti5e2XHecZeqEj00H6kcCm_yQdqcSH4="


@app.route("/admin", methods=["GET", "POST"])
def admin():
    if os.path.exists(NOM_BD):
        clients = charge_fichier_mtp(NOM_BD)
    else:
        clients = []

    if request.method == "POST":
        nom = request.form["client"]
        mtp = request.form["mtp"]
        nv_client = {"nom": nom, "mtp": mtp}
        
        if not est_dans_db(nv_client, nom_fichier=NOM_BD, key=MASTER_KEY):
            # ajouter un client

            nv_client_chiffre = crypte_mtp(nv_client, key=MASTER_KEY)
            clients.append(nv_client_chiffre)

            return render_template("admin.html", clients=clients)

    # si c'est GET
    return render_template("admin.html", clients=clients)


@app.route("/", methods=["GET", "POST"])
def login():
    """Page de login"""
    if request.method == "GET":
        return render_template("login.html")

    # vérifie les données saisie
    nom = request.form["client"]
    mtp = request.form["mtp"]
    clients = charge_fichier_mtp(NOM_BD)

    if est_dans_db(nom, nom_fichier=NOM_BD, key=MASTER_KEY):
        return render_template("produits.html")

    return render_template("login.html", message="utilisateur ou mot de passe inconnu.")


# Ceci est un commentaire pour la fin de mon fichier flask_app.py dans la branch dev


if __name__ == "__main__":
    app.run(debug=True)
