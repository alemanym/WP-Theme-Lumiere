<?php

if (!defined('ABSPATH')) exit;

class AsgarosForumSearch {
    private $asgarosforum = null;
    public $search_keywords_for_query = '';
    public $search_keywords_for_output = '';

    public function __construct($object) {
		$this->asgarosforum = $object;

        add_action('init', array($this, 'initialize'));
        add_action('asgarosforum_breadcrumbs_search', array($this, 'add_breadcrumbs'));
    }

    public function initialize() {
        if (!empty($_GET['keywords'])) {
            $keywords = trim($_GET['keywords']);
            $this->search_keywords_for_query = esc_sql($keywords);
            $this->search_keywords_for_output = stripslashes(esc_html($keywords));
        }
    }

    public function add_breadcrumbs() {
        $element_link = $this->asgarosforum->get_link('current');
        $element_title = __('Search', 'asgaros-forum');
        $this->asgarosforum->breadcrumbs->add_breadcrumb($element_link, $element_title);
    }

    public function show_search_input() {
        if ($this->asgarosforum->options['enable_search']) {
            echo '<div id="forum-search">';
            echo '<span class="search-icon fas fa-search"></span>';

            echo '<form method="get" action="'.$this->asgarosforum->get_link('search').'">';

            // Workaround for broken search when using plain permalink structure.
            if (!$this->asgarosforum->rewrite->use_permalinks) {
                echo '<input name="view" type="hidden" value="search">';
            }

            // Workaround for broken search in posts when using plain permalink structure.
            if (!empty($_GET['p'])) {
                $value = esc_html(trim($_GET['p']));
                echo '<input name="p" type="hidden" value="'.$value.'">';
            }

            // Workaround for broken search in pages when using plain permalink structure.
            if (!empty($_GET['page_id'])) {
                $value = esc_html(trim($_GET['page_id']));
                echo '<input name="page_id" type="hidden" value="'.$value.'">';
            }

            echo '<input name="keywords" type="search" placeholder="'.__('Search ...', 'asgaros-forum').'" value="'.$this->search_keywords_for_output.'">';
            echo '</form>';
            echo '</div>';
        }
    }

    public function show_search_results() {
        $results = $this->get_search_results();

        $paginationRendering = ($results) ? '<div class="pages-and-menu">'.$this->asgarosforum->pagination->renderPagination('search').'<div class="clear"></div></div>' : '';
        echo $paginationRendering;

        echo '<div class="title-element">';
            echo __('Search results:', 'asgaros-forum').' '.$this->search_keywords_for_output;
            echo '<span class="last-post-headline">'.__('Last post', 'asgaros-forum').'</span>';
        echo '</div>';
        echo '<div class="content-container">';

        if ($results) {
            foreach ($results as $topic) {
                $this->asgarosforum->render_topic_element($topic, 'topic-normal', true);
            }
        } else {
            $notice = __('No results found for:', 'asgaros-forum').'&nbsp;<b>'.$this->search_keywords_for_output.'</b>';
            $this->asgarosforum->render_notice($notice);
        }

        echo '</div>';

        echo $paginationRendering;
    }

    public function get_search_results() {
        if (!empty($this->search_keywords_for_query)) {
            $categories = $this->asgarosforum->content->get_categories();
            $categoriesFilter = array();

            foreach ($categories as $category) {
                $categoriesFilter[] = $category->term_id;
            }

            // Do not execute a search-query when no categories are accessible.
            if (empty($categoriesFilter)) {
                return false;
            }

            $where = 'AND f.parent_id IN ('.implode(',', $categoriesFilter).')';

            $start = $this->asgarosforum->current_page * $this->asgarosforum->options['topics_per_page'];
            $end = $this->asgarosforum->options['topics_per_page'];
            $limit = $this->asgarosforum->db->prepare("LIMIT %d, %d", $start, $end);

            $shortcodeSearchFilter = $this->asgarosforum->shortcode->shortcodeSearchFilter;

            $match_name = "MATCH (name) AGAINST ('{$this->search_keywords_for_query}*' IN BOOLEAN MODE)";
            $match_text = "MATCH (text) AGAINST ('{$this->search_keywords_for_query}*' IN BOOLEAN MODE)";
            $query_answers = "SELECT (COUNT(*) - 1) FROM {$this->asgarosforum->tables->posts} WHERE parent_id = t.id";
            $query_match_name = "SELECT id AS topic_id, {$match_name} AS score_name, 0 AS score_text FROM {$this->asgarosforum->tables->topics} WHERE {$match_name} GROUP BY topic_id";
            $query_match_text = "SELECT parent_id AS topic_id, 0 AS score_name, {$match_text} AS score_text FROM {$this->asgarosforum->tables->posts} WHERE {$match_text} GROUP BY topic_id";

            $query = "SELECT t.*, f.id AS forum_id, f.name AS forum_name, ({$query_answers}) AS answers, su.topic_id, SUM(su.score_name + su.score_text) AS score FROM ({$query_match_name} UNION {$query_match_text}) AS su, {$this->asgarosforum->tables->topics} AS t, {$this->asgarosforum->tables->forums} AS f WHERE su.topic_id = t.id AND t.parent_id = f.id AND t.approved = 1 {$where} {$shortcodeSearchFilter} GROUP BY su.topic_id ORDER BY score DESC, su.topic_id DESC {$limit}";

            $results = $this->asgarosforum->db->get_results($query);

            if (!empty($results)) {
                return $results;
            }
        }

        return false;
    }

