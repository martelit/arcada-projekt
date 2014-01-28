require.config({
	baseUrl: 'js/lib',
	paths:  {
		jquery: 'jquery',
		jqm: 	'../lib/jqm/jquery.mobile',
		back:	'../back/generator',
		front:	'../front/main',
		sounds: '../front/sounds',
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back']
	}
});
require([ 'jquery', 'jqm', 'back', 'front', 'sounds' ],
function(  $,        jqm,   back,   front, sounds){
	$(function(){
	});

});
