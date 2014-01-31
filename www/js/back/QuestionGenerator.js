/*
 * QuestionGenerator class.
 *
 * Author :: Oscar Kraemer :: 2014
 *
 * ChangeLog:
 *
 * - neko :: 22.1.2014 :: Refactored to OO-model, renamed to QuestionGenerator.js, cleaned comments.
 * - neko :: 30.1.2014 :: Fixed this.answer-bug 
 */
function QuestionGenerator () {

	//The answer that is expected:
	this.answer = undefined;

	/*
	 * Returns a Question object.
	 *
	 * The Question object consists of two arrays and an integer (See below)
	 * 
	 * 	e.g.:	{ [1+1], [0,1,2,3], [2] }
	 * 			{[Question], [Answer alternatives], [Operation]}
	 */
	this.getQuestion = function(){
		
		//TODO: here should come som function about how to generate next question
		var arrayObj = new Array(this.generateQuestion(4,10,1));
		return arrayObj;
	}


	/* 	
	*	Generates a Question object.
	*
	*	Params:
	*
	*	int howMany 	== numbers of alternativ when choosing answer
	*	int maxValue 	== The maximum value there is in the math Problem
	*	int operation 	== 0 == + , 1 == - , 2 == * , 3 == /
	*/
	this.generateQuestion = function(howMany, maxValue, operation) {

		var x = this.rn(0, maxValue);	// x value
		var y = this.rn(0, maxValue);	// y value
		var maxAnswer = maxValue;		// MaxValue ,addition 2*MaxValue, multiplication maxValue * maxValue
										// TODO: Maxanswer is never used, only assigned.
		var minAnswer = 0;				// Minimal Answer, static at the moment
		
		switch (operation)
		{
		case 0:	// +
			this.answer = (x + y);
			//alert(this.answer);
			maxAnswer = (2 * maxValue);
			break;
		case 1:	// -
			// The answer is not allowed to be negative
			// Suggestion: perhaps use operator '?' for readability and/or to satisfy my raging boner for conditional operators.  - Neko
			// var answer = (x < y) ? (y - x) : (x - y); 
			if (x < y)
			{
				var z = x;
				x = y;
				y = z;
			}
			this.answer = x - y;
			break;
		case 2:	// *
			this.answer = x * y;
			maxAnswer = maxValue * maxValue;
			break;
		case 3:	// /
			// Division = It is not allowed to be any fractions
			z = x * y;
			this.answer = x;
			x = z;		
			break;
		}
			
		//Create question Array
		var question = new Array(x,operation,y);
		//Create Possible Answers , might be nice to impove 
		var alternativ = new Array()
		alternativ[0] = this.answer;

		for (i = 1; i< howMany; i++)
		{
			if(maxAnswer-minAnswer<howMany)	//This is here just to insure if some call the fuction whit a to low howMany value
			{
				alternativ[i] = this.rn(minAnswer,maxValue);	
				console.warn("This should not happen maxAnswer, minAnswer, howMany: " + maxAnswer + " , " + minAnswer + " , " + howMany);
			}
			else	//Create unique values for possible answers
			{
				var newRandomInt = 0;
				var minusOne = -1 ;
				do
				{
					var newRandomInt = this.rn(minAnswer,maxValue);
					minusOne = alternativ.indexOf(newRandomInt);

				}
				while ( minusOne != -1);	// != -1 means that the newRandomInt does not exist in the array and is aloud to be
				alternativ[i] = newRandomInt;
			}

				
		}
		alternativ.sort(); 
		
		//Create Array to send to frontend
		var arrayObject = new Array(question,alternativ,operation);
		return arrayObject;
	}


	/*
	 * returns a randomnumber between min and max
	 */
	this.rn = function(min, max)
	{
		var randomNumber = Math.floor(Math.random() * max) + min;
		return randomNumber; 
	}
}
