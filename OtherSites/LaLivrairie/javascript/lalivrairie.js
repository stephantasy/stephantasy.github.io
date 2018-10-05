/* Stéphane Barthélemy */


var livres = [];  // Tableau des livres
var panier = [];  // Tableau des articles dans le panier

var coordonnees = {};//{    // Coordonnées de la personne

// Constantes
var TAXE_TPS = 0.09975;
var TAXE_TVQ = 0.05;


/* ===================== */
/* ===  CARD LIVRE   === */
/* ===================== */

// Affiche les éléments demandés
function afficheContenuPageLivres(filtre){

  // On vide la page
  $("#livresCard").empty();;

  // Pas de paramètre
  if (typeof filtre == 'undefined'){

    // On affiche les nouveautés
    var listElements = getElementsLivresNouveautes();
    $("#livresCard").append(listElements);

    // On indique ce qui est affiché
    $("#currentDisplay").text("Les Nouveautés");

  }else{    
    // On affiche les livres de la catégorie demandé
    var listElements = getElementsLivres(filtre.id);
    $("#livresCard").append(listElements);
    
    // On indique ce qui est affiché
    $("#currentDisplay").text(getCategorieTitre(filtre.id));
  }  
}

// Construit et renvoie la liste des livres étant tagués "Nouveauté"
function getElementsLivresNouveautes(){
  var listeCard = document.createElement("div");
  listeCard.setAttribute("class", "w3-container");  

  var tailleLivres = livres.length;  
  for(var i = 0 ; i < tailleLivres ; i++){
    if(livres[i].nouveaute == 1){
      listeCard.appendChild(getCardElement(livres[i]));
    }
  }
  return listeCard;
}

// Construit et renvoie la liste des livres de la catégorie demandée
function getElementsLivres(categorie){
  var listeCard = document.createElement("div");
  listeCard.setAttribute("class", "w3-container");  

  var tailleLivres = livres.length;  
  for(var i = 0 ; i < tailleLivres ; i++){
    if(livres[i].categorie == categorie || "AllLivres" == categorie){
      listeCard.appendChild(getCardElement(livres[i]));
    }
  }
  return listeCard;
}

// Construit et renvoie un élément Card contenant les informations d'un livre
function getCardElement(leLivre){
  // Card : Élément de base contenant toutes les informations
  var laCard = document.createElement("div");
  laCard.setAttribute("data-userid", leLivre.id); 
  laCard.setAttribute("class", "w3-card-4 w3-white zoom card"); 
  laCard.setAttribute("style", "width:250px"); 
  
  // En-tête de la Card
  var leHeader = document.createElement("div");
  var leHeaderText = document.createElement("h4");
  // Est-ce une nouveauté ?
  if(leLivre.nouveaute == 1){
    leHeader.setAttribute("class", "w3-container w3-red w3-center"); 
    leHeaderText.innerHTML = "Nouveauté !";
  }else{
    leHeaderText.innerHTML = "&nbsp";
  }
  leHeader.appendChild(leHeaderText);

  // Corps de la Card
  var leCorps = document.createElement("div");
  leCorps.setAttribute("class", "w3-container w3-center"); 
  
  // Image du livre
  var lImage = document.createElement("img");  
  lImage.setAttribute("src", "images/" + leLivre.image); 
  lImage.setAttribute("alt", "Image Livre"); 
  lImage.setAttribute("class", "w3-card-4"); 
  lImage.setAttribute("style", "height:200px");
  lImage.setAttribute("onClick", "displayLivreDetail(this);");

  // Npm de l'auteur
  var lAuteur = document.createElement("h5");
  lAuteur.innerHTML = leLivre.auteur;
  var lePrix = document.createElement("h6");
  lePrix.innerHTML = (parseFloat(leLivre.prix.replace(',','.'))).toFixed(2) + "$";
  
  // Bouton "Ajouter"
  var leBtnDiv = document.createElement("div");
  leBtnDiv.setAttribute("class", "w3-section"); 
  var leBtn = document.createElement("button");
  leBtn.setAttribute("class", "w3-button w3-green"); 
  leBtn.setAttribute("onClick", "addOneToPanier(this); dipslaySnackbar('Ajouté au panier !');"); 
  leBtn.innerHTML = "Ajouter";
  leBtnDiv.appendChild(leBtn);

  // Construction
  leCorps.appendChild(lImage);
  leCorps.appendChild(lAuteur);
  leCorps.appendChild(lePrix);
  leCorps.appendChild(leBtnDiv);
  laCard.appendChild(leHeader);
  laCard.appendChild(leCorps);

  // On renvoie la Card
  return laCard;
}

