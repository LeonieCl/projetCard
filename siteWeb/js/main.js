//afficher le menu ajouter colonne/card
function afficher(){
    mB.style.display = "block";
    aff.style.display="none";
}

//enlever le menu ajouter colonne/card
function enlever(){
    mB.style.display = "none";
    aff.style.display="block";
}

//creer une nouvelle carte
function creer(){

    //Recuperation de la colonne
    let selectElmt = document.getElementById("numColonne");
    let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    //Recuperation du titre
    let titreRecup = document.getElementById("titreNouvelleCard").value;
    //Recuperation de la couleur choisie
    let selectElmtColor = document.getElementById("colorCard");
    let valeurselectionneeColor = selectElmtColor.options[selectElmtColor.selectedIndex].value;
    if(valeurselectionnee == "default" || titreRecup == ""){

        let msgCreer = "Veuiller sélectionner une colonne et inscrire un titre."
        alert(msgCreer);

    }else{
        

        //Compte le nombre d'enfant qui sont présents dans le parent
        let colonne = document.getElementById(valeurselectionnee);
        let counter = 0;
        if(colonne.childNodes !== null){
            let nb = colonne.childNodes;
            let res = nb.forEach(node => {
                if(node.nodeName !== "#text"){
                    counter ++;
                }
                });
        }else{
            counter = 1;
        }

        let divContent = document.createElement("div");
        divContent.setAttribute("class","card mt-4");
        divContent.setAttribute("id",valeurselectionnee+"Card"+(counter+1));
        divContent.setAttribute("draggable","true");

        let titreCard = document.createElement("input");
        titreCard.setAttribute("class","modifier p-3");
        titreCard.setAttribute("type","text");
        titreCard.setAttribute("id",valeurselectionnee+"TitreCard"+(counter+1));
        titreCard.setAttribute("name","titre");
        titreCard.setAttribute("value","");
        titreCard.setAttribute("placeholder",titreRecup);
        titreCard.setAttribute("disabled","");
        titreCard.appendChild(document.createTextNode(titreRecup));

        let divBody = document.createElement("div");
        divBody.setAttribute("class","card-body");
        divBody.setAttribute("id",valeurselectionnee+"cardBody"+(counter+1));

        let descriptionRecup = document.getElementById("descriptionNouvelleCard").value;

        let pCard = document.createElement("p");
        pCard.setAttribute("id","pDescription");

        let descriptionCard = document.createElement("textArea");
        console.log(valeurselectionneeColor);
        if(valeurselectionneeColor==="warning"  || valeurselectionneeColor==="white"){
            descriptionCard.setAttribute("class","modifier w-100 p-0 text-white bg-"+valeurselectionneeColor+" text-black");
            descriptionCard.setAttribute("id",valeurselectionnee+"Description"+(counter+1));
            descriptionCard.setAttribute("placeholder",descriptionRecup);
            descriptionCard.setAttribute("disabled","");
        }else if (valeurselectionneeColor == "default"){
            descriptionCard.setAttribute("class","modifier w-100 p-0 text-white bg-white text-white");
            descriptionCard.setAttribute("id",valeurselectionnee+"Description"+(counter+1));
            descriptionCard.setAttribute("placeholder",descriptionRecup);
            descriptionCard.setAttribute("disabled","");
        }else{
            descriptionCard.setAttribute("class","modifier w-100 p-0 text-white bg-"+valeurselectionneeColor+" text-white");
            descriptionCard.setAttribute("id",valeurselectionnee+"Description"+(counter+1));
            descriptionCard.setAttribute("placeholder",descriptionRecup);
            descriptionCard.setAttribute("disabled","");
        }

        let bouttonModifier = document.createElement("button");
        bouttonModifier.setAttribute("type","button");
        bouttonModifier.setAttribute("id",valeurselectionnee+"BouttonModifier"+(counter+1));
        bouttonModifier.setAttribute("class","btn btn-dark");
        bouttonModifier.appendChild(document.createTextNode("Modifier"));

        let bouttonSupprimer = document.createElement("button");
        bouttonSupprimer.setAttribute("type","button");
        bouttonSupprimer.setAttribute("class","btn btn-danger");
        bouttonSupprimer.appendChild(document.createTextNode("X"));

        let divParent = document.getElementById(valeurselectionnee);

        divParent.appendChild(divContent);
        divContent.appendChild(titreCard);
        divContent.appendChild(divBody);
        divBody.appendChild(pCard);
        pCard.appendChild(descriptionCard);
        divBody.appendChild(bouttonModifier);
        divBody.appendChild(bouttonSupprimer);

        // buttonSupprimer.onclick = modifier();
        // buttonModifier.onclick = supprimer(document.getElementById(valeurselectionnee+"card"+(counter+1)), false);
        let numCard = valeurselectionnee+"BouttonModifier"+(counter+1);
        console.log(numCard, valeurselectionnee, counter);
        bouttonModifier.addEventListener("click",function() {modifier(numCard, valeurselectionnee, (counter+1))}, false);
        bouttonSupprimer.addEventListener("click", function () {supprimer(valeurselectionnee+"Card"+(counter+1))}, false);
        // console.log(valeurselectionnee+"card"+(counter+1));
    }
}

