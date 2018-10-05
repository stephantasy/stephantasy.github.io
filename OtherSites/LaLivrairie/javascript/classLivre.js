/* Stéphane Barthélemy */

// Classe Livre
function Livre(){
	this.id;
	this.titre;
	this.auteur;
	this.desc;
	this.prix;
	this.categorie;
	this.image;
	this.nouveaute;
}

// Constructeurs
Livre.prototype.Livre=function(id, titre, auteur, desc, prix, categorie, image, nouveaute){  
	// Constructeur de copie
	if(arguments[0] instanceof Livre){
	  //alert("Constructeur de copie");
	  this.id = arguments[0].id;
	  this.titre = arguments[0].titre;
	  this.auteur = arguments[0].auteur;
	  this.desc = arguments[0].desc;
	  this.prix = arguments[0].prix;
	  this.categorie = arguments[0].categorie;
	  this.image = arguments[0].image;
	  this.nouveaute = arguments[0].nouveaute;
	}
	// Constructeur paramétré
	else if(arguments.length == 8){
	  //alert("Constructeur paramétré");	  
	  this.id = id;
	  this.titre = titre;
	  this.auteur = auteur;
	  this.desc = desc;
	  this.prix = prix;
	  this.categorie = categorie;
	  this.image = image;
	  this.nouveaute = nouveaute;
	}
	// Constructeur par défaut (si le nombre d'argument ne correspond pas, on le considère par défaut)
	else {
	  //alert("Constructeur par défaut");
	  this.id = -1;
	  this.titre = "";
	  this.auteur = "";
	  this.desc = "";
	  this.prix = 0.0;
	  this.categorie = "";
	  this.image = "";
	  this.nouveaute = false;
	}
}

// Méthodes GET
Livre.prototype.getId = function(){
	return this.id;
}
Livre.prototype.getTitre = function(){
	return this.titre;
}
Livre.prototype.getAuteur = function(){
	return this.auteur;
}
Livre.prototype.getDesc = function(){
	return this.desc;
}
Livre.prototype.getPrix= function(){
	return this.prix;
}
Livre.prototype.getCategorie = function(){
	return this.categorie;
}
Livre.prototype.getImage = function(){
	return this.image;
}
Livre.prototype.getNouveaute = function(){
	return this.nouveaute;
}

// Méthodes SET
Livre.prototype.setId = function(id){
	this.id = id;
}
Livre.prototype.setTitre = function(titre){
	this.titre = titre;
}
Livre.prototype.setAuteur = function(auteur){
	this.auteur = auteur;
}
Livre.prototype.setDesc = function(desc){
	this.desc = desc;
}
Livre.prototype.setPrix= function(prix){
	this.prix = prix;
}
Livre.prototype.setCategorie = function(categorie){
	this.categorie = categorie;
}
Livre.prototype.setImage = function(image){
	this.image = image;
}
Livre.prototype.setNouveaute = function(nouveaute){
	this.nouveaute = nouveaute;
}

// Méthodes diverses
Livre.prototype.affiche = function(){
	return this.id + "<br>" + this.titre + "<br>" +  this.auteur + "<br>" + this.desc + "<br>" + this.prix + "<br>" + this.categorie + "<br>" + this.image + "<br>" + this.nouveaute + "<br>";
}