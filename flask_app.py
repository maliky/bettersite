# -*- coding: utf-8 -*-
from flask import Flask, render_template, abort
from chiffrement import charge_fichier_mtp
import os

app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    nom_bd = 'bettersite/bd.test.tsv'

    if os.path.exists(nom_bd):
        clients = charge_fichier_mtp(nom_bd)
        return render_template('admin.html', clients=clients)

    abort(404)

@app.route('/')
def hello_world():
    return "hello from better site"



if __name__ == "__main__":
    app.run(debug=True)
