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
		$value = get_post_meta($post->ID, '_seogenie_meta_key', true);
		$title = get_the_title($post);
		$link = get_permalink($post);
		?>
		<table>
			<tr>
				<td><strong>Page Tile </strong></td>
				<td><?php echo $title; ?></td>
			</tr>
			<tr>
				<td><strong>Page Link </strong></td>
				<td><a href="<?php echo $link; ?>" target="_blank"><?php echo $link; ?></a></td>
			</tr>
		</table>
		<!-- <label for="seogenie_field">Page Title</label> -->
		<!-- <select name="seogenie_field" id="seogenie_field" class="postbox">
			<option value="">Select something...</option>
			<option value="something" <?php selected($value, 'something'); ?>>Something</option>
			<option value="else" <?php selected($value, 'else'); ?>>Else</option>
		</select> -->
		<?php
	}
}
