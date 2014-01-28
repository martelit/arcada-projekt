require.config({
	baseUrl: 'js',
	paths:  {
		jquery:		'lib/jquery',
		jqm: 		'lib/jqm/jquery.mobile',
		generator:	'back/QuestionGenerator',
		store:		'back/Store',
		back:		'back/Backend',
		front:		'front/main',
		sounds:		'front/sounds',
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back'],
		'back': ['generator']
	}
});
require([ 'jquery', 'jqm', 'back', 'generator', 'store', 'front', 'sounds' ],
function(  $,        jqm,   back,   generator,   store,   front, sounds){
	$(function(){
	});

});
