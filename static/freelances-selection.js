/*
   Attention se fichier est chargé après freelances-anime.js.  Il ne doit pas utiliser les
   même nom de variable global
 */
cartes.forEach(rendre_interactive);

var selCount = {} ; // un objet à peu près un dictionnaire

for (let i =0 ; i< cartes.length; i++){
    // initialise notre tableau avec le nombre de selections
    let carteSelId = cartes[i].id + "-sel"
    selCount[carteSelId] = 0
}

// on ajoute sur chaque carte des events listener
function rendre_interactive(carte) {
    /* 
       Voir https://developer.mozilla.org/en-US/docs/Web/Events
       pour les différents types d'évènement 
     */
    carte.addEventListener('click', choisiFreelanceur);
};

// On veut modifier la structure de notre page web avec cette fonction
function choisiFreelanceur(event){
    /*
       Ajoute un compteur et un bouton dans la partie sel de notre carte
     */
    let carte = event.currentTarget;
    let carteSelId = carte.id + "-sel"
    let carteSel = document.querySelector("#" + carteSelId);

    selCount[carteSelId] += 1;
    carteSel.textContent = selCount[carteSelId];
//    debugger;
    
};

