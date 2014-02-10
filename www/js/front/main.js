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
	var store = Backend.settings.get("Settings");
	var settings = {
		smallestNumber: store.smallestNumber,
		greatestNumber: store.greatestNumber,
		addition: store.addition,
		subtraction: store.subtraction,
		multiplication: store.multiplication,
		division: store.division
	};
	return settings;
}
function setSettings(){
	var store = Backend.settings.set("Settings", settings);
	
	
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

	/*var theQ ="";
	
	for(var i = 0; i < task.question.length; i++){
	var temp = task.question[i];
	theQ = theQ + temp;
	}
	$("#question-holder").html(theQ);*/

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
		$("#response-popup").popup("open");
	});
	
	
	// TODO doesn't get settings on second click, check why and fix or make this happen on settings page load
	$("#settingsBtn").click(function(){
		var settings = getSettings();
		$('#min').attr('value',settings.smallestNumber);
		$('#max').attr('value',settings.greatestNumber);
		$('#addition').attr('value',settings.addition);
		$('#subtraction').attr('value',settings.subtraction);
		$('#multiplication').attr('value',settings.multiplication);
		$('#division').attr('value',settings.disivion);
		// TODO change the rest of the settings page to what the settings are
	});
	
});
