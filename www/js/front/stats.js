function drawStats(){
	console.log("hello from drawStats");
	var stats = '';
	
	for(var cols = 0; cols < 5; cols++){
		stats = stats + '<div class="stats-col">';
		for(var rows = 10; rows > 0; rows--){
			stats = stats + '<div class="stats-row">' + rows + "</div>"
		}
		stats = stats + '</div>';
	}
	
	$('.stats-draw').html(stats);
	$('.stats-draw').parent().height($(window).height() );
	$('.stats-row').height($(window).height()/11);
}
