function getRewardData(){
	//TODO define what reward data is
	return {
		lamps: 2,
		canPlay: false
	};
}

function setRewardData(data){
	// TODO do we need this?
}

function getQuestion(){
	return formatQuestion();
}

function guessAnswer(guess){
	if( answerQuestion(guess)  ) {
		return true;
	} else {
		return false;
	}
}

function getSettings(){
	//TODO implement back/Store.js // should be Backend.Store.get("settings")
	var settings = {
		smallestNumber: 10,
		greatestNumber: 50,
		addition: true,
		subtraction: false,
		multiplication: false,
		division: false
	};
	return settings;
}

function setSettings(settings){
	//TODO implement back/Store.js // should be Backend.Store.set("settings")
}

$(document).on('pageshow', function(){
	//plays a click sound
	$(".play-click").click(function(){
		clicksound.playclip();
	});
	//starts playing background music
	$(".play-music").click(function(){
		music.playclip();
	});
	//pauses background music
	$(".stop-music").click(function(){
		music.pause();
	});

	var task = getQuestion();
	$('#question-holder').html(task.question);
	$('.button-container').find('button').each(function(i){
		$(this).html(task.answers[i]);
	});
	
	$(".answer-button").click(function(){
		var answer = $(this).html();
		if( guessAnswer(answer) ){
			$(this).addClass("guessed-answer correct-answer");
		} else {
			$(this).addClass("guessed-answer wrong-answer");
		}
	});
	
	// TODO doesn't get settings on second click, check why and fix or make this happen on settings page load
	$("#settings").click(function(){
		var settings = getSettings();
		$('#min').attr('value',settings.smallestNumber); // for some reason .val() does not work
		console.log(settings.smallestNumber);
		// TODO change the rest of the settings page to what the settings are
	});
	
});
