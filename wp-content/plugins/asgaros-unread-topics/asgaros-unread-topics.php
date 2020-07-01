<?php
/**
 * Plugin Name:       Asgaros Unread Topics
 * Description:       Add unread topics to Asgaros forum menu
 * Version:           1.0.0
 * Author:            Asgaros/Thomas
 * Author URI:        https://www.asgaros.de
 */
add_action('asgarosforum_custom_header_menu', 'custom_header_menu');
function custom_header_menu() {
  global $asgarosforum;
  echo '<a href="'.$asgarosforum->get_link('unread').'">Sujets non-lus</a>';
}