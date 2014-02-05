var back = new Backend();
console.log(back);
function answerQuestion(guess){
	var answer = back.getAnswer();
	if(guess == answer){
		return true;
	} else {
		return false;
	}
}
function formatQuestion(){
	
	if(typeof back === 'undefined' || typeof back.QuestionGenerator === 'undefined' || typeof back.QuestionGenerator.getQuestion() === 'undefined' ){
		console.log("backend broken or missing, defaulting to dummy values");
		return {
			question: [1, "+", 1],
			answers: [1, 2, 3, 4]
		};
	} else {
		var raw = back.QuestionGenerator.getQuestion();
	}
	
	var task = {
		question: [],
		answers:  []
	};
	
	var value1 = raw[0][0][0];
	var value2 = raw[0][0][2];

	var sign = "";
	var signCode = raw[0][0][1];
	if(signCode == 0){
		sign = "+";
	}
	if(signCode == 1){
		sign = "-";
	}

	task.question = [value1, sign, value2];
	
	for(var i = 0; i < raw[0][1].length; i++){
		task.answers.push(raw[0][1][i]);
	}
	return task;
}
