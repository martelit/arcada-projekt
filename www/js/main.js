require.config({
	baseUrl: 'js',
	paths:  {
		jquery:		'lib/jquery',
		jqm: 		'lib/jqm/jquery.mobile',
		generator:	'back/QuestionGenerator',
		store:		'back/Store',
		back:		'back/Backend',
		sounds:		'front/sounds',
		helper:		'front/helper',
		front:		'front/main'
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back','sounds'],
		'back': ['generator']
	}
});
require([ 'jquery', 'jqm', 'back', 'generator', 'store', 'helper', 'front', 'sounds' ],
function(  $,        jqm,   back,   generator,   store,   helper,   front,   sounds){
	$(function(){
	});

});
