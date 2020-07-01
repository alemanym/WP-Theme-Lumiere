<?php

/*
  Plugin Name: Asgaros Forum BuddyPress-Integration
  Plugin URI: https://www.asgaros.de
  Description: Asgaros Forum BuddyPress-Integration.
  Version: 0.1.1
  Author: Thomas Belser
  Author URI: https://www.asgaros.de
  License: GPL2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
  Text Domain: asgaros-forum-buddypress
  Domain Path: /languages

  Asgaros Forum is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  any later version.

  Asgaros Forum is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Asgaros Forum. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/

/*

Features:
- Adds new activity when there is a new post
- Adds new activity when there is a new topic
- Adds new activity when a topic gets approved
- Deletes an activity when a post got deleted
- Deletes an activity when a topic got deleted
- Disable comments-area for activities created by Asgaros Forum
- Registers filters in the activity-overview of users

- Add new notifications when there is a new post
- Deletes notifications for a deleted post
- Marks a notification as read when opened

- Replace profiles with BuddyPress ones

- Add private-messaging link to the post-author area

*/

if (!defined('ABSPATH')) exit;

class AsgarosForumBuddyPress {
    private $asgarosforum = null;

    function __construct($object) {
        $this->asgarosforum = $object;

        // Filter/hooks for activity-related behavior.
        add_action('asgarosforum_after_add_post_submit', array($this, 'add_activity_post'), 10, 6);
        add_action('asgarosforum_after_add_topic_submit', array($this, 'add_activity_topic'), 10, 6);
        add_action('asgarosforum_after_topic_approve', array($this, 'add_activity_approved_topic'), 10, 1);
        add_action('asgarosforum_after_delete_post', array($this, 'delete_activity_post'), 10, 1);
        add_action('asgarosforum_after_delete_topic', array($this, 'delete_activity_topic'), 10, 1);
        add_filter('bp_activity_can_comment', array($this, 'disable_activity_comments'), 10, 1);
        add_action('bp_register_activity_actions', array($this, 'register_activity_filters'));

        // Filter/hooks for notification-related behavior.
        add_action('asgarosforum_after_add_post_submit', array($this, 'add_notification'), 10, 6);
        add_action('asgarosforum_before_delete_post', array($this, 'delete_notification'), 10, 1);
        add_action('asgarosforum_prepare_topic', array($this, 'mark_notification_read'));
        add_filter('bp_notifications_get_registered_components', array($this, 'register_notifications'), 10, 1);
        add_filter('bp_notifications_get_notifications_for_user', array($this, 'format_notifications'), 20, 8);

        // Change profile-url.
        add_filter('asgarosforum_filter_profile_link', array($this, 'change_profile_url'), 10, 2);

        // Add private-messaging link.
        add_action('asgarosforum_after_post_author', array($this, 'add_pm_link'), 10, 2);
    }

    /**********************************************
     ***************** ACTIVITIES *****************
     **********************************************/

    // Adds an activity for new posts.
    function add_activity_post($post_id, $topic_id, $subject, $content, $link, $author_id) {
        // Set activity-arguments.
        $args = array(
            'action'        => __('%s a répondu dans le sujet "%s"', 'asgaros-forum-buddypress'),
            'title'         => esc_html(stripslashes($subject)),
            'content'       => $this->asgarosforum->cut_string(esc_html(stripslashes(strip_tags($content))), 100),
            'component'     => 'asgaros-forum',
            'type'          => 'asgaros-forum-post',
            'primary_link'  => $link,
            'user_id'       => $author_id,
            'item_id'       => $post_id,
            'hide_sitewide' => false,
            'is_spam'       => false
        );

        $this->add_activity($args);
    }

    // Adds an activity for new topics.
    function add_activity_topic($post_id, $topic_id, $subject, $content, $link, $author_id) {
        // Ensure that the topics is approved.
        if (!$this->asgarosforum->approval->is_topic_approved($topic_id)) {
            return;
        }

        // Set activity-arguments.
        $args = array(
            'action'        => __('%s a créé le nouveau sujet "%s"', 'asgaros-forum-buddypress'),
            'title'         => esc_html(stripslashes($subject)),
            'content'       => $this->asgarosforum->cut_string(esc_html(stripslashes(strip_tags($content))), 100),
            'component'     => 'asgaros-forum',
            'type'          => 'asgaros-forum-topic',
            'primary_link'  => $link,
            'user_id'       => $author_id,
            'item_id'       => $topic_id,
            'hide_sitewide' => false,
            'is_spam'       => false
        );

        $this->add_activity($args);
    }