// Ajoute l'élément en paramètre au panier
function addOneToPanier(element){
  var id = element.parentElement.parentElement.parentElement.getAttribute("data-userid");
  var found = false;
  var taille = panier.length;

  // On ajoute un élément au panier (s'il existe déjà)
  for(var i = 0 ; i < taille ; i++){
    article = panier[i];
    if(article.id == id){
      // On ajoute
      article.nombre++;
      found = true;
      break;
    }
  }

  // Si on ne l'a pas trouvé, alors on le crée
  if(!found){
    panier.push({
      "id":id,
      "nombre":1
    });
  }

  // On met à jour le bouton Panier
  refreshButtonPanier();
}

// Renvoie le nom de la catégorie correspondant à son code
function getCategorieName(catCode){
  switch(catCode.toLowerCase()){
    case "roman":
      return "Romans";
    case "sciences":
      return "Sciences";
    case "histoire":
      return "Histoire";
    case "bdmanga":
      return "BD et Mangas";
    case "sciencefiction":
      return "Science-Fiction";
    default:
      return "";
  }
}

// Renvoie le titre de la catégorie correspondant à son code
function getCategorieTitre(catCode){
  switch(catCode.toLowerCase()){
    case "roman":
      return "Nos " + getCategorieName(catCode);
    case "sciences":
      return "Nos Livres de " + getCategorieName(catCode);
    case "histoire":
      return "Nos Livres d'" + getCategorieName(catCode);
    case "bdmanga":
      return "Nos " + getCategorieName(catCode);
    case "sciencefiction":
      return "Nos Livres de " + getCategorieName(catCode);
    default:
      return "Tous nos Livres";
  }
}

// On affiche le nombre d'article dans le panier
function refreshButtonPanier(){
  var nbArticle = 0;
  panier.forEach(p => {
    nbArticle += p.nombre;
  });
  $("#panierBadge").text(nbArticle);
}

// Affiche le detail du livre
function displayLivreDetail(ceLivre){
  // On récupère l'Id
  var id = ceLivre.parentElement.parentElement.getAttribute("data-userid");
  
  // On rempli les champs avec les informations du livre choisi
  $("#livreDetailImage").attr("src", "images/" + livres[id].image);
  $("#livreDetailTitre").text(livres[id].titre);
  $("#livreDetailAuteur").text(livres[id].auteur);
  $("#livreDetailDesc").text(livres[id].desc);
  $("#livreDetailCategorie").text(getCategorieName(livres[id].categorie));

  // On affiche la fenêtre
  document.getElementById('livreModal').style.display='block';
}


/* ===================== */
/* ===    PANIER     === */
/* ===================== */

