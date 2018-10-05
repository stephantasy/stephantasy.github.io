/* Stéphane Barthélemy */

var articles = [];  // Tableau des articles

/* ===================== */
/* ===  CARD ARTICLE === */
/* ===================== */

// Affiche les éléments demandés
function afficheContenuPageArticles(filtre){

  // On vide la page
  $("#articlesCard").empty();

  // On change la classe
  $("#articlesCard").addClass("w3-container w3-center w3-margin");

  // On indique ce qui est affiché
  $("#currentDisplay").text("Tous les articles (" + (articles.length - getNombreArticlesVendu()) + " non vendu)");

  // Pas de paramètre
  if (typeof filtre == 'undefined'){

    // On affiche les nouveautés
    var listElements = getElementsArticlesNouveautes();
    $("#articlesCard").append(listElements);    

  }else{    
    // On affiche les articles de la catégorie demandé
    var listElements = getElementsArticles(filtre.id);
    $("#articlesCard").append(listElements);
  }  
}

// Construit et renvoie la liste des articles
function getElementsArticlesNouveautes(){
  var listeCard = document.createElement("div");
  listeCard.setAttribute("class", "w3-container");  

  var tailleArticles = articles.length;  
  for(var i = 0 ; i < tailleArticles ; i++){
    var laCarte = getCardElement(articles[i]);
    if(laCarte != null){
      listeCard.appendChild(getCardElement(articles[i]));
    }
  }
  return listeCard;
}

// Construit et renvoie la liste des articles de la catégorie demandée
function getElementsArticles(categorie){
  var listeCard = document.createElement("div");
  listeCard.setAttribute("class", "w3-container");  

  var tailleArticles = articles.length;  
  for(var i = 0 ; i < tailleArticles ; i++){
    if(articles[i].categorie == categorie || "AllArticles" == categorie){
      var laCarte = getCardElement(articles[i]);
      if(laCarte != null){
        listeCard.appendChild(laCarte);
      }
    }
  }
  return listeCard;
}

// Construit et renvoie un élément Card contenant les informations d'un article
function getCardElement(lArticle){

  // Si l'aticle est vendu, on ne l'affiche pas
  if(lArticle.getVendu() == 1){
    return null;
  }


  // Card : Élément de base contenant toutes les informations
  var laCard = document.createElement("div");
  laCard.setAttribute("data-userid", lArticle.id); 
  laCard.setAttribute("class", "w3-card-4 w3-white zoom card"); 
  laCard.setAttribute("style", "width:260px"); 
  laCard.setAttribute("onClick", "displayArticlePage(this);");
  
  // En-tête de la Card
  var leHeader = document.createElement("div");
  var leHeaderText = document.createElement("h4");
  // Titre
  leHeader.setAttribute("class", "w3-container w3-teal w3-center"); 
  leHeaderText.innerHTML = lArticle.getTitre();

  leHeader.appendChild(leHeaderText);

  // Corps de la Card
  var leCorps = document.createElement("div");
  leCorps.setAttribute("class", "w3-container w3-center"); 
  
  // Image du article
  var lImage = document.createElement("img");  
  lImage.setAttribute("src", "images/" + lArticle.getFirstImage()); 
  lImage.setAttribute("alt", "Image Article"); 
  lImage.setAttribute("class", "w3-margin w3-card-4"); 
  lImage.setAttribute("style", "width:200px");

  // S'il est vendu
  var isVendu = lArticle.getVendu();
  var lImageVendu;
  if(isVendu == 1){
    lImageVendu = document.createElement("img");  
    lImageVendu.setAttribute("src", "images/vendu.png"); 
    lImageVendu.setAttribute("alt", "Image Vendu"); 
    //lImageVendu.setAttribute("class", "image-vendu"); 
    lImageVendu.setAttribute("style", "width:260px; margin-left:-17px;");

    // ON OTE LE CLIC !    
    laCard.setAttribute("onClick", "");
  }

  // Prix
  var lePrix = document.createElement("h6");
  lePrix.innerHTML = (parseFloat(lArticle.getPrix().replace(',','.'))).toFixed(2) + "$";
  
  // Construction
  leCorps.appendChild(lImage);
  if(isVendu == 1){
    leCorps.appendChild(lImageVendu);
  }else{
    leCorps.appendChild(lePrix);
  }
  laCard.appendChild(leHeader);
  laCard.appendChild(leCorps);

  // On renvoie la Card
  return laCard;
}


