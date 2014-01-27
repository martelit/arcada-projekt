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