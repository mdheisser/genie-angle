<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://seogenie/dev-marko
 * @since      1.0.0
 *
 * @package    Seo_Genie
 * @subpackage Seo_Genie/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Seo_Genie
 * @subpackage Seo_Genie/admin
 * @author     Marko <markozzz37@gmail.com>
 */
class Seo_Genie_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Genie_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Genie_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// Setup page style
		wp_enqueue_style( 'fontawesome', plugin_dir_url( __FILE__ ) . 'css/font-awesome.min.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'social-icons', plugin_dir_url( __FILE__ ) . 'css/social-icons.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'jquery.steps', plugin_dir_url( __FILE__ ) . 'css/jquery.steps.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'bootstrap', plugin_dir_url( __FILE__ ) . 'css/bootstrap.min.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'bootstrap.select', plugin_dir_url( __FILE__ ) . 'css/bootstrap-select.min.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'lc_switch', plugin_dir_url( __FILE__ ) . 'css/lc_switch.css', array(), $this->version, 'all' );

		// Initial page style
		wp_enqueue_style( 'angular.material', plugin_dir_url( __FILE__ ) . 'app/dist/vendor/angular-material/angular-material.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'angular.app', plugin_dir_url( __FILE__ ) . 'app/dist/app/css/app.css', array(), $this->version, 'all' );		

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/seo-genie-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Genie_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Genie_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( 'jquery.steps', plugin_dir_url( __FILE__ ) . 'js/jquery.steps.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'bootstrap', plugin_dir_url( __FILE__ ) . 'js/bootstrap.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'bootstrap.select', plugin_dir_url( __FILE__ ) . 'js/bootstrap-select.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'lc_switch', plugin_dir_url( __FILE__ ) . 'js/lc_switch.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'engine.google', plugin_dir_url( __FILE__ ) . 'js/googleEngine.json', array( ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/seo-genie-admin.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->name . '-metabox-tab', plugin_dir_url( __FILE__ ) . 'js/metabox-tab.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->name . '-highchart', plugin_dir_url( __FILE__ ) . 'js/highchart/highcharts.js', array(), '6.2.0', false );
		wp_enqueue_script( $this->name . '-highchart-more', plugin_dir_url( __FILE__ ) . 'js/highchart/highcharts-more.js', array(), '6.2.0', false );
		wp_enqueue_script( $this->name . '-highchart-gauge', plugin_dir_url( __FILE__ ) . 'js/highchart/modules/solid-gauge.js', array(), '6.2.0', false );
		wp_localize_script( $this->plugin_name, 'SEOgenie', array(
			'pluginsUrl' => plugins_url() . '/seo-genie/',
			'app_dist'   => plugins_url() . '/seo-genie/admin/app/dist/',
			'ajax_url'   => admin_url( 'admin-ajax.php' ),
			'api_url'    => SEOGENIE_API_URL,
			'site_id'    => $this->get_site_id()
		));

		// Angular scripts
		wp_enqueue_script( 'angular', plugin_dir_url( __FILE__ ) . 'app/dist/app/js/base.js', array( ), $this->version, false );
		wp_enqueue_script( 'angular.materialjs', plugin_dir_url( __FILE__ ) . 'app/dist/vendor/angular-material/angular-material.js', array( ), $this->version, false );
		wp_enqueue_script( 'appjs', plugin_dir_url( __FILE__ ) . 'app/dist/app/js/app.js', array( ), $this->version, false );
	}

	/**
	 * Register the administration menu for this plugin into the WordPress Dashboard menu.
	 *
	 * @since    1.0.0
	 */

	public function add_plugin_admin_menu() {

		/*
		 * Add a settings page for this plugin to the Settings menu.
		 *
		 * NOTE:  Alternative menu locations are available via WordPress administration menu functions.
		 *
		 *        Administration Menus: http://codex.wordpress.org/Administration_Menus
		 *
		 */
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since    1.0.0
	 */

	public function add_action_links( $links ) {
		/*
		*  Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
		*/
	   $settings_link = array(
		'<a href="' . admin_url( 'options-general.php?page=' . $this->plugin_name ) . '">' . __('Settings', $this->plugin_name) . '</a>',
	   );
	   return array_merge(  $settings_link, $links );

	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since    1.0.0
	 */

	public function display_plugin_setup_page() {
		include_once( 'partials/seo-genie-admin-display.php' );
	}

	/**
	 * Get site ID on seogenie system.
	 *
	 */

	protected function get_site_id() {
		$config_storage = new SEOgenie_Config_Storage();
		return $config_storage->get_option_value('site_id');
	}

}
