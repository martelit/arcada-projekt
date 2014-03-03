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
        pixi:       'bonus-game/src/js/lib/pixi',
        p2:         'bonus-game/src/js/lib/p2',
        bonus:      'bonus-game/src/js/bonus'
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back','sounds','helper','bonus'],
		'back': ['generator', 'store'],
		'helper': ['back']
	}
}
requirejs.config(requirejsconfig);
require(['jquery', 'jqm', 'back', 'generator', 'store', 'helper', 'stats', 'front', 'sounds', 'bonus'],
function($, jqm, back, generator, store, helper, stats, front, sounds, Bonus) {
});
