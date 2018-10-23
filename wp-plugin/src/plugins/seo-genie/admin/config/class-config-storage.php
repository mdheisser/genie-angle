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
    }

    /**
     * Returns the table name to use.
     *
     * @return string The table name.
     */
    public function get_table_name() {
        return $this->database_proxy->get_table_name();
    }

    /**
     * Creates the database table.
     *
     * @return boolean True if the table was created, false if something went wrong.
     */
    public function install() {
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
    }

    /**
     * Inserts the owner credential into the database.
     *
     * @return void
     */
    public function save_admin_credential($email, $pass) {
        $query = "SELECT * FROM ". $this->database_proxy->get_table_name() . " WHERE option_name='owner_email'";
        $saved_credential = $this->database_proxy->get_results($query);

        if (empty($saved_credential)) {
            $protocol = array( 'http://', 'https://' );
            $host = str_replace( $protocol, '', get_site_url() );
            $user = $host . '@wordpress.plugin.com';
            $password = wp_generate_uuid4();

            $this->database_proxy->insert(
                array(
                    'option_name'  => 'owner_email',
                    'option_value' => $email,
                ),
                array( '%s', '%s' )
            );

            $this->database_proxy->insert(
                array(
                    'option_name'  => 'owner_pass',
                    'option_value' => $pass,
                ),
                array( '%s', '%s' )
            );
        }
    }
}
