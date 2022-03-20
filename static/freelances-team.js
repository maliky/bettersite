cartes.forEach((carte) => carte.addEventListener('click', maj_dela_team));


let team = document.querySelector("#team");  // renvoie la section team
let teamBnt = team.querySelector("button")
teamBnt.addEventListener('click', creeEtEnvoieFormulaire);


/* let teamArray = cartes.map(c=>({c.id: ({"nom": c.nom, "prix": c.prix, "nb":c.nb})  }));
 *  */

function maj_dela_team(event){
    /*
       Récupère les information de la carte qui a été cliquée
       et les ajoute dans le bandeau team
     */

    let carte = event.currentTarget;
    let frNom = carte.querySelector(".fr-nom");
    let frPrix = carte.querySelector(".fr-prix").textContent.split(" ")[0];
    let frSel = carte.querySelector(".fr-sel p").textContent.split(" ")[0];

    let div_html = `<div id=tm-${carte.id}>
        <p>${frNom.innerHTML}: ${frPrix} x ${frSel}</p>
    </div>`;
    let teamMember = team.querySelector(`#tm-${carte.id}`);
    
    if (!teamMember){
        teamBnt.insertAdjacentHTML("beforebegin", div_html);
    } else {
        teamMember.innerHTML = div_html;
    }

}

// au click du bouton générer un formulaire préremplie en the fly et l'envoyer à flask

/**
 * this is copied from https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit?noredirect=1&lq=1
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

