(function($) {

    var EDITOR_ID ='whats-new';
	var PUBLISH_BUTTON_ID = 'aw-whats-new-submit';
	var RICH_TEXTAREA = 'trumbowyg-textarea';


	function decorateNewTextarea() {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var observer = new MutationObserver(function(mutationsList, observer) {
			for(var mutation of mutationsList) {
				// parse new node added into the chat
				for (var node of mutation.addedNodes) {
					// check init to avoid auto-play media from old msg
			
					if (node.nodeType === Node.ELEMENT_NODE) {
						// comment post textarea (one by activity and its comments)
						$(node).find('textarea.ac-input:not(.'+RICH_TEXTAREA+')').each(function(element) {
							let submitBtn = $(this).closest('form').find('input[type="submit"][name="ac_form_submit"]').get();
							if (node.tagName == 'FORM') {
								// case of adding just one activity response form (can be initialized now)
								initRichText(this, submitBtn);
							} else {
								// case of adding whole activity one by one (to many adding in same time to be initialized at now)
								initDynamicRichText(this, submitBtn);
							}
						});
					}
				}
			}
		});
		observer.observe(document, {
			subtree: true,
			childList: true
		});
	}

	async function clearEditor(textarea, btn = null) {
		new Promise(resolve => {
			setTimeout(() => {
				$(textarea).trumbowyg('empty');
				textarea.value = '';
				if (btn != null)  {
					btn.disabled = false;
				}
			}, 1000);
		});
	}
	function escapeRegExp(string) {
		return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
	function replaceAll(str, find, newStr) {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), newStr);
	}
	function initRichText(textarea, publishBtn) {
		// asynchronous call in case of a lot of textarea
		new Promise(resolve => {
			setTimeout(() => { _initRichText(textarea, publishBtn); }, 10);
		});
	}
	async function _initRichText(textarea, publishBtn) {
		// asynchronous call in case of a lot of textarea
		console.log('INIT RICH TEXTAREA :: ' + textarea.outerHTML);
		$(textarea).on('tbwinit ', function(){ 
			setTimeout(() =>{
				$(textarea).parent().addClass('trumbowyg-init');
			}, 1000);
		});
		initTrumbowyg(textarea);
		if (publishBtn != null) {
			$(publishBtn).on("click", function () {
				clearEditor(textarea, this);
			});
		}
	}
	function initTrumbowyg(textarea) {
		$(textarea).trumbowyg({
			lang: 'fr',
			btns: [
				['strong', 'em', 'underline'],
				//['foreColor'],
				['unorderedList', 'orderedList'],
                ['justifyLeft', 'justifyCenter', 'justifyRight'],
        		['horizontalRule'],
				['insertImage', 'link'],
				['emoji'],
        		['fullscreen']
			],
			imageWidthModalEdit: true,
			semantic: false
		});
		$(textarea).parent().each(function() {
			let goOutFullscreenBtn = document.createElement('div');
			goOutFullscreenBtn.className = 'stop-fullscreen-btn';
			goOutFullscreenBtn.innerHTML = 'Retour';
			$(goOutFullscreenBtn).click(function() {
				$(this).parent().find('> .trumbowyg-button-pane .trumbowyg-fullscreen-button').mousedown();
			});
			this.appendChild(goOutFullscreenBtn);
		});
	}
	function initDynamicRichText(textarea, publishBtn) {
		// asynchronous call in case of a lot of textarea
		new Promise(resolve => {
			setTimeout(() => { _initDynamicRichText(textarea, publishBtn); }, 10);
		});
	}
	async function _initDynamicRichText(textarea, publishBtn) {
		// asynchronous call in case of a lot of textarea
		$(textarea).on('tbwinit ', function(){ 
			setTimeout(() =>{
				$(textarea).parent().addClass('trumbowyg-init');
			}, 1000);
		});
		$(textarea).closest('.activity_update').each(function() {
			let activity = this;
			$(this).find('a').each(function() {
				$(this).click(() => {
					$(this).closest('.activity_update').find('textarea:not(.trumbowyg-textarea)').each(function() {
						console.log('INIT RICH TEXTAREA :: ' + textarea.outerHTML);
						initTrumbowyg(this);
						if (publishBtn != null) {
							$(publishBtn).on("click", function () {
								clearEditor(this, publishBtn);
							});
						}
					});
				})
			});
		});
	}
	
	// new post textarea
	$('#whats-new-textarea textarea#'+EDITOR_ID+':not(.'+RICH_TEXTAREA+')').each(function(element) {
		initRichText(this, document.getElementById(PUBLISH_BUTTON_ID));
	});
	
	// edit post textarea
	$('#buddypress-edit-activity-wrapper textarea#'+EDITOR_ID+':not(.'+RICH_TEXTAREA+')').each(function(element) {
		let textarea = this;
		initRichText(textarea);
	});
	
	decorateNewTextarea();
	
	$(document).ready(function(){ 
		$('#buddypress').find("#whats-new").each(function(ev) {
			$(this).attr('placeholder', 'Ecrivez votre message...');
		});
	});
})( jQuery );