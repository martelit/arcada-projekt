var requirejsconfig = {
	baseUrl: 'js',
	paths:  {
		jquery:		'lib/jquery',
		jqm: 		'lib/jqm/jquery.mobile',
		generator:	'back/QuestionGenerator',
		store:		'back/Store',
		back:		'back/backend',
		sounds:		'front/sounds',
		helper:		'front/helper',
		stats:		'front/stats',
		front:		'front/main',
        phaser:     'bonus-game/src/js/lib/phaser',
/*        pixi:       'bonus-game/src/js/lib/pixi',
        p2:         'bonus-game/src/js/lib/p2',*/
        bonus:      'bonus-game/src/js/Bonus'
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back','sounds','helper','bonus', 'phaser'],
		'back': ['generator', 'store'],
		'helper': ['back'],
		'bonus':['phaser']
	}
}
requirejs.config(requirejsconfig);
require(['jquery', 'jqm', 'back', 'generator', 'store',
	'helper', 'stats', 'front', 'sounds',
	'phaser', /*'pixi', 'p2',*/'bonus' ],
function($,         jqm,   back,   generator,   store,   
	 helper,   stats,   front,   sounds,
	phaser,   /* pixi,   p2,*/  bonus
	){
	$(function(){
	});

}, function(err){
	var failedId = err.requireModules && err.requireModules[0];
	console.log('require.js error:');
	console.log(err.requireModules);
	if(failedId === 'bonus'){
		console.log("failed to load bonus, trying Bonus instead");
		requirejs.undef(failedId);
		requirejsconfig.paths.bonus = 'bonus-game/src/js/bonus';
		requirejs.config(requirejsconfig);
		require(['bonus'], function(bonus){});
	}
	
});


