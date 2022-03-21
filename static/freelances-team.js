cartes.forEach((carte) => carte.addEventListener('click', maj_dela_team));


let team = document.querySelector("#team");  // renvoie la section team
let teamBnt = team.querySelector("button")
teamBnt.addEventListener('click', creeEtEnvoieFormulaire);


function maj_dela_team(event){
    /*
       Récupère les informations de la carte qui a été cliqué
       et les ajoute dans le bandeau team
     */

    let carte = event.currentTarget;
    let frNom = carte.querySelector(".fr-nom");
    let frPrix = carte.querySelector(".fr-prix").textContent.split(" ")[0];
    let frSel = carte.querySelector(".fr-sel p").textContent.split(" ")[0];

    let teamMember = team.querySelector(`#tm-${carte.id}`);

    let innerDiv = `<p>${frNom.innerHTML}: ${frPrix} x ${frSel}</p>` 
    if (!teamMember){
        teamBnt.insertAdjacentHTML("beforebegin", `<div id=tm-${carte.id}>${innerDiv}</div>`);
    } else {
        teamMember.innerHTML = innerDiv
    }

}


