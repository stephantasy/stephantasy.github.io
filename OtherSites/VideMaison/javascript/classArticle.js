/* Stéphane Barthélemy */


// Classe Article
function Article(){
	this.id;
	this.titre;
	this.desc;
	this.prix;
	this.images = [];
	this.vendu;
}

// Constructeurs
Article.prototype.Article=function(id, titre, desc, prix, images, vendu){  
	// Constructeur de copie
	if(arguments[0] instanceof Article){
	  //alert("Constructeur de copie");
	  this.id = arguments[0].id;
	  this.titre = arguments[0].titre;
	  this.desc = arguments[0].desc;
	  this.prix = arguments[0].prix;
	  for (var i=0; i<images.length; i++) {
		this.images[i] = arguments[0].images[i];
	  }
	  this.vendu = arguments[0].vendu;
	}
	// Constructeur paramétré
	else if(arguments.length == 6){
	  //alert("Constructeur paramétré");	  
	  this.id = id;
	  this.titre = titre;
	  this.desc = desc;
	  this.prix = prix;
	  for (var i=0; i<images.length; i++) {
		this.images.push(images[i]);
	  }
	  this.vendu = vendu;
	}
	// Constructeur par défaut (si le nombre d'argument ne correspond pas, on le considère par défaut)
	else {
	  //alert("Constructeur par défaut");
	  this.id = -1;
	  this.titre = "";
	  this.desc = "";
	  this.prix = 0.0;
	  this.images.push("no_image.jpg");
	  this.vendu = "";
	}
}

// Méthodes GET
Article.prototype.getId = function(){
	return this.id;
}
Article.prototype.getTitre = function(){
	return this.titre;
}
Article.prototype.getDesc = function(){
	return this.desc;
}
Article.prototype.getPrix= function(){
	return this.prix;
}
Article.prototype.getFirstImage = function(){
	return this.images[0];
}
Article.prototype.getImages = function(){
	return this.images;
}
Article.prototype.getVendu = function(){
	return this.vendu;
}

// Méthodes diverses
Article.prototype.affiche = function(){
	return this.id + "<br>" + this.titre + "<br>" + this.desc + "<br>" + this.prix + "<br>" + this.images +  "<br>" + this.vendu +  "<br>";
}