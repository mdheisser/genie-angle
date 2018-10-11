<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\filter
 */

/**
 * Registers the filter for pages.
 */
class SEOgenie_Page_Post_Filter {

	/**
	 * Registers the hooks.
	 *
	 * @return void
	 */
	public function __construct() {
		add_filter( 'manage_page_posts_columns', array( $this, 'seogenie_filter_page_posts_columns' ) );
		add_action( 'manage_page_posts_custom_column', array( $this, 'smashing_seogenie_column' ), 10, 2);
	}

	/**
	 * Registers columns for seogenie to pages grid.
	 */
	function seogenie_filter_page_posts_columns( $columns ) {
		$columns['keywords'] = __( 'Keywords' );
		$columns['violations'] = __( 'SEO Violations' );
		$columns['score'] = __( 'Score' );
		return $columns;
	}

	/**
	 * Set values to columns.
	 */
	function smashing_seogenie_column( $column, $post_id ) {
		// keywords column
		if ( 'keywords' === $column ) {
			$response = wp_remote_get( SEOGENIE_API_URL . 'pages/5b6d06602dcea28b9d7b61e5' );
			if ( is_array( $response ) ) {
				$body = json_decode($response['body'], true);
				$autokeyword_ids_count = count($body['autoKeywordIDs']);
				$manualkeyword_ids_count = count($body['manualKeywordIDs']);
				$total_count = $autokeyword_ids_count + $manualkeyword_ids_count;
				echo $total_count . '(' . $manualkeyword_ids_count . ')';
			} else {
				echo "0";
			}
		}
	}
}
