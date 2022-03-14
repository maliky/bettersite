# -*- coding: utf-8 -*-

from cryptography.fernet import Fernet

KEY = 'lRAufiLOsaycti5e2XHecZeqEj00H6kcCm_yQdqcSH4='


def décrypte_client(client: dict, key):
    """
    Décrypte une entrée du dictionnaire
    """
    fernet = Fernet(key)
    mtp_crypté = client["mtp"]
    decrypte_mtp = fernet.decrypt(mtp_crypté)
    client_decrypte = {"nom": client["nom"], "mtp": decrypte_mtp}

    return client_decrypte


def décrypte_clients(clients: list, key):
    """
    Décrypte une liste de dictionnaire
    """
    clients_decryptés = []

    for client in clients:
        client_dechiffre = décrypte_client(client, key)
        clients_decryptés.append(client_dechiffre)

    return clients_decryptés


def sauvegarde_mtp(clients: list, nom_fichier="mots_de_passe.tsv"):
    """
    Ecris dans un fichier de mots de passe
    Le fichier aura deux colonnes
    """
    with open(nom_fichier, mode="w") as f:

        # pour chaque client de notre liste
        for client in clients:

            # On écrit dans le fichier le nom et le mot de passe crypté
            # penser à décoder le mtp en str
            nom = client["nom"]
            mtp_chiffre = client["mtp"]

            f.write(f"{nom}\t{mtp_chiffre.decode()}\n")


def charge_fichier_mtp(nom_fichier: str):
    """
    lit le fichier de mot de passe chiffrés
    et renvoie une liste des dictionnaires chiffrés
    """
    # on stoquera le contenu du fichier dans ce dictionnaire
    liste_dico = []

    with open(nom_fichier, mode="r") as f:
        ligne = f.readline()

        while ligne:  ### ... Tant qu'il y a des lignes à lire
            ### ... on récupère le nom et le mtp_chiffré
            dico_chiffre = {
                "nom": ligne.split("\t")[0],
                "mtp": ligne.split("\t")[1][:-1].encode(),
            }
            liste_dico.append(dico_chiffre)
            ligne = f.readline()  # ligne suivante

    return liste_dico


def crypte_mtps(clients: list, key):
    """
    Une fonction qui crypte des mots de passe
    contenu dans une liste de dictionnaire
    [{"nom": "Charlie", "mtp": "The Kid"}, ...]
    """
    fernet = Fernet(key)

    clients_chiffres = list()  # c'est pareille que []

    for client in clients:
        client_chiffre = crypte_mtp(dico=client, key=key)
        clients_chiffres.append(client_chiffre)

    return clients_chiffres


def crypte_mtp(dico: dict, key):
    """
    Une fonction qui crypte le mot de passe
    contenu dans un dictionnaire de la forme
    {"nom": "Charlie", "mtp": "The Kid"}
    """
    fernet = Fernet(key)
    mtp = dico["mtp"]
    # chiffre le mot de passe
    mtp_chiffre = fernet.encrypt(mtp.encode())
    # renvoyer le dictionnaire avec
    # le nom et le mot de passe chiffré
    dico_chiffre = {"nom": dico["nom"], "mtp": mtp_chiffre}
    return dico_chiffre


def est_dans_db(client, nom_fichier, key):
    """
    Vérifie que le nom et le mot de passe sont bien
    stoqué dans notre fichier de mot de passe
    renvoie Vrai si c'est le cas.
    """
    # charge le fichier de clients
    clients_db = charge_fichier_mtp(nom_fichier)

    # on récupère le client dans le fichier (notre database : db)
    client_db = recupe_info(client["nom"], clients_db)

    ### on fait les tests
    if client_db:
        mtp_db_dechiffre = décrypte_client(client_db, key)["mtp"]
        if mtp_db_dechiffre.decode() == client["mtp"]:
            return True

    return False


def recupe_info(nom_client, clients_db):
    """
    renvois un client en particulier à partir de la liste de clients
    """

    for client_db in clients_db:
        if nom_client == client_db["nom"]:
            return client_db
    return {}