// Affiche le contenu du panier (en le construisant)
function displayPanier(){

  // S'il existe déjà, on le détruit
  $("#panierModal").remove();

  /**********************************************
      Header avec titre + bouton de fermeture
  ***********************************************/
 // Titre
  var titre = document.createElement("h2");
  titre.innerHTML = "Mon Panier";
  
  // Bouton de fermeture
  var boutonFermeture = document.createElement("span");
  boutonFermeture.setAttribute("onClick", "document.getElementById('panierModal').style.display='none'");
  boutonFermeture.setAttribute("class", "w3-button w3-display-topright w3-red w3-round header-close");
  boutonFermeture.innerHTML = "x";
  
  // Header
  var modalHeader = document.createElement("header");
  modalHeader.setAttribute("class", "w3-container w3-teal");
  modalHeader.appendChild(boutonFermeture);
  modalHeader.appendChild(titre);
  
  /**********************************************
      Liste des éléments
  ***********************************************/
  // Liste principale
  var listeUl = document.createElement("ul");
  listeUl.setAttribute("class", "w3-ul");
  
  // Éléments
  var nblements = panier.length;
  if(nblements > 0){
    // On construit chaque élément
    for(var i = 0 ; i < nblements ; i++){    
      var article = panier[i];
        var element = createNewListElement(
          livres[article.id].id,
          livres[article.id].titre, 
          livres[article.id].auteur, 
          livres[article.id].image, 
          livres[article.id].prix, 
          article.nombre);
        listeUl.appendChild(element);
    }
  }else{
    // Panier vide
    var element = getMsgPanierVide();
    listeUl.appendChild(element);
  }

  /**********************************************
      Partie Somme des achats
  ***********************************************/
  var sumZone = document.createElement("div");
  sumZone.setAttribute("class", "w3-container light-teal-bgd w3-card-4");
  sumZone.appendChild(createSumZone());

  /**********************************************
      Footer avec le bouton "Payer" et "Magasiner"
  ***********************************************/ 
  var boutonPayer = document.createElement("button");
  boutonPayer.setAttribute("id", "panierBoutonPayer");
  boutonPayer.setAttribute("class", "w3-button w3-round-large w3-margin w3-white w3-ripple");
  boutonPayer.setAttribute("onClick", "payerPanier();");  
  boutonPayer.innerHTML = "Payer";
  var boutonContinuer = document.createElement("button");
  boutonContinuer.setAttribute("id", "panierBoutonContinuer");
  boutonContinuer.setAttribute("class", "w3-button w3-round-large w3-margin w3-white w3-ripple");
  boutonContinuer.setAttribute("onClick", "document.getElementById('panierModal').style.display='none'");  
  boutonContinuer.innerHTML = "Magasiner";
  var footer = document.createElement("footer");
  footer.setAttribute("class", "w3-center w3-teal");
  footer.appendChild(boutonPayer);
  footer.appendChild(boutonContinuer);


  /**********************************************
      div Modal conteneur
  ***********************************************/
  // Séparateur
  var separator = document.createElement("div");
  separator.setAttribute("class", "line-separator");

  // Div de conteneur
  var divModalContent = document.createElement("div");
  divModalContent.setAttribute("class", "w3-modal-content w3-card-4 w3-animate-top");
  divModalContent.appendChild(modalHeader); // L'entête
  divModalContent.appendChild(listeUl);     // La liste des éléments
  divModalContent.appendChild(separator);   // Séparateur
  divModalContent.appendChild(sumZone);     // Le prix final
  divModalContent.appendChild(footer);      // Bouton Payer

  /**********************************************
      Div principal
  ***********************************************/
  var divMain = document.createElement("div");
  divMain.setAttribute("id", "panierModal");
  divMain.setAttribute("class", "w3-modal");
  divMain.appendChild(divModalContent);

  // Ajout à la page web
  document.getElementById('panier').appendChild(divMain);

  // Affichage
  document.getElementById('panierModal').style.display='block';

  // Total du panier
  refreshSomme();

  // Si le panier est vide, on cache le bouton "Payer", sinon on l'affiche
  displayButtonPayer();
}

