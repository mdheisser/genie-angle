<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\services
 */

/**
 * Service for interaction with backend.
 */
class SEOgenie_Service {

    /** @var string */
    protected $api_url;

    /** @var string */
    protected $site_id;

    public function __construct() {

        $this->api_url = SEOGENIE_API_URL;

        $config_storage = new SEOgenie_Config_Storage();
        $this->site_id = $config_storage->get_option_value( 'site_id' );
    }
}
