const cartes = document.querySelectorAll('.cartes > div.carte');

cartes.forEach(rendre_interactive);
/*
   forEach est une façon plus claire et succinte de faire un boucle
   Cela résume
   for (let i=0; i<cartes.length; i++){
   var carte = cartes[i];
   carte.addEventListener("mouseover", rendre_interactive)
   }
 */


// on ajoute sur chaque carte des events listener
function rendre_interactive(carte) {
    /* 
       Voir https://developer.mozilla.org/en-US/docs/Web/Events
       pour les différents types d'évènement 
     */
    carte.addEventListener('mouseenter', mettre_en_surbrillance);
    carte.addEventListener('mouseleave', supprimer_la_surbrillance);

    /* les deux fonctions ci-dessous appelle aussi une fonction lors d'évènements
     mais cette fonction est définie à la volé.
     par exemple (x) => Maths.pow(x,2)  est la fonction qui prend x et renvoi sont carré.
    */
    carte.addEventListener('mousedown', (e) => e.currentTarget.classList.add('anime-bouge') );
    carte.addEventListener('mouseup', (e) => e.currentTarget.classList.remove('anime-bouge') );

};

// On définie les fonctions des events listener
function mettre_en_surbrillance(event){
    /* Ajouter la classe "souris-entree" à l'élément
       à l'origine de l'évènement
       Voir  https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
       pour le détail de classList
     */
    let carte = event.currentTarget;
    carte.classList.add("souris-entree");
}

function supprimer_la_surbrillance(event){
    /* Supprime la classe "souris-entree" de l'élement
    à l'origine de l'évènement
    */
    let carte = event.currentTarget;    
    carte.classList.remove("souris-entree");
}


