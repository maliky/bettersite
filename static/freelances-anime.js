// Selectionne toutes les éléments div.carte du document
const cartes = document.querySelectorAll('.cartes > div.carte');

cartes.forEach(rendre_interactive);
/*
   forEach est une façon plus claire et succinte de faire un boucle
   qui résume
   for (let i=0; i<cartes.length; i++){
     ...
   }
 */

// on ajoute sur chaque carte des events listener
function rendre_interactive(carte) {
    /* 
       Voir https://developer.mozilla.org/en-US/docs/Web/Events
       pour les différents types d'évènements 
     */
    carte.addEventListener('mouseenter', mettre_en_surbrillance);
    carte.addEventListener('mouseleave', supprimer_la_surbrillance);

    /* 
       les deux fonctions ci-dessous appellent une fonction lors d'un mousdown et mouseup
       Cependant ces fonctions sont définies "à la volée", avec la notation (x) => f(x)
       par exemple (x) => Maths.pow(x,2)  est la fonction qui à x associe x²
     */
    carte.addEventListener('mousedown', (e) => e.currentTarget.classList.add('anime-bouge') );
    carte.addEventListener('mouseup', (e) => e.currentTarget.classList.remove('anime-bouge') );
};

// On définie les fonctions des events listener
function mettre_en_surbrillance(event){
    /* 
       Ajoute la classe "souris-entree" à l'élément qui est
       à l'origine de l'évènement.
     */

    let carte = event.currentTarget;  // origine de l'évènement

    carte.classList.add("souris-entree");  // ajout de la classe
    // cf. https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
}

function supprimer_la_surbrillance(event){
    /* 
       Supprime la classe "souris-entree" de l'élement qui est
       à l'origine de l'évènement.
    */
    let carte = event.currentTarget;    
    carte.classList.remove("souris-entree");
}
