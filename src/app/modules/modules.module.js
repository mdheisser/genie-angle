// APP START
// ----------------------------------- 

(function () {
	'use strict';

	angular
		.module('app.modules', [
			'app.core',
			'app.routes',
			'app.sidebar',
			'app.navsearch',
			'app.preloader',
			'app.loadingbar',
			'app.translate',
			'app.settings',
			'app.maps',
			'app.utils',
			'app.material',
			'app.dashboard',
			'app.panels',
			'app.bootstrapui',
			'app.keywords',
			'app.sentenceParameters',
			'app.pages',
			'app.sentenceGenerator',
			'app.components',
			'components.pages',
			'components.websites',
			'validation',
			'validation.rule'
		]);
})();