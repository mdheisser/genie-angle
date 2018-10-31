<?php

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @link       http://seo-genie.com
 * @since      1.0.0
 * @package    Seo_Genie
 * @subpackage Seo_Genie/includes
 * @author     SEOgenie
 */
class Seo_Genie_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		$config_storage = new SEOgenie_Config_Storage();
        $config_storage->initialize();
	}

}