// Construit et renvoie un élément de la liste des achats du panier
function createNewListElement(id, titre, auteur, image, prix, qte){
  // L'élément
  var element = document.createElement("li");
  element.setAttribute("data-index", id);
  element.setAttribute("class", "w3-bar");

  // Croix pour supprimer l'élément
  var spanButtonDelete = document.createElement("span");
  spanButtonDelete.setAttribute("class", "w3-bar-item w3-button w3-white w3-xlarge w3-right");
  spanButtonDelete.setAttribute("onClick", "deleteElementPanier(this);");
  spanButtonDelete.innerHTML = "X";
  
  // Zone Image du livre
  var imgLivre = document.createElement("img");
  imgLivre.setAttribute("src", "images/" + image);
  imgLivre.setAttribute("alt", "Image Livre"); 
  imgLivre.setAttribute("class", "w3-bar-item w3-hide-small");
  imgLivre.setAttribute("style", "width:80px");

  // === Zone Titre + auteur ===
  // Titre
  var spanTitre = document.createElement("span");
  spanTitre.setAttribute("class", "w3-large");
  spanTitre.innerHTML = titre;
  // Carriage Return  
  var cr = document.createElement("br");
  // Auteur
  var spanAuteur= document.createElement("span");
  spanAuteur.innerHTML = auteur;
  // Assemblage
  var divTitleAuthor = document.createElement("div");
  divTitleAuthor.setAttribute("class", "w3-bar-item");
  divTitleAuthor.setAttribute("style", "width:45%");
  divTitleAuthor.appendChild(spanTitre);
  divTitleAuthor.appendChild(cr);
  divTitleAuthor.appendChild(spanAuteur);

  // === Zone Ajout/suppression quantité ===
  // Bouton -
  var divMinusButton = document.createElement("button");
  divMinusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divMinusButton.setAttribute("onClick", "removeElementInPanier(this);");
  divMinusButton.innerHTML = "-";
  // Quantité
  var hQte = document.createElement("h4");
  hQte.setAttribute("id", "elQte" + id);
  hQte.setAttribute("class", "w3-section w3-badge w3-white");
  hQte.innerHTML = qte;
  // Bouton +
  var divPlusButton = document.createElement("button");
  divPlusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divPlusButton.setAttribute("onClick", "addElementInPanier(this);");
  divPlusButton.innerHTML = "+";
  // Assemblage
  var divAjustQte = document.createElement("div");
  divAjustQte.setAttribute("class", "w3-bar-item w3-margin-left w3-margin-right");
  divAjustQte.setAttribute("style", "width:20%");
  divAjustQte.appendChild(divMinusButton);
  divAjustQte.appendChild(hQte);
  divAjustQte.appendChild(divPlusButton);

  // Zone prix
  var spanPrice = document.createElement("span");
  spanPrice.setAttribute("class", "w3-large w3-section");
  spanPrice.setAttribute("id", "elPrice" + id);
  spanPrice.innerHTML = (parseFloat(prix.replace(',','.'))*qte).toFixed(2) + "$";
  var divPrice = document.createElement("div");
  divPrice.setAttribute("class", "w3-bar-item w3-right-align");
  divPrice.appendChild(spanPrice);

  // Assemblage de l'élément
  element.appendChild(spanButtonDelete);  // Bouton
  element.appendChild(imgLivre);          // Image
  element.appendChild(divTitleAuthor);    // Titre
  element.appendChild(divAjustQte);       // Qte
  element.appendChild(divPrice);          // Prix

  return element;
}

