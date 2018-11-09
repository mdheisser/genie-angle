<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\metabox
 */

/**
 * Registers the meta box for pages.
 */
class SEOgenie_Metabox {

	/**
	 * Registers the hooks.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action('add_meta_boxes', array($this, 'add'));
		add_action('save_post', array($this, 'save'));
	}

	public static function add()
	{
		$screens = ['page'];
		foreach ($screens as $screen) {
			add_meta_box(
				'seogenie_page_box',          // Unique ID
				'SEO Genie', // Box title
				[self::class, 'html'],   // Content callback, must be of type callable
				$screen                  // Post type
			);
		}
	}

	public static function save($post_id)
	{
		if (array_key_exists('seogenie_field', $_POST)) {
			update_post_meta(
				$post_id,
				'_seogenie_meta_key',
				$_POST['seogenie_field']
			);
		}
	}

	public static function html($post)
	{
		$config_storage = new SEOgenie_Config_Storage();
		$site_id = $config_storage->get_option_value('site_id');

		$endpoint = SEOGENIE_API_URL . 'keywords?siteId=' . $site_id;
		$response = wp_remote_get( $endpoint );
		$keywords = json_decode( $response['body'] );
		include_once( SEOGENIE_PATH . 'admin/views/tabs/page.php' );
	}
}
