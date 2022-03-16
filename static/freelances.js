const cartes = document.querySelectorAll('.cartes > div.carte');

/*
   map est une façon plus claire et succinte de faire un boucle
   Cela résume
   for (let i=0; i<cartes.length; i++){
   var carte = cartes[i];
   carte.addEventListener("mouseover", rendre_interactive)
   }
 */

cartes.forEach(rendre_interactive);

// on ajoute sur chaque carte des events listener
function rendre_interactive(carte) {
    carte.addEventListener('mouseenter', mettre_en_surbrillance);
    carte.addEventListener('mouseleave', supprimer_la_surbrillance);
    carte.addEventListener('click', garder_la_surbrillance);
    /* debugger; */
};

// on définie les fonctions des events listener
// https://developer.mozilla.org/en-US/docs/Web/Events
               
function mettre_en_surbrillance(event){
    let carte = event.currentTarget;
    //    https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    carte.classList.add("souris-entree");
    /* debugger; */
}

function supprimer_la_surbrillance(event){
    let carte = event.currentTarget;    
    carte.classList.remove("souris-entree");
}

function garder_la_surbrillance(event){
    /* debugger; */
}
