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

    /** @var SEOgenie_Config_Storage */
    protected $config_storage;

    public function __construct() {

        $this->generate_user();
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
        $this->register_pages();
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
        $result = $request->send();
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

        $response = wp_remote_post($endpoint, array('body' => json_encode($site)));
        $data = json_decode( $response['body'] );

        if (empty($data->message)) {
            $config_storage = new SEOgenie_Config_Storage();
            $config_storage->create_option('site_id', $data->_id);
            die('1');
        }

        die('0');
    }

    /**
     * Register all pages of website to seo genie system.
     *
     * @return void
     */
    protected function register_pages() {

        $pages = array();
        $post_status = array('publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'trash');

        $posts_query = new WP_Query( array(
            'post_type'         => "any",
            'post_status'       => $post_status,
            'posts_per_page'    => -1,
            'offset'            => '',
            'orderby'           => 'title',
            'order'             => 'ASC'
        ) );

        while ( $posts_query->have_posts() ):

            $posts_query->the_post();
            $pages[] = get_permalink();

        endwhile;

        $page_service = new SEOgenie_Page_Service();
        $response = $page_service->register_multi_pages($pages);

        die('1');
    }
}
