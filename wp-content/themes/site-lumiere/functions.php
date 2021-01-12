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

	// -------------------- CSS libraries --------------------//

    // Styling for the datepicker. For simplicity I've linked to the jQuery UI CSS on a CDN.
    wp_register_style( 'jquery-ui', 'https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css' );
    wp_enqueue_style( 'jquery-ui' ); 
	
	// material design icons
	wp_enqueue_style( 'material-design-style',
					get_stylesheet_directory_uri() .'/lib/material-design/material-components-web.min.css',
					array(),
					null,
					'all');
	// material design CSS
	wp_enqueue_style( 'material-design-icon', 
					get_stylesheet_directory_uri() .'/lib/material-design/material-icon.css', 
					array(),
					null,
					'all');
	// trumbowyg design CSS
	wp_enqueue_style( 'trumbowyg-style', 
					get_stylesheet_directory_uri() .'/lib/trumbowyg/ui/trumbowyg.min.css', 
					array(),
					null,
					'all');
	wp_enqueue_style( 'trumbowyg-emoji-style', 
					get_stylesheet_directory_uri() .'/lib/trumbowyg/plugins/emoji/ui/trumbowyg.emoji.min.css',
					array(),
					null,
					'all');
	wp_enqueue_style( 'trumbowyg-colors-style', 
					get_stylesheet_directory_uri() .'/lib/trumbowyg/plugins/colors/ui/trumbowyg.colors.min.css',
					array(),
					null,
					'all');

	// -------------------- JS libraries --------------------//

    // Load the datepicker script (pre-registered in WordPress).
    wp_enqueue_script( 'jquery-ui-datepicker' );
	
	// material design script
	wp_enqueue_script('material-design-js', 
						get_stylesheet_directory_uri() .'/lib/material-design/material-components-web.min.js',
						array(),
						null,
						false);
	// trumbowyg script (rich text)
	wp_enqueue_script('trumbowyg',
						get_stylesheet_directory_uri() .'/lib/trumbowyg/trumbowyg.min.js',
						array('jquery'),
						null,
						false);
	wp_enqueue_script('trumbowyg-lang-fr',
						get_stylesheet_directory_uri() .'/lib/trumbowyg/langs/fr.min.js',
						array('trumbowyg'),
						null,
						false);
	wp_enqueue_script('trumbowyg-emoji',
						get_stylesheet_directory_uri() .'/lib/trumbowyg/plugins/emoji/trumbowyg.emoji.min.js',
						array('trumbowyg'),
						null,
						false);
	wp_enqueue_script('trumbowyg-colors',
						get_stylesheet_directory_uri() .'/lib/trumbowyg/plugins/colors/trumbowyg.colors.js',
						array('trumbowyg'),
						null,
						false);
	wp_enqueue_script('trumbowyg-colors',
						get_stylesheet_directory_uri() .'/lib/trumbowyg/plugins/allowtagsfrompaste/trumbowyg.allowtagsfrompaste.min.js',
						array('trumbowyg'),
						null,
						false);
	
	// -------------------- JS custom --------------------//
	// custom script about buddy message menu
	wp_enqueue_script('commons',
						get_stylesheet_directory_uri() .'/js/commons.js',
						array('jquery', 'jquery-ui-datepicker', 'trumbowyg', 'material-design-js'),
						null,
						true);
	// custom script about buddy message menu
	wp_enqueue_script('message-menu',
						get_stylesheet_directory_uri() .'/js/message-menu.js',
						array('commons'),
						null,
						true);
	// custom script to apply rich textarea style (post and edit message editor)
	wp_enqueue_script('rich-text-editor',
						get_stylesheet_directory_uri() .'/js/rich-text-decorator.js',
						array('commons'),
						null,
						true);
						
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );


/****************************** CUSTOM : enable the HTML in BP activity content *******************************/


#*********************************************************
#  set allowable html tags
#*********************************************************

