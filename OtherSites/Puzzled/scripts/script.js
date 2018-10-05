function onOverPiece(event, classId){
	
	switch(classId){
		case "mouse":
			event.target.className = "cadrePieceRouge";
			break;
		case "drag":
			event.target.className = "cadrePieceVert";
			break;
		default:
			event.target.className = "cadrePiece";
	}
}

function dragPieceStart(ev) {					
	ev.dataTransfer.setData("ImageSrc", ev.target.src);
	ev.dataTransfer.setData("ImageId", ev.target.id);				
}

function allowDrop(ev) {
	ev.preventDefault();				
}

function dragPieceInto(ev) {
	ev.preventDefault();

	// On récupère le Path de l'image qu'on drag et son Id
	var pceDraggedSrc = ev.dataTransfer.getData("ImageSrc");
	var pceDraggedId = ev.dataTransfer.getData("ImageId");
	
	// On récupère la source et l'Id de la pièce qu'on veut remplacer
	var pceEmptySrc =  ev.target.src;
	var pceEmptyId =  ev.target.id;
	
	// On s'assure que l'emplacement est bon
	var isGoodPlace = pceEmptyId.toLowerCase().includes(pceDraggedId.toLowerCase());

	
	// On contrôle si c'est un emplacement vide
	var isEmpty = pceEmptySrc.toLowerCase().includes("vide");
		
	// On contrôle si c'est bien une pièce du puzzle qu'on drag,
	// si l'emplacement est le bon 
	// et si l'emplacement est vide
	if(pceDraggedSrc && isEmpty && isGoodPlace){
		
		// et on l'applique à celle survolée
		ev.target.src = pceDraggedSrc;
		ev.target.id = pceDraggedId;
		
		// On récupère l'Id de l'image qu'on drag, puis on la supprime
		var id = ev.dataTransfer.getData("ImageId");
		var pceDragged = document.getElementById(id);
		pceDragged.parentNode.removeChild(pceDragged);		
	}
	
	// Reset class
	ev.target.className = "cadrePiece";
}

// Wait for the page to load first
window.onload = function() {

	//Get a reference to the link on the page
	// with an id of "mylink"
	var home = document.getElementById("home");
	var about = document.getElementById("about");
	var resetBt = document.getElementById("reset");
	var contact = document.getElementById("contact");

	//Set code to run when the link is clicked
	// by assigning a function to "onclick"
	home.onclick = function() {

		window.location.href = "http://www-desi.iro.umontreal.ca/~barthste/PO/PO.html"

		//If you don't want the link to actually 
		// redirect the browser to another page, 
		// then return false at the end of this block.
		// Note that this also prevents event bubbling,
		// which is probably what we want here, but won't 
		// always be the case.
		return false;
	}
	
	about.onclick = function() {
		// Your code here...
		return false;
	}
	
	contact.onclick = function() {
		var nom = prompt("Yo!");
		return false;
	}
	
	resetBt.onclick = function(){
		//location.reload();	// Pour recharger la page, mais un href="" fonctionne aussi...
		return true;
	}
}

