<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin
 */

/**
 * Setup SEOgenie system
 */
add_action( 'admin_post_setup_seogenie', 'setup_seogenie' );

function setup_seogenie() {
    $SEOgenie = new SEOgenie_Setup();
    $SEOgenie->setup();
}
