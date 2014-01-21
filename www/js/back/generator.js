// TODO add guessAnswer function
//The answer that is expected:
var answer = new Array();

//Get a new question
function getQuestion(){
	
/*
*       - Generator: getQuestion(antal, talfält, räknesätt)
*   - [1+1], [0,1,2,3], [2]
*
*/

	//here should come som funciton about how to generate next question

	var arrayObj = new Array(generateQuestion(4,10,1));
	return arrayObj;
}


/* 	howMany == numbers of alternativ when choosing answer
*	maxValue == The maximum value there is in the math Problem
*	operation== 0== + , 1 == - , 2 == * , 3 == /
*
*/
function generateQuestion(howMany, maxValue, operation) {

	var x = rn(0, maxValue); 	// x value
	var y = rn(0, maxValue);	// y value
	var maxAnswer = maxValue;	// MaxValue ,addition 2*MaxValue, multiplication maxValue * maxValue 
	var minAnswer = 0;		// Minimal Answer, static at the moment
	
	switch (operation)
	{
	case 0:	//+
		answer = x + y;
		maxAnswer = 2 * maxValue;
		break;
	case 1:	// -
		//The answer is not aloud to be negative
		if (x < y)
		{
			var z = x;
			x = y;
			y = z;
		}
		answer = x - y;
		break;
	case 2:	// *
		answer = x * y;
		maxAnswer = maxValue * maxValue;
		break;
	case 3:	// /
		//Division = It is not aloud to be any fractions
		z = x * y;
		answer = x;
		x = z;		
		break;
	}
		
	//Create quetion Array
	var question = new Array(x,operation,y);
	//Create Possible Answers , might be nice to impove 
	var alternativ = new Array()
	alternativ[0] = answer;

	for (i = 1; i< howMany; i++)
	{
		alternativ[i] = rn(minAnswer,maxValue);	
	}
	alternativ.sort(); 
	
	//Create Array to send to server
	var arrayObject = new Array(question,alternativ,operation);
	return arrayObject;
}


//returns a randomnumber between min and max
function rn(min, max)
{
	var randomNumber = Math.floor(Math.random() * max) + min;
	return randomNumber; 
}
