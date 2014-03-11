<<<<<<< HEAD
=======
	var testStats = back.getStats();
	for(var cols = 0; cols < 4; cols++){
		stats = stats + '<div class="stats-col">';
		for(var rows = 10; rows > 0; rows--){
			//gray if undefined
			if(testStats[cols][rows]==undefined){
				stats = stats + '<div class="stats-row"style="background-color:#cccccc; text-align:center">' + rows +": "+ testStats[cols][rows] + "</div>"
			}
			//green if above 0.666666666% corect
			else if (testStats[cols][rows]>=0.666666666){
				stats = stats + '<div class="stats-row"style="background-color:#00ff00; text-align:center">' + rows +": "+ testStats[cols][rows] + "</div>"
			}
			//yellow if above 0.33333333% corect
			else if (testStats[cols][rows]>=0.33333333){
				stats = stats + '<div class="stats-row"style="background-color:#ffff00; text-align:center">' + rows +": "+ testStats[cols][rows] + "</div>"
			}
			//red if below 0.33333333% corect
			else {
				stats = stats + '<div class="stats-row"style="background-color:#ff0000; text-align:center">' + rows +": "+ testStats[cols][rows] + "</div>"
			}
		}
		if(cols==0){
			stats = stats +'<div class="stats-row"style="background-color:#cccccc; text-align:center">' +"+"+ "</div>"
		}
		else if(cols==1){
			stats = stats +'<div class="stats-row"style="background-color:#cccccc; text-align:center">' +"-"+ "</div>"
		}
		else if(cols==2){
			stats = stats +'<div class="stats-row"style="background-color:#cccccc; text-align:center">' +"/"+ "</div>"
		}
		else{
			stats = stats +'<div class="stats-row"style="background-color:#cccccc; text-align:center">' +"*"+ "</div>"
>>>>>>> ae5f20b305258c37fc9abe748ca36c49234cc830
