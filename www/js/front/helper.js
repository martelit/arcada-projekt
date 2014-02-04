
function formatQuestion(){
	
	if(typeof Backend === 'undefined' || typeof Backend.QuestionGenerator === 'undefined' || typeof Backend.QuestionGenerator.getQuestion() === 'undefined' ){
		console.log("backend broken or missing, defaulting to dummy values");
		return {
			question: [1, "+", 1],
			answers: [1, 2, 3, 4]
		};
	} else {
		var raw = Backend.QuestionGenerator.getQuestion();
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
	
	var result = value1 + value2;
	correctAnswer = setCorrectAnswer(result);
	
	for(var i = 0; i < raw[0][1].length; i++){
		task.answers.push(raw[0][1][i]);
	}

	return task;	
}
