/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * Changelog :
 * - bollen :: 27.1.2014 :: added settings
 * - neko :: 30.1.2014 :: added game-logic
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
			    addition: true,
			    subtraction: false,
			    multiplication: false,
			    division: false
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
    	tested += 1;
    	return tested;
	};
	
	Backend.prototype.getQuestion = function() {
		return this.questions.getQuestion();
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
	
	/* Param 'a' = guessed answer. Increments total questions and correctly answered questions */
	Backend.prototype.getAnswer = function(a)
	{
		if(parseInt(a) == this.questions.answer){ this.correct_answers++; }
		this.questions_answered++;
		return this.questions.answer;
	};

	/* returns true for every 10'th question answered */
	Backend.prototype.bonusIsAvailable = function()
	{
		return ((questions_answered % 10) == 0) && (questions_answered > 0);
	};
	
	/* Updates found bonuses, current total score.
	   Returns true if all 5 bonus objects have been found */
	Backend.prototype.bonusPlayed = function (bonusFound) 
	{
		bonus_found += parseInt(bonusFound);
		total_score += correct_answers;
		correct_answers = 0;
		return (bonus_found >= 5);
	};
	
	/* As an alternative for the function above. 
	   Returns true if all 5 bonus objects have been found  */
	Backend.prototype.allBonusObjectsFound = function(){
		return (bonus_found >= 5);
	};

	/* returns Bonus-lamp radius in pixels depending on current score*/
	// TODO: return proper values
	Backend.prototype.getLampSize = function()
	{
		var retval = 10;
		if(correct_answers >= 9) { retval = 40; };
		if((correct_answers >= 6) && (correct_answers < 9)) { retval = 30; };
		if((correct_answers >= 3) && (correct_answers < 6)) { retval = 20; };
		return retval;
	};



	return Backend;
});


//function Backend() {
//
//	this.QuestionGenerator = new QuestionGenerator();
//	this.Settings = new Store("Settings");
//	this.questions_answered = 0;
//	this.correct_answers = 0;
//	this.bonus_found = 0;
//	this.total_score = 0;
//
//
//	/* Param 'a' = guessed answer. Increments total questions and correctly answered questions */
//	this.getAnswer = function(a)
//	{
//		if(parseInt(a) == this.QuestionGenerator.answer){ this.correct_answers++; }
//		this.questions_answered++;
//		return this.QuestionGenerator.answer;
//	}
//
//	/* returns true for every 10'th question answered */
//	this.bonusIsAvailable = function()
//	{
//		return ((this.questions_answered % 10) == 0) && (this.questions_answered > 0);
//	}
//	
//	/* Updates found bonuses, current total score.
//	   Returns true if all 5 bonus objects have been found */
//	this.bonusPlayed = function(bonusFound)
//	{
//		this.bonus_found += parseInt(bonusFound);
//		this.total_score += this.correct_answers;
//		this.correct_answers = 0;
//		return (this.bonus_found >= 5);
//	}
//
//	/* As an alternative for the function above. 
//	   Returns true if all 5 bonus objects have been found  */
//	this.allBonusObjectsFound = function(){
//		return (this.bonus_found >= 5);
//	}
//
//	/* returns Bonus-lamp radius in pixels depending on current score*/
//	// TODO: return proper values
//	this.getLampSize = function()
//	{
//		var retval = 10;
//		if(this.correct_answers >= 9) { retval = 40 };
//		if((this.correct_answers >= 6) && (this.correct_answers < 9)) { retval = 30 };
//		if((this.correct_answers >= 3) && (this.correct_answers < 6)) { retval = 20 };
//		return retval;
//	}
//	
//	/* For debugging purposes, alerts fields in object */
//	this.dbg_var_dump = function(obj)
//	{
//    	var out = '';
//    	for (var i in obj) {
//        	out += i + ": " + obj[i] + "\n";
//    	}
//
//    	alert(out);
//	}
//}
