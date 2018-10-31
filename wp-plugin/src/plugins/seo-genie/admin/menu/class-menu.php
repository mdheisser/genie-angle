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
        add_action('admin_menu', array($this, 'register_menu'));
    }

    /**
     * Add top-level menu and submenus.
     *
     * @return void
     */
    public function register_menu()
    {
        if (!$this->is_registered()) {
            add_menu_page(
                'SEOgenie',
                'SEOgenie',
                6,
                'seogenie_setup',
                array( $this, 'load_page' ),
                'dashicons-businessman'
            );
            add_submenu_page('seogenie_dashboard', '', 'Setup', 8, 'seogenie_setup', array($this, 'load_page'));
        } else {
            add_menu_page(
                'SEOgenie',
                'SEOgenie',
                6,
                'seogenie_manage',
                array( $this, 'load_page' ),
                'dashicons-businessman'
            );
            add_submenu_page('seogenie_dashboard', '', 'Manage', 8, 'seogenie_manage', array( $this, 'load_page' ));
        }
    }

    /**
     * Loads the requested admin settings page.
     *
     * @return void
     */
    public function load_page() {
        $page = filter_input( INPUT_GET, 'page' );
        $this->show_page( $page );
    }

    /**
     * Shows an admin settings page.
     *
     * @param string $page Page to display.
     *
     * @return void
     */
    protected function show_page( $page ) {
        switch ( $page ) {
            case 'seogenie_setup':
                require_once SEOGENIE_PATH . 'admin/pages/setup.php';
                break;

            case 'seogenie_manage':
                require_once SEOGENIE_PATH . 'admin/pages/manage.php';
                break;

            default:
                break;
        }
    }

    /**
     * Check whether the website was registered on seogenie system or not.
     *
     * @return boolean True if the website was registered on seogenie system, false if something went wrong.
     */
    protected function is_registered()
    {
        $config_storage = new SEOgenie_Config_Storage();
        $is_registered = $config_storage->get_option_value('site_id');

        if ($is_registered == '') {
            return false;
        }
        return true;
    }
}
