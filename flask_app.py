# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request
from chiffrement import charge_fichier_mtp, est_dans_db, crypte_mtp, sauvegarde_mtp
from chiffrement import KEY as MASTER_KEY
from json import load
import os
import requests

WEBROOT = "bettersite/"
app = Flask(__name__)
NOM_BD = WEBROOT + "bd.test.tsv"


@app.route("/admin", methods=["GET", "POST"])
def admin():
    """
    La page d'admin est un exemple de formulaire
    et de template qui utilise une boucle pour créer un tableau.
    On peut y ajouter des utilisateurs mais pas les retirer (pour l'instant)
    Pour ajouter un utilisateur il faut connaître la clef maîtresse
    que l'on trouve dans la bibliothèque chiffrement.
    """
    # Vérifions d'abords si une base de données avec les mots
    # de passe existe.
    if os.path.exists(NOM_BD):
        # et chargeons la si c'est le cas
        clients = charge_fichier_mtp(NOM_BD)
    else:
        # Sinon créons aussi un fichier vide qui contiendra les mtp
        with open(NOM_BD, "w"):
            pass
        # et initialisation la variables clients
        clients = []

    # On peut arriver à la cette page avec deux types de requêtes
    # Si la requête est un POST
    if request.method == "POST":

        # il faut récupérer les données envoyées par le formulaire
        nom = request.form["client"]
        mtp = request.form["mtp"]
        clef = request.form["clef"]

        # Créer un nouveau client de type dictionnaire
        nv_client = {"nom": nom, "mtp": mtp}

        # vérifier que le client n'est pas déjà dans la base de données
        if est_dans_db(nv_client, nom_fichier=NOM_BD, key=clef):
            pass
        else:
            # s'il n'y est pas il faut l'ajouter en chiffrant
            # le mot de passe au préalable.
            nv_client_chiffre = crypte_mtp(nv_client, key=clef)
            clients.append(nv_client_chiffre)

            # On peut finalement mettre à jour la base de données
            # avec le nouveau client
            sauvegarde_mtp(clients, nom_fichier=NOM_BD)

    # Dans tout, les cas GET ou POST, on affiche la page admin
    return render_template("admin.html", clients=clients)


@app.route("/", methods=["GET", "POST"])
def login():
    """
    Page à la racine de notre site et page de login
    Il s'agit ici de vérifier que le login et le mot de passe existe dans la base de donnée
    """

    # si la requête est un GET
    if request.method == "GET":
        # on afficher la page de login simplement (le formulaire est vide)
        return render_template("login.html")

    # Sinon, c'est que nous avons une requête POST
    # il faut vérifier les données saisies dans le formulaire
    nom = request.form["client"]
    mtp = request.form["mtp"]

    # Créer un dictionnaire client et vérifier son existance dans la BD
    nv_client = {"nom": nom, "mtp": mtp}
    if not est_dans_db(nv_client, nom_fichier=NOM_BD, key=MASTER_KEY):
        return render_template(
            "login.html",
            message=f"Utilisateur ou mot de passe invalide, réessayer !",
        )

    # lorsque l'utilisateur est dans la BD, on peut rediriger vers la page
    # des services qui présente une liste de freelanceurs
    freelanceurs = charge_freelanceurs()
    return render_template(
        "freelances.html",
        freelances=freelanceurs,
    )


@app.route("/confirmation", methods=["POST"])
def confirmation():
    """
    Page de confirmation et de paiement de la commande
    """
    lignes_tableau = {}
    total = 0

    if request.method == "POST":
        nb_heures_freelance = get_fr(request.form)

        freelanceurs = charge_freelanceurs()

        for (fr_id, fr_nb_heures) in nb_heures_freelance.items():

            fr_info = get_info(fr_id, freelanceurs)

            sous_total = int(fr_info["prix"]) * int(fr_nb_heures)

            lignes_tableau[fr_id] = {
                "nom": fr_info["nom"],
                "detail": f"{fr_info['prix']} USD/h x {fr_nb_heures}h",
                "sous_total": f"{sous_total}USD",
            }

            total += sous_total

        total_ada = price_in_ada(total)
        print(total_ada)
    return render_template(
        "confirmation.html", factures={"lignes_tableau": lignes_tableau, "total": total, "total_ada": f"{total_ada:.2f}"}  )


#### Fonctions utilitaires ####
def price_in_ada(num_usd:int):
    """
    Utilise une API pour avoir le actuel des ADA
    """
    get_url = "https://api.coingecko.com/api/v3/simple/price"
    r = requests.get(get_url, params={"ids": "cardano", "vs_currencies": "usd"})
    usd_per_ada = r.json()['cardano']['usd']
    total = num_usd / float(usd_per_ada)

    return total

def get_info(fr_id, fr_bd):
    def _sur_id(fr_el: dict):
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


def charge_freelanceurs(fr_db=WEBROOT + "static/freelances.json"):
    """
    Charge un fichier json de freelances
    """
    with open(fr_db, mode="r") as f:
        freelanceurs = load(f)
    return freelanceurs


if __name__ == "__main__":
    app.run(debug=True)