function supprimer(card){
    let cardSuppr = document.getElementById(arguments[0]);
    cardSuppr.remove();
}

function supprimerColonne(){
    
    //Recuperation de le colonne depuis le select
    let selectElmt = document.getElementById("supprColonne");
    console.log(selectElmt);
    let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    console.log(valeurselectionnee);
    if(valeurselectionnee == "Sélectionner une colonne"){
        let msg = "Veuillez sélectionner une colonne à supprimer."
        alert(msg);
    }else{
        let colonneSuppr = document.getElementById(valeurselectionnee);
        colonneSuppr.remove();
    }
}

function modifierColonne(){
    
    //Recuperation du nouveau titre 
    let titreRecup = document.getElementById("titreModifier").value;

    let selectElmt = document.getElementById("selectModifier");
    let valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;

    if(valeurselectionnee == "Sélectionner une colonne" || titreRecup == ""){
        let msg = "Veuillez sélectionner une colonne à modifier et/ou inscrire un nouveau titre."
        alert(msg);
    }else{
            document.getElementById(valeurselectionnee).textContent = titreRecup;
        
    }

}


function ajouterColonne(colonne){
    let titre = document.getElementById("titre").value;
    divParent = arguments[0];

    if(titre !== ""){

        //Recuperation des nombres de colonnes existantes à partir du select 
        let nbColonne = document.getElementById("numColonne");
        let nbRecuperes = (nbColonne.getElementsByTagName('option').length)-1;

        let divContent = document.createElement("div");
        divContent.setAttribute("id","container"+(nbRecuperes+1));
        divContent.setAttribute("class","d-inline-flex col-lg-2 p-2 shadow-lg mt-5 mb-5 rounded");

        let divAlignement = document.createElement("div");
        divAlignement.setAttribute("class","col-sm-12 p-0");

        let titreColonne = document.createElement("h2");
        titreColonne.setAttribute("class","titre mt-2");
        titreColonne.appendChild(document.createTextNode(titre));

        let divTrait = document.createElement("div");
        divTrait.setAttribute("class","trait");

        let divNumCards = document.createElement("div");
        divNumCards.setAttribute("id","col"+(nbRecuperes+1));

        divParent.appendChild(divContent);
        divContent.appendChild(divAlignement);
        divAlignement.appendChild(titreColonne);
        divAlignement.appendChild(divTrait);
        divAlignement.appendChild(divNumCards);

        //Ajout de la nouvelle colonne dans la sélection 

        let option = document.createElement("option");
        option.setAttribute("value","col"+(nbRecuperes+1));

        let optionSuppr = document.createElement("option");
        optionSuppr.setAttribute("value","container"+(nbRecuperes+1));

        let optionModifier = document.createElement("option");
        optionModifier.setAttribute("value","titreCol"+(nbRecuperes+1));

        let selection = document.getElementById("numColonne");
        selection.appendChild(option);
        option.appendChild(document.createTextNode(titre));

        let selectionSuppr = document.getElementById("supprColonne");
        selectionSuppr.appendChild(optionSuppr);
        optionSuppr.appendChild(document.createTextNode(titre));

        let selectionModi = document.getElementById("selectModifier");
        selectionModi.appendChild(optionModifier);
        optionModifier.appendChild(document.createTextNode(titre));
    }else{
        let msgColonne = "Veuillez inscrire un titre de colonne."
        alert(msgColonne);
    }

}

