var requirejsconfig = {
	baseUrl: 'js',
	paths:  {
		app:		'app',
		jquery:		'lib/jquery',
		jqm: 		'lib/jqm/jquery.mobile',
		generator:	'back/QuestionGenerator',
		store:		'back/Store',
		back:		'back/backend',
		sounds:		'front/sounds',
		helper:		'front/helper',
		stats:		'front/stats',
		front:		'front/main',
        phaser:     'bonus/js/lib/phaser',
        pixi:       'bonus/js/lib/pixi',
        p2:         'bonus/js/lib/p2',
        bonus:      'bonus/js/bonus'
	},
	shim: {
		'jqm': ['jquery'],
		'front': ['back','sounds','helper','bonus'],
		'back': ['generator', 'store'],
		'helper': ['back']
	}
}
requirejs.config(requirejsconfig);
require(['app','jquery', 'jqm', 'back', 'generator', 'store', 'helper', 'stats', 'front', 'sounds', 'bonus'],
function(app, $, jqm, back, generator, store, helper, stats, front, sounds, Bonus) {
app.initialize();
});
