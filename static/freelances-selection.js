/*
   Attention se fichier est chargé après freelances-anime.js.  Il ne doit pas utiliser les
   même nom de variable global
 */

cartes.forEach((carte) => carte.addEventListener('click', choisiFreelanceur));


// On initialise un objet javascript. Il se comporte (à peu prêt) comme un dictionnaire python
var selCount = {} ; 

for (let i =0 ; i< cartes.length; i++){
    /* Pour chaque carte on crée une entrée dans l'objet selCount
       de la forme 123-sel : 0
       Cet objet contient le nombre de clique sur chaque freelance
     */
    let carteSelId = cartes[i].id + "-sel"
    selCount[carteSelId] = 0;
}
// ouvrir une console et écrire
// console.log(selCount) pour voir le contenu


function choisiFreelanceur(event){
    /*
       Ajoute un compteur et un bouton dans la partie sel de la carte
       ou l'on a cliqué
     */
    let carte = event.currentTarget;
    // crée l'id de la zone que l'on veut modifier
    let carteSelId = carte.id + "-sel";
    // On incrémente le nombre de selection pour cette zone
    selCount[carteSelId] += 1;

    // On récupère la DIV que l'on veut modifier
    let carteSel = document.querySelector("#" + carteSelId);
    // On ajoute m-à-j le texte sur note page web 
    met_a_jour_cpt(carteSel)

    // On ajoute aussi un bouton si besoin
    let btn = document.querySelector("#" + carte.id + "-btn");
    if  (!btn) {
        let btn_de_reduction = cree_bouton_reduction(carte);
        carteSel.appendChild(btn_de_reduction);
    };
};

function met_a_jour_cpt(carteSel){
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

function cree_bouton_reduction(carte){
    /* 
       Crée un bouton de réducation dans la zone de selection
       de la carte s'il n'existe pas déjà
     */

    btn = document.createElement('button');
    btn.id = carte.id + "-btn";
    btn.classList.add('sel');
    btn.textContent = "-";
    btn.addEventListener('click', reduireH);
    
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