    public function show_custom_search_results() {
        echo '<div id="search-post-layer">';
            $posts = $this->get_custom_search_results();
            if (empty($posts)) {
                $notice = __('No results found for:', 'asgaros-forum').'&nbsp;<b>'.$this->search_keywords_for_output.'</b>';
                $this->asgarosforum->render_notice($notice);
            } else {
                $pagination = $this->asgarosforum->pagination->renderPagination('search');

                if ($pagination) {
                    echo '<div class="pages-and-menu">'.$pagination.'</div>';
                }

                foreach ($posts as $post) {
                    echo '<div class="search-post-element">';
                        echo '<div class="search-post-author">';
                            // Show avatar if activated.
                            if ($this->asgarosforum->options['enable_avatars']) {
                                $avatar_size = apply_filters('asgarosforum_filter_avatar_size', 40);
                                echo get_avatar($post->author_id, $avatar_size, '', '', array('force_display' => true));
                            }

                            echo '<div class="post-author-block-name">';
                                // Show username.
                                $username = apply_filters('asgarosforum_filter_post_username', $this->asgarosforum->getUsername($post->author_id), $post->author_id);
                                echo '<span class="post-username">'.$username.'</span>';
                            echo '</div>';
                        echo '</div>';

                        $link = $this->asgarosforum->rewrite->get_post_link($post->id, $post->parent_id);
                        $text = $this->asgarosforum->strip_tags_content($post->text, '<blockquote>', TRUE);
                        $text = esc_html(stripslashes(strip_tags($text)));
                        $text = $this->asgarosforum->cut_string($text, 200);
                        $text = str_ireplace($this->search_keywords_for_output, '<strong>'.$this->search_keywords_for_output.'</strong>', $text);
                        echo '<a class="search-post-text" href="'.$link.'"><div>'.$text.'</div></a>';


                        $topic_link = $this->asgarosforum->rewrite->get_link('topic', $post->parent_id);
                        $topic_name = esc_html(stripslashes($post->name));
                        $topic_time = $this->asgarosforum->format_date($post->date);

                        echo '<div class="search-post-meta">';
                            echo '<span class="search-post-topic">';
                                echo 'Sujet : <a href="'.$topic_link.'">'.$topic_name.'</a>';
                            echo '</span>';
                            echo '<span class="search-post-time">'.$topic_time.'</span>';
                        echo '</div>';
                    echo '</div>';
                }

                if ($pagination) {
                    echo '<div class="pages-and-menu">'.$pagination.'</div>';
                }
            }
        echo '</div>';

    }

    public function get_custom_search_results() {

        if (!empty($this->search_keywords_for_query)) {
            // search key words no empty

            $categories = $this->asgarosforum->content->get_categories();
            if (empty($categories)) {
                // Cancel if the user cant access any categories.
                return false;
            }

            $categoriesFilter = array();
            foreach ($categories as $category) {
                $categoriesFilter[] = $category->term_id;
            }
            $accessible_categories = implode(',', $categoriesFilter);

            $elements_maximum = 50;
            $elements_start = $this->asgarosforum->current_page * $elements_maximum;
            $query_limit = "LIMIT {$elements_start}, {$elements_maximum}";

            $match_text = "MATCH (text) AGAINST ('{$this->search_keywords_for_query}*' IN BOOLEAN MODE) ";
            $query_match_text = "SELECT * FROM {$this->asgarosforum->tables->posts} WHERE {$match_text} GROUP BY parent_id ";

            $query = "SELECT p.id, p.author_id, p.text, p.date, p.parent_id, t.name ".
                    " FROM ".
                        "( {$query_match_text} ) AS p, ".
                        "{$this->asgarosforum->tables->topics} AS t ".
                    " WHERE p.parent_id = t.id ".
                    " AND EXISTS ".
                        "(SELECT f.id ".
                            "FROM {$this->asgarosforum->tables->forums} AS f ".
                            "WHERE f.id = t.parent_id ".
                            "AND f.parent_id IN ( {$accessible_categories} )
                        ) ".
                    " AND t.approved = 1 ".
                    " ORDER BY p.id DESC {$query_limit};";
            
            $results = $this->asgarosforum->db->get_results($query);

            if (!empty($results)) {
                return $results;
            }
        }

        return false;
    }
}