    // Adds an activity for new approved topics.
    function add_activity_approved_topic($topic_id) {
        // Get the topic.
        $topic = $this->asgarosforum->content->get_topic($topic_id);

        // Get first post inside the topic.
        $first_post = $this->asgarosforum->content->get_first_post($topic_id);

        // Generate the topic-link.
        $link = html_entity_decode($this->asgarosforum->rewrite->get_post_link($first_post->id, $topic_id));

        // Add the activity.
        $this->add_activity_topic($first_post->id, $topic_id, $topic->name, $first_post->text, $link, $first_post->author_id);
    }

    // Adds a new activity to the BuddyPress-profile of an user.
    function add_activity($args) {
        // First ensure that the user is logged-in.
        if (!is_user_logged_in()) {
            return false;
        }

        // Now make sure that BuddyPress and all its necessary functions are available.
        if (!function_exists('bp_core_get_user_domain') || !function_exists('bp_core_get_user_displayname') || !function_exists('bp_activity_add')) {
            return false;
        }

        // Get the profile-URL of the user.
        $user_url = bp_core_get_user_domain($args['user_id']);

        // Get the name of the user.
        $user_name = bp_core_get_user_displayname($args['user_id']);

        // Ensure both profile-URL and name have been found.
        if (!$user_url || !$user_name) {
            return false;
        }

        // Now build the link for the user-profile.
        $link_user = '<a href="'.esc_url($user_url).'">'.esc_html($user_name).'</a>';

        // Build the link for the content-element as well.
        $link_content = '<a href="'.$args['primary_link'].'">'.$args['title'].'</a>';

        // Set-up the action.
        $args['action'] = sprintf($args['action'], $link_user, $link_content);

        // Add the activity.
        return $activity_id = bp_activity_add($args);
    }

    // Deletes an activity for deleted posts.
    function delete_activity_post($post_id) {
        // Set activity-arguments.
        $args = array(
            'component'     => 'asgaros-forum',
            'type'          => 'asgaros-forum-post',
            'item_id'       => $post_id
        );

        $this->delete_activity($args);
    }

    // Deletes an activity for deleted topics.
    function delete_activity_topic($topic_id) {
        // Set activity-arguments.
        $args = array(
            'component'     => 'asgaros-forum',
            'type'          => 'asgaros-forum-topic',
            'item_id'       => $topic_id
        );

        $this->delete_activity($args);
    }

    // Deletes an activity from the BuddyPress-profile of an user.
    function delete_activity($args) {
        // First ensure that the user is logged-in.
        if (!is_user_logged_in()) {
            return false;
        }

        // Now make sure that BuddyPress and all its necessary functions are available.
        if (!function_exists('bp_activity_delete')) {
            return false;
        }

        // Delete the activity.
        bp_activity_delete($args);
    }

    // Disable comments-area for activities created by Asgaros Forum.
    function disable_activity_comments($can_comment) {
        // Only continue when the required function is available and the $can_comment-status is not already false.
        if (function_exists('bp_get_activity_type') && $can_comment) {
            // Get current activity-type.
            $current_activity_type = bp_get_activity_type();

            // Define activity-types for which comments should be disabled.
            $excluded_activity_types = array('asgaros-forum-post', 'asgaros-forum-topic');

            // Check if the current activity-type is in the list of the excluded activity-types.
            if (in_array($current_activity_type, $excluded_activity_types)) {
                return false;
            }
        }

        return $can_comment;
    }

    // Register filters in the activity-overview.
    function register_activity_filters() {
        bp_activity_set_action('asgaros-forum', 'asgaros-forum-topic', __('Forum topics', 'asgaros-forum-buddypress'), '', __('Forum topics', 'asgaros-forum-buddypress'), array('member'));
        bp_activity_set_action('asgaros-forum', 'asgaros-forum-post', __('Forum posts', 'asgaros-forum-buddypress'), '', __('Forum posts', 'asgaros-forum-buddypress'), array('member'));
    }

    /**********************************************
     **************** NOTIFICATIONS ***************
     **********************************************/

    // Register notifications from Asgaros Forum.
    function register_notifications($component_names) {
        array_push($component_names, 'asgaros-forum');

        return $component_names;
    }

    // Adds a notification for new posts.
    function add_notification($post_id, $topic_id, $subject, $content, $link, $author_id) {
        // First make sure that BuddyPress and all its necessary functions are available.
        if (!function_exists('bp_notifications_add_notification')) {
            return false;
        }

        // Get ID of topic-author.
        $topic_author_id = $this->asgarosforum->get_topic_starter($topic_id);

        // Notify the topic-author as long as he is not also the author of the post.
        if ($author_id != $topic_author_id) {
            $args = array(
                'user_id'           => $topic_author_id,
                'item_id'           => $post_id,
                'secondary_item_id' => $author_id,
                'component_name'    => 'asgaros-forum',
                'component_action'  => 'asgaros-forum-post'
            );

            bp_notifications_add_notification($args);
        }
    }

