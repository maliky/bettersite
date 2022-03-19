cartes.forEach((carte) => carte.addEventListener('click', ajoute_ala_team));


let team = document.querySelector("#team");  // renvois la section team
let bnt_team = team.querySelector("button");


function ajoute_ala_team(event){
    /*
       Récupère les information de la carte qui a été cliquée
       et les ajoute à un tableau dans le bandeau team
     */

    let carte = event.currentTarget;
    let frNom = carte.querySelector(".fr-nom");

    let teamMember = team.querySelector(`#tm-${carte.id}`);
    if (!teamMember){
        var div_html =`<div id=tm-${carte.id}><p>${frNom.innerHTML}</p></div>`;
        /* var dom= (new DOMParser()).parseFromString(div_html, "text/html"); */
        bnt_team.insertAdjacentHTML("beforebegin", div_html);
    }

}