function allowTag($tag, $attributes = []) {
	global $allowedtags;
	$attrArray['style'] = array();
	$attrArray['class'] = array();
	foreach ($attributes as &$attr) {
		$attrArray[$attr] = array();
	}
	$allowedtags[$tag] = $attrArray;
}
function my_allowed_tags() {
	global $allowedtags;
	$allowedtags = [];
	allowTag('p');
	allowTag('span');
	allowTag('a', ['href', 'title', 'target']);
	allowTag('img', ['src', 'alt', 'width']);
	allowTag('b');
	allowTag('i');
	allowTag('em');
	allowTag('strong');
	allowTag('blockquote', ['cite']);
	allowTag('cite');
	allowTag('code');
	allowTag('pre');
	allowTag('del', ['datetime']);
	allowTag('q');
	allowTag('strike');
	allowTag('sub');
	allowTag('sup');
	allowTag('h1');
	allowTag('h2');
	allowTag('h3');
	allowTag('h4');
	allowTag('hr');
	allowTag('u');
	allowTag('center');
	allowTag('big');
	allowTag('tt');
	allowTag('br');
	allowTag('dl');
	allowTag('dt');
	allowTag('dd');
	allowTag('ul');
	allowTag('li');
	allowTag('ol');
	allowTag('font', ['size', 'color', 'face']);
	allowTag('strong');
}
add_action( 'bp_activity_allowed_tags', 'my_allowed_tags', 1 );

