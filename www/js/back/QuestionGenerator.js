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
	//global variable for the question array, quickfix
	this.globalQuestion= new Array();

	/*
	 * Returns a Question object.
	 *
	 * The Question object consists of two arrays and an integer (See below)
	 * 
	 * 	e.g.:	{ [1+1], [0,1,2,3], [2] }
	 * 			{[Question], [Answer alternatives], [Operation]}
	 */
	this.getQuestion = function(howMany, minValue, maxValue, operation){
		
		//console.log(howMany, minValue, maxValue, operation);
		//TODO: here should come som function about how to generate next question
		var arrayObj = new Array(this.generateQuestion(howMany, minValue, maxValue, operation));
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
	this.generateQuestion = function(howMany, minValue, maxValue, operation) {

		var x = 0;	// x value
		var y = 0;	// y value
		var question = new Array();
		switch (operation)
		{
		case 0:	// +

			this.answer = this.rn(minValue, maxValue);
			x = this.rn(minValue, this.answer);	// x value
			y = this.answer - x;
			question[0] = x;
			question[1] = operation;
			question[2] = y;
			break;
		case 1:	// -

			// The answer is not allowed to be negative

			this.answer = this.rn(minValue, maxValue);
			x = this.rn(this.answer, maxValue+1);
			y = x-this.answer;
			question[0] = x;
			question[1] = operation;
			question[2] = y;
			break;
		case 2:	// *
			var newMax = Math.pow(maxValue,0.5).toFixed();
			var newMin = Math.pow(minValue,0.5).toFixed();
			 
			if (newMax*newMax > 1+ maxValue){
				newMax --;
			}

			//console.log("Max and min: " + newMax, newMin);
			x = this.rn(newMin,newMax);
			//Can't divide with 0, must be able to create max Answer
			newMax = maxValue*(((x+2)/(x+1))/(x+1));
			if (newMax>maxValue){
				newMax= maxValue;
			}
			y = this.rn(newMin, newMax);

			//y = this.rn(newMin,newMax);
			this.answer = x * y;
			question[0] = x;
			question[1] = operation;
			question[2] = y;

			break;
		case 3:	// /
			// Division = It is not allowed to be any fractions	 
			var newMax = Math.pow(maxValue,0.5).toFixed();
			if (newMax*newMax > maxValue){
				newMax --;
			}
			//you can't divide with 0;
			if (minValue==0){
				minValue++;
			}
			this.answer = this.rn(minValue, newMax);
			y = this.rn(minValue, newMax);
			x = this.answer * y;
			question[0] = x;
			question[1] = operation;
			question[2] = y;
			
			break;

		case 4: // Picture question //hardcoded to 0-10, the programmers supreme power.
			this.answer = this.rn(1,10);
			question[0] = this.answer;
		}
		
		this.globalQuestion = question;
			
		//Create question Array
		//var question = new Array(x,operation,y);
		//Create Possible Answers , might be nice to impove 
		var alternativ = new Array()
		alternativ[0] = this.answer;

		for (i = 1; i< howMany; i++)
		{
			if(maxValue-minValue<howMany)	//This is here just to insure if some call the fuction with a to low howMany value
			{
				alternativ[i] = this.rn(minValue,maxValue);	
				console.warn("This should not happen maxAnswer, minAnswer, howMany: " + maxValue + " , " + minValue + " , " + howMany + "Neko likes to masturbate with pineapple shoved up his ass");
			}
			else	//Create unique values for possible answers
			{
				var newRandomInt = 0;
				var minusOne = -1 ;
				do
				{
					var newRandomInt = this.rn(minValue,maxValue);
					minusOne = alternativ.indexOf(newRandomInt);

				}
				while ( minusOne != -1);	// != -1 means that the newRandomInt does not exist in the array and is allowed to be pushed into the array
				alternativ[i] = newRandomInt;
			}

				
		}
		alternativ.sort(); 
		
		//Create Array to send to frontend
		var arrayObject = new Array(question,alternativ,operation);
		//console.log(arrayObject);

		return arrayObject;
	}


	/*
	 * returns a randomnumber between min and max
	 */
	this.rn = function(min, max)
	{

		max = parseInt(max, 10);
		min = parseInt(min, 10);
		var randomNumber = Math.floor(Math.random() * (max-min)) + min;
		//console.log("rand min , max " + randomNumber ,min, max);
		return randomNumber; 
	}
}
