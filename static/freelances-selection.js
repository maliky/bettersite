/*
   Attention se fichier est chargé après freelances-anime.js.  Il ne doit pas utiliser les
   même nom de variable global
 */

cartes.forEach((carte) => carte.addEventListener('click', choisiFreeLanceur));


// On initialise un objet javascript. Il se comporte (à peu prêt) comme un dictionnaire python
// Il contiendra l'identifiant de freelanceur et le nombre d'heure qu'on souhaite lui donner.
const selCount = {} ; 

for (let i =0 ; i< cartes.length; i++){
    /* Pour chaque carte on crée une entrée dans l'objet selCount
       de la forme '12345-sel : 0'
       Cet objet contient le nombre de clique sur chaque freelance
     */
    let carteSelId = cartes[i].id + "-sel";
    selCount[carteSelId] = 0;
}
// ouvrir une console et écrire
// console.log(selCount) pour voir le contenu


function choisiFreeLanceur(event){
    /*
       Ajoute un compteur et un bouton dans la partie sel de la carte
       où l'on a cliqué
     */
    let carte = event.currentTarget;
    // crée l'id de la zone que l'on veut modifier
    let carteSelId = carte.id + "-sel";
    // On incrémente le nombre de séléction pour cette zone
    selCount[carteSelId] += 1;

    // On récupère la DIV que l'on veut modifier
    let carteSel = document.querySelector("#" + carteSelId);
    // On ajoute m-à-j le texte sur note page web 
    majCpt(carteSel)

    // On ajoute aussi un bouton si besoin
    let btn = document.querySelector("#" + carte.id + "-btn");
    if  (!btn) {
        let btn_de_reduction = creeBoutonReduction(carte);
        carteSel.appendChild(btn_de_reduction);
    };
};

function majCpt(carteSel){
    /* 
       Crée un paragraphe dans la zone de selection
       de la carte s'il n'existe pas déjà
     */
    cpt = carteSel.querySelector("p");
    if (!cpt) {
        cpt = document.createElement('p');
        carteSel.appendChild(cpt);
    }
    cpt.textContent = selCount[carteSel.id] + " h";
}

function creeBoutonReduction(carte){
    /* 
       Crée un bouton de réducation dans la zone de selection
       de la carte s'il n'existe pas déjà
     */

    btn = document.createElement('button');
    btn.id = carte.id + "-btn";
    btn.classList.add('sel');
    btn.textContent = "-";
    btn.addEventListener('click', reduireH);
    btn.addEventListener('click', majDelaTeam);    
    
    return btn
}

function reduireH(event){
    // Décrémente le nombre d'h de la carte associée au bouton
    let btn = event.currentTarget;  // on récupère le bouton
    let carteSelId = `fr-${btn.id.split("-")[1]}-sel`;  // notation proche de python pour créer une chaine de caractère (attention au back-tick)
    
    let p = document.querySelector(`#${carteSelId}> p`);  // on récupère le p fils de carteSelID

    // On décrémente le nombre de selection 
    if (selCount[carteSelId] > 0){
        selCount[carteSelId] -= 1;
        p.textContent = selCount[carteSelId] + " h";
    }
    event.stopPropagation();  // pour évite que l'évènement clic ne remonte
    
}


/**
* Gestion de la Team
 **/

cartes.forEach((carte) => carte.addEventListener('click', majDelaTeam));

let team = document.querySelector("#team");  // renvoie la section team
/* let teamForm = team.querySelector("form"); */
/* let teamSubmit = teamForm.querySelector("input[type=submit]"); */
let teamSubmit = team.querySelector("button");
teamSubmit.addEventListener("mousedown", peuplerFormulaire);

function peuplerFormulaire(event) {

    // on filtre pour ne garder que les cartes ayant été choisi au moins un fois
    let teamMembers = Object.entries(selCount).filter(ar => ar[1] > 0);
    post("confirmation", teamMembers, method="post");
    // Créons la structure du formulaire avec un select

    // Ajoutons des input hidden pour chaque freelanceur selectionné et avec le nombre d'heures

//    for (let i = 0; i< teamMembers.length; i++){
//	var frSelId = teamMembers[i][0];
//	var frSelVal = teamMembers[i][1];	
	/* var frId = frSelId.split("-").slice(0,2).join("-"); */
//        var input_html = `<input type="hidden" name=${frId}-qt value=${frSelVal}>)`;
//        teamSubmit.insertAdjacentHTML("beforebegin", input_html); // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
//    }
}


function majDelaTeam(event){
    /*
       Récupère les information de la carte qui a été cliquée
       et les ajoute dans le bandeau team
     */

    let target = event.currentTarget;
    let carte = (target.tagName == "DIV") ?  target : document.querySelector(`#${target.id.slice(0,-4)}`);

    
    let frNom = carte.querySelector(".fr-nom");
    let frPrix = carte.querySelector(".fr-prix").textContent.split(" ")[0];
    let frSel = carte.querySelector(".fr-sel p").textContent.split(" ")[0];

    let div_html = `<div id=${carte.id}-tm>
        <p>${frNom.innerHTML}: ${frPrix} x ${frSel}</p>
    </div>`;

    let teamMember = team.querySelector(`#${carte.id}-tm`);
    if (!teamMember){
        team.querySelector("h2").insertAdjacentHTML("afterend", div_html);
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



/** utilitaires **/



/**
 * html 2 dom fragment
 * @param {string} html
 * @returns {object}  renvoie un morceau de DOM.
https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 */
function html2domFrag(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
