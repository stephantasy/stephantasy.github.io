// Chargement de la page
function onPageLoad(){
	
	// On cache les réalisations
	$('.toggleTheTag').each(function() {
		toogleIt(this);
	});
	
	
}


// Hide/Show the clicked zone
$('.toggleTheTag').on({
    'click': function() {
		toogleIt(this);
    }
});



// Hide/Show the zone
function toogleIt(zone){

	// Which Icon to set?
	var src = ($(zone).find("img").first().attr('src') === 'images/arrowDownIcon.png')
		? 'images/arrowUpIcon.png'
		: 'images/arrowDownIcon.png';
	
	// Change Icon	
	$(zone).find("img").first().attr('src', src);

	// Toggle the zone
	$(zone).parent().find('.TagToToggle').first().toggle();
}