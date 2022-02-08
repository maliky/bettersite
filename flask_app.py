# après avoir copié le dossier
# cp -r mystite bettersite
#
# modifier les chemins dans la partie web de pythonanywhere.com
# il faut remplacer /home/user/site par /home/user/bettersite
#
# ouvrir /home/user/bettersite/flask_app.py et y recopier le code minimaliste
# ci-dessous pour verifier que tout fonctionne bien.

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    return render_template('admin.html')

@app.route('/')
def hello_world():
    return "hello from better site"

