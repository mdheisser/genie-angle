<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\services
 */

/**
 * Service for keyword
 */
class SEOgenie_Keyword_Service extends SEOgenie_Service {

    /** @var string */
    protected $endpoint;

    public function __construct() {

        parent::__construct();

        $this->endpoint = $this->api_url . 'keywords';
    }

    /**
     * Get all keywords for the site.
     *
     * @return array all keywords
     */
    public function get_all_keywords() {
        $endpoint = $this->endpoint . '?siteId=' . $this->site_id;
        $response = wp_remote_get( $endpoint );
        return json_decode( $response['body'] );
    }

    /**
     * Get keywords by multi ids.
     *
     * @param array Keyword IDs
     * @return array keywords
     */
    public function get_keywords_by_multi_ids( $ids ) {
        $str_ids = implode( ',', $ids );
        $endpoint = $this->endpoint . '?siteId=' . $this->site_id . '&ids=' . $str_ids;
        $response = wp_remote_get( $endpoint );
        return json_decode( $response['body'] );
    }
}
