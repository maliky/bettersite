const cartes = document.querySelectorAll('.carte');

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
    carte.addEventListener('mouseover', mettre_en_surbrillance);
    carte.addEventListener('mouseout', supprimer_la_surbrillance);
    carte.addEventListener('click', garder_la_surbrillance);
    debugger;
};

// on définie les fonctions des events listener
// https://developer.mozilla.org/en-US/docs/Web/Events
               
function mettre_en_surbrillance(obj){
                   debugger;
}

function supprimer_la_surbrillance(obj){
    debugger;
}

function garder_la_surbrillance(obj){
    debugger;
}
