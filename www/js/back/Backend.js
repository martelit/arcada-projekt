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

	var questionGenerator = this.QuestionGenerator = new QuestionGenerator();
	var Settings = this.Settings = new Store("Settings");


	/*
	* Bonusgame evaluation
	* fr�n guessAnswer() borde r�knas antalet r�tta svar. corrects - en int variabel som inneh. antal g�nger som man f�tt r�tt svar
	* i stil f�r man 3 r�tt kan man spela bonusgame n�sta g�ng m�ste man ha 1 r�tt, n�gra andra krav borde s�kert finnas..
	* TODO: corrects m�ste f� ett v�rde, n�r man guessAnswer() metodens resultat?
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
