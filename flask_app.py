# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp, est_dans_db, crypte_mtp, sauvegarde_mtp
from chiffrement import KEY as MASTER_KEY
from json import load
import os

WEBROOT = "bettersite/"
app = Flask(__name__)
NOM_BD = WEBROOT + "bd.test.tsv"


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

    with open(WEBROOT + "static/freelances.json", mode="r") as f:
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
    if request.method == "POST":
        heures_freelance = get_fr(request.form)

        with open(WEBROOT + "static/freelances.json", mode="r") as f:
            fr_bd = load(f)

        sousTotaux = {}
        total = 0
        for (fr_id, fr_heure) in heures_freelance.items():
            fr_info = get_info(fr_id, fr_bd)
            sous_total = int(fr_info["prix"]) * int(fr_heure)
            sousTotaux[fr_id] = {
                "nom": fr_info['nom'],
                "detail": f"{fr_info['prix']} USD/h x {fr_heure}h",
                "sous_total": f"{sous_total}USD",
            }
            total += sous_total
        
    return render_template("confirmation.html", factures={"sousTotaux":sousTotaux, "total":total})


def get_info(fr_id, fr_bd):
    def _sur_id(fr_el:dict):
        return fr_el["id"] == int(fr_id.split("-")[1])

    res = list(filter(_sur_id, fr_bd))[0]
    return res


def get_fr(fr_form_inputs: list):

    fr_ids = {}

    for (nonce, input_sel) in fr_form_inputs.items():
        sel_id, input_value = input_sel.split(",")
        fr_id = "-".join(sel_id.split("-")[:2])
        fr_ids[fr_id] = int(input_value)

    return fr_ids


if __name__ == "__main__":
    app.run(debug=True)
