// TODO split file (or not?)
function getRewardData(){
	var something = {};
	return something;
}
function setRewardData(){
	
}

var correctAnswer;	



function setCorrectAnswer(logicAnswer){				
    var correct = logicAnswer;					
    return correct;
}
	//function for setting what is the correct answer
	
function getCorrectAnswer(){
return correctAnswer;
}
	//Get the correct answer

function guessAnswer(answer){
	var answer = Backend.QuestionGenerator.answer;
	console.log(answer);
	if(answer == correctAnswer){
		return true;
	} else {
		return false;
	}
}
function getSettings(){
	// TODO get settings from storage (frontend or logic?)
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
	// TODO save settings to storage (frontend or logic?)
}
function formatQuestion(){
	var raw = Backend.QuestionGenerator.getQuestion();
	var sign = "";
	var signCode = raw[0][0][1];
	if(signCode == 0){
		sign = "+";
	}
	if(signCode == 1){
		sign = "-";
	}

	var value1 = raw[0][0][0];
	var value2 = raw[0][0][2];
	var result = value1 + value2;
	correctAnswer = setCorrectAnswer(result);
	
	var questionData = {
		question: [value1,sign,value2],
		answers: []
	};
	for(var i = 0; i < raw[0][1].length; i++){
		questionData.answers.push(raw[0][1][i]);
	}
	
	
	var q = questionData.question;
	var questionString = "";
	for(var i = 0; i < q.length; i++){
		questionString = questionString + q[i];
	}

	$("#question-holder").html(questionString);
	
	$("input[name=answer]").each(function(i){
		$("#answers").find("label").eq(i).html(questionData.answers[i]);
		$("#answers").find("input").eq(i).val(questionData.answers[i]);
	});
}
// TODO $(document).ready bad for JQM, should use pageinit instead, check http://www.gajotres.net/document-onpageinit-vs-document-ready/
$(document).on('pageinit', function(){
	formatQuestion();
	
	$(".play-click").click(function(){
		clicksound.playclip();
	});
	
	$(".answer-button").click(function(){
	var answer = getCorrectAnswer();
	
	$('.button-container').find('button').each(function(i){ 
	console.log(i);
	if(guessAnswer(answer)){
	$('.answer-button').css({
	'background': 'green'
	});
	} else {
	$('.answer-button').css({
	'background': 'red'
	});
	}
	
	});
		});
	
	// checks if answer is correct and changes colors accordingly
	// TODO change colors back to normal
	// TODO get new question after a while, by timing or "next question"-button
	// TODO check if .click() is the best way to do this on a mobile device
	/*$("#confirm-answer").click(function(){
		var $checked = $('input[name=answer]:checked');
		var answer = $checked.val();
		if(guessAnswer(answer)){
			console.log("correct");
			$('label[for='+$checked.attr('id')+']').css({
				'background': 'green'
			});
		} else {
			console.log("wrong");
			$('label[for='+$checked.attr('id')+']').css({
				'background': 'red'
			});
		}
	});
	*/
	// TODO doesn't get settings on second click, check why and fix or make this happen on settings page load
	$("#settings").click(function(){
		var settings = getSettings();
		$('#min').attr('value',settings.smallestNumber); // for some reason .val() does not work
		console.log(settings.smallestNumber);
		// TODO change the rest of the settings page to what the settings are
	});
	
});
