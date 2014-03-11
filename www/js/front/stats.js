function getSign(s){
	switch(s){
		case 1:
			return '+';
		break;
		case 2:
			return '-';
		
		break;
		case 3:
			return '×';
		
		break;
		case 4:
			return '÷';
		
		break;
		case 5:
			return 's';
		
		break;
		default:
			return ' ';
		break;
	}
}
function percentToColor(percent){
	if(percent == -1){
		return "rgb(200,200,200)";
	}
	return "rgb(" + Math.round(255 * (1-percent)) +","+ Math.round(255*percent) + ",0)";
}

function formatStats(stat){
	var rstat = [];
	var nums = [];
	
	for(var i = 0; i < 5; i++){
		nums = [];
		for(var w = 1; w < 11; w++){
			if( typeof(stat[i][w]) !== 'undefined'){
				nums[w] = (stat[i][w]);
			} else {
				nums[w] = -1;
			}
		}
		rstat[i+1] = nums;
	}
	console.log(rstat);
	return rstat;
}

function drawStats(){
	var statArray = formatStats(back.getStats());
	var fill = '';
	var color = '';
	var stats = '';
	for(var cols = 0; cols < 6; cols++){
		stats = stats + '<div class="stats-col">';
		for(var rows = 10; rows > -1; rows--){
			if( rows < 1 ){
				fill = getSign(cols);
			} else {
				fill = '';
			}
			if(cols < 1) {
				if(rows > 0) {
					fill = rows;
				}
			}
			if(cols > 0) {
				if(rows > -1) {
					color = percentToColor(statArray[cols][rows]);
				} else {
					color = '';
				}
			}
			stats = stats + '<div style="background-color: ' + color + '; " class="stats-row">' + fill + "</div>"
		}
		stats = stats + '</div>';
	}
	
	var start = $(".stats-buttons").height();
	
	$('.stats-draw').html(stats);
	$('.stats-draw').parent().height($(window).height() );
	$('.stats-row').height( ( ($(window).height() * 0.9) - start) /10);
	$('.stats-col').width( $('.stats-row').height()).css({"font-size": $('.stats-row').height()/2});
}
