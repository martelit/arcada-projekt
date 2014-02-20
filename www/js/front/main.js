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

function getLamp(){
	return back.getLampSize();
}

function getSettings(){
	/*
	var store = Backend.settings.get("Settings");
	var settings = {
		smallestNumber: store.smallestNumber,
		greatestNumber: store.greatestNumber,
		addition: store.addition,
		subtraction: store.subtraction,
		multiplication: store.multiplication,
		division: store.division,
		symbols: store.symbols,
		bonus: store.bonus
	};
	*/
	//return back.store.get("snille"); ..or
	//return back.getSettings();
	return back.store.get("settings");
}

function setSettings(){
	//var store = Backend.settings.set("Settings", settings);
	//TODO implement back/Store.js // should be Backend.Store.get("settings")

	/*var settings {
		minNumber: 10,
		maxNumber: 50,
		addition: true,
		subtraction: false,
		multiplication: false,
		division: false,
		symbols: false,
		questionsBeforeBonus: 7
		};*/
		
	var settings = {
		minNumber: parseInt($('#min').val()),
		maxNumber: parseInt($('#max').val()),
		addition: $('#addition').is(':checked'),
		subtraction: $('#subtraction').is(':checked'),
		multiplication: $('#multiplication').is(':checked'),
		division: $('#division').is(':checked'),
		symbols: $('#symbols').is(':checked'),
		questionsBeforeBonus: parseInt($('#bonus').val())	
		};
	
	console.log(settings);
	
	back.store.set("settings", settings);
}

function notifyCallback(){

}

function drawStatistics(){
	if($.mobile.activePage.attr('id') == 'statistics'){
		drawStats();
	}
}

