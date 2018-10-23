<?php
/**
 * SEOgenie plugin file.
 *
 * @package seo_genie\admin
 */

/**
 * Represents the proxy for communicating with the database
 */
class SEOgenie_DB_Proxy {

    /** @var string */
    protected $table_name;

    /** @var bool */
    protected $suppress_errors = true;

    /** @var wpdb */
    protected $database;

    /**
     * Sets the class attributes and registers the table.
     *
     * @param wpdb   $database           The database object.
     * @param string $table_name         The table name that is represented.
     */
    public function __construct( $database, $table_name, $suppress_errors = true ) {
        $this->table_name         = $table_name;
        $this->suppress_errors    = (bool) $suppress_errors;
        $this->database           = $database;

        // If the table prefix was provided, strip it as it's handled automatically.
        $table_prefix = $this->get_table_prefix();
        if ( ! empty( $table_prefix ) && strpos( $this->table_name, $table_prefix ) === 0 ) {
            $this->table_prefix = substr( $this->table_name, strlen( $table_prefix ) );
        }

        if ( ! $this->is_table_registered() ) {
            $this->register_table();
        }
    }

    /**
     * Inserts data into the database.
     *
     * @param array $data   Data to insert.
     * @param null  $format Formats for the data.
     *
     * @return false|int Total amount of inserted rows or false on error.
     */
    public function insert( array $data, $format = null ) {
        $this->pre_execution();

        $result = $this->database->insert( $this->get_table_name(), $data, $format );

        $this->post_execution();

        return $result;
    }

    /**
     * Executes the given query and returns the results.
     *
     * @param string $query The query to execute.
     *
     * @return array|null|object The resultset
     */
    public function get_results( $query ) {
        $this->pre_execution();

        $results = $this->database->get_results( $query );

        $this->post_execution();

        return $results;
    }

    /**
     * Creates a table to the database.
     *
     * @param array $columns The columns to create.
     * @param array $indexes The indexes to use.
     *
     * @return bool True when creation is successful.
     */
    public function create_table( array $columns, array $indexes = array() ) {
        $create_table = sprintf(
            'CREATE TABLE IF NOT EXISTS %1$s ( %2$s ) %3$s',
            $this->get_table_name(),
            implode( ',', array_merge( $columns, $indexes ) ),
            $this->database->get_charset_collate()
        );

        $this->pre_execution();

        $is_created = (bool) $this->database->query( $create_table );

        $this->post_execution();

        return $is_created;
    }

    /**
     * Executed before a query will be ran.
     */
    protected function pre_execution() {
        if ( $this->suppress_errors ) {
            $this->last_suppressed_state = $this->database->suppress_errors();
        }
    }

    /**
     * Executed after a query has been ran.
     */
    protected function post_execution() {
        if ( $this->suppress_errors ) {
            $this->database->suppress_errors( $this->last_suppressed_state );
        }
    }

    /**
     * Returns the full table name.
     *
     * @return string Full table name including prefix.
     */
    public function get_table_name() {
        return $this->get_table_prefix() . $this->table_name;
    }

    /**
     * Returns the prefix to use for the table.
     *
     * @return string The table prefix depending on the database context.
     */
    protected function get_table_prefix() {

        return $this->database->get_blog_prefix();
    }

    /**
     * Registers the table with WordPress.
     *
     * @return void
     */
    protected function register_table() {
        $table_name      = $this->table_name;
        $full_table_name = $this->get_table_name();

        $this->database->$table_name = $full_table_name;

        $this->database->tables[] = $table_name;
    }

    /**
     * Checks if the table has been registered with WordPress.
     *
     * @return bool True if the table is registered, false otherwise.
     */
    protected function is_table_registered() {

        return in_array( $this->table_name, $this->database->tables, true );
    }
}
