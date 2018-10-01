(function () {
	'use strict';

	angular
		.module('app.lazyload')
		.constant('APP_REQUIRES', {
			// jQuery based and standalone scripts
			scripts: {
				'modernizr': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/modernizr/modernizr.custom.js'],
				'icons': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/Font-Awesome/css/font-awesome.min.css',
					SEOgenie.pluginsUrl + 'admin/app/dist/vendor/simple-line-icons/css/simple-line-icons.css'
				],
				'weather-icons': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/weather-icons/css/weather-icons.min.css',
					SEOgenie.pluginsUrl + 'admin/app/dist/vendor/weather-icons/css/weather-icons-wind.min.css'
				],
				'loadGoogleMapsJS': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/load-google-maps/load-google-maps.js'],
				'whirl': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/whirl/dist/whirl.css'],
				'classyloader': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
				'animo': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/animo.js/animo.js'],
				'fastclick': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/fastclick/lib/fastclick.js'],
				'sparklines': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/sparkline/index.js'],
				'screenfull': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/screenfull/dist/screenfull.js'],
				'moment': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/moment/min/moment-with-locales.min.js'],
				'loaders.css': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/loaders.css/loaders.css', 'vendor/loaders.css/loaders.css.js'],
				'spinkit': [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/spinkit/css/spinkit.css']
			},
			// Angular based script (use the right module name)
			modules: [{
					name: 'ui.map',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-ui-map/ui-map.js']
				},
				{
					name: 'smart-table',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-smart-table/dist/smart-table.min.js']
				},
				{
					name: 'flag-icons',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/flag-icon-css/css/flag-icon.min.css']
				},
				{
					name: 'toastr',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-toastr/dist/angular-toastr.tpls.min.js', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-toastr/dist/angular-toastr.min.css']
				},
				{
					name: 'gridster',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-gridster/dist/angular-gridster.min.js', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-gridster/dist/angular-gridster.min.css']
				},
				{
					name: 'ng-sortable',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ng-sortable/dist/ng-sortable.min.css', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ng-sortable/dist/ng-sortable.style.css', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ng-sortable/dist/ng-sortable.min.js']
				},
				{
					name: 'content-editable',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-content-editable/dist/angular-content-editable.js']
				},
				{
					name: 'busy-button',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-busy-button/dist/angular-busy-button.min.js', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-busy-button/dist/angular-busy-button.css']
				},
				{
					name: 'md-steppers',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/md-steppers/dist/md-steppers.min.js', SEOgenie.pluginsUrl + 'admin/app/dist/vendor/md-steppers/dist/md-steppers.min.css']
				},
				{
					name: 'ui.select',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-ui-select/dist/select.js',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-ui-select/dist/select.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/select2/dist/css/select2.min.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/selectize/dist/css/selectize.default.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/selectize/dist/css/selectize.bootstrap3.css'
					]
				},
				{
					name: 'xeditable',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-xeditable/dist/js/xeditable.min.js',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/angular-xeditable/dist/css/xeditable.min.css'
					]
				},
				{
					name: 'ng-dialog',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ngDialog/css/ngDialog.min.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ngDialog/css/ngDialog-theme-default.min.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ngDialog/js/ngDialog.min.js'
					]
				},
				{
					name: 'highcharts',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/highcharts/highcharts.js']
				},
				{
					name: 'highcharts-export',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/highcharts/modules/exporting.js']
				},
				{
					name: 'highcharts-ng',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/highcharts-ng/dist/highcharts-ng.min.js',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/highcharts-ng/dist/highcharts-ng.css']
				},
				{
					name: 'ng-bootstrap-select',
					files: [SEOgenie.pluginsUrl + 'admin/app/dist/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/bootstrap/dist/js/bootstrap.min.js',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
						SEOgenie.pluginsUrl + 'admin/app/dist/vendor/ng-bootstrap-select/build/ng-bootstrap-select.min.js'
					]
				}
			]
		});

})();