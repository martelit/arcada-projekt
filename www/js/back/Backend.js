/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * Changelog :
 * - bollen :: 27.1.2014 :: added settings
 * - neko :: 30.1.2014 :: added game-logic
 * - bollen :: ?.2.2014 :: Fixed structure
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
		return this.questions.getQuestion(3, this.getMin(), this.getMax(), this.getOperator()); 
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

	Backend.prototype.getOperator = function() {
		//TODO: only return an operator that are in the settings
		return this.questions.rn(0,4);
	}
	



	// Helperfile is breaking this logic, this function is called more than once per question.
	// Parameter 'a' is not passed correctly. currently undefined.
	/* Param 'a' = guessed answer. Increments total questions and correctly answered questions */
	Backend.prototype.getAnswer = function(a)
	{
		if(parseInt(a) == this.questions.answer){ this.correct_answers++; }
		this.questions_answered++;
		// debug:
		//console.log("questions answered:"+this.questions_answered+" caller: "+arguments.callee.caller.toString());
		console.log("guessed: "+a+"\ncorrect: "+this.questions.answer+"\ncorrect answers: "+this.correct_answers);
		// /debug
		return this.questions.answer;
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