$(document).on('pageshow', function(){
	drawStatistics();
	if(isPhoneGap()){
		console.log("is phonegap");
		navigator.notification.alert(
			"is phoegap",
			notifyCallback,
			"title",
			"Button text"
		);
	}
	else {
		console.log("Not phonegap");
	}
	
$( "#save" ).click(function () {
	setSettings();
	//$.mobile.changePage("");
});	

//Starts and stops music
$( ".flip-music" ).change(function () {
	if(this.value=="on")
	{
		musicOld.play();
		//playMusic();
	}
	else
	{
		musicOld.pause();
		//pauseMusic();
	}
});
			
	var Sound;
	
$( ".flip-sound" ).change(function () {
	if(this.value=="on")
	{
		Sound=true;
	}
	else
	{
		Sound=false;
	}
});

	//plays a click sound
$(".play-click").click(function(){
	if(Sound)
	{
		play("click");
	}
	else
	{
		
	}
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

	var displayQuestion = task.question;
$(".answer-button").click(function(){
	//problem, always sets 2 questions_answered when one is answered? -Bogezu
	//getAnswer is called twice. once here, once in helper. -Neko
	console.log("total questions:"+back.questions_answered);
	console.log("bonus available: "+back.bonusIsAvailable());
	var answer = $(this).html();
	var correctAnswer = back.getAnswer();
		if( guessAnswer(answer) ){
			$(this).addClass("guessed-answer correct-answer");
			//$("#correct-wrong").text("Du svarade rätt!");
			//$("#correct-answer-number").text(answer);
			
			$(".wrong-answer-icon").hide();
			$(".right-answer-icon").show();
	
			displayQuestion=displayQuestion.toString();
			displayQuestion = displayQuestion.replace(",", " ");
			displayQuestion = displayQuestion.replace(",", " ");
			$("#correct-answer-number").text(displayQuestion +" = "+ correctAnswer);
		}
		else
		{
			$(this).addClass("guessed-answer wrong-answer");
			//$("#correct-wrong").text("Du svarade fel.");
			//$("#correct-answer-number").text(correctAnswer);
								
			$(".right-answer-icon").hide();
			$(".wrong-answer-icon").show();
			
			displayQuestion=displayQuestion.toString();
			displayQuestion = displayQuestion.replace(",", " ");
			displayQuestion = displayQuestion.replace(",", " ");
			$("#correct-answer-number").text(displayQuestion +" = "+ correctAnswer);
		}
	$("#response-popup").popup("open");
});
	
$(".next-button").click(function(){		
	var nextTask = getQuestion();		
	displayQuestion = nextTask.question;
	$('#question-holder').html(nextTask.question);
		$('.button-container').find('button').each(function(i){
			$(this).html(nextTask.answers[i]);
		});
	$("#response-popup").popup("close");
});

var bonusGame = false;
$(".bonus-button").click(function(){
		if(back.bonusIsAvailable() == true){
			//start bonus game
			$.mobile.changePage("#rewards");
			$("#response-popup").popup("close");

            // TODO: why executed twice?
/*
//            var Bonus = require('bonus');
	var bonusGame = Bonus({
                parent: 'bonus-game-container',
                basePath: 'js/bonus-game/src/',
                inputDiameter: back.getLampSize() * 20,
                newTargetsCount: 5,
                musicEnabled: false,
                sfxEnabled: true,
                onFinish: function(bonusFound) {
                    console.log('foo');
                    back.bonusPlayed(bonusFound);
                }
            });
            bonusGame.start();
*/
            if (!bonusGame) {
//                var Bonus = require('bonus');
                var bonusGame = Bonus({
                    parent: 'bonus-game-container',
                    basePath: 'js/bonus-game/src/',
                    inputDiameter: back.getLampSize() * 20,
                    newTargetsCount: 5,
                    musicEnabled: false,
                    sfxEnabled: true,
                    onFinish: function(bonusFound) {
                        back.bonusPlayed(bonusFound);
                        bonusGame.pause();
                        $.mobile.changePage("#questions");
                    }
                });
            }
            bonusGame.play();
        }
		else
		{
			//Next question
			var nextTask = getQuestion();
			displayQuestion = nextTask.question;
			$('#question-holder').html(nextTask.question);
				$('.button-container').find('button').each(function(i){
					$(this).html(nextTask.answers[i]);
				});
		$("#response-popup").popup("close");
		}
});

	// Sets min and max values for the sliders.
	// This is is not optimal, but probably the best solution if we want to
	// use sliders. 
	// Rangeslider implemented (the _plugin_ was deprecated because it is apparently now part of standard jqm)
	/*
	$( "#min" ).on( "slidestop", function( event, ui ) {
		var minValue = $('#min').val();
		$("#max").prop('min', minValue).slider( "refresh" );
		if($("#max").prop('value') < minValue){
			$("#max").prop('value', minValue).slider( "refresh" );
		}
	} );
	
	$( "#max" ).on( "slidestop", function( event, ui ) {
		var maxValue = $('#max').val();
		$("#min").prop('max', maxValue).slider( "refresh" );
		if($("#min").prop('value') > maxValue){
			$("#min").prop('value', maxValue).slider( "refresh" );
		}
	} );
	*/
	
	//Deselects all other arithmetic options if symbols are selected (counting without arithmetic)
$("#symbols").click(function(){
	$(this).closest('#arithmetic-settings').find('input[type="checkbox"]:not("#symbols")').prop('checked', false).checkboxradio( "refresh" );
});
	
//Deselects symbols (counting without arithmetic) if any other arithmetic setting is clicked
$('#arithmetic-settings input[type="checkbox"]:not("#symbols")').click(function(){
		if($('#symbols').prop('checked', true)){
			$("#symbols").prop('checked', false).checkboxradio( "refresh" );
		}
});
	
	
	
	// TODO doesn't get settings on second click, check why and fix or make this happen on settings page load
});
$("#settings").on('pageshow',function(){
	console.log("settings button clicked");
	var settings = getSettings();
	console.log(settings);
	$('#min').val(settings.minNumber);
	$('#max').val(settings.maxNumber);
	$('#addition').prop('checked', settings.addition).checkboxradio('refresh');
	$('#subtraction').prop('checked', settings.subtraction).checkboxradio('refresh');
	$('#multiplication').prop('checked', settings.multiplication).checkboxradio('refresh');
	$('#division').prop('checked', settings.division).checkboxradio('refresh');
	$('#symbols').prop('checked', settings.symbols).checkboxradio('refresh');
	$('#bonus').attr('value', settings.questionsBeforeBonus);
	// TODO Backend needs to take in the new values (symbols & bonus) and set the amount of questions needed answered before bonusIsAvailable() becomes true to the new value. -Bogezu
	// TODO change the rest of the settings page to what the settings are
});	
