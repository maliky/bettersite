/*
   Attention se fichier est chargé après freelances-anime.js.  Il ne doit pas utiliser les mêmes noms de variables globales.

C'est pourquoi nous ne redéclarons pas 'cartes' ci-dessous
 */
cartes.forEach((carte) => carte.addEventListener('click', choisiFreeLanceur));


// On initialise un objet JavaScript  'selCount'. Il se comporte (à peu prêt) comme un dictionnaire python
// Il contiendra l'identifiant d'un freelanceur et le nombre d'heures que l'on souhaite lui donner.
const selCount = {} ; 

for (let i =0 ; i< cartes.length; i++){
    /* Pour chaque carte on crée une entrée dans l'objet selCount
       de la forme '12345 id-sel : un-nombre'
       Cet objet contient le nombre de cliques pour chaque freelanceurs
     */
    let carteSelId = cartes[i].id + "-sel";
    selCount[carteSelId] = 0;
}
// ouvrir une console et écrire
// console.log(selCount) pour voir le contenu

// la fonction associé à l'évènement click sur une carte
function choisiFreeLanceur(event){
    /*
       Ajoute un compteur et un bouton dans la div.fr-sel de la carte
       où l'on a cliqué
     */
    
    let carte = event.currentTarget;
    // crée l'id de la zone que l'on veut modifier
    let carteSelId = carte.id + "-sel";
    // On incrémente le nombre de selection de la carte
    selCount[carteSelId] += 1;

    // On récupère la DIV que l'on veut modifier
    let carteSel = document.querySelector("#" + carteSelId);
    // On ajoute ou m-à-j le texte sur note page web 
    majCpt(carteSel)

    // On ajoute aussi un bouton s'il n'exite pas
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
       Crée un bouton de réduction dans la zone de selection
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
    /*
       Réduit le nombre d'heure
     */

    let btn = event.currentTarget;  // on récupère le bouton
    let carteSelId = `fr-${btn.id.split("-")[1]}-sel`;
    // ci-dessus notation proche de python pour créer une chaine de caractère (attention aux back-tick ` != ' != " )
    
    let p = document.querySelector(`#${carteSelId}> p`);
    // On récupère le fils p de div#carteSelID

    // On réduit le nombre de sélection 
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

/*** Gestion du bouton ***/

let teamButton = team.querySelector("button");
teamButton.addEventListener("mousedown", peuplerFormulaire);

function peuplerFormulaire(event) {
    /*
https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit?noredirect=1&lq=1
*/

    // on filtre pour ne garder que les cartes ayant été choisies au moins une fois
    let teamMembers = Object.entries(selCount).filter(ar => ar[1] > 0);

    // On crée un formulaire avec les teamMembers
    const form = document.createElement('form');
    form.method = "post";
    form.action = "confirmation";
    for (const tmId in teamMembers) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = tmId;
        hiddenField.value = teamMembers[tmId];
        form.appendChild(hiddenField);
    }

    // on ajoute le formulaire à notre page et on le soumet
    document.body.appendChild(form);
    form.submit();
}


