# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp, KEY, est_dans_db, crypte_mtp, sauvegarde_mtp
import os

app = Flask(__name__)


@app.route("/admin", methods=["GET", "POST"])
def admin():
    nom_bd = "bettersite/bd.test.tsv"
    clients = []
    if os.path.exists(nom_bd):
        clients = charge_fichier_mtp(nom_bd)

    if request.method == "GET":
        pass
    elif request.method == "POST":
        form = request.form
        nom = form["nom"]
        mtp = form["mtp"]
        nv_client = {"nom": nom, "mtp": mtp}

        # est ce que le client existe déjà ?
        if est_dans_db(nv_client, nom_fichier=nom_bd, key=KEY):
            pass
        else:
            # ajouter le nv_client
            nv_client_chiffre = crypte_mtp(nv_client, key=KEY)
            clients.append(nv_client_chiffre)
            # écrire la liste
            sauvegarde_mtp(clients, nom_bd)

    return render_template("admin.html", clients=clients)


@app.route("/")
def hello_world():
    return "hello from better site"


# if __name__ == "__main__":
#    app.run(debug=True)