    // Format received notifications.
    function format_notifications($action, $item_id, $secondary_item_id, $total_items, $format = 'string', $component_action, $component_name, $id) {
        if ($component_action === 'asgaros-forum-post') {
            // First ensure that the user is logged-in.
            if (!is_user_logged_in()) {
                return false;
            }

            // First make sure that BuddyPress and all its necessary functions are available.
            if (!function_exists('bp_core_get_user_domain') || !function_exists('bp_core_get_user_displayname')) {
                return false;
            }

            // Get post and ensure that it exists.
            $post = $this->asgarosforum->content->get_post($item_id);

            if (!$post) {
                return false;
            }

            // Get topic and ensure that it exists.
            $topic = $this->asgarosforum->content->get_topic($post->parent_id);

            if (!$topic) {
                return false;
            }

            // Initialize links when WordPress is doint an AJAX-request.
            if (wp_doing_ajax()) {
                $this->asgarosforum->rewrite->set_links();
            }

            // Variables for returned url and text.
            $url = '';
            $text = '';

            // Generate a summary when there is more than one reply.
            if ((int)$total_items > 1) {
                $text = sprintf(__('Vous avez %d nouvelle(s) réponse(s)', 'asgaros-forum-buddypress'), (int)$total_items);
                $url = bp_core_get_user_domain(get_current_user_id()).'notifications/';
            } else {
                // Set the topic-title.
                $topic_title = esc_html(stripslashes($topic->name));

                // Get the name of the user.
                $user_name = bp_core_get_user_displayname($secondary_item_id);

                // Generate the notification based on if there is an username.
                if ($user_name) {
                    $text = sprintf(__('Nouvelle réponse de %s dans "%s"', 'asgaros-forum-buddypress'), $user_name, $topic_title);
                } else {
                    $text = sprintf(__('Nouvelle réponse dans "%s"', 'asgaros-forum-buddypress'), $topic_title);
                }

                // Generate the post-link.
                $url = $this->asgarosforum->rewrite->get_post_link($post->id, $topic->id, false, array('bbmarkpostread' => $post->id));
            }

            // Generate the final return-value.
            if ($format === 'string') {
                return '<a href="'.$url.'">'.$text.'</a>';
            } else {
                return array('text' => $text, 'link' => $url);
            }
        }
    }

    // Deletes all notifications for a deleted post.
    function delete_notification($post_id) {
        // First make sure that BuddyPress and all its necessary functions are available.
        if (!function_exists('bp_notifications_delete_notifications_by_item_id')) {
            return false;
        }

        // Get the post.
        $post = $this->asgarosforum->content->get_post($post_id);

        // Get the ID of the topic-author.
        $topic_author_id = $this->asgarosforum->get_topic_starter($post->parent_id);

        // Delete notification when the user exists.
        if ($topic_author_id) {
            bp_notifications_delete_notifications_by_item_id($topic_author_id, $post_id, 'asgaros-forum', 'asgaros-forum-post');
        }
    }

    // Marks a notification as read when opened.
    function mark_notification_read() {
        // Ensure that the required action is set.
        if (empty($_GET['bbmarkpostread'])) {
            return;
        }

        // Get the required data.
        $user_id  = get_current_user_id();
        $reply_id = intval($_GET['bbmarkpostread']);

        // Mark post as read.
        bp_notifications_mark_notifications_by_item_id($user_id, $reply_id, 'asgaros-forum', 'asgaros-forum-post');
    }

    /**********************************************
     **************** PROFILE URL *****************
     **********************************************/

    function change_profile_url($profile_url, $user_object) {
        // First make sure that BuddyPress and all its necessary functions are available.
        if (!function_exists('bp_core_get_user_domain')) {
            return $profile_url;
        }

        return trim(bp_core_get_user_domain($user_object->ID), '/');
    }

    /**********************************************
     **************** PM LINK *********************
     **********************************************/

    function add_pm_link($author_id, $author_posts) {
        // Ensure that the private-messaging functionality is enabled.
        if (!bp_is_active('messages')) {
            return;
        }

        // Ensure that the user is logged-in.
        if (!is_user_logged_in()) {
            return;
        }

        // Ensure that private-messaging link is not shown for the own user-account.
        if (get_current_user_id() == $author_id) {
            return;
        }

        echo '<a class="send-pm-link" href="'.bp_loggedin_user_domain().bp_get_messages_slug().'/compose/?r='.bp_core_get_username($author_id).'">'.__('Message Privé', 'asgaros-forum-buddypress').'</a>';
    }
}

function load_buddypress_integration() {
    global $asgarosforum;
    new AsgarosForumBuddyPress($asgarosforum);
}

add_action('plugins_loaded', 'load_buddypress_integration');
