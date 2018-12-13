<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\services
 */

/**
 * Service for keyword
 */
class SEOgenie_Page_Service extends SEOgenie_Service {

    /** @var string */
    protected $endpoint;

    public function __construct() {

        parent::__construct();

        $this->endpoint = $this->api_url . 'pages';
    }

    /**
     * Register new page to seogenie system.
     *
     * @param string page url
     * @return void
     */
    public function register_page( $url ) {
        $body = array(
            'pageUrl' => $url,
            'siteID'  => $this->site_id
        );
        $response = wp_remote_post( $this->endpoint, array('body' => json_encode($body)) );
        return json_decode( $response['body'] );
    }

    /**
     * Register multi pages to seogenie system.
     *
     * @param string page urls
     * @return void
     */
    public function register_multi_pages( $urls ) {

        $body = array();

        foreach ($urls as $key => $url) {
            $page = array(
                'pageUrl' => $url,
                'siteID'  => $this->site_id
            );
            $body[] = $page;
        }

        $response = wp_remote_post( $this->endpoint, array('body' => json_encode($body)) );
        return json_decode( $response['body'] );
    }

    /**
     * Get page by url.
     *
     * @return array page
     */
    public function get_page_by_url( $url ) {
        $endpoint = $this->endpoint . '?siteId=' . $this->site_id . '&pageUrl=' . $url;
        $response = wp_remote_get( $endpoint );
        return json_decode( $response['body'] );
    }
}