// Affiche le detail du article
function displayArticlePage(ceArticle){
  
  // On renvoie la page en haut
  window.scrollTo(0, 0);

  // On vide la page
  $("#articlesCard").empty();

  // On change la classe
  $("#articlesCard").removeClass("w3-center");

  // On récupère l'Id
  var id = ceArticle.getAttribute("data-userid");
  
  // Barre de titre
  $("#currentDisplay").text(articles[id].getTitre());

  // Titre
  var leTitre = document.createElement("h1");
  leTitre.innerHTML = articles[id].getTitre() + "<br><br>";
  
  // Photos
  var lesPhotos = document.createElement("div"); 
  lesPhotos.setAttribute("class", "w3-bar");
  var nbImages = articles[id].getImages().length;
  for (var i = 0; i < nbImages ; i++){
    lesPhotos.appendChild(getImageElement(articles[id].getImages()[i], i));
  }
 
  // Desc
  var laDesc = document.createElement("p");
  var descTemp = "<br><b style='text-decoration: underline;'>Description : </b><br><br>" + articles[id].getDesc() + "<br><br>";
  descTemp = descTemp.replace(/\n/g, "<br>");
  laDesc.innerHTML = descTemp;
  
  // Prix
  var lePrixTitre = document.createElement("span");
  lePrixTitre.setAttribute("class", "w3-xlarge");
  lePrixTitre.innerHTML = "<b>Prix : </b>";
  var lePrix = document.createElement("span");
  lePrix.setAttribute("class", "w3-margin w3-padding w3-card-4 w3-xlarge w3-yellow");
  lePrix.innerHTML = articles[id].getPrix() + " $";

  // Bouton retour
  var lIcone = document.createElement("i");
  lIcone.setAttribute("class", "fa fa-arrow-left w3-margin-right");
  var leBoutonTmp = document.createElement("button");
  leBoutonTmp.setAttribute("class", "w3-bar-item w3-hover-theme w3-card-4 w3-button w3-blue");
  leBoutonTmp.setAttribute("onclick", "afficheContenuPageArticles();");
  leBoutonTmp.setAttribute("style", "margin-top:25px;");
  var leBoutonText = document.createTextNode("Retour");
  
  leBoutonTmp.appendChild(lIcone);
  leBoutonTmp.appendChild(leBoutonText);
  var leBouton = document.createElement("p");
  leBouton.appendChild(leBoutonTmp);

  // Montage
  var lArticle = document.createElement("div");
  lArticle.setAttribute("class", "w3-margin"); 
  lArticle.appendChild(leBouton);
  lArticle.appendChild(leTitre);  
  lArticle.appendChild(lesPhotos);
  lArticle.appendChild(laDesc);
  lArticle.appendChild(lePrixTitre);
  lArticle.appendChild(lePrix);
  lArticle.appendChild(leBouton.cloneNode(true));

  // On affiche l'article
  $("#articlesCard").append(lArticle);

}

function getImageElement(imageName, id){

  // Main
  var mainContent = document.createElement("div");
  mainContent.setAttribute("class", "w3-bar-item w3-margin");
  
  // L'image
  var currentImage = document.createElement("img");
  currentImage.setAttribute("src", "images/" + imageName);
  currentImage.setAttribute("alt", imageName);
  currentImage.setAttribute("class", "w3-card-4");
  currentImage.setAttribute("style", "height:250px;cursor:zoom-in;");
  currentImage.setAttribute("onclick", "document.getElementById('imgZoom" + id + "').style.display='block'");

  // Le modal Zoom
  var leModal = document.createElement("div");
  leModal.setAttribute("id", "imgZoom" + id);
  leModal.setAttribute("class", "w3-modal");
  leModal.setAttribute("onclick", "this.style.display='none'");

  // le Zoom
  var leContent = document.createElement("div");
  leContent.setAttribute("class", "w3-modal-content w3-animate-zoom");
 
  // L'image zoomée
  var leContentImg = document.createElement("img");
  leContentImg.setAttribute("src", "images/" + imageName);
  leContentImg.setAttribute("alt", imageName);
  leContentImg.setAttribute("style", "width:100%");
  
  leContent.appendChild(leContentImg);
  leModal.appendChild(leContent);

  mainContent.appendChild(currentImage);
  mainContent.appendChild(leModal);

  return mainContent;
}

/* =========================================== */
/* === TÉLÉCHARGEMENT ET TRAITEMENT DU XML === */
/* =========================================== */
{
  function pageInitializer(){

    // On télécharge le fichier XML
    downloadXmlFile();
  }

  // Téléchargement du fichier de données (XML)
  function downloadXmlFile() {
    $.ajax({
      url: 'data/Articles.xml',
      type: 'GET',
      dataType: 'xml',
      success: function(listeArticles){
        xmlToArray(listeArticles);
        afficheContenuPageArticles();
      },
      error: function(url){ alert('Impossible de télécharger les données. Veuillez essayer plus tard...'); }
    });
  }

  // On charge les données dans le tableau
  function xmlToArray(xmlText) {

    var listeArticle;
    var id, titre, desc, prix, vendu;
    var images = [];
    var nbArticles, nbElements;
    var pos = 0;    // Position dans le tableau

    // On récupère tous les articles
    listeArticle = xmlText.getElementsByTagName("article");

    // Nombre de articles
    nbArticles = listeArticle.length;

    // Nombre d'éléments par article (Tous les articles ont le même nombre d'éléments !)
    nbElements = listeArticle[0].childNodes.length;

    // Récupération des données
    for (var i = 0; i < nbArticles; i++) {

      // On récupère tous les champs 
      id = listeArticle[i].getAttribute("id");
      titre = listeArticle[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
      desc = listeArticle[i].getElementsByTagName("desc")[0].firstChild.nodeValue;
      prix = listeArticle[i].getElementsByTagName("prix")[0].firstChild.nodeValue;      
      vendu = listeArticle[i].getElementsByTagName("vendu")[0].firstChild.nodeValue;
      
      images.length = 0;
      var imagesTemp = listeArticle[i].getElementsByTagName("image");
      var nbImages = imagesTemp.length;
      for (var j = 0; j < nbImages ; j++){ 
        //alert(imagesTemp[j].firstChild.nodeValue);
        images.push(imagesTemp[j].firstChild.nodeValue);
      }

      // On ajoute un article au tableau
      var article = new Article();
      article.Article(
        id,
        titre,
        desc,
        prix,
        images,
        vendu
      );
      articles[pos++] = article;
    }
  }
}

/* ============== */
/* === DIVERS === */
/* ============== */

function getNombreArticlesVendu(){
  var nb = 0;
  for(var item in articles){
    if(articles[item].vendu == 1){
      nb++;
    }
  }
  return nb;
}