function modifier(idBoutton,numCol,counter){

    let bouttonEnregistrer = document.getElementById(arguments[0]);
    //Création boutton couleur:
    let bouttonColor = document.createElement("select");
    bouttonColor.setAttribute("id","modifierColor");
    let optionDefault = document.createElement("option");
    optionDefault.setAttribute("value","default");
    let optionBlanc = document.createElement("option");
    optionBlanc.setAttribute("value","white");
    let optionGris = document.createElement("option");
    optionGris.setAttribute("value","secondary");
    let optionBleu = document.createElement("option");
    optionBleu.setAttribute("value","primary");
    let optionVert = document.createElement("option");
    optionVert.setAttribute("value","success");
    let optionRouge = document.createElement("option");
    optionRouge.setAttribute("value","danger");
    let optionJaune = document.createElement("option");
    optionJaune.setAttribute("value","warning");

    //Creation du conteneur p pour avoir les parametres boostrap sur les cards
    let pConteneur = document.createElement("p");
    pConteneur.setAttribute("id","pConteneur"+counter);
    //Pour récupérer la couleur du sélecteur
    let colorSelectionnee = "";
    let parentColor = document.getElementById(arguments[1]+"cardBody"+counter);
    if(bouttonEnregistrer.innerHTML == "Modifier"){

        //Modifier le boutton "Modifier" et passer le p en input pour modification 
        bouttonEnregistrer.textContent = "Enregistrer";
        document.getElementById(arguments[1]+"TitreCard"+counter).disabled = false;
        document.getElementById(arguments[1]+"Description"+counter).disabled = false;
        //Recherche du parent de la carte
        console.log(parentColor);
        parentColor.insertBefore(pConteneur, bouttonEnregistrer);
        
        pConteneur.appendChild(bouttonColor);
        bouttonColor.appendChild(optionDefault);
        optionDefault.appendChild(document.createTextNode("Choisir une couleur"));
        bouttonColor.appendChild(optionGris);
        optionBlanc.appendChild(document.createTextNode("Blanc"));
        bouttonColor.appendChild(optionBlanc);
        optionGris.appendChild(document.createTextNode("Gris"));
        bouttonColor.appendChild(optionBleu);
        optionBleu.appendChild(document.createTextNode("Bleu"));
        bouttonColor.appendChild(optionVert);
        optionVert.appendChild(document.createTextNode("Vert"));
        bouttonColor.appendChild(optionRouge);
        optionRouge.appendChild(document.createTextNode("Rouge"));
        bouttonColor.appendChild(optionJaune);
        optionJaune.appendChild(document.createTextNode("Jaune"));

        document.getElementById(arguments[1]+"Description"+counter).setAttribute("class","modifier w-100 bg-white");

        

    }else if (bouttonEnregistrer.innerHTML == "Enregistrer"){

        //Modifier le boutton "Enregistrer" et passer les input en p pour modification 
        bouttonEnregistrer.textContent = "Modifier";

        let selectElmtColor = document.getElementById("modifierColor");
        colorSelectionnee = selectElmtColor.options[selectElmtColor.selectedIndex].value;
        console.log(colorSelectionnee);
        if(colorSelectionnee == "default"){
            //ne rien faire
        }else if(colorSelectionnee == "warning" || colorSelectionnee == "white"){
            document.getElementById(numCol+"Description"+counter).setAttribute("class","modifier w-100 bg-"+colorSelectionnee);
        }else{
            document.getElementById(numCol+"Description"+counter).setAttribute("class","modifier w-100 bg-"+colorSelectionnee+" text-white");
        }
        console.log(document.getElementById(numCol+"Description"+counter));
        document.getElementById(numCol+"TitreCard"+counter).disabled = true;
        document.getElementById(numCol+"Description"+counter).disabled = true;
        let pConteneurSuppr = document.getElementById("pConteneur"+counter)
        parentColor.removeChild(pConteneurSuppr);
        
    }

}


// function allowDrop(ev) {
//     ev.preventDefault();
//     console.log("AllowDrop");
//     console.log(ev.preventDefault());
// }


// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     console.log("Drop");
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("text");
//     let conteneur = document.getElementById("col2");
//     if(conteneur.className == "conteneur"){
//         ev.target.appendChild(document.getElementById(data));
//     }
//     console.log(ev.dataTransfer);
// }
