<?php

if (!defined('ABSPATH')) exit;

$this->polls->render_poll($this->current_topic);
$this->render_sticky_panel();

echo '<div class="pages-and-menu" style="display: flex; align-items: baseline; justify-content: space-between;">';
    $paginationRendering = $this->pagination->renderPagination($this->tables->posts, $this->current_topic);
    echo $paginationRendering;
    echo $this->show_topic_menu();
echo '</div>';

$this->editor->showEditor('addpost', true);

$counter = 0;
$topicStarter = $this->get_topic_starter($this->current_topic);
foreach ($posts as $post) {
    require('post-element.php');
} ?>
<div class="pages-and-menu" style="display: flex; align-items: baseline; justify-content: space-between;">
    <?php
    echo $paginationRendering;
    echo $this->show_topic_menu(false);
    ?>
</div>
