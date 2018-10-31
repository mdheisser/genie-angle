(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	$(document).ready(function() {

		// Initalize
		$("#seogenie_setup_wizard").steps({
			headerTag: "h3",
			bodyTag: "section",
			transitionEffect: "slideLeft",
			stepsOrientation: "vertical",
			enableAllSteps: false,
			enablePagination: false
		});

		// Toggle button
		$('.lc-switch').lc_switch();

		// Bootstrap select
		$('.selectpicker').selectpicker({
			dropupAuto: false
		});

		// Get google domaims
		var url = SEOgenie.pluginsUrl + 'admin/js/googleEngine.json';
		$.get(url, function(response) {
			for (var key in response) {
				$('#se_domains').append('<option>Google' + response[key].Name + '</option>');
			}
			$("#se_domains").selectpicker('refresh');
		});

		$('#btn_setup_seogenie').click(function() {
			var data = {
				action: 'setup_seogenie'
			}
			$.post(SEOgenie.ajax_url, data, function(response) {
				if (response == '1') {
					console.log('The website was registered successfully.');
					$('#seogenie_setup_wizard').steps('next');
				} else {
					console.log('The website could not be registered.');
				}
			});
		});

		// Add new keywords for website.
		$('#btn_add_keywords').click(function() {
			var data = {
				action: 'add_keyword',
				keywords: $('#seogenie_setup_wizard textarea').val()
			}
			$.post(SEOgenie.ajax_url, data, function(response) {
				if (response == '1') {
					console.log('Keywords was added successfully.');
					$('#seogenie_setup_wizard').steps('next');
				} else {
					console.log('Keywords could not be added.');
				}
			});
		});

		// Get domains according to search engine
		$('#search_gngine').change(function() {
			var searchEngine = $(this).val()
			var url = SEOgenie.pluginsUrl + 'admin/js/' + searchEngine + '.json';
			$('#se_domains').empty();
			$.get(url, function(response) {
				for (var key in response) {
					$('#se_domains').append('<option>Google' + response[key].Name + '</option>');
				}
				$("#se_domains").selectpicker('refresh');
			});
		});
	});

})( jQuery );
