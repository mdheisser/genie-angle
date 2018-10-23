<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin
 */

/**
 * Represents the initial setup of seo genie system.
 */
class SEOgenie_Setup {

    /** @var string */
    protected $user_email;

    /** @var uuid */
    protected $user_pass;

    public function __construct() {

        $this->generate_user();

        // Create config table.
        $config = new SEOgenie_Config_Storage();
        $config->install();
        $config->save_admin_credential($this->user_email, $this->user_pass);
    }

    /**
     * Generate user credential for seogenie system.
     *
     * @return void
     */
    protected function generate_user() {
        $protocol = array( 'http://', 'https://' );
        $host = str_replace( $protocol, '', get_site_url() );
        $this->user_email = $host . '@wordpress.plugin.com';
        $this->user_pass = wp_generate_uuid4();
    }

    /**
     * Setup SEOgenie system.
     *
     * @return void
     */
    public function setup() {
        $this->register_user();
        $this->register_site();
    }

    /**
     * Register site owner to seo genie system.
     *
     * @return void
     */
    protected function register_user() {
        $credential = array(
            'username' => $this->user_email,
            'password' => $this->user_pass
        );
        $endpoint = SEOGENIE_API_URL . 'account/register';

        $request = new SEOgenie_Remote_Request( $endpoint );
        $request->set_body( json_encode($credential) );
        $request->send();
    }

    /**
     * Register site detail to seo genie system.
     *
     * @return void
     */
    protected function register_site() {
        $site = array(
            'url' => get_site_url(),
            'userID' => $this->user_email
        );
        $endpoint = SEOGENIE_API_URL . 'sites';

        $request = new SEOgenie_Remote_Request( $endpoint );
        $request->set_body( json_encode($site) );
        $request->send();
    }
}
