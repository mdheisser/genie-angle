<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.seo-genie.com
 * @since             1.0.0
 * @package           Seo_Genie
 *
 * @wordpress-plugin
 * Plugin Name:       SEOgenie
 * Plugin URI:        http://www.seo-genie.com
 * Description:       SEO Genie Automatically and dynamically optimize your website Pages
 * Version:           1.0.0
 * Author:            SEOgenie
 * Author URI:        http://www.seo-genie.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       seo-genie
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PLUGIN_NAME_VERSION', '1.0.0' );

if ( ! defined( 'WPSEO_FILE' ) ) {
  define( 'SEOGENIE_FILE', __FILE__ );
}

if ( ! defined( 'WPSEO_PATH' ) ) {
  define( 'SEOGENIE_PATH', plugin_dir_path( SEOGENIE_FILE ) );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-seo-genie-activator.php
 */
function activate_seo_genie() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-seo-genie-activator.php';
	Seo_Genie_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-seo-genie-deactivator.php
 */
function deactivate_seo_genie() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-seo-genie-deactivator.php';
	Seo_Genie_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_seo_genie' );
register_deactivation_hook( __FILE__, 'deactivate_seo_genie' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-seo-genie.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_seo_genie() {

	$plugin = new Seo_Genie();
	$plugin->run();

}
run_seo_genie();
