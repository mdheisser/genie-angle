<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin
 */

function echo_ajax_json( $results ) {
    echo wp_json_encode( $results );
    die();
}

/**
 * Setup SEOgenie system
 */
add_action( 'wp_ajax_setup_seogenie', 'setup_seogenie' );

function setup_seogenie() {
    $SEOgenie = new SEOgenie_Setup();
    $SEOgenie->setup();
}

/**
 * Add new keyword to site
 */
add_action( 'wp_ajax_add_keyword', 'add_keyword' );

function add_keyword() {
    $str = $_POST['keywords'];
    $keywords = explode(",", $str);
    // Get site info
    $config_storage = new SEOgenie_Config_Storage();
    $email = $config_storage->get_option_value('owner_email');

    $endpoint = SEOGENIE_API_URL . 'sites?userId=' . $email . '&url=' . get_site_url();
    $response = wp_remote_get( $endpoint );
    $site = json_decode( $response['body'] )[0];

    // Add new keywords
    $keywordsData = array();
    foreach ($keywords as $value) {
        $element = array();
        $element['text'] = $value;
        $element['siteID'] = $site->_id;
        array_push($keywordsData, $element);
    }

    $endpointKeywords = SEOGENIE_API_URL . 'keywords';

    $response = wp_remote_post($endpointKeywords, array('body' => json_encode($keywordsData)));
    $data = json_decode( $response['body'] );

    if (empty($data->message)) {
        die('1');
    }

    die('0');
}

/**
 * Get all keywords.
 */
add_action( 'wp_ajax_get_page_info', 'get_page_info' );

function get_page_info() {
    $url = $_POST['url'];
    $page_service = new SEOgenie_Page_Service();
    $page = $page_service->get_page_by_url( $url );
    if (count( $page ) == 0) {
        $page = $page_service->register_page( $url );
    }
    echo_ajax_json( $page );
}

/**
 * Get all keywords.
 */
add_action( 'wp_ajax_get_all_keywords', 'get_all_keywords' );

function get_all_keywords() {
    $keyword_service = new SEOgenie_Keyword_Service();
    $keywords = $keyword_service->get_all_keywords();
    echo_ajax_json( $keywords );
}

/**
 * Get assigned keywords to specific page.
 */
add_action( 'wp_ajax_get_assigned_keywords', 'get_assigned_keywords' );

function get_assigned_keywords() {
    $url = $_POST['url'];
    $keyword_service = new SEOgenie_Keyword_Service();
    $page_service = new SEOgenie_Page_Service();
    $page = $page_service->get_page_by_url( $url );

    $assigned_keywords = array();
    if (count( $page ) > 0) {

        $keyword_ids = array_merge( $page[0]->autoKeywordIDs, $page[0]->manualKeywordIDs );

        if ( count( $keyword_ids ) > 0 ) {
            $assigned_keywords = $keyword_service->get_keywords_by_multi_ids( $keyword_ids );
        }

    }
    echo_ajax_json( $assigned_keywords );
}

/**
 * Add a keyword to a page
 */
add_action( 'wp_ajax_add_keyword_page', 'add_keyword_page' );

function add_keyword_page() {
    $keyword_ids = $_POST['keyword_ids'];
    $page_id = $_POST['page_id'];

    $endpoint = SEOGENIE_API_URL . 'pages/' . $page_id;
    $data = array(
        'manualKeywordIDs' => $keyword_ids
    );
    $response = wp_remote_request($endpoint, array('method' => 'PUT', 'body' => json_encode($data)));
    die('1');
}

/**
 * Remove a keyword from a page
 */
add_action( 'wp_ajax_remove_keyword_from_page', 'remove_keyword_from_page' );

function remove_keyword_from_page() {
    $keyword_ids = $_POST['keyword_ids'];
    $page_id = $_POST['page_id'];

    $endpoint = SEOGENIE_API_URL . 'pages/' . $page_id;
    $data = array(
        'manualKeywordIDs' => empty($keyword_ids) ? array() : $keyword_ids
    );
    $response = wp_remote_request($endpoint, array('method' => 'PUT', 'body' => json_encode($data)));
    die('1');
}