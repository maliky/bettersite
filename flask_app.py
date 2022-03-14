# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp, est_dans_db, crypte_mtp, sauvegarde_mtp
from chiffrement import KEY as MASTER_KEY
from json import load
import os

app = Flask(__name__)
NOM_BD = "bd.test.tsv"


@app.route("/admin", methods=["GET", "POST"])
def admin():
    if os.path.exists(NOM_BD):
        clients = charge_fichier_mtp(NOM_BD)
    else:
        clients = []

    # Si c'est POST
    if request.method == "POST":
        nom = request.form["client"]
        mtp = request.form["mtp"]
        nv_client = {"nom": nom, "mtp": mtp}

        clef = request.form["clef"]
        if est_dans_db(nv_client, nom_fichier=NOM_BD, key=clef):
            pass
        else:
            # ajouter un client
            nv_client_chiffre = crypte_mtp(nv_client, key=clef)
            clients.append(nv_client_chiffre)
            sauvegarde_mtp(clients, nom_fichier=NOM_BD)

    # Dans tout les cas
    return render_template("admin.html", clients=clients)


@app.route("/", methods=["GET", "POST"])
def login():
    """Page de login"""
    if request.method == "GET":
        return render_template("login.html")

    # vérifie les données saisie
    nom = request.form["client"]
    mtp = request.form["mtp"]
    nv_client = {"nom": nom, "mtp": mtp}

    if est_dans_db(nv_client, nom_fichier=NOM_BD, key=MASTER_KEY):
        pass
    else:
        return render_template(
            "login.html",
            message=f"Utilisateur {nom} ou mot de passe {mtp}, réessayer !",
        )

    with open("static/freelances.json", mode="r") as f:
        freelances = load(f)

    return render_template(
        "freelances.html",
        freelances=freelances,
    )


@app.route("/confirmation", methods=["POST"])
def confirmation():
    """
    Page de confirmation et de paiement de la commande
    """
    return render_template("confirmation.html")


if __name__ == "__main__":
    app.run(debug=True)