// Construit et renvoie la zone des montants du panier
function createSumZone(){

  // Sous-Total : label
  var spanSousTotal = document.createElement("span");
  spanSousTotal.setAttribute("class", "w3-bar-item w3-large");
  spanSousTotal.innerHTML = "Sous-total";
  // Sous-Total : signe de Dollar
  var dollarSignSousTotal = document.createElement("span");
  dollarSignSousTotal.setAttribute("class", "w3-bar-item w3-large w3-right dollar-sign");
  dollarSignSousTotal.innerHTML = "$";
  // Sous-Total : prix 
  var spanSousTotalPrix = document.createElement("span");
  spanSousTotalPrix.setAttribute("id", "panierSousTotal");
  spanSousTotalPrix.setAttribute("class", "w3-bar-item w3-large w3-right");
  // Sous-Total
  var divSousTotal = document.createElement("div");
  divSousTotal.setAttribute("class", "w3-bar");
  divSousTotal.appendChild(spanSousTotal);
  divSousTotal.appendChild(dollarSignSousTotal);  // Attention : Mettre avant le prix ! (à cause du w3-right)
  divSousTotal.appendChild(spanSousTotalPrix);

  // Taxes : signe de Dollar
  var dollarSignTaxe = document.createElement("span");
  dollarSignTaxe.setAttribute("class", "w3-bar-item w3-right dollar-sign");
  dollarSignTaxe.innerHTML = "$";

  // Taxes : TPS
  var spanTPS = document.createElement("span");
  spanTPS.setAttribute("class", "w3-bar-item w3-margin-left");
  spanTPS.innerHTML = "TPS :";
  var spanTPSPrix = document.createElement("span");
  spanTPSPrix.setAttribute("id", "panierTPS");
  spanTPSPrix.setAttribute("class", "w3-bar-item w3-right");
  var divTPS= document.createElement("div");
  divTPS.setAttribute("class", "w3-bar");
  divTPS.appendChild(spanTPS);
  divTPS.appendChild(dollarSignTaxe);
  divTPS.appendChild(spanTPSPrix);

  // Taxes : TVQ  
  var spanTVQ = document.createElement("span");
  spanTVQ.setAttribute("class", "w3-bar-item w3-margin-left");
  spanTVQ.innerHTML = "TVQ :";
  var spanTVQPrix = document.createElement("span");
  spanTVQPrix.setAttribute("id", "panierTVQ");
  spanTVQPrix.setAttribute("class", "w3-bar-item w3-right");
  var divTVQ= document.createElement("div");
  divTVQ.setAttribute("class", "w3-bar");
  divTVQ.appendChild(spanTVQ);
  divTVQ.appendChild(dollarSignTaxe.cloneNode(true)); // On le dupplique
  divTVQ.appendChild(spanTVQPrix);

  // Total
  var spanTotal = document.createElement("span");
  spanTotal.setAttribute("class", "w3-bar-item w3-xlarge");
  spanTotal.innerHTML = "TOTAL";
  var dollarSignTotal = document.createElement("span");
  dollarSignTotal.setAttribute("class", "w3-bar-item w3-right w3-xlarge dollar-sign");
  dollarSignTotal.innerHTML = "$";
  var spanTotalPrix = document.createElement("span");
  spanTotalPrix.setAttribute("id", "panierTotal");
  spanTotalPrix.setAttribute("class", "w3-bar-item w3-xlarge w3-right");
  var divTotal = document.createElement("div");
  divTotal.setAttribute("class", "w3-bar");
  divTotal.appendChild(spanTotal);
  divTotal.appendChild(dollarSignTotal);
  divTotal.appendChild(spanTotalPrix);

  // Séparateur  
  var separator = document.createElement("div");
  separator.setAttribute("class", "w3-margin line-separator");

  // Div Card  
  var divCard = document.createElement("div");
  divCard.setAttribute("class", "w3-container w3-margin white-bgd");
  divCard.appendChild(divSousTotal);
  divCard.appendChild(separator);
  divCard.appendChild(divTPS);
  divCard.appendChild(divTVQ);
  divCard.appendChild(separator.cloneNode(true));
  divCard.appendChild(divTotal);

  return divCard;
}

// Décrémente un article du panier avec le bouton [-]
function removeElementInPanier(element){
  var id = element.parentElement.parentElement.getAttribute("data-index");  
  var taille = panier.length;
  var article;
  // On ôte un article du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    article = panier[i];
    if(article.id == id){
      // Seulement s'il en reste au moins 2
      if(article.nombre > 1){
        // On retranche
        article.nombre--;
        
        // On rafraichi le nombre dans l'élément
        $("#elQte" + id).text(article.nombre);

        // On rafraichi le prix dans l'élément
        $("#elPrice" + id).text((parseFloat(livres[article.id].prix.replace(',','.'))*article.nombre).toFixed(2) + "$");

        // On rafraichi le calcul du total
        refreshSomme();
      }
      break;  // Inutile de continuer
    }
  }
  
  // Nb article dans le panier
  refreshButtonPanier();
}

