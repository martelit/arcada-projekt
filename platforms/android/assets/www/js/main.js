require.config({
	baseUrl: 'js/lib',
	paths:  {
		jquery: 'jquery',
		jqm: 	'../lib/jqm/jquery.mobile',
		back:	'../back/generator',
		front:	'../front/main'
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back']
	}
});
require([ 'jquery', 'jqm', 'back', 'front' ],
function(  $,        jqm,   back,   front){
	$(function(){
	});

});
