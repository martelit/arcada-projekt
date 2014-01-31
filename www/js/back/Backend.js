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
		return ((this.questions_answered % 10) == 0) && (this.questions_answered > 0) ? true : false;
	}
	

	/* Updates found bonuses, current total score. */
	this.BonusPlayed = function(bonusFound)
	{
		this.bonus_found += parseInt(bonusFound);
		this.total_score += this.correct_answers;
		this.correct_answers = 0;
	}


	/* returns amount of bonus-lamps earned */
	this.getLampsEarned = function()
	{
		var retval = 1;
		if(this.correct_answers >= 9) { retval = 4 };
		if((this.correct_answers >= 6) && (this.correct_answers < 9)) { retval = 3 };
		if((this.correct_answers >= 3) && (this.correct_answers < 6)) { retval = 2 };
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