// Incrémente un article du panier avec le bouton [+]
function addElementInPanier(element){
  
  var id = element.parentElement.parentElement.getAttribute("data-index");  
  var taille = panier.length;
  var article;

  // On ôte un article du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    article = panier[i];
    if(article.id == id){
      // On ajoute
      article.nombre++;
        
      // On rafraichi le nombre dans l'élément
      $("#elQte" + id).text(article.nombre);

      // On rafraichi le prix dans l'élément
      $("#elPrice" + id).text((parseFloat(livres[article.id].prix.replace(',','.'))*article.nombre).toFixed(2) + "$");

      // On rafraichi le calcul du total
      refreshSomme();
      
      break;  // Inutile de continuer
    }
  }
  
  // Nb article dans le panier
  refreshButtonPanier();
}

// Supprime un article du panier avec le bouton [X]
function deleteElementPanier(element){

  var id = element.parentElement.getAttribute("data-index");
  var taille = panier.length;

  // On supprime l'élément du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    if(panier[i].id == id){
      panier.splice(i, 1);
      break;  // Inutile de continuer
    }
  }
  // On supprime l'élément du panier (Modal)
  element.parentElement.parentElement.removeChild(element.parentElement);

  // On rafraichi le calcul du total
  refreshSomme();

  // Si le panier est vide, on affiche un message
  if(panier.length < 1){
    $("#panierModal>div>ul").append(getMsgPanierVide());
  }

  // Faut-il toujours afficher le bouton Payer ?
  displayButtonPayer();

  // Nb article dans le panier
  refreshButtonPanier();
}

// Calcul le montant total du panier
function refreshSomme(){
  // Sous total
  var sousTotal = 0;
  for(var p in panier){
    sousTotal += parseFloat(livres[panier[p].id].prix.replace(',','.'))*panier[p].nombre;
  }
  // Taxes
  var tps = sousTotal * TAXE_TPS;
  var tvq = sousTotal * TAXE_TVQ;
  // total
  var total = sousTotal + tps + tvq;
  
  // Affectation
  $("#panierSousTotal").text(sousTotal.toFixed(2));
  $("#panierTPS").text(tps.toFixed(2));
  $("#panierTVQ").text(tvq.toFixed(2));
  $("#panierTotal").text(total.toFixed(2));
}

// Construit et renvoie un élément indiquant que le panier est vide
function getMsgPanierVide(){
  var element = document.createElement("h2");
  element.setAttribute("class", "w3-center w3-padding");
  element.innerHTML = "Votre panier est vide !";
  return element;
}

// Affiche ou non le bouton Payer du panier en fonction du montant total
function displayButtonPayer(){
  var montantTotal = ($("#panierTotal").text());
  if( montantTotal > 0){
    $("#panierBoutonPayer").show();
  }else{
    $("#panierBoutonPayer").hide();
  }
}

// Action sur le bouton Payer du panier
function payerPanier(){
  
  // On cache le panier
  document.getElementById('panierModal').style.display='none';

  // On détruit le contenu du panier (car on va réutiliser la Somme, et on ne veut pas l'avoir 2 fois !)
  $("#panierModal").remove();

  // On affiche la facture
  displayFacture();

  // On vide le panier
  panier.length = 0;
  
  // Nb article dans le panier
  refreshButtonPanier();

  // On affiche que le paiement a été effectué
  dipslaySnackbar("Paiement effectué. Merci !");
}


/* ====================== */
/* ===    FACTURE     === */
/* ====================== */

