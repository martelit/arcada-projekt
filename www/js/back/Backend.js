/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * Changelog :
 * - bollen :: 27.1.2014 :: added settings
 * - neko :: 30.1.2014 :: added game-logic
 * - bollen :: 11.2.2014 :: Fixed structure
 * - bollen :: 20.2.2014 :: added getRndOperator.
 */

/*
 * stats will be an array of [operation][operand[]]
 */

//// without require
//function getCredits(){
//  console.log("Function : getCredits");
// 
//  var credits = "100";
//  return credits;
//}

// with require
define([], function() {
	var Backend = this.Backend = function(){
		this.questions = new QuestionGenerator();
		this.store = new Store("Snille");
		
		// make a default settings object
		this.defaults = {
				minNumber: 10,
			    maxNumber: 50,
			    questionsBeforeBonus: 10,
			    addition: true,
			    subtraction: false,
			    multiplication: false,
			    division: false,
			    symbols: false
		};
		
		// store the default settings
		this.store.set("snille", this.defaults);
		
		// setup some variables
		this.questions_answered = 0;
		this.correct_answers = 0;
		this.bonus_found = 0;
		this.total_score = 0;
		this.tested = 0;

	};
    
	Backend.prototype.testMe = function() {
    	console.log("hello there");
    	this.tested += 1;
    	return this.tested;
	};
	
	Backend.prototype.getQuestion = function() {

		//console.log(this.getMin(), this.getMax());
		//4== how many possible answers are generated
		return this.questions.getQuestion(4, this.getMin(), this.getMax(), this.getOperator()); 
	};
	

	Backend.prototype.getGenerator = function() {
		return this.questions;
	};
	
	// return the settings object
	Backend.prototype.getSettings = function() {
		return this.store.get("snille");
	};
    
	Backend.prototype.getMax = function(){
		return this.getSettings().maxNumber;
	};
	
	Backend.prototype.getMin = function(){
		return this.getSettings().minNumber;
	};

	Backend.prototype.getQuestionsBeforeBonus = function(){
		return this.getSettings().questionsBeforeBonus;
	}
	
	/* Returns a random operator based on user settings */
	Backend.prototype.getRndOperator = function() {
		var stored = this.store.get("settings");
		var available = new Array();
		
		stored.addition 	&& available.push(0);
		stored.subtraction 	&& available.push(1);
		stored.multiplication	&& available.push(2);
		stored.division 	&& available.push(3);
		
		return available[this.questions.rn(0, available.length)];
	};

	



	// Helperfile is breaking this logic, this function is called more than once per question.
	// Parameter 'a' is not passed correctly. currently undefined.
	/* Param 'a' = guessed answer. Increments total questions and correctly answered questions */
	Backend.prototype.getAnswer = function(a)
	{
		var correct = false;
		if(parseInt(a) == this.questions.answer){ this.correct_answers++; correct=true;}
		this.questions_answered++;
		// debug:
		//console.log("questions answered:"+this.questions_answered+" caller: "+arguments.callee.caller.toString());
		console.log("guessed: "+a+"\ncorrect: "+this.questions.answer+"\ncorrect answers: "+this.correct_answers);
		// /debug
		this.saveQuestion(correct);
		return this.questions.answer;
	};
	
	/*stores the question array and whether it was right or wrong to the localstorage in an array*/
	Backend.prototype.saveQuestion= function(correct)
	{
		var question = this.questions.globalQuestion;		
		var history = this.store.get("history");
		if(history === undefined) {
			history = new Array();
		}
		var newEntry = {
			question: question,
			correct: correct
		};
		history.push(newEntry);		
		this.store.set("history", history);		
	};
	
	/*
	* 	----------------------NOT DONE------------------------------------
	*	Method for counting right answers for each operator and storing each 
	*	numerical value to an array of respective operator used.
	*	back.store.remove('history');
	*/
	Backend.prototype.countStatistics = function() {
	
	var questionArr = new Array();
	questionArr = this.store.get("history");
	
	if(questionArr === undefined)
	{
		
		console.log('No history');
		return questionArr;
	}
	//console.log(' Array length is: ' + questionArr.length);
	console.log(questionArr);

		var addition = 0;
		var subtraction = 0;
		var multiplication = 0;
		var division = 0;
		var additionArr = new Array();
		var subtractionArr = new Array();
		var multiplicationArr = new Array();
		var divisionArr = new Array();
		var corrects = 0;
		var totals = 0;
		
		//should check for true also uncommented for testing
		//questionArr[i].correct == true
	for(var i = 0; i < questionArr.length; i++)
	{
		//console.log('Operator #' + i + ':  ' + questionArr[i].question[1]);
	
		if(questionArr[i].question[1] == 0  /*&& questionArr[i].correct == true*/) {
				addition++;
				additionArr.push(questionArr[i].question[0], questionArr[i].question[2]);
				}
		else if(questionArr[i].question[1] == 1  /*&& questionArr[i].correct == true*/) {
				subtraction++;
				subtractionArr.push(questionArr[i].question[0], questionArr[i].question[2]);
				}
		else if(questionArr[i].question[1] == 2  /*&& questionArr[i].correct == true*/) {
				multiplication++;
				multiplicationArr.push(questionArr[i].question[0], questionArr[i].question[2]);
				}
		else if(questionArr[i].question[1] == 3  /*&& questionArr[i].correct == true*/) {
				division++;
				divisionArr.push(questionArr[i].question[0], questionArr[i].question[2]);
				}
		else
			console.log('error');

			
			if(questionArr[i].correct == true)
			{
				corrects++;
				totals++;
			}
			else
				totals++;

	}
		
		console.log('+: ' + addition + ', -: ' + subtraction + ', *: ' + multiplication + ', /: ' + division + ', rightanswears:' + corrects);
		
		var procentualaddition = addition/totals;
		var procentualsubtraction = subtraction/totals;
		var procentualmultiplication = multiplication/totals;
		var procentualdivision = division/totals;
		
		var procentualcorrects = corrects/totals;
		
		console.log('total answers: ' + totals);
		console.log('answer %: ' + procentualcorrects);
		console.log('addition:% ' + procentualaddition);
		console.log('subtraction:% ' + procentualsubtraction);
		console.log('multiplication:% ' + procentualmultiplication);
		console.log('division:% ' + procentualdivision);
		
		for(var j=0; j < addition*2; j++) {
		console.log('additionarray: ' + additionArr[j]);
		}
		for(var j=0; j < subtraction*2; j++) {
		console.log('subtractionarray: ' + subtractionArr[j]);
		}
		for(var j=0; j < multiplication*2; j++) {
		console.log('multiplicationnarray: ' + multiplicationArr[j]);
		}
		for(var j=0; j < division*2; j++) {
		console.log('divisionarray: ' + divisionArr[j]);
		}
			
	};

	/* returns true for every getQuestionsBeforeBonus()'th question answered */
	Backend.prototype.bonusIsAvailable = function()
	{
		return ((this.questions_answered % this.getQuestionsBeforeBonus()) == 0) && (this.questions_answered > 0);
	};
	
	/* Updates found bonuses, current total score.
	   Returns true if all 5 bonus objects have been found */
	Backend.prototype.bonusPlayed = function (bonusFound) 
	{
		this.bonus_found += parseInt(bonusFound);
		this.total_score += this.correct_answers;
		this.correct_answers = 0;
		return (this.bonus_found >= 5);
	};
	
	/* As an alternative for the function above. 
	   Returns true if all 5 bonus objects have been found  */
	Backend.prototype.allBonusObjectsFound = function(){
		return (this.bonus_found >= 5);
	};

	/* returns Bonus-lamp radius in pixels depending on current score*/
	// TODO: return proper values
	Backend.prototype.getLampSize = function()
	{
		var retval = 1;
		if(this.correct_answers >= 9) { retval = 4; };
		if((this.correct_answers >= 6) && (this.correct_answers < 9)) { retval = 3; };
		if((this.correct_answers >= 3) && (this.correct_answers < 6)) { retval = 2; };
		return retval;
	};



	return Backend;
});
