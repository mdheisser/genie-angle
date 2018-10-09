<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo-genie\admin\menu
 */

/**
 * Registers the regular admin menu.
 */
class SEOgenie_Menu {

	/** @var SEOgenie_Menu Instance */
	private static $instance;

	/**
	 * Registers all hooks to WordPress.
	 *
	 * @return SEOgenie_Menu
	 */
	static function getInstance()
	{
		if (!isset(self::$instance))
		{
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Initialize admin menus for plugin.
	 *
	 * @return void
	 */
	public function initialize()
	{
		add_action('admin_menu', array($this, 'initMenu'));
	}

	/**
	 * Add top-level menu and submenus.
	 *
	 * @return void
	 */
	public function initMenu()
	{
		// Add a new top-level menu (ill-advised):
		add_menu_page('SEOgenie plugin', 'SEOgenie', 6, __FILE__, '', 'dashicons-businessman');

		// Add submenus.
		// $isSetup = false;
		// if ($isSetup == true) {
			add_submenu_page(__FILE__, 'Setup SEOgenie', 'Setup', 6, __FILE__, array($this, 'showSetupPage'));
		// } else {
			add_submenu_page(__FILE__, 'Manage SEOgenie', 'Manage', 8, 'seogenie-manage', array($this, 'showManagePage'));
		// }
	}

	/**
	 * Shows an admin settings page.
	 *
	 * @param string $page Page to display.
	 *
	 * @return void
	 */
	public function showSetupPage() {
		require_once SEOGENIE_PATH . 'admin/pages/setup.php';
	}

	public function showManagePage() {
		require_once SEOGENIE_PATH . 'admin/pages/manage.php';
	}
}
