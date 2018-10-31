<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin\config
 */

/**
 * Represents the storage of an seo genie configuration.
 */
class SEOgenie_Config_Storage {

    const TABLE_NAME = 'seogenie_config';

    /** @var SEOgenie_DB_Proxy */
    protected $database_proxy;

    /** @var null|string Deprecated. */
    protected $table_prefix;

    /** @var string */
    protected $user_email;

    /** @var uuid */
    protected $user_pass;

    /**
     * Initializes the database table.
     *
     * @param string $table_prefix Optional. Deprecated argument.
     */
    public function __construct( $table_prefix = null ) {
        if ( $table_prefix !== null ) {
            _deprecated_argument( __METHOD__, 'SEOgenie 1.0' );
        }

        $this->database_proxy = new SEOgenie_DB_Proxy( $GLOBALS['wpdb'], self::TABLE_NAME, true );

        $this->generate_user();
    }

    /**
     * Creates the database table.
     *
     * @return boolean True if the table was created, false if something went wrong.
     */
    public function initialize() {
        $this->database_proxy->create_table(
            array(
                'id bigint(20) unsigned NOT NULL AUTO_INCREMENT',
                'option_name varchar(255) NOT NULL',
                'option_value varchar(255) NOT NULL'
            ),
            array(
                'PRIMARY KEY (id)'
            )
        );

        $this->create_option('owner_email', $this->user_email);
        $this->create_option('owner_pass', $this->user_pass);
    }

    /**
     * Insert new option.
     *
     * @return void
     */
    public function create_option($name, $value) {
        $query = "SELECT * FROM ". $this->database_proxy->get_table_name() . " WHERE option_name='" . $name . "'";
        $saved_option = $this->database_proxy->get_results($query);

        if (empty($saved_option)) {
            $this->database_proxy->insert(
                array(
                    'option_name'  => $name,
                    'option_value' => $value,
                ),
                array( '%s', '%s' )
            );
        }
    }

    /**
     * Get an option value.
     *
     * @return string $option_value
     */
    public function get_option_value($option_name) {
        $query = "SELECT * FROM ". $this->database_proxy->get_table_name() . " WHERE option_name='" . $option_name . "'";
        $saved_option = $this->database_proxy->get_results($query);

        if (empty($saved_option)) {
            return '';
        } else {
            return $saved_option[0]->option_value;
        }
    }

    /**
     * Generate user credential for seogenie system.
     *
     * @return void
     */
    protected function generate_user() {
        $protocol = array( 'http://', 'https://' );
        $host = str_replace( $protocol, '', get_site_url() );
        $this->user_email = $host . '@wordpress.plugin.com';
        $this->user_pass = wp_generate_uuid4();
    }
}
