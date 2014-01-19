var correctAnswer = 2;

function getQuestion(){
	var returnData = {
		question: [1,"+",1],
		answers: [2,3,4,5]
		};
	return returnData;
}
function guessAnswer(answer){
	if(answer == correctAnswer){
		return true;
	} else {
		return false;
	}
}
function getSettings(){
	// TODO get settings from storage
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
	// TODO save settings
}
function formatQuestion(){
	var questionData = getQuestion();
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

$(document).ready(function(){
	console.log("document ready");
	formatQuestion();

	// checks if answer is correct and changes colors accordingly
	// TODO change colors back to normal
	// TODO get new question after a while, by timing or "next question"-button
	// TODO check if .click() is the best way to do this on a mobile device
	$("#confirm-answer").click(function(){
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

	// TODO doesn't get settings on second click, check why and fix
	$("#settings").click(function(){
		var settings = getSettings();
		$('#min').attr('value',settings.smallestNumber); // for some reason .val() does not work
		console.log(settings.smallestNumber);
		// TODO change the rest of the settings page to what the settings are
	});
});
