<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

// END ENQUEUE PARENT ACTION


function add_theme_scripts() {

	wp_enqueue_style( 'material-design-style',
					get_stylesheet_directory_uri() .'/css/lib/material-components-web.min.css',
					array(),
					null,
					'all');
	wp_enqueue_style( 'material-design-icon', 
					get_stylesheet_directory_uri() .'/css/lib/material-icon.css', 
					array(),
					null,
					'all');
	wp_enqueue_script('material-design-js', 
						get_stylesheet_directory_uri() .'/js/lib/material-components-web.min.js',
						array(),
						null,
						true);
	wp_enqueue_script('message-menu',
						get_stylesheet_directory_uri() .'/js/message-menu.js',
						array('material-design-js'),
						null,
						true);
						
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );



/****************************** CUSTOM Activity header *******************************/

function bp_activity_action_CUSTOM() {
	echo bp_get_activity_action_CUSTOM();
}
add_action( 'display_custom_activity_header', 'bp_activity_action_CUSTOM' );
//--------------------------------------------------------------------------
// Copier / Coller : du plugin Buddypress : @see bp_get_activity_action
//--------------------------------------------------------------------------
function bp_get_activity_action_CUSTOM( $args = array() ) {
	global $activities_template;

	$r = wp_parse_args( $args, array(
		'no_timestamp' => false,
	) );

	$action = apply_filters_ref_array( 'bp_get_activity_action_pre_meta', array(
		$activities_template->activity->action,
		&$activities_template->activity,
		$r
	) );

	if ( ! empty( $action ) && empty( $r['no_timestamp'] ) ) {
		//--------------------------------------------------------------------------
		// LA CUSTOMISATION SE FAIT ICI !!!!
		//--------------------------------------------------------------------------
		$action = bp_insert_activity_meta_CUSTOM( $action );
	}

	return apply_filters_ref_array( 'bp_get_activity_action', array(
		$action,
		&$activities_template->activity,
		$r
	) );
}





/*--------------------------------------------------------------------------
 * Fonctions de formatage de la date
 *--------------------------------------------------------------------------*/
function format_number(string $number): string {
	if (substr($number, 0, 1) == '0') {
		return substr($number, 1, 1);
	} else {
		return $number;
	}
}
function get_mount_name(string $mount_number): string {
	switch ($mount_number) {
		case '1':
			return 'janvier';
		case '2':
			return 'février';
		case '3':
			return 'mars';
		case '4':
			return 'avril';
		case '5':
			return 'mai';
		case '6':
			return 'juin';
		case '7':
			return 'juillet';
		case '8':
			return 'août';
		case '9':
			return 'septembre';
		case '10':
			return 'octobre';
		case '11':
			return 'novembre';
		case '12':
			return 'décembre';
		default:
			return '';
	}
}
function format_date_CUSTOM($time_date) {
	$current_date = getdate();
	// parse date
	$time_year = substr($time_date, 0, 4);
	$time_month = format_number(substr($time_date, 5, 2));
	$time_day_in_month = format_number(substr($time_date, 8, 2));
	$time_hour = format_number(substr($time_date, 11, 2));
	$time_min = substr($time_date, 14, 2);
	// format date display
	$time_date_formated = '';
	if($time_day_in_month != $current_date['mday'] 
		|| $time_month != $current_date['mon'] 
		|| $time_year != $current_date['year'] ) {
		$time_date_formated = $time_day_in_month.' '.get_mount_name($time_month).' ';
	} else {
		$time_date_formated = 'aujourd\'hui';
	}
	if($time_year != $current_date['year']) {
		$time_date_formated .= $time_year.' ';
	}
	$time_date_formated .= '&nbsp; '.$time_hour.' h '.$time_min;
	
	return $time_date_formated;
}
function convertDateIso8601WithTimezone($date) {
	$time = strtotime($date);
	$timezone = 'Europe/Paris';
	return date_format(date_timestamp_set(new DateTime(), $time)->setTimezone(new DateTimeZone($timezone)), 'c');
}

/*--------------------------------------------------------------------------
 * Header customisé (original BP function : @see bp_insert_activity_meta)
 *--------------------------------------------------------------------------*/
function bp_insert_activity_meta_CUSTOM( $content = '' ) {
	global $activities_template;

	// Strip any legacy time since placeholders from BP 1.0-1.1.
	$new_content = str_replace( '<span class="time-since">%s</span>', '', $content );

	// Get the time since this activity was recorded.
	$date_recorded  = bp_core_time_since( $activities_template->activity->date_recorded );

	// Set up 'time-since' <span>.
	$time_since = sprintf(
		'<span class="time-since" data-livestamp="%1$s">%2$s</span>',
		bp_core_get_iso8601_date( $activities_template->activity->date_recorded ),
		$date_recorded
	);

	/**
	 * Filters the activity item time since markup.
	 *
	 * @since 1.2.0
	 *
	 * @param array $value Array containing the time since markup and the current activity component.
	 */
	$time_since = apply_filters_ref_array( 'bp_activity_time_since', array(
		$time_since,
		&$activities_template->activity
	) );

	// Insert the permalink.
	if ( ! bp_is_single_activity() ) {

		// Setup variables for activity meta.
		/******************************************* CUSTOM :  add tag time-date : */
		$activity_permalink = bp_activity_get_permalink( $activities_template->activity->id, $activities_template->activity );
		$activity_meta      = sprintf( '%1$s <a href="%2$s" class="view activity-time-since bp-tooltip" data-bp-tooltip="%3$s">%4$s<span class="time-date">%5$s</a>',
 			$new_content,
			$activity_permalink,
			esc_attr__( 'View Discussion', 'buddypress' ),
			$time_since,
			format_date_CUSTOM(convertDateIso8601WithTimezone(bp_core_get_iso8601_date( $activities_template->activity->date_recorded ))),
		);

		/**
		 * Filters the activity permalink to be added to the activity content.
		 *
		 * @since 1.2.0
		 *
		 * @param array $value Array containing the html markup for the activity permalink, after being parsed by
		 *                     sprintf and current activity component.
		 */
		$new_content = apply_filters_ref_array( 'bp_activity_permalink', array(
			$activity_meta,
			&$activities_template->activity
		) );
	} else {
		$new_content .= str_pad( $time_since, strlen( $time_since ) + 2, ' ', STR_PAD_BOTH );
	}

	/**
	 * Filters the activity content after activity metadata has been attached.
	 *
	 * @since 1.2.0
	 *
	 * @param string $content Activity content with the activity metadata added.
	 */
	return apply_filters( 'bp_insert_activity_meta', $new_content, $content );
}





/****************************** CUSTOM Comment header *******************************/

/*--------------------------------------------------------------------------
 * Header customisé (@see comment.php)
 *--------------------------------------------------------------------------*/
function bp_comment_action_CUSTOM() {
	global $activities_template;

	printf( __( '<a href="%1$s">%2$s</a> replied <a href="%3$s" class="activity-time-since"><span class="time-since">%4$s</span><span class="time-date">%5$s</span></a>', 'buddypress' ), 
		bp_get_activity_comment_user_link(), 
		bp_get_activity_comment_name(), 
		bp_get_activity_comment_permalink(), 
		bp_get_activity_comment_date_recorded(),
		format_date_CUSTOM(convertDateIso8601WithTimezone(bp_core_get_iso8601_date( $activities_template->activity->current_comment->date_recorded )))
	);
}
add_action( 'display_custom_comment_header', 'bp_comment_action_CUSTOM' );


	