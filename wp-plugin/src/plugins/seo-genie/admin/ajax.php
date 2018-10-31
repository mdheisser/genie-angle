<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin
 */

function wpseo_ajax_json_echo_die( $results ) {
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
 * Add new keyword
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