// Construit et affiche la facture
function displayFacture(){

  // Si elle existe déjà, on la détruit
  $("#factureDetail").empty();
  $("#factureSomme").empty();

  // Titre
  var titre = document.createElement("h2");
  titre.setAttribute("class", "w3-center");
  titre.innerHTML=  "La Livrairie vous remercie !";

  // Si la personne a fournie ses coordonnées, on les affiches (Pas de vérification demandée dans le TP)
  if(coordonnees.nom){
    $("#factureCoord").show();
    $("#factureNom").text("Nom : " + coordonnees.nom);
    $("#facturePrenom").text("Prénom : " + coordonnees.prenom);
    $("#factureAdresse").text("Adresse : " + coordonnees.address);
  }

  // On crée les éléments correspondants aux achats
  for(var p in panier){
    $("#factureDetail").append(createFactureElement(panier[p]));
  }

  // On crée la zone somme
  var somme = createSumZone(); 
  
  // Ajout de la somme
  var list = $("#factureSomme").append(somme);


  // On affiche
  document.getElementById("factureModal").style.display='block';

  // On remplie les montants de la somme
  refreshSomme();
}

// Construit et renvoie un élément de la liste de la facture
function createFactureElement(article){
  // Titre
  var titre = document.createElement("span");
  titre.innerHTML = livres[article.id].titre;

  // Prix total
  var total = document.createElement("span");
  total.setAttribute("class", "w3-right");
  var prixTotal = (parseFloat(livres[article.id].prix.replace(',','.'))*article.nombre).toFixed(2) + "$";
  total.innerHTML = "<b>" + prixTotal + "</b>";

  // Prix unitaire et nombre
  var unitaire = document.createElement("span");
  unitaire.setAttribute("class", "w3-right");
  unitaire.setAttribute("style", "margin-right:100px;");
  unitaire.innerHTML = article.nombre +  " x " + livres[article.id].prix + "$";

  // Élément
  var element = document.createElement("li");
  element.setAttribute("class", "w3-margin");
  element.appendChild(titre);
  element.appendChild(total);
  element.appendChild(unitaire);

  return element;
}

// Imprime la facture (non implémentée pour le TP)
function imprimerFacture(){
  // Impresssion de la facture (Simulation)
  document.getElementById('factureModal').style.display='none';

    // On affiche que le paiement a été effectué
    dipslaySnackbar("Facture imprimée");
}


