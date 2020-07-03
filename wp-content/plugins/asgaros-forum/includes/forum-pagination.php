<?php

if (!defined('ABSPATH')) exit;

class AsgarosForumPagination {
    private $asgarosforum = null;

    public function __construct($object) {
        $this->asgarosforum = $object;
    }

    public function renderTopicOverviewPagination($topic_id, $topic_counter) {
        $num_pages = ceil($topic_counter / $this->asgarosforum->options['posts_per_page']);

        // Only show pagination when there is more than one page.
        if ($num_pages > 1) {
            echo '&nbsp;&middot;&nbsp;<div class="pages">';

            if ($num_pages <= 5) {
                for ($i = 1; $i <= $num_pages; $i++) {
                    echo $this->page_link('topic', $topic_id, $i);
                }
            } else {
                for ($i = 1; $i <= 3; $i++) {
                    echo $this->page_link('topic', $topic_id, $i);
                }

                $link = $this->asgarosforum->get_link('topic', $topic_id, array('part' => $num_pages));
                echo '<a href="'.$link.'">Fin&nbsp;&raquo;</a>';
            }

            echo '</div>';
        }
    }

    public function page_link($location, $id, $page) {
        $link = $this->asgarosforum->get_link($location, $id, array('part' => $page));

        return '<a href="'.$link.'">'.number_format_i18n($page).'</a>';
    }

    public function renderPagination($location, $sourceID = false, $element_counter = false) {
        $current_page = $this->asgarosforum->current_page;
        $num_pages = 0;
        $select_url = $this->asgarosforum->get_link('current', false, false, '', false);

        if ($location == $this->asgarosforum->tables->posts) {
            $count = $this->asgarosforum->db->get_var($this->asgarosforum->db->prepare("SELECT COUNT(*) FROM {$location} WHERE parent_id = %d;", $sourceID));
            $num_pages = ceil($count / $this->asgarosforum->options['posts_per_page']);
        } else if ($location == $this->asgarosforum->tables->topics) {
            $count = $this->asgarosforum->db->get_var($this->asgarosforum->db->prepare("SELECT COUNT(*) FROM {$location} WHERE parent_id = %d AND approved = 1 AND sticky = 0;", $sourceID));
            $num_pages = ceil($count / $this->asgarosforum->options['topics_per_page']);
        } else if ($location === 'search') {
            $categories = $this->asgarosforum->content->get_categories();
            $categoriesFilter = array();

            foreach ($categories as $category) {
                $categoriesFilter[] = $category->term_id;
            }
            $accessible_categories = implode(',', $categoriesFilter);

            $shortcodeSearchFilter = $this->asgarosforum->shortcode->shortcodeSearchFilter;

            $match_text = "MATCH (text) AGAINST ('{$this->asgarosforum->search->search_keywords_for_query}*' IN BOOLEAN MODE) ";
            $query_match_text = "SELECT * FROM {$this->asgarosforum->tables->posts} WHERE {$match_text}";
            $count = $this->asgarosforum->db->get_var("SELECT COUNT(*) ".
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
                    " AND t.approved = 1 {$shortcodeSearchFilter}".
                    " ORDER BY p.date DESC {$query_limit};");
            $count = intval($count);
			
			// result counter display
			echo '<div class="pagination-count">';
				echo 'Résultats de la recherche &nbsp;<i class="fa fa-search" aria-hidden="true"></i> <span class="search-key">"'.
					$this->asgarosforum->search->search_keywords_for_query.'"</span> : ';
			echo '</div>';
			
            $num_pages = ceil($count / 50);
        } else if ($location === 'members') {
            // Count the users based on the filter.
            $count = 0;

            if ($this->asgarosforum->memberslist->filter_type === 'role') {
                $count = count($this->asgarosforum->permissions->get_users_by_role($this->asgarosforum->memberslist->filter_name));
            } else if ($this->asgarosforum->memberslist->filter_type === 'group') {
                $count = AsgarosForumUserGroups::countUsersOfUserGroup($this->asgarosforum->memberslist->filter_name);
            }

            $num_pages = ceil($count / $this->asgarosforum->options['members_per_page']);
        } else if ($location === 'activity') {
            $count = $this->asgarosforum->activity->load_activity_data(true);
            $num_pages = ceil($count / $this->asgarosforum->options['activities_per_page']);
        } else if ($location === 'history') {
            $user_id = $this->asgarosforum->current_element;
            $count = $this->asgarosforum->profile->count_post_history_by_user($user_id);
            $num_pages = ceil($count / 50);
        } else if ($location === 'unread') {
            $num_pages = ceil($element_counter / 50);
        } else if ($location === 'unapproved') {
            $num_pages = ceil($element_counter / 50);
        }

        // Only show pagination when there is more than one page.
        if ($num_pages > 1) {
            $out = '<div class="pages">';

            if ($num_pages <= 5) {
                for ($i = 1; $i <= $num_pages; $i++) {
                    if ($i == ($current_page + 1)) {
                        $out .= '<strong>'.number_format_i18n($i).'</strong>';
                    } else {
                        $link = add_query_arg('part', $i, $select_url);
                        $out .= '<a href="'.$link.'">'.number_format_i18n($i).'</a>';
                    }
                }
            } else {
				$displayBegin = ($current_page+1) > 4 ;
				$displayEnd = ($num_pages - $current_page > 4);
				
                if ($displayBegin) {
                    $link = remove_query_arg('part', $select_url);
                    $out .= '<a href="'.$link.'">Début ...</a>';
					
					for ($i = 3; $i > 0; $i--) {
						$n = ($current_page + 1) - $i;
						if ($n > 0) {
							$link = add_query_arg('part', $n, $select_url);
							$out .= '<a href="'.$link.'">'.number_format_i18n($n).'</a>';
						}
					}
                } else {
					for ($i = 1; $i < $current_page+1; $i++) {
						$link = add_query_arg('part', $i, $select_url);
						$out .= '<a href="'.$link.'">'.number_format_i18n($i).'</a>';
					}
				}
                
				$out .= '<strong>'.number_format_i18n($current_page+1).'</strong>';
				
				
                if ($displayEnd) {
					for ($i = 3; $i > 0; $i--) {
						$n = ($current_page + 5) - $i;
						if (n <= $num_pages) {
							$link = add_query_arg('part', $n, $select_url);
							$out .= '<a href="'.$link.'">'.number_format_i18n($n).'</a>';
						}
					}
                    $link = add_query_arg('part', $num_pages, $select_url);
                    $out .= '<a href="'.$link.'">... Fin</a>';
                } else {
					for ($i = $current_page+2; $i <= $num_pages; $i++) {
                    	$link = add_query_arg('part', $i, $select_url);
						$out .= '<a href="'.$link.'">'.number_format_i18n($i).'</a>';
					}
				}
            }

			$out .= '</div>';
			
			if ($location === 'search') {
				if ($count > 1) {
					$out .= '<div> &nbsp;&nbsp;-&nbsp;&nbsp;<strong>'.$count.'</strong> messages</div>';
				} else if ($count == 1) {
					$out .= '<div> &nbsp;&nbsp;-&nbsp;&nbsp;<strong>'.$count.'</strong> message</div>';
				}
			}
			
            return $out;
        } else {
            return false;
        }
    }
}
