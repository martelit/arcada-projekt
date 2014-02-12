function isPhoneGap() {
	if(typeof(cordova) === 'undefined' || typeof(PhoneGap) === 'undefined' || typeof(phonegap) === 'undefined') {
		return false;
	}
	return (cordova || PhoneGap || phonegap) 
    && /^file:\/{3}[^\/]/i.test(window.location.href) 
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

function getBackend(){
	if(typeof(Backend) === 'undefined'){
		console.log("something wrong with backend, using dummy instead");
		var dummy = {
			QuestionGenerator: {
				getQuestion: function(){
					return [[[1,0,1],[2,3,4,5],1]];
				}
			},
			getAnswer: function(a){
				return 2;
			}
		};
		return dummy;
	} else {
		if(typeof(back) === 'undefined'){
			return new Backend();
		} else {
			return back;
		}
	}
}
var back = getBackend();
function answerQuestion(guess){
	var answer = back.getAnswer();
	if(guess == answer){
		return true;
	} else {
		return false;
	}
}
function formatQuestion(){
	var raw = back.QuestionGenerator.getQuestion();
	
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
	if(signCode == 2){
		sign = "*";
	}
	if(signCode == 3){
		sign = "/";
	}

	task.question = [value1, sign, value2];
	
	for(var i = 0; i < raw[0][1].length; i++){
		task.answers.push(raw[0][1][i]);
	}
	return task;
}
