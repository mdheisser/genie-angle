(function () {
	'use strict';

	angular
		.module('app.lazyload')
		.constant('APP_REQUIRES', {
			// jQuery based and standalone scripts
			scripts: {
				'modernizr': ['vendor/modernizr/modernizr.custom.js'],
				'icons': ['vendor/Font-Awesome/css/font-awesome.min.css',
					'vendor/simple-line-icons/css/simple-line-icons.css'
				],
				'weather-icons': ['vendor/weather-icons/css/weather-icons.min.css',
					'vendor/weather-icons/css/weather-icons-wind.min.css'
				],
				'loadGoogleMapsJS': ['vendor/load-google-maps/load-google-maps.js'],
				'whirl': ['vendor/whirl/dist/whirl.css'],
				'classyloader': ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
				'animo': ['vendor/animo.js/animo.js'],
				'fastclick': ['vendor/fastclick/lib/fastclick.js'],
				'sparklines': ['vendor/sparkline/index.js'],
				'screenfull': ['vendor/screenfull/dist/screenfull.js'],
				'moment': ['vendor/moment/min/moment-with-locales.min.js'],
				'loaders.css': ['vendor/loaders.css/loaders.css', 'vendor/loaders.css/loaders.css.js'],
				'spinkit': ['vendor/spinkit/css/spinkit.css']
			},
			// Angular based script (use the right module name)
			modules: [{
					name: 'ui.map',
					files: ['vendor/angular-ui-map/ui-map.js']
				},
				{
					name: 'smart-table',
					files: ['vendor/angular-smart-table/dist/smart-table.min.js']
				},
				{
					name: 'flag-icons',
					files: ['vendor/flag-icon-css/css/flag-icon.min.css']
				},
				{
					name: 'toastr',
					files: ['vendor/angular-toastr/dist/angular-toastr.tpls.min.js', 'vendor/angular-toastr/dist/angular-toastr.min.css']
				},
				{
					name: 'gridster',
					files: ['vendor/angular-gridster/dist/angular-gridster.min.js', 'vendor/angular-gridster/dist/angular-gridster.min.css']
				},
				{
					name: 'ng-sortable',
					files: ['vendor/ng-sortable/dist/ng-sortable.min.css', 'vendor/ng-sortable/dist/ng-sortable.style.css', 'vendor/ng-sortable/dist/ng-sortable.min.js']
				},
				{
					name: 'content-editable',
					files: ['vendor/angular-content-editable/dist/angular-content-editable.js']
				},
				{
					name: 'busy-button',
					files: ['vendor/angular-busy-button/dist/angular-busy-button.min.js', 'vendor/angular-busy-button/dist/angular-busy-button.css']
				},
				{
					name: 'md-steppers',
					files: ['vendor/md-steppers/dist/md-steppers.min.js', 'vendor/md-steppers/dist/md-steppers.min.css']
				},
				{
					name: 'ui.select',
					files: ['vendor/angular-ui-select/dist/select.js',
						'vendor/angular-ui-select/dist/select.css',
						"vendor/select2/dist/css/select2.min.css",
						"vendor/selectize/dist/css/selectize.default.css",
						"vendor/selectize/dist/css/selectize.bootstrap3.css"
					]
				},
				{
					name: 'xeditable',
					files: ['vendor/angular-xeditable/dist/js/xeditable.min.js',
						'vendor/angular-xeditable/dist/css/xeditable.min.css'
					]
				},
				{
					name: 'ng-dialog',
					files: ['vendor/ngDialog/css/ngDialog.min.css',
						'vendor/ngDialog/css/ngDialog-theme-default.min.css',
						'vendor/ngDialog/js/ngDialog.min.js'
					]
				},
				{
					name: 'highcharts',
					files: ['vendor/highcharts/highcharts.js']
				},
				{
					name: 'highcharts-export',
					files: ['vendor/highcharts/modules/exporting.js']
				},
				{
					name: 'highcharts-ng',
					files: ['vendor/highcharts-ng/dist/highcharts-ng.min.js',
						'vendor/highcharts-ng/dist/highcharts-ng.css']
				},
				{
					name: 'ng-bootstrap-select',
					files: ['vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
						'vendor/bootstrap/dist/js/bootstrap.min.js',
						'vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
						'vendor/ng-bootstrap-select/build/ng-bootstrap-select.min.js'
					]
				}
			]
		});

})();