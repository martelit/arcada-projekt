/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * Changelog :
 * - bollen :: 27.1.2014 :: added settings
 * - neko :: 30.1.2014 :: added game-logic
 */
function Backend() {

	this.QuestionGenerator = new QuestionGenerator();
	this.Settings = new Store("Settings");
	this.questions_answered = 0;
	this.correct_answers = 0;
	this.bonus_found = 0;
	this.total_score = 0;


	/* Param 'a' = guessed answer. Increments total questions and correctly answered questions */
	this.getAnswer = function(a)
	{
		if(parseInt(a) == this.QuestionGenerator.answer){ this.correct_answers++; }
		this.questions_answered++;
		return this.QuestionGenerator.answer;
	}

	/* returns true for every 10'th question answered */
	this.bonusIsAvailable = function()
	{
		return ((this.questions_answered % 10) == 0) && (this.questions_answered > 0);
	}
	
	/* Updates found bonuses, current total score.
	   Returns true if all 5 bonus objects have been found */
	this.bonusPlayed = function(bonusFound)
	{
		this.bonus_found += parseInt(bonusFound);
		this.total_score += this.correct_answers;
		this.correct_answers = 0;
		return (this.bonus_found >= 5);
	}

	/* As an alternative for the function above. 
	   Returns true if all 5 bonus objects have been found  */
	this.allBonusObjectsFound = function(){
		return (this.bonus_found >= 5);
	}

	/* returns Bonus-lamp radius in pixels depending on current score*/
	// TODO: return proper values
	this.getLampSize = function()
	{
		var retval = 10;
		if(this.correct_answers >= 9) { retval = 40 };
		if((this.correct_answers >= 6) && (this.correct_answers < 9)) { retval = 30 };
		if((this.correct_answers >= 3) && (this.correct_answers < 6)) { retval = 20 };
		return retval;
	}
	
	/* For debugging purposes, alerts fields in object */
	this.dbg_var_dump = function(obj)
	{
    	var out = '';
    	for (var i in obj) {
        	out += i + ": " + obj[i] + "\n";
    	}

    	alert(out);
	}
}
