(function($) {

	if (window.mobileCheck()) {
		return;
	}
	
	function detectIE() {
		var ua = window.navigator.userAgent;

		// Test values; Uncomment to check result …

		// IE 10
		// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

		// IE 11
		// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

		// Edge 12 (Spartan)
		// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

		// Edge 13
		// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}


		// other browser
		return false;
	}
	var isIEBrowser = detectIE();
	console.log('isIEBrowser: ' + isIEBrowser);
	
    if (isIEBrowser) {
        // Internet Explorer => abord this script run
        return;
    }
	
    var EDITOR_ID ='whats-new';
	var PUBLISH_BUTTON_ID = 'aw-whats-new-submit';
	var RICH_TEXTAREA = 'trumbowyg-textarea';


	function decorateNewTextarea() {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var observer = new MutationObserver(function(mutationsList, observer) {
			for(var i=0; i<mutationsList.length; i++) { // for loop style to work for IE
				let mutation = mutationsList[i];
				for(var j=0; j<mutation.addedNodes.length; j++) { // for loop style to work for IE
					let node = mutation.addedNodes[j];
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
	
	
	
	function escapeRegExp(string) {
		return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
	function replaceAll(str, find, newStr) {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), newStr);
	}
	function initRichText(textarea, publishBtn) {
		// asynchronous call in case of a lot of textarea
		new Promise(function(resolve) {
			setTimeout(function() { _initRichText(textarea, publishBtn); }, 10);
		});
	}
	function initTrumbowyg(textarea) {
		$(textarea).trumbowyg({
			lang: 'fr',
			btns: [
				['strong', 'em', 'underline'],
				['foreColor'],
				['unorderedList', 'orderedList'],
                ['justifyLeft', 'justifyCenter', 'justifyRight'],
        		['horizontalRule'],
				['insertImage', 'link'],
				['emoji']
			],
			allowTagsFromPaste: {
				allowedTags: ['h4', 'h3', 'h2', 'h1', 'p', 'span', 'b', 'strong', 'i', 'em', 'div', 'br']
			},
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
		new Promise(function(resolve) {
			setTimeout(function() { _initDynamicRichText(textarea, publishBtn); }, 10);
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

	"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function clearEditor(_x) {
  return _clearEditor.apply(this, arguments);
}

function _clearEditor() {
  _clearEditor = _asyncToGenerator(regeneratorRuntime.mark(function _callee(textarea) {
    var btn,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            btn = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            new Promise(function (resolve) {
              setTimeout(function () {
                $(textarea).trumbowyg('empty');
                textarea.value = '';

                if (btn != null) {
                  btn.disabled = false;
                }
              }, 1000);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _clearEditor.apply(this, arguments);
}

function _initRichText(_x2, _x3) {
  return _initRichText2.apply(this, arguments);
}

function _initRichText2() {
  _initRichText2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(textarea, publishBtn) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // asynchronous call in case of a lot of textarea
            console.log('INIT RICH TEXTAREA :: ' + textarea.outerHTML);
            $(textarea).on('tbwinit ', function () {
              setTimeout(function () {
                $(textarea).parent().addClass('trumbowyg-init');
              }, 1000);
            });
            initTrumbowyg(textarea);

            if (publishBtn != null) {
              $(publishBtn).on("click", function () {
                clearEditor(textarea, this);
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _initRichText2.apply(this, arguments);
}

function _initDynamicRichText(_x4, _x5) {
  return _initDynamicRichText2.apply(this, arguments);
}

function _initDynamicRichText2() {
  _initDynamicRichText2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(textarea, publishBtn) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // asynchronous call in case of a lot of textarea
            $(textarea).on('tbwinit ', function () {
              setTimeout(function () {
                $(textarea).parent().addClass('trumbowyg-init');
              }, 1000);
            });
            $(textarea).closest('.activity_update').each(function () {
              var activity = this;
              $(this).find('a').each(function () {
                $(this).click(function () {
                  $(this).closest('.activity_update').find('textarea:not(.trumbowyg-textarea)').each(function () {
                    console.log('INIT RICH TEXTAREA :: ' + textarea.outerHTML);
                    initTrumbowyg(this);

                    if (publishBtn != null) {
                      $(publishBtn).on("click", function () {
                        clearEditor(this, publishBtn);
                      });
                    }
                  });
                });
              });
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _initDynamicRichText2.apply(this, arguments);
}
	
})( jQuery );