/* =========================================== */
/* === TÉLÉCHARGEMENT ET TRAITEMENT DU XML === */
/* =========================================== */
{
  function pageInitializer(){
    // Nb article dans le panier
    refreshButtonPanier();

    // On télécharge le fichier XML
    downloadXmlFile();
  }

  // Téléchargement du fichier de données (XML)
  function downloadXmlFile() {
    $.ajax({
      url: 'data/Livres.xml',
      type: 'GET',
      dataType: 'xml',
      success: function(listeLivres){
        xmlToArray(listeLivres);
        afficheContenuPageLivres();
      },
      error: function(url){ alert('Impossible de télécharger les données. Veuillez essayer plus tard...'); }
    });
  }

  // On charge les données dans le tableau
  function xmlToArray(xmlText) {

    var listeLivre;
    var id, titre, auteur, desc, prix, categorie, image, nouveaute;
    var nbLivres, nbElements;
    var pos = 0;    // Position dans le tableau

    // On récupère tous les livres
    listeLivre = xmlText.getElementsByTagName("livre");

    // Nombre de livres
    nbLivres = listeLivre.length;

    // Nombre d'éléments par livre (Tous les livres ont le même nombre d'éléments !)
    nbElements = listeLivre[0].childNodes.length;

    // Récupération des données
    for (var i = 0; i < nbLivres; i++) {

      // On récupère tous les champs 
      id = listeLivre[i].getAttribute("id");
      titre = listeLivre[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
      auteur = listeLivre[i].getElementsByTagName("auteur")[0].firstChild.nodeValue;
      desc = listeLivre[i].getElementsByTagName("desc")[0].firstChild.nodeValue;
      prix = listeLivre[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
      categorie = listeLivre[i].getElementsByTagName("categorie")[0].firstChild.nodeValue;
      image = listeLivre[i].getElementsByTagName("image")[0].firstChild.nodeValue;
      nouveaute = listeLivre[i].getElementsByTagName("nouveaute")[0].firstChild.nodeValue;
      
      // On ajoute un livre au tableau
      var livre = new Livre();
      livre.Livre(
        id,
        titre,
        auteur,
        desc,
        prix,
        categorie,
        image,
        nouveaute,
      );
      livres[pos++] = livre;
    }
  }
}


/* ================== */
/* === FORMULAIRE === */
/* ================== */

// Fonctions JQuery
$(document).ready(function() {
  
  // Validation du formulaire
  var validator = $("#contactModalForm").validate({
    rules: {
      contactFormNom: {
        required: true
      },      
      contactFormPrenom: {
        required: true
      },      
      contactFormAddress: {
        required: true
      },
      contactFormPhone: {
        required: true,
        regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
      }, 
      contactFormEmail: {
        required: true,
        regex: /^(\w+\.)*\w+@(\w+\.)+[A-Za-z]+$/
      }
    },
    messages: {
      contactFormNom: {
        required: "Entrez votre nom"
      },
      contactFormPrenom: {
        required: "Entrez votre prénom"
      },
      contactFormAddress: {
        required: "Entrez votre adresse"
      },
      contactFormPhone: {
        required: "Entrez un numéro de téléphone",
        regex: "Veuillez respecter le format 123-456-7890"
      },
      contactFormEmail: {
        required: "Entrez votre courriel",
        regex: "Veuillez respecter le format pseudo@domaine.ca"
      }
    },
    errorClass: "my-error-class",
    validClass: "my-valid-class"
  });

  // Validation Regex pour le formulaire
  $.validator.addMethod("regex", function(value, element, regexpr) {          
    return regexpr.test(value);
  });
  
  // Envoie du formulaire de contact (Simulation)
  $("#submitButtonContactForm").click(function(){

    // Si le formulaire est bien rempli, on l'envoie !
    if($("#contactModalForm").valid()){
      // On mémorise les informations
      coordonnees.nom = $("#contactFormNom").val();
      coordonnees.prenom = $("#contactFormPrenom").val();
      coordonnees.address = $("#contactFormAddress").val();
      coordonnees.phone = $("#contactFormPhone").val();
      coordonnees.mail = $("#contactFormEmail").val();      

      // On envoi le formulaire
      /*$.ajax({
        type: "POST",
        url: "Path_to_URL",
        data: $("#contactModalForm").serialize(),        
      }).done(function(data){
        // Simulation
        dipslaySnackbar("Formulaire envoyé !");
      });*/

      // Simulation
      dipslaySnackbar("Formulaire envoyé !");

      // Simulation : On cache le formulaire
      $("#contactModal").hide();
    }else{
      validator.focusInvalid();
    }
    return false; // avoid to execute the actual submit of the form.
  });

}); //Fonctions JQuery


/* ============== */
/* === DIVERS === */
/* ============== */

// Affichage de la date et de l'heure dans la page
// Source : https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function displayTime() {
  var today = new Date();
  var d = today.getDate();
  var m = today.getMonth()+1;
  var y = today.getFullYear();
  var h = today.getHours();
  var mm = today.getMinutes();
  var s = today.getSeconds();
  d = checkNumber(d);
  m = checkNumber(m);
  mm = checkNumber(mm);
  s = checkNumber(s);
  document.getElementById('displayTime').innerHTML = d + "/" + m + "/" + y + " " + h + ":" + mm + ":" + s;
  var t = setTimeout(displayTime, 500);
}
function checkNumber(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Apparition de la Snackbar
function dipslaySnackbar(msg) {
  var x = document.getElementById("snackbar");
  x.innerHTML = msg;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

