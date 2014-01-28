/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * TODO: Configure require.js to make this bitch work.
 *
 * Changelog :
 * -bollen :: 27.1.2014 :: added settings
 *
 */

var Backend = new function() {

	this.QuestionGenerator = new QuestionGenerator();
	this.Settings = new Store("Settings");


	/*
	* Bonusgame evaluation
	* från guessAnswer() borde räknas antalet rätta svar. corrects - en int variabel som inneh. antal gånger som man fått rätt svar
	* i stil får man 3 rätt kan man spela bonusgame nästa gång måste man ha 1 rätt, några andra krav borde säkert finnas..
	* TODO: corrects måste få ett värde, når man guessAnswer() metodens resultat?
	*/
	
	this.isBonusAvailable = function()
	{
		var isAvailable = new Boolean();
		var required = 3;
		
		if(guessAnswer() && corrects >= required)
		{
			isAvailable = true;
			required += 1;
		}
		else if(!guessAnswer())
		{
			isAvailable = false;
			required = 3;
		}
		else
		{
			isAvailable = false;
		}
		
		return isAvailable;
	}
	
	/*
	* antal som bonusspelet spelats.
	*/
	var BonusPlayed;
	this.setBonusPlayed = function(amountplayed)
	{
		BonusPlayed = amountplayed;
	}
	
	/*
	 * For debugging purposes, alerts fields in object
	 */
	this.dbg_var_dump = function(obj){
	
    	var out = '';
    	for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    	}

    	alert(out);
	}
}
