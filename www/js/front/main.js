
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

function setCanvas(){
	$('#question-holder').html('<canvas id="object-canvas" width="900" height="300"></canvas>');
}

function drawCanvasObjects(numberOfObjects){
		
	var originalImgHeight = 129;
	var originalImgWidth = 	142;
	
	//Function defaults
	var x = 20;
	var y = 20;
	var scale = 0.8;
	var scaledx = x;
	var scaledy = y;
	
	var width =  originalImgWidth * scale;
	var height = originalImgHeight * scale;
	
	for(var i = 0; i < numberOfObjects; i++){
		draw(scaledx,scaledy,width, height);
		if(numberOfObjects < 6){
			scaledx += 150;
		}
		if(numberOfObjects >= 6 && numberOfObjects <= 10){
			scaledx += 150;
			if(i == 5){
				scaledx = 20;
				scaledy += 100;
			}
		}
	};

}

function draw(x,y,width,height) {
	var ctx = document.getElementById('object-canvas').getContext('2d');
	ctx.clearRect(0, 0, $('#object-canvas').width(), $('#object-canvas').height());
	ctx.mozImageSmoothingEnabled = false;
	var symbol = new Image();
	symbol.src = "img/apple.png";
	symbol.onload = function() {
		ctx.drawImage(symbol, x, y, width, height);
	};
}


function initSound(){
	var Sound;
	//Starts and stops music
	$( ".flip-music" ).change(function () {
		if(this.value=="on"){
			playMusic();
		} else {
			pauseMusic();
		}
	});
	$( ".flip-sound" ).change(function () {
		if(this.value=="on"){
			Sound=true;
		} else {
			Sound=false;
		}
	});
	// Checks the flip switch on the settings page and plays click sound if it is on there
	$(".play-click").click( function(){
		if(Sound){
			playClickSound();
		}
	});

}

//Draws unanswerd question indicators on the game screen
function setProgressIndicators(){
	if(!$('#progress-indicator').children().length){
		var settings = back.store.get("settings");
		var numIndicators = settings.questionsBeforeBonus;
	
		for(var i = 0; i < numIndicators; i++){
			$('#progress-indicator').append('<div id="indicator-'+(i+1)+'" class="indicator-unanswered"></div>');
		}
	}
}

//Sets the next unanswered indicator to false
function setIndicatorCorrect(){
	var ind = getCurrentIndicator();
	$(ind).removeClass('indicator-unanswered');
	$(ind).addClass('indicator-correct');
}

//Sets the next unanswered indicator to false
function setIndicatorFalse(){
	var ind = getCurrentIndicator();
	$(ind).removeClass('indicator-unanswered');
	$(ind).addClass('indicator-incorrect');
}

//returns the first unlit indicator
function getCurrentIndicator(){
	var ind = $('#progress-indicator').children('.indicator-unanswered').eq(0);
	return ind;
}

//clears answer indicators
function clearIndicators(){
	$('#progress-indicator').empty();
}

function initBinds(){
	
	//the amount of indicator bulbs needs to be reset every game
	$('.start-button').click(function(){
		clearIndicators();
		setProgressIndicators();
	});
	$( "#save" ).click(function () {
		setSettings();
	});
	
	$( "#reset" ).click(function () {
		back.clearStats();
	});
	
	if(typeof(bonusGame) === 'undefined'){
		var bonusGame = false;
	}
	$(".bonus-button").click(function(){
		if(back.bonusIsAvailable() == true){
			//start bonus game
			$.mobile.changePage("#rewards");
			$("#response-popup").popup("close");
			// TODO: why executed twice?
			if (!bonusGame) {
				var Bonus = require('bonus');
				bonusGame = new Bonus({
					parent: 'bonus-game-container',
					basePath: 'js/bonus/',
					inputDiameter: back.getLampSize() * 50,
					newTargetsCount: 5,
					musicEnabled: false,
					sfxEnabled: true,
					onFinish: function(bonusFound) {
						back.bonusPlayed(bonusFound);
						$.mobile.changePage("#questions");
						$(".answer-button").removeClass("guessed-answer correct-answer wrong-answer");
					}
				});
			}
			bonusGame.play(back.getLampSize() * 50);
		}
	});
	$(".answer-button").click(function(){
		//problem, always sets 2 questions_answered when one is answered? -Bogezu
		//getAnswer is called twice. once here, once in helper. -Neko
		//This was getting really annoying so I did a quickfix (that made the guessAnswer function redundant, which it bloody well was to begin with?), revert it and make a better fix if you feel like it -rasmus
		console.log("total questions:"+back.questions_answered);
		console.log("bonus available: "+back.bonusIsAvailable());
		
		var answer = $(this).html();
		var correctAnswer = back.getAnswer(answer);
		var displayQuestion = $("#question-holder").text();
			if( answer == correctAnswer ){
				$(this).addClass("guessed-answer correct-answer");
				$(".wrong-answer-icon").hide();
				$(".right-answer-icon").show();
				setIndicatorCorrect();
			} else {
				$(this).addClass("guessed-answer wrong-answer");
				$(".right-answer-icon").hide();
				$(".wrong-answer-icon").show();
				setIndicatorFalse();
			}
			$("#correct-answer-number").text(displayQuestion +" = "+ correctAnswer);
					
			//show bonus button only when bonus is available
			if(back.bonusIsAvailable()){
				$("#next-question").hide();
				$("#play-bonus-game").show();
			} else { //else shows next question button
				$("#next-question").show();
				$("#play-bonus-game").hide();
			}
		$("#response-popup").popup("open");
	});
	//Deselects all other arithmetic options if symbols are selected (counting without arithmetic)
	$("#symbols").click(function(){
		$(this).closest('#arithmetic-settings')
		.find('input[type="checkbox"]:not("#symbols")')
		.prop('checked', false)
		.checkboxradio( "refresh" );
	});
	
	//Deselects symbols (counting without arithmetic) if any other arithmetic setting is clicked
	$('#arithmetic-settings input[type="checkbox"]:not("#symbols")').click(function(){
		if($('#symbols').prop('checked', true)){
			$("#symbols").prop('checked', false).checkboxradio( "refresh" );
		}
	});

	$(".next-button").click(function(){
		newQuestion();
		$("#response-popup").popup("close");
	});
}
function newQuestion(){
		$(".answer-button").removeClass("guessed-answer correct-answer wrong-answer");
		var nextTask = formatQuestion();
		if(nextTask.question[1] != ''){
			$('#question-holder').html(nextTask.question);
		}
		else{
			setCanvas();
			drawCanvasObjects(nextTask.question[0]);
		}
		$('.button-container').find('button').each(function(i){
			$(this).html(nextTask.answers[i]);
		});
//		$("#response-popup").popup("close");
}
/*
$("#rewards").on('pageshow', function(){
	var Bonus = require('bonus');
	console.log("YES HERE");
	bonusGame = new Bonus({
		parent: 'bonus-game-container',
		basePath: 'js/bonus/',
		inputDiameter: /*back.getLampSize() * 20/ 100,
		newTargetsCount: 5,
		musicEnabled: false,
		sfxEnabled: false,
		onFinish: function(bonusFound) {
//			back.bonusPlayed(bonusFound);
//			bonusGame.pause();
//			$.mobile.changePage("#questions");
			bonusGame.play();
		}
	});
bonusGame.play();
});
*/
newQuestion();
initBinds();
initSound();
$(document).on('pageshow', function(){
});
$("#statistics").on('pageshow', function(){
	drawStats(); // call function in stats.js
});
$("#settings").on('pageshow',function(){
	console.log("settings button clicked");
	var settings = getSettings();
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