/** Pour wordpress 5.4 **/
function custom_safe_style_disallowed_chars_filter( $regex ) {
	return '%a^%'; // Regex with no matches.
}
add_filter( 'safe_style_disallowed_chars', 'custom_safe_style_disallowed_chars_filter' );
/** Pour wordpress 5.5 **/
function custom_safecss_allow_css( $allow_css, $css_test_string ) {
	// authorize rgb color css style
	return true;
}
add_filter('safecss_filter_attr_allow_css', 'custom_safecss_allow_css');

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
	}else{
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
		$customDate = format_date_CUSTOM(
				convertDateIso8601WithTimezone(
					bp_core_get_iso8601_date( $activities_template->activity->date_recorded )
				)
			);
		$recentClass = '';
		$dateIcon = '';
		if (strpos($customDate, 'aujour') !== false) {
			$recentClass = 'recent';
			$customDate = substr($customDate, 18);
			$dateIcon = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
		}
		$activity_permalink = bp_activity_get_permalink( $activities_template->activity->id, $activities_template->activity );
		$activity_meta      = sprintf( '%1$s <a href="%2$s" class="view activity-time-since bp-tooltip" data-bp-tooltip="%3$s">%4$s%7$s<span class="time-date %6$s">%5$s</a>',
 			$new_content,
			$activity_permalink,
			esc_attr__( 'View Discussion', 'buddypress' ),
			$time_since,
			$customDate,
			$recentClass,
			$dateIcon
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

	$customDate = format_date_CUSTOM(convertDateIso8601WithTimezone(bp_core_get_iso8601_date( $activities_template->activity->current_comment->date_recorded )));
	$recentClass = '';
	$dateIcon = '';
	if (strpos($customDate, 'aujour') !== false) {
		$recentClass = 'recent';
		$customDate = substr($customDate, 18);
		$dateIcon = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
	}
	printf( __( '<a href="%1$s">%2$s</a> replied <a href="%3$s" class="activity-time-since"><span class="time-since">%4$s</span>%7$s<span class="time-date %6$s">%5$s</span></a>', 'buddypress' ), 
		bp_get_activity_comment_user_link(), 
		bp_get_activity_comment_name(), 
		bp_get_activity_comment_permalink(), 
		bp_get_activity_comment_date_recorded(),
		$customDate,
		$recentClass,
		$dateIcon
	);
}
add_action( 'display_custom_comment_header', 'bp_comment_action_CUSTOM' );


/*-----------------------------------------------------------*/
// Asgaros forum : auto subscription
/*-----------------------------------------------------------*/
add_action('user_register', 'change_subscription_settings', 10, 1);
function change_subscription_settings($user_id) {
	update_user_meta($user_id, 'asgarosforum_subscription_global_posts', 1);
	delete_user_meta($user_id, 'asgarosforum_subscription_global_topics');
}

/*-----------------------------------------------------------*/
// Asgaros forum : threads order
/*-----------------------------------------------------------*/
function custom_asgarosforum_filter_get_posts_order($order) {
	$order = 'p1.date ASC';
	return $order;
}
add_filter('asgarosforum_filter_get_posts_order', 'custom_asgarosforum_filter_get_posts_order');

/*-----------------------------------------------------------*/
// Buddypress : Filter messages
/*-----------------------------------------------------------*/

function buddydev_filter_activities_query_args( $r ) {
	
	// filter by terms
	if ( ! empty( $_POST['search-custom'] ) ) {
		$r[ 'search_terms' ] = $_POST['search-custom'];
	}
	
	// filter by terms
	if ( ! empty( $_POST['user-activity-custom'] ) ) {
		$r[ 'user_id' ] = $_POST['user-activity-custom'];
	}
	
	// comments display mode
	if ( ! empty( $_POST['comments-display-mode-custom'] ) 
		|| $_POST['comments-display-mode-custom'] === false ) {
		$r[ 'display_comments' ] = $_POST['comments-display-mode-custom'];
	}
	
	// activity display order
	if ( ! empty( $_POST['msg-display-order-custom'] ) ) {
		$r[ 'sort' ] = $_POST['msg-display-order-custom'];
	}
	
	// custom number of results
	// Check if cookie is already set
	if(isset($_COOKIE['loading-page-size'])) {
		$r[ 'per_page' ] = $_COOKIE['loading-page-size'];
	} else {
		$r[ 'per_page' ] = 20;
	}
	
	// filter by date
	if ( ! empty( $_POST['search-min-date-custom'] ) ) {
		if ( ! empty( $_POST['search-max-date-custom'] ) ) {
			$r['date_query'] = array( array( 
				'after' => date('Y-m-d H:i:s', $_POST['search-min-date-custom']),
				'before' => date('Y-m-d H:i:s', $_POST['search-max-date-custom'])
			) );
		} else {
			$r['date_query'] = array( array( 
				'after' => date('Y-m-d H:i:s', $_POST['search-min-date-custom'])
			) );
		}
	} else if ( ! empty( $_POST['search-max-date-custom'] ) ) {
		$r['date_query'] = array( array( 
			'before' => date('Y-m-d H:i:s', $_POST['search-max-date-custom'])
		) );
	}
	
	return $r;
}
add_filter( 'bp_after_has_activities_parse_args', 'buddydev_filter_activities_query_args' );

/*update_option( 'comment_max_links', 100 );*/

/*-----------------------------------------------------------*/
// Buddypress : Tinymce message editor 
/*-----------------------------------------------------------*/
function custom_whats_new_tiny_editor() {

	// building the what's new textarea
	$content = '';
	if ( isset( $_GET['r'] ) ) :
	$content = esc_textarea( $_GET['r'] ); 
	endif;
	
	// adding tinymce tools
	$editor_id = 'whats-new';
	$settings = array( 
			'textarea_name' 	=> 'whats-new',
			'teeny' 			=> true,
			'media_buttons' 	=> false, 
			'drag_drop_upload' 	=> true, 
			'quicktags'			=> false,
			'statusbar' 		=> false,
			'resize' 			=> false);	
	// get the editor	
	wp_editor( $content, $editor_id, $settings );
}
add_action( 'custom_whats_new_textarea', 'custom_whats_new_tiny_editor' );

/*-----------------------------------------------------------*/
// Blocks pages from different users and users who aren't logged in
/*-----------------------------------------------------------*/
function endsWith( $haystack, $needle ) {
	return substr($haystack, -strlen($needle))===$needle;
}
function bp_redirect_pages() {
    $current_user = wp_get_current_user();
    $group_id = 27;  // alchimie
    $url = $_SERVER['REQUEST_URI'];
    // Blocks users who aren't full members from group pages
    if ( endsWith($url, '/alchimie/') && !groups_is_user_member( $current_user->ID, $group_id ) ) {
        wp_redirect( home_url() );
    }
}
add_action( 'template_redirect', 'bp_redirect_pages' );