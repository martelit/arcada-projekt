/*
 * Backend-class singleton instance
 *
 * Author :: Neko :: 22.1.2014
 *
 * TODO: Configure require.js to make this bitch work.
 *
 * Changelog :
 *
 */

var Backend = new function() {

	this.QuestionGenerator = new QuestionGenerator();


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