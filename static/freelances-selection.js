/*
 On selectionne tout les élèments du DOM (de l'arbre de balise html) à l'aide
d'un selecteur css
*/
const cartes = document.querySelectorAll('.cartes > div.carte');

cartes.forEach(rendre_interactive);

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
    let carte = event.currentTarget()
    
};

