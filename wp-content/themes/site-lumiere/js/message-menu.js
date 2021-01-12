(function($) {
	
	if (window.mobileCheck()) {
		return;
	}

	const PREF = {
		fontSize: 'msg-font-size',
		pageSize: 'loading-page-size',
		editorMode: 'message-editor-legacy',
		displayDate: 'display-message-date',
		msgDisplayMode: 'message-display-mode',
		default: {
			'msg-font-size': 'maxi',
			'loading-page-size': 20,
			'message-editor-legacy': false,
			'display-message-date': true,
			'message-display-mode': null
		},
		value: {}
	}
	function loadPreferences(key) {
		if (key === PREF.fontSize) {
			loadFontPreferences();
			return;
		}
		let value = localStorage.getItem(key);
		if (value == null) {
			value = PREF.default[key];
		}
		PREF.value[key] = value;
	}
	function storePreferences(key, value) {
		if (key === PREF.fontSize) {
			PREF.value[key] = computeFontSizeCSSValue(value);
		} else if (key === PREF.pageSize) {
			setCookie(PREF.pageSize, value);
			PREF.value[key] = value;
		} else {
			PREF.value[key] = value;
		}
		localStorage.setItem(key, value);
	}
	function getPreferences(key) {
		if (key === PREF.fontSize) {
			return getFontPreferences('px');
		}
		return PREF.value[key];
	}
	// load preferences
	loadPreferences(PREF.pageSize);
	loadPreferences(PREF.editorMode);
	loadPreferences(PREF.displayDate);
	loadPreferences(PREF.fontSize);
	loadPreferences(PREF.msgDisplayMode);
	setCookie(PREF.pageSize, getPreferences(PREF.pageSize));
	
	// font size preferences
	function loadFontPreferences() {
		let value = localStorage.getItem(PREF.fontSize);
		PREF.value[PREF.fontSize] = computeFontSizeCSSValue(value);
	}
	function getFontPreferences(mode) {
		return PREF.value[PREF.fontSize][mode];
	}
	function computeFontSizeCSSValue(fontSize, mode) {
		switch (fontSize) {
			case 'mini':
			case '12px':
				return {
					percent: '78%',
					scale: '0.85',
					px: '12px'
				};
			case 'petit':
			case '13px':
				return {
					percent: '84%',
					scale: '0.88',
					px: '13px'
				}
			case 'moyen':
			case '14px':
				return {
					percent: '90%',
					scale: '0.92',
					px: '14px'
				};
			case 'grand':
			case '15px':
				return {
					percent: '95%',
					scale: '0.96',
					px: '15px'
				};
			case 'maxi':
			case '16px':
			default:
				return {
					percent: '100%',
					scale: '1',
					px: '16px'
				};
		}
	}
	
	$(".activity div.page-title h1").html('Messages');
										   
	/***************************************************/
	/* zen button to hide left menu (for small screen)
	/***************************************************/
	var zenModeBtn = document.createElement('button');
	zenModeBtn.id = 'zen-mode-btn';
	zenModeBtn.innerHTML = 'Agrandir les messages';
	zenModeBtn.onclick = function () {
		if (document.body.classList.contains('zen-mode')) {
			document.body.classList.remove('zen-mode');
			zenModeBtn.innerHTML = 'Agrandir les messages';
		} else {
			document.body.classList.add('zen-mode');
			zenModeBtn.innerHTML = 'Menu Site';
		}
	}
	document.body.appendChild(zenModeBtn);


	/***************************************************/
	/* back to top btn
	/***************************************************/
	var goTopBtn = document.createElement('button');
	goTopBtn.id = 'go-top-btn';
	goTopBtn.onclick = function() {
		window.scroll(0, 0);
	}
	document.body.appendChild(goTopBtn);
	

	/*****************************************************/
	/* Print button
	/*****************************************************/
	// blockquote print
	$('#postid-73').find('blockquote').each(function() {
		console.log('blockquote ...');
		let printBtn = document.createElement('a');
		printBtn.className= 'print-btn';
		printBtn.innerHTML='Imprimer';
		const html = $(this).html();
		printBtn.onclick = function(e) {
			printElem(html);
		};
		$(this).append(printBtn);
	});
	$('#postid-1094').find('blockquote').each(function() {
		console.log('blockquote ...');
		let printBtn = document.createElement('a');
		printBtn.className= 'print-btn';
		printBtn.innerHTML='Imprimer';
		const html = $(this).html();
		printBtn.onclick = function(e) {
			printElem(html);
		};
		$(this).append(printBtn);
	});
	function decorateMessages() {
		// activity print button
		$('#buddypress').find('.activity-meta:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			let printBtn = document.createElement('a');
			printBtn.className= 'print-btn';
			printBtn.innerHTML='Imprimer';
			$(printBtn).click(printActivity);
			$(this).append(printBtn);
			// add delete custom button
			addCustomDeleteButton(this);
			applySizeScaling($(this).children());
		});
		// comments print button
		$('#buddypress').find('.acomment-options:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			let printBtn = document.createElement('a');
			printBtn.className= 'print-btn';
			printBtn.innerHTML='Imprimer';
			$(printBtn).click(printComment);
			$(this).append(printBtn);
			// add delete custom button
			addCustomDeleteButton(this)
			applySizeScaling($(this).children());
		});
		// recents
		$('#buddypress').find('.activity_update').has('.activity-header .recent').each(function() {
			$(this).addClass('activity-recent');
		});
		$('#buddypress').find('.activity_update').has('.activity-avatar a[href*="/coline"]').each(function() {
			$(this).addClass('nicole');
		});
		$('#buddypress').find('.acomment-meta').has('.recent').each(function() {
			$(this).addClass('acomment-recent');
		});
		$('#buddypress').find('.activity-header:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			$(this).click(toggleActivityOn);
			applySizeScaling($(this).find('p > *'));
		});
		$('#buddypress').find('.activity-inner:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			$(this).click(setActivityOn);
			applyFontSize(this);
		});
		$('#buddypress').find('.acomment-meta:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			$(this).click(toggleCommentOn);
			applySizeScaling($(this).children());
		});
		$('#buddypress').find('.acomment-content:not(.decorated)').each(function() {
			$(this).addClass('decorated');
			$(this).click(setCommentOn);
			applyFontSize(this);
		});
		// grid layout : date title
		$('#buddypress').find('li[id^="activity-"]:not(.parsed)').each(function() {
			$(this).addClass('parsed');
			$(this).click(openPreviewGridMsg);
			const commentCounter = $(this).find('.acomment-content').length;
			if (commentCounter) {
				$(this).addClass('has-comments');
				const counter = $(createCustomElement('div'));
				counter.addClass('comment-counter');
				counter.html(commentCounter);
				$(this).find('.activity-content').first().append(counter);
			}
			const unexpandBtn = $(createCustomElement('div'));
			unexpandBtn.addClass('unexpand-btn');
			unexpandBtn.html('<i class="fas fa-caret-up"></i>');
			unexpandBtn.click(closePreviewGridMsg);
			$(this).find('.activity-content').first().append(unexpandBtn);
		});
		$('#buddypress').find('li[id^="acomment"]:not(.parsed)').each(function() {
			$(this).addClass('parsed');
			$(this).click(openPreviewGridMsg);
			const subcommentCounter = $(this).find('li[id^="acomment"]').length;
			if (subcommentCounter) {
				$(this).addClass('has-comments');
				const counter = $(createCustomElement('div'));
				counter.addClass('comment-counter');
				counter.html(subcommentCounter);
				$(this).append(counter);
			}
			const unexpandBtn = $(createCustomElement('div'));
			unexpandBtn.addClass('unexpand-btn');
			unexpandBtn.html('<i class="fas fa-caret-up"></i>');
			unexpandBtn.click(closePreviewGridMsg);
			$(this).append(unexpandBtn);
		});
		printDay = true;
		prevDate = '';
		$('#activity-stream').find('> *:not(.activity-recent)').each(function() {
			let currentDate = $(this).find('.time-date').first();
			if (!currentDate.length) {
				printDay = false;
				return;
			}
			currentDate = currentDate.html();
			const titleDate = currentDate.indexOf(' ', 3) ? currentDate.substring(0, currentDate.indexOf(' ', 3)) : currentDate;
			if (!printDay) {
				printDay = true;
				prevDate = titleDate;
				return;
			}
			if (titleDate !== prevDate) {
				prevDate = titleDate;
				$(createCustomElement('div')).addClass('section-date-title').html(titleDate).insertBefore($(this));
			}
		});
	}
	function applyFontSize(pane) {
		$(pane).attr('style', 'font-size:'+getFontPreferences('px')+' !important');
	}
	function applySizeScaling(elt) {
		$(elt).css('transform', 'scale('+getFontPreferences('scale')+')');
	}
	function isSimpleDate(dateStr) {
		return dateStr.includes('jan')
				|| dateStr.includes('fev')
				|| dateStr.includes('mar')
				|| dateStr.includes('avr')
				|| dateStr.includes('mai')
				|| dateStr.includes('jui')
				|| dateStr.includes('ao')
				|| dateStr.includes('sept')
				|| dateStr.includes('oct')
				|| dateStr.includes('nov')
				|| dateStr.includes('dec');
	}
	
	function openPreviewGridMsg(event) {
		const msg = event.currentTarget;
		$(msg).addClass('open');
	}
	function closePreviewGridMsg(event) {
		const msg = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		$(msg).closest('.open').removeClass('open');
	}
	function openMessageModal(event) {
		const msg = event.currentTarget;
		let url = $(msg).find('a.activity-time-since').first().attr('href');
		if ($(document.body).hasClass('message-browser-alt-grid')) {
			displayFrameModal(url);
		}
	}
	function displayFrameModal(url) {
		let frame = $(document.body).find('#frame-modal');
		let toggler = $(document.body).find('#frame-modal-back');
		if (!frame.length) {
			frame = $(createCustomElement('iframe', 'frame-modal')); 
			frame.on("load", function() {
			  let head = frame.contents().find("html").addClass('in-iframe');
			});
			toggler = $(createCustomElement('div', 'frame-modal-back'));
			toggler.click(function() {
				frame.removeClass('open');
				toggler.removeClass('open');
				frame.attr('src', '');
			});
			$(document.body).append(frame);
			$(document.body).append(toggler);
		}
		frame.attr('src', url);
		frame.addClass('open');
		toggler.addClass('open');
	}
	
	var updatingMessages = false;
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new MutationObserver(function(mutationsList, observer) {
		for(var i=0; i<mutationsList.length; i++) { // for loop style to work for IE
			let mutation = mutationsList[i];
			for(var j=0; j<mutation.addedNodes.length; j++) { // for loop style to work for IE
				let node = mutation.addedNodes[j];
				// console.log('new ' + node.tagName);
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (node.tagName == 'div') {
						console.log('============BEGIN============');
						console.log('NEW::' + node.className);
						console.log('============END============');
					}
					if (node.tagName == 'LI') {
						if (node.id.startsWith('activity-')) {
							// new activity
							console.log('new activity ::');
							if ($(node).find('> .activity-content > .activity-header .recent').each(function() {
								// recent case
								$(node).addClass('activity-recent');
								$(node).addClass('on');
							}));
							asyncRecentUpdate();
						}
						if (node.id.startsWith('acomment-')) {
							// new comment
							$(node).addClass('acomment-recent');
							$(node).find('.acomment-content').click(setCommentOn);
							applyFontSize($(node).find('.acomment-content'));
							$(node).find('.acomment-meta').each(function () {
								$(this).addClass('decorated');
								$(this).click(toggleCommentOn);
								applySizeScaling($(this).children());
							});
							// comments print button
							$(node).find('.acomment-options:not(.decorated)').each(function() {
								$(this).addClass('decorated');
								let printBtn = document.createElement('a');
								printBtn.className= 'print-btn';
								printBtn.innerHTML='Imprimer';
								$(printBtn).click(printComment);
								$(this).append(printBtn);
								// add delete custom button
								addCustomDeleteButton(this);
								applySizeScaling($(this).children());
							});
							$(node).addClass('on');
						}
					}
				}
			}
		}
	});
	observer.observe(document, {
		subtree: true,
		childList: true
	});
	function addCustomDeleteButton(actionsPane) {
		let actionBtn = $(actionsPane).find('a[class*="delete"]');
		if (actionBtn.length === 0) {
			return;
		}
		const deleteBtn = $(createCustomElement('div'));
		deleteBtn.addClass('delete-custom-btn');
		deleteBtn.html('<i class="fas fa-times"></i>&nbsp;Supprimer');
		deleteBtn.data('href', actionBtn.attr('href'));
		deleteBtn.click(openDeleteModal);
		$(actionsPane).append(deleteBtn);
	}
	function asyncRecentUpdate() {
		if (!updatingMessages) {
			console.log('calling update...');
			updatingMessages = true;
			doRecentUpdate().then(function (msg) {
				console.log(msg);
			});
			console.log('runing update...');
		}
	}
	function doRecentUpdate() {
	  return new Promise(function (resolve) {
		setTimeout(() => {
			updatingMessages = false;
			console.log('do Update...');
			generateHistory();
			$('#history-wrapper').removeClass('loading');
			if ($('li.load-more:last-child').length === 0) {
				$('#history-wrapper').addClass('all-msg-loaded');
			}
			decorateMessages();
		}, 1000);
	  });
	}
	
	function toggleActivityOn() {
		$(this).closest('li[id^="activity-"]').toggleClass('on');
	}
	function setActivityOn() {
		$(this).closest('li[id^="activity-"]').toggleClass('on', true);
	}
	function toggleCommentOn() {
		$(this).closest('li[id^="acomment-"]').toggleClass('on');
	}
	function setCommentOn() {
		$(this).closest('li[id^="acomment-"]').toggleClass('on', true);
	}
	decorateMessages();
	function printActivity() {
		const message = $(this).parent().prev();
		const header = message.prev().children().first();
		printElem(header.children().first().html() 
				  + '<div style="display: inline-block; float: right">'
				  + header.children().last().children().last().html() 
				  +'</div><hr>' 
				  + message.html());
	}
	function printComment() {
		const message = $(this).parent().prev();
		const header = message.prev();
		printElem(header.children().first().html() 
				  + '<div style="display: inline-block; float: right">'
				  + header.children().last().children().last().html() 
				  +'</div><hr>' 
				  + message.html());
	}
	
	/************************************** Detect IE *************************************************/
	
	if (isIEBrowser) {
		document.body.classList.add('editor-legacy');
		document.body.classList.add('ie-browser');
		return;
	}
	
	/************************************** Detect IE *************************************************/
	if (getPreferences(PREF.displayDate) === 'false') {
		document.body.classList.add('no-date');
	}
	if (localStorage.getItem('message-display-mode')) {
		document.body.classList.add(localStorage.getItem('message-display-mode'));
	} else if (localStorage.getItem('message-display-mode-no-content') === 'true') {
		document.body.classList.add('message-browser-alt');
		localStorage.setItem('message-display-mode', 'message-browser-alt');
	}
	if (isIEBrowser || getPreferences(PREF.editorMode) !== 'false') {
		document.body.classList.add('editor-legacy');
	}

	function doWhenChildCreated(root, callback) {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		new MutationObserver(checkNodeFct(callback)).observe(root, {
			childList: true
		});
	}
	function checkNodeFct(callback) {
		return function(mutationsList) {
			for(var i=0; i<mutationsList.length; i++) { // for loop style to work for IE
				let mutation = mutationsList[i];            
				for(var j=0; j<mutation.addedNodes.length; j++) { // for loop style to work for IE
					let node = mutation.addedNodes[j];                       
					if (node.nodeType === Node.ELEMENT_NODE) {                
						callback(node);                
					}            
				}        
			}   
		} 
	}
	function isNotRecent(dateTag) {
		return !dateTag.classList.contains('recent');
	}

	var bp = document.getElementById('buddypress');
	var activities = null;
	if (bp) {
		activities = bp.querySelector('.activity');
	}

	function buildConfigItem(icoHTML, desc, keystore, defaultValue, callback) {
		var item = createCustomElement('div');
		item.className = 'message-config-menu-item clickable';
		
		var ico = createCustomElement('div');
		ico.className = 'message-config-menu-item-ico';
		ico.innerHTML = icoHTML;
		var label = createCustomElement('label');
		label.innerHTML = desc;
		var switchItem = createCustomElement('div');
		switchItem.className = 'mdc-switch';
		var switchTrack = createCustomElement('div');
		switchTrack.className = 'mdc-switch__track';
		var switchThumbUnderlay = createCustomElement('div');
		switchThumbUnderlay.className = 'mdc-switch__thumb-underlay';
		var switchThumb = createCustomElement('div');
		switchThumb.className = 'mdc-switch__thumb';
		var switchInput = createCustomElement('input', 'auto-display-switch');
		switchInput.className = 'mdc-switch__native-control';
		switchInput.setAttribute('type', 'checkbox');
		switchInput.setAttribute('role', 'switch');
		switchInput.setAttribute('aria-checked', 'false');

		item.appendChild(ico);
		item.appendChild(label);
		item.appendChild(switchItem);
		switchItem.appendChild(switchTrack);
		switchItem.appendChild(switchThumbUnderlay);
		switchThumbUnderlay.appendChild(switchThumb);
		switchThumbUnderlay.appendChild(switchInput);

		item.onclick = function (e) { // function write style for IE
			switchItem.classList.toggle('mdc-switch--checked');
			let isEnabled = switchItem.classList.contains('mdc-switch--checked');
			localStorage.setItem(keystore, isEnabled);

			if (callback) {
				callback(isEnabled);
			}
		};
		var enabled = localStorage.getItem(keystore);
		if (enabled === 'true') {
			switchItem.classList.add('mdc-switch--checked');
		}
		if(!enabled && defaultValue) {
			switchItem.classList.add('mdc-switch--checked');
		}
		return item;
	}
	
	function buildConfigChoiceItem(icoHTML, desc, keystore, items, defaultVal, className, callback) {
		// -- menu title
		var item = createCustomElement('div');
		item.className = 'message-config-menu-item';
		
		var ico = createCustomElement('div');
		ico.className = 'message-config-menu-item-ico';
		ico.innerHTML = icoHTML;
		var label = createCustomElement('label');
		label.innerHTML = desc;
		var selectItem = createCustomElement('select');
		selectItem.className = className ? className +' custom-combobox' : 'custom-combobox';
		selectItem.innerHTML = '';
		for (let value of items) {
			selectItem.innerHTML += '<option value="'+value+'">'+value+'</option>';
		}
		var defaultValue = localStorage.getItem(keystore) ? localStorage.getItem(keystore) : defaultVal;
		$(selectItem).val(defaultValue);
		$(selectItem).change(function () {
			storePreferences(keystore, $(this).val());
		});
		
		item.appendChild(ico);
		item.appendChild(label);
		item.appendChild(selectItem);
		return item;
	}
	
	function buildConfigChoiceRadio(icoHTML, desc, keystore, items, defaultValue, callback) {
		var item = $(createCustomElement('div'));
		item.addClass('message-config-menu-item col');
		
		var colWrapper = $(createCustomElement('div'));
		colWrapper.addClass('col-wrapper');
		
		var ico = createCustomElement('div');
		ico.className = 'message-config-menu-item-ico';
		ico.innerHTML = icoHTML;
		var label = $(createCustomElement('label'));
		label.html(desc);
		var selectItem = $(createCustomElement('div'));
		let idx = 0;
		var selectedValue = getPreferences(keystore);
		if (!selectedValue || selectedValue == 'null') {
			selectedValue = defaultValue;
		}
		for (const data of items) {
			const option = $(createCustomElement('div'));
			option.addClass('option');
			const optionId = keystore + '-' + idx;
			if (selectedValue == data.value) {
				option.addClass('checked');
			}
			option.html('<span style="font-size:'+data.value+'">'+data.label+'</span>');
			
			// listening
			option.find('input').click(callback);
			option.click(function (e) {
				option.parent().children('.option').removeClass('checked');
				option.addClass('checked');
				callback(data.value);
			});
			
			selectItem.append(option);
			idx++;
		}
		item.append(ico);
		item.append(colWrapper);
		colWrapper.append(label);
		colWrapper.append(selectItem);
		
		item.find('.checked').click();
		return item[0];
	}

	function buildMessageConfigBtn(root) {
		// button
		var btn = createCustomElement('div', 'message-config-btn');

		btn.onclick = function (e) { // function write style for IE
			if (e.target !== btn) return;
			btn.classList.toggle('on');
			root.classList.toggle('on-config', btn.classList.contains('on'));
			root.classList.toggle('on', false);
		};

		// menu configuration :
		let menuDiv = createCustomElement('div', 'message-config-menu');
		// -- menu title
		let title = createCustomElement('div', 'message-config-menu-title');
		title.innerHTML = '<i class="fas fa-cog"></i> Préférences d\'affichage';
		// -- close button
		let closeBtn = createCustomElement('div', 'message-config-menu-close-btn');
		closeBtn.innerHTML = '<i class="fas fa-times"></i>';

		closeBtn.onclick = function (e) {
			btn.classList.toggle('on', false);
			root.classList.toggle('on-config', false);
			root.classList.toggle('on', false);
		};

		const msgModeChooser = buildConfigChoiceRadio('<i class="fab fa-readme"></i>',
													  '<b>Style d\'affichage</b> des messages', 
													   PREF.msgDisplayMode, [
															{value: 'classic', label:'normal'}, 
															{value:'list', label:'liste'},
															{value:'thumbnail', label:'vignettes'}
													  ],
													  'classic',
													  function(value) {
														storePreferences(PREF.msgDisplayMode, value);
														switch (value) {
															case 'list':
																$(document.body).removeClass('message-browser-by-thumbnail');
																$(document.body).addClass('message-browser-by-list');
																break;
															case 'thumbnail':
																$(document.body).removeClass('message-browser-by-list');
																$(document.body).addClass('message-browser-by-thumbnail');
																break;
															default:
																$(document.body).removeClass('message-browser-by-list');
																$(document.body).removeClass('message-browser-by-thumbnail');
																break;
														}
														document.getElementById('activity-stream').scrollIntoView();
													  });
		let legacyModeItem = null
		legacyModeItem = buildConfigItem('<i class="fas fa-feather-alt"></i>',
										 'Garder l\'ancien <b>éditeur de message</b> sans outils de mise en forme', 
										 PREF.editorMode, true, 
										 function (isEnabled) {
			if (isEnabled) {
				document.body.classList.add('editor-legacy');
			} else {
				document.body.classList.remove('editor-legacy');
			}
		});

		let dateActivationItem = buildConfigItem('<i class="fas fa-clock"></i>',
												 'Afficher la <b>date des messages</b><br/>(heure de française pour le moment)', 
												 PREF.displayDate, true, 
												 function (isEnabled) {
													if (isEnabled) {
														document.body.classList.remove('no-date');
													} else {
														document.body.classList.add('no-date');
													}
												});

		let menuClickBehaviorItem = buildConfigItem('<i class="fas fa-mouse-pointer"></i>',
												 	'Faire disparaître le menu lors du <b>clic</b> sur un message', 
												    'message-menu-click-behaviour', false);

		let loadingSizeItem = buildConfigChoiceItem('<i class="fas fa-hourglass"></i>',
												 	'<b>Nombre de messages</b> par chargement', 
												 	 PREF.pageSize, [10, 20, 50, 100, 200], 20, 'page-size');

		const fontSizeChooser = buildConfigChoiceRadio('<i class="fas fa-text-height"></i>',
												 	'<b>Taille</b> des messages', 
													   PREF.fontSize, [
															{value:'12px', label:'mini'}, 
															{value:'13px', label:'petit'}, 
															{value:'14px', label:'normal'}, 
															{value:'15px', label:'grand'}, 
															{value:'16px', label:'maxi'}
													  ],
													  '16px',
													  function(value) {
														storePreferences(PREF.fontSize, value);
														// resize messages
														$('#buddypress .activity-header > p > *').each(function() {
															applyFontSize($(this));
														});
														$('#buddypress .activity-inner').each(function() {
															applyFontSize($(this));
														});
														$('#buddypress .activity-meta > *').each(function() {
															applySizeScaling($(this));
														});
														// resize comments
														$('#buddypress .acomment-meta > *').each(function() {
															applySizeScaling($(this));
														});
														$('#buddypress .acomment-content').each(function() {
															applyFontSize($(this));
														});
														$('#buddypress .acomment-options > *').each(function() {
															applySizeScaling($(this));
														});
													  });
		
		menuDiv.appendChild(title);
		menuDiv.appendChild(closeBtn);
		if (!isIEBrowser) {
			menuDiv.appendChild(legacyModeItem);
		}
		menuDiv.appendChild(loadingSizeItem);
		//menuDiv.appendChild(dateActivationItem);
		if (!isIEBrowser) {
			menuDiv.appendChild(msgModeChooser);
		}
		menuDiv.appendChild(fontSizeChooser);
		btn.appendChild(menuDiv);

		return btn;
	}

	var _isDynamicResizing = true;
	function generateHistory() {
		console.log('---------------- generateHistory');

		var wrapper = document.getElementById('menu-recent-wrapper');
		var counter = 0;
		var counterMessage = 0;
		var counterCom = 0;
		var recentCounterMessage = 0;
		var recentCounterCom = 0;
		var root = document.getElementById('menu-recent');
		const isInit = (root == null);
		if (isInit) {
			root = createCustomElement('div', 'menu-recent');
		} else {
			root.innerHTML = '';
		}
		var activities = document.body.querySelectorAll('li[id^="activity-"].activity_update');
		var sortList = [];
		for (var i=0; i<activities.length; i++) { // for loop style to work for IE
			let activity = activities[i];
			let row = createCustomElement('div');
			row.className = 'msg-event activity-event';
			row.style.display = 'flex';
			row.style.flexFlow = 'row';
			row.style.flexWrap = 'wrap';

			let activityAuthorLink = activity.querySelector('.activity-header a:first-child');
			let activityAuthor = activityAuthorLink.innerHTML;
			let authorDiv = createCustomElement('div');
			authorDiv.innerHTML = activityAuthor;
			authorDiv.style.flex = '1 0';
			authorDiv.className = 'author';
			let activityAuthorLinkRef = activityAuthorLink.getAttribute('href').split('/');
			let activityAuthorId = activityAuthorLinkRef[activityAuthorLinkRef.length-2];
			row.setAttribute('user', activityAuthorId);
			row.setAttribute('username', activityAuthor);

			let dateTag = activity.querySelector('.time-date');
			let date = dateTag.innerHTML;
			let dateDiv = createCustomElement('div');
			dateDiv.innerHTML = date;
			dateDiv.className = 'date';

			let sinceTag = activity.querySelector('.time-since');
			let since = sinceTag.innerHTML;
			let sinceDiv = createCustomElement('div');
			sinceDiv.innerHTML = since.substring(7);
			sinceDiv.className = 'since';

			if (!isNotRecent(dateTag)) {
				row.classList.add('recent');
				recentCounterMessage++;
			}
			counterMessage++;
			counter++;

			let message = activity.querySelector('.activity-inner').innerHTML.substring(0, 100);
			while (message.includes('<br>')) {
				message = message.replace('<br>', ' ');
			}
			while (message.includes('<p>')) {
				message = message.replace('<p>', ' ');
			}
			while (message.includes('</p>')) {
				message = message.replace('</p>', ' ');
			}
			/*
			let messageDiv = createCustomElement('div');
			messageDiv.innerHTML = message;
			messageDiv.style.flex = '1 0 100%';
			messageDiv.style.whiteSpace = 'no-wrap';
			messageDiv.className = 'message';
			*/
			let glue = createCustomElement('div');
			glue.style.flex = '1 0 100%';
			glue.style.whiteSpace = 'no-wrap';
			glue.className = 'message';

			let temp = activity.querySelector('.activity-time-since');
			temp = temp.href;
			temp = temp.substring(0, temp.length - 1);
			temp = temp.substring(temp.lastIndexOf('/') + 1);
			row.setAttribute('data-id', temp);

			let avatarImg = activity.querySelector('.activity-avatar img');
			let avatarImgDiv = createCustomElement('div');
			avatarImgDiv.className = 'event-avatar';
			avatarImgDiv.style.backgroundImage = "url('" + avatarImg.src + "')";

			let groupName = null;
			if (activity.classList.contains('groups')) {
				groupName = activity.querySelector('.activity-header > p > a:nth-child(3)').innerHTML;
			}

			row.appendChild(authorDiv);
			row.appendChild(dateDiv);
			row.appendChild(sinceDiv);
			row.appendChild(avatarImgDiv);

			if (groupName) {
				let groupDiv = createCustomElement('a');
				groupDiv.setAttribute('flag', 'group');
				groupDiv.innerHTML = groupName;
				row.appendChild(glue);
				row.appendChild(groupDiv);
			}

			row.onclick = function (e) {
				_isDynamicResizing = false;
				activity.classList.add('on');
				activity.classList.add('open');
				scrollTo(activity, 100);
				if (localStorage.getItem('message-menu-click-behaviour') === 'true') {
					wrapper.classList.toggle('on');
				}
				_isDynamicResizing = true;
				computeMaxHeightRecentMenu(root);
			};
			$(row).mouseenter(function() {
				$(activity).children('.activity-content').addClass('highlight');
			});
			$(row).mouseleave(function() {
				$(activity).children('.activity-content').removeClass('highlight');
			});
			sortList.push(row);

			let comments = activity.querySelectorAll('li[id^="acomment-"]');
			for(var j=0; j<comments.length; j++) { // for loop style to work for IE
				let comment = comments[j];
				let row = createCustomElement('div');
				row.className = 'msg-event comment-event';
				row.style.display = 'flex';
				row.style.flexFlow = 'row';
				row.style.flexWrap = 'wrap';

				let authorLink = comment.querySelector('.acomment-meta a:first-child');
				let author = authorLink.innerHTML;
				let authorDiv = createCustomElement('div');
				authorDiv.innerHTML = author;
				authorDiv.style.flex = '1 0';
				authorDiv.className = 'author';
				let authorLinkRef = authorLink.getAttribute('href').split('/');
				const authorId = authorLinkRef[authorLinkRef.length-2];
				row.setAttribute('user', authorId);
				row.setAttribute('username', author);

				let dateTag = comment.querySelector('.time-date');
				let date = dateTag.innerHTML;
				let dateDiv = createCustomElement('div');
				dateDiv.innerHTML = date;
				dateDiv.className = 'date';

				let sinceTag = comment.querySelector('.time-since');
				let since = sinceTag.innerHTML;
				let sinceDiv = createCustomElement('div');
				sinceDiv.innerHTML = since.substring(7);
				sinceDiv.className = 'since';

				if (!isNotRecent(dateTag)) {
					row.classList.add('recent');
					recentCounterCom++;
				}
				counterCom++;
				counter++;

				let upperNode = comment.parentNode.parentNode;
				let destName = null;
				if (upperNode.id.startsWith('acomment-')) {
					// case response to another comment
					destName = upperNode.querySelector('.acomment-meta a:first-child').innerHTML;
				} else {
					// comment to activity
					destName = activityAuthor;
				}
				let message = 'à <span class="destName">' + destName + '</span>';
				let messageDiv = createCustomElement('div');
				messageDiv.innerHTML = message;
				messageDiv.style.flex = '1 0 100%';
				messageDiv.style.whiteSpace = 'no-wrap';
				messageDiv.className = 'message';

				let temp = comment.id;
				temp = temp.substring(temp.lastIndexOf('-') + 1);
				row.setAttribute('data-id', temp);

				let avatarImg = comment.querySelector('.acomment-avatar img');
				let avatarImgDiv = createCustomElement('div');
				avatarImgDiv.className = 'event-avatar';
				avatarImgDiv.style.backgroundImage = "url('" + avatarImg.src + "')";

				row.appendChild(authorDiv);
				row.appendChild(dateDiv);
				row.appendChild(sinceDiv);
				row.appendChild(messageDiv);
				row.appendChild(avatarImgDiv);

				if (groupName) {
					let groupDiv = createCustomElement('div');
					groupDiv.setAttribute('flag', 'group');
					groupDiv.innerHTML = groupName;
					row.appendChild(groupDiv);
				}

				let commentId = comment.id;

				row.onclick = function (e) {
					_isDynamicResizing = false;
					if (comment.offsetWidth <= 0 || comment.offsetHeight <= 0) {
						comment.classList.add('open');
						console.log('parents : ' + $(comment).parents('.li[id^="acomment-"]').length);
						console.log('closest : ' + $(comment).closest('.li[id^="activity-"]').length);
						$(comment).parents('li[id^="acomment-"]').addClass('open');
						$(comment).closest('li[id^="activity-"]').addClass('open');
						scrollTo(comment, 100);
					} else {
						comment.classList.add('on');
						comment.classList.add('open');
						console.log('parents : ' + $(comment).parents('.li[id^="acomment-"]').length);
						console.log('closest : ' + $(comment).closest('.li[id^="activity-"]').length);
						$(comment).parents('li[id^="acomment-"]').addClass('open');
						$(comment).closest('li[id^="activity-"]').addClass('open');
						scrollTo(comment, 100);
					}
					if (localStorage.getItem('message-menu-click-behaviour') === 'true') {
						wrapper.classList.toggle('on');
					}
					_isDynamicResizing = true;
					computeMaxHeightRecentMenu(root);
				};
				$(row).mouseenter(function() {
					$(comment).children('.acomment-content').addClass('highlight');
				});
				$(row).mouseleave(function() {
					$(comment).children('.acomment-content').removeClass('highlight');
				});
				sortList.push(row);
			}
		}
		
		// sort messages
		sortList.sort(sortMessage);
		var lastRecent = null;
		for(var i=0; i<sortList.length; i++) { // for loop style to work for IE
			let e = sortList[i];
			if (e.classList.contains('recent')) {
				lastRecent = e;
			}
			root.appendChild(e);
		}
		if (lastRecent != null) {
			var notRecentTitle = createCustomElement('div', 'not-recent-title');
			notRecentTitle.innerHTML = 'Jours précédents :';
			insertAfter(notRecentTitle, lastRecent);
		}
		
		let contextualMenu = document.getElementById('contextual-menu');
		if (!contextualMenu) {
			// contextual menu build
			contextualMenu = createCustomElement('div', 'contextual-menu');
			
			// contextual menu item : filter
			const contextualMenuFilter = createCustomElement('div', 'contextual-menu-filter');
			contextualMenuFilter.className = 'filter';
			contextualMenuFilter.innerHTML = 'Filtrer les messages';
			contextualMenuFilter.onclick = function(e) {
				filterRecentMessages();
			};
			
			// contextual menu item : unfilter
			const contextualMenuUnfilter = createCustomElement('div', 'contextual-menu-unfilter');
			contextualMenuUnfilter.className = 'unfilter';
			contextualMenuUnfilter.innerHTML = 'Supprimer le filtre';
			contextualMenuUnfilter.onclick =function(e) {
				unfilterRecentMessages();
			};
			
			// contextual menu item : profile
			const contextualMenuProfile = createCustomElement('div', 'contextual-menu-profile');
			contextualMenuProfile.className = 'profile';
			contextualMenuProfile.innerHTML = 'Profil';
			contextualMenuProfile.onclick = function(e) {
				const user = document.getElementById('contextual-menu').getAttribute('user');
				window.location.href = '/lumiere/membres/'+user; 
				document.getElementById('contextual-menu').classList.remove('open');
			};
			
			contextualMenu.appendChild(contextualMenuFilter);
			contextualMenu.appendChild(contextualMenuUnfilter);
			contextualMenu.appendChild(contextualMenuProfile);
			document.body.appendChild(contextualMenu);
			document.body.addEventListener('click', function(e) {
				$('#contextual-menu.open').removeClass('open');
				$('#filter-chooser-menu.open').removeClass('open');
				$('#vase-clos-messages.open').removeClass('open');
				$('#vase-clos-messages-back').removeClass('open');
			});
			
			// contextual menu open listening
			if (root.addEventListener) {
				root.addEventListener('contextmenu', function(e) {
					e.preventDefault();
					e.stopPropagation();
					let elt = e.target;
					const contextuableResult = $(elt).closest('.msg-event');
					if (contextuableResult.length) {
						const contextuable = contextuableResult.first();
						const ctxtMenu = document.getElementById('contextual-menu');
						ctxtMenu.style.left = e.pageX+'px';
						ctxtMenu.style.top = e.pageY+'px';
						ctxtMenu.classList.add('open');
						ctxtMenu.setAttribute('user', contextuable.attr('user'));
						document.getElementById('contextual-menu-profile').innerHTML = 'Profil de ' + contextuable.attr('username');
					}
				}, false);
			}
		} else {
			contextualMenu.classList.remove('open');
			if (contextualMenu.classList.contains('filtering')) {
				filterRecentMessages();
			}
		}
		
		computeMaxHeightRecentMenu(root);

		//wrapper.appendChild(root);
		$(root).insertBefore(document.getElementById('menu-recent-footer'));

		var counterMsgDiv = document.getElementById('history-counter-msg');
		counterMsgDiv.innerHTML = (recentCounterMessage + recentCounterCom);
		var counterDisplayedDiv = document.getElementById('history-counter-displayed');
		counterDisplayedDiv.innerHTML = '<div id="msg-only-counter" title="Nombre de messages"><span>' + counterMessage + '</span> <i class="fas fa-feather-alt"></i></div>'+
										'<div id="comment-only-counter" title="Nombre de commentaires"><span>' + counterCom + '</span> <i class="fas fa-comment"></i></div>';
	}
	function createFilterBar(wrapper) {
		let msgFilter = document.getElementById('menu-recent-filter-bar');
		if (msgFilter) {
			return msgFilter;
		}
		// messages nav filter build
		msgFilter = createCustomElement('div', 'menu-recent-filter-bar');
		const filterChooser = createCustomElement('div', 'filter-chooser');
		const filterChooserMenu = createfilterChooserMenu('filter-chooser-menu');
		msgFilter.appendChild(filterChooser);
		wrapper.appendChild(filterChooserMenu);
		wrapper.appendChild(msgFilter);
		filterChooser.onclick = function(e) {
			document.getElementById('filter-chooser-menu').classList.toggle('open');
			e.preventDefault();
			e.stopPropagation();
		}
		filterChooserMenu.onclick = function() {
			document.getElementById('filter-chooser-menu').classList.toggle('open');
			e.preventDefault();
			e.stopPropagation();
		}
		let groupPageName = '';
		const pageName = findPageName();
		if (pageName) {
			if (pageName == 'activites-du-site') {
				// case : general activity page => dynamic name
				groupPageName = 'Messages publics';
				const activityTabs = document.body.querySelectorAll('.activity-type-tabs > ul > li');
				// change selection listener
				const onActivityTypeChange = function(mutationsList) {
					for(let mutation of mutationsList) {
						if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
							if(mutation.target.classList.contains('selected')) {
								// activity tab selection change
								const tabName = findActivityTabName(mutation.target.id);
								document.getElementById('filter-chooser-selection').innerHTML = tabName;
								// disable filter menu item of the current
								const filterMenuItems = filterChooserMenu.querySelectorAll('a');
								for (var i=0; i<filterMenuItems.length; i++) { // for loop style to work for IE
									let substr = filterMenuItems[i].innerHTML.substring(filterMenuItems[i].innerHTML.indexOf(';') + 1);
									if (substr == tabName) {
										filterMenuItems[i].setAttribute('disabled', 'true');
									} else {
										filterMenuItems[i].removeAttribute('disabled');
									}
								}
							}
						}
					}
				}
				// find current selection + change selection listening init
				for(var i=0; i<activityTabs.length; i++) { // for loop style to work for IE
					let tab = activityTabs[i];
					const observer = new MutationObserver(onActivityTypeChange);
        			observer.observe(tab, { attributes: true });
					if (tab.classList.contains('selected')) {
						groupPageName = findActivityTabName(tab.id);
					}
				}
			} else {
				groupPageName = findGroupeNameFromPage(pageName);
			}
		}
		// disable filter menu item of the current
		const filterMenuItems = filterChooserMenu.querySelectorAll('a');
		for (var i=0; i<filterMenuItems.length; i++) { // for loop style to work for IE
			let substr = filterMenuItems[i].innerHTML.substring(filterMenuItems[i].innerHTML.indexOf(';') + 1);
			if (substr == groupPageName) {
				filterMenuItems[i].setAttribute('disabled', 'true');
			} else {
				filterMenuItems[i].removeAttribute('disabled');
			}
		}
		const filterChooserSelection = createCustomElement('span', 'filter-chooser-selection');
		filterChooserSelection.innerHTML = groupPageName;
		filterChooser.appendChild(filterChooserSelection);
	}
	function filterRecentMessages() {
		const ctxtMenu = document.getElementById('contextual-menu');
		const user = ctxtMenu.getAttribute('user');
		let evts = document.body.querySelectorAll('#menu-recent > *');
		for(var n=0; n<evts.length; n++) { // for loop style to work for IE
			evts[n].classList.remove('hide');
		}
		evts = document.body.querySelectorAll('#menu-recent > .msg-event:not([user="'+user+'"])');
		for(var n=0; n<evts.length; n++) { // for loop style to work for IE
			evts[n].classList.add('hide');
		}
		ctxtMenu.className = 'filtering';
	}
	function unfilterRecentMessages() {
		$('#menu-recent > *').removeClass('hide');
		const ctxtMenu = document.getElementById('contextual-menu');
		ctxtMenu.className = '';
		ctxtMenu.removeAttribute('user');
	}
	function findPageName() {
		var urlPath = window.location.pathname.split('/');
		for (var i=urlPath.length-1; i>=0; i--) { // for loop style to work for IE
			if (urlPath[i]) {
				return urlPath[i];
			}
		}
		return null;
	}
	function findGroupeNameFromPage(pageName) {
		let groupLink = $('#groups-list a[class*="'+pageName+'"]');
		if (groupLink.length > 0) {
			return groupLink.closest('li').find('.bp-tooltip').html() + '<div>'+groupLink.clone().html() +'</div>';
		} else {
			return 'Discussion';
		}
	}
	function findActivityTabName(tabId) {
		switch(tabId) {
			case 'activity-all':
				return '<i class="fas fa-comment"></i> &nbsp;&nbsp;Messages publics';
			case 'activity-groups':
				return '<i class="fas fa-comments"></i> &nbsp;&nbsp;Mes groupes';
			case 'activity-favorites':
				return '<i class="fas fa-star"></i> &nbsp;&nbsp;Mes favoris';
			default:
				return '';
		}
	}
	function createfilterChooserMenu(id) {
		const menu = $(createCustomElement('div', id));
		const activityTabPane = document.body.querySelector('#buddypress .activity-type-tabs > ul');
		console.log('activityTabPane : ' + activityTabPane);
		if (activityTabPane) {
			menu.append(createfilterChooserMenuItem('<i class="fas fa-comment"></i> &nbsp;&nbsp;Messages publics', null, function(e) {
				let tabLink = activityTabPane.querySelector('#activity-all a');
				tabLink.click();
			}));
			menu.append(createfilterChooserMenuItem('<i class="fas fa-comments"></i> &nbsp;&nbsp;Mes groupes', null, function(e) {
				let tabLink = activityTabPane.querySelector('#activity-groups a');
				tabLink.click();
			}));
			let item = createfilterChooserMenuItem('<i class="fas fa-star"></i> &nbsp;&nbsp;Mes favoris', null, function(e) {
				let tabLink = activityTabPane.querySelector('#activity-favorites a');
				tabLink.click();
			});
			item.classList.add('separating');
			menu.append(item);
		} else {
			let href = $('#wp-admin-bar-my-account > a:first-child').first().attr('href');
			if (href) {
				let name = href.substring(href.indexOf('/membres/'));
				name = name.substring(9);
				name = name.substring(0, name.indexOf('/'));
				menu.append(createfilterChooserMenuItem('<i class="fas fa-comment"></i> &nbsp;&nbsp;Messages publics', '/lumiere/activites-du-site/'));
				menu.append(createfilterChooserMenuItem('<i class="fas fa-comments"></i> &nbsp;&nbsp;Mes groupes', '/lumiere/membres/'+name+'/activity/groups/'));
				let item = createfilterChooserMenuItem('<i class="fas fa-star"></i> &nbsp;&nbsp;Mes favoris', '/lumiere/membres/'+name+'/activity/favorites/');
				item.classList.add('separating');
				menu.append(item);
			} else {				
				let item = createfilterChooserMenuItem('<i class="fa fa-envelope" aria-hidden="true"></i> &nbsp;&nbsp;Générale', null);
				item.classList.add('separating');
				menu.append(item);
			}
		}
		const siteNicoleLink = createfilterChooserMenuItem('<img src="https://www.eltair.org/lumiere/wp-content/uploads/avatars/49/5abbc80748ac2-bpthumb.jpg" class="avatar user-49-avatar avatar-50 photo"><div>Site de Nicole (Gezahel / Prius)</div>', 'https://orrel.info');
		siteNicoleLink.setAttribute('target', '_blank');
		siteNicoleLink.classList.add('separating');
		menu.append(siteNicoleLink);
		if (document.body.querySelector('#groups-list .item-title a[href*="le-vase-clos"]')) {
			let item = createfilterChooserMenuItem('<i class="fas fa-dove"></i> &nbsp;Messages du Ciel', '/lumiere/forum/topic/messages-du-ciel-2');
			item.classList.add('separating');
			menu.append(item);
		}
		$('#groups-list li').each(function() {
			const avatar = $(this).find('.item-avatar a').first().clone();
			avatar[0].className = '';
			const title = $(this).find('.item-title a').first().clone();
			title[0].className = '';
			//const icon = buildGroupIcon(groupShortName);
			const menuItem = $(createCustomElement('a'));
			menuItem.addClass('filter-chooser-menu-item');
			menuItem.attr('href', avatar.attr('href'));
			menuItem.append(avatar);
			menuItem.append(title);
			menu.append(menuItem);
		});
		return menu[0];
	}
	
	function createfilterChooserMenuItem(name, linkRef, callback) {
		const menuItem = createCustomElement('a');
		menuItem.className = 'filter-chooser-menu-item';
		menuItem.innerHTML = name;
		if (linkRef) {
			menuItem.setAttribute('href', linkRef);
		} else if (callback) {
			menuItem.onclick = callback;
		}
		return menuItem;
	}
	
	/*
	function buildGroupIcon(groupName) {
		switch(groupName) {
			case 'videoconference':
				return '<i class="fas fa-video"></i>';
			case 'le-vase-clos':
			case 'ame-collective':
			case 'elevation':
				return '<i class="fab fa-first-order-alt"></i>';
			case 'la-musique-chant-de-lame-256658669':
				return '<i class="fas fa-music"></i>';
			case 'dynamique-de-lartisan':
				return '<i class="fas fa-paper-plane"></i>';
			case 'et-lamour-dans-tout-ca':
				return '<i class="fas fa-heart"></i>';
			case 'lieux-lumiere':
				return '<i class="fas fa-map-marker-alt"></i>';
			case 'que-la-poesie-parfume-nos-coeurs-461998692':
				return '<i class="fas fa-feather-alt"></i>';
			case 'essai': //site
				return '<i class="fas fa-globe"></i>';
			case 'test':
				return '<i class="fas fa-cogs"></i>';
			case 'messages-de-la-lumiere-aux-artisans':
				return '<i class="fas fa-comment-alt"></i>';
			case 'meditation-jeudis':
				return '<i class="far fa-calendar-alt"></i>';
			case 'les-projets':
				return '<i class="fas fa-users-cog"></i>';
			case 'news-artisans':
				return '<i class="fas fa-newspaper"></i>';
			case 'nature-lumiere':
				return '<i class="fab fa-envira"></i>';
			case 'lego-la-conscience-lesprit':
				return '<i class="fas fa-user-circle"></i>';
			case 'corps-et-sante':
				return '<i class="fas fa-plus-square"></i>';
			case 'vallalar-traduction-participative':
			case 'recit-des-rencontres-christiques':
				return '<i class="fas fa-book"></i>';
			case 'reportages':
				return '<i class="fas fa-desktop"></i>';
			case 'abandon-de-soi':
				return '<i class="fas fa-street-view"></i>';
			case 'art-lumiere':
				return '<i class="fas fa-palette"></i>';
			case 'rencontre-des-artisans-a-savigny-annee-2018':
				return '<i class="fas fa-user-friends"></i>';
			case 'marcels-band':
				return '<i class="fas fa-dog"></i>';
			case 'alchimie-operative':
				return '<i class="fas fa-flask"></i>';
			default:
				return '<i class="fas fa-envelope"></i>';
		}
	}*/
	function sortMessage(a, b) {
		const va = parseInt(a.getAttribute('data-id'), 10);
		const vb = parseInt(b.getAttribute('data-id'), 10);
		if (va > vb) {
			return -1;
		}
		if (va < vb) {
			return 1;
		}
		// a doit être égal à b
		return 0;
	}
	var page = document.getElementById('page');
	function createHistoryBtn(isActivated, isExpanded) {

		var wrapper = createCustomElement('div', 'history-wrapper');
		
		var menuWrapper = createCustomElement('div', 'menu-recent-wrapper');
		addSideReminder(menuWrapper);
		var menuFooter = createCustomElement('div', 'menu-recent-footer');
		var msgReply = createCustomElement('div', 'new-msg-btn');
		msgReply.innerHTML = '<i class="fas fa-feather-alt"></i>';
		msgReply.onclick = function () {
			let msgTxtArea = $('#whats-new-textarea #whats-new');
			if (msgTxtArea && msgTxtArea.css('display') != 'none') {
				msgTxtArea.focus();
				$('html, body').animate( { scrollTop: $('.bpfb_form_container').offset().top }, 500 );
				return;
			}
			msgTxtArea = $('#whats-new-textarea .trumbowyg-editor');
			if (msgTxtArea && msgTxtArea.css('display') != 'none') {
				msgTxtArea.focus();
				msgTxtArea.click();
				$('html, body').animate( { scrollTop: $('.bpfb_form_container').offset().top }, 500 );
				return;
			}
		};
		menuFooter.appendChild(msgReply);
		menuWrapper.appendChild(menuFooter);
		
		var btn = createCustomElement('div', 'history-btn');
		btn.innerHTML = '<div id="history-btn-label">Messages &nbsp;<i class="indicator fas fa-caret-down"></i>&nbsp;</div>';
		btn.onclick = function (e) {
			if (e.target !== btn) return;
			wrapper.classList.toggle('on');
			
			// close config pannel upon close menu
			let configBtn = document.getElementById('message-config-btn');
			configBtn.classList.remove('on');
			wrapper.classList.remove('on-config');
			
		};

		if (isActivated) {
			wrapper.classList.add('on');
		}

		var counterMsg = createCustomElement('span', 'history-counter-msg');
		counterMsg.title = 'Messages postés aujourd\'hui';
		var counterAllMsg = createCustomElement('span', 'history-counter-displayed');
		counterAllMsg.title = 'Nombre de messages chargés';
		var loadMoreMsg = createCustomElement('div', 'load-more-msg');
		loadMoreMsg.title = 'Charger plus de messages';
		loadMoreMsg.innerHTML = '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
		$(loadMoreMsg).click(function () {
			if (!$(wrapper).hasClass('loading') && $('li.load-more:last-child > a').length > 0) {
				$(wrapper).addClass('loading');
				$('li.load-more:last-child > a').click();
				counterAllMsg.innerHTML = ' messages affichés';
				counterAllMsg.innerHTML = '<div id="msg-only-counter" title="Nombre de messages">' + 
										  '<i class="fa fa-spinner fa-pulse fa-fw margin-bottom"></i> <i class="fas fa-feather-alt"></i></div>'+
										  '<div id="comment-only-counter" title="Nombre de commentaires">' + 
										  '<i class="fa fa-spinner fa-pulse fa-fw margin-bottom"></i> <i class="fas fa-comment"></i></div>';
			}
		});

		wrapper.appendChild(buildMessageConfigBtn(wrapper));
		wrapper.appendChild(btn);
		wrapper.appendChild(menuWrapper);
		createFilterBar(wrapper);
		menuFooter.appendChild(counterMsg);
		menuFooter.appendChild(counterAllMsg);
		menuFooter.appendChild(loadMoreMsg);
		page.insertBefore(wrapper, page.childNodes[0]);
	}
	if (window.self == window.top && document.body.querySelector('#buddypress .activity .activity_update')) {
		createHistoryBtn(false, true);
		generateHistory();
		window.addEventListener('scroll', function (e) {
			computeMaxHeightRecentMenu();
		});
	}
	if (activities) {
		// reload all message (upon filter change)
		doWhenChildCreated(activities, function(node) {
			console.log('node.id :: ' + node.id);
			if (node.id != 'activity-stream' || window.self != window.top) {
				return;
			}
			console.log('UPDATE activities');
			var history = document.getElementById('menu-recent');
			var wrapper = document.getElementById('history-wrapper');

			if (document.body.querySelector('#buddypress .activity .activity_update')) {
				if (!wrapper) {
					createHistoryBtn(false);
				}
			} else if (wrapper) {
				page.removeChild(wrapper);
			}
			
			generateHistory();
			decorateMessages();
		});
	}

	function filterNicoleMsg() {
		const ctxtMenu = document.getElementById('contextual-menu');
		if (ctxtMenu.getAttribute('user') !== 'coline') {
			unfilterRecentMessages();
			ctxtMenu.setAttribute('user', 'coline');
			filterRecentMessages();
		} else {
			unfilterRecentMessages();
		}
	}

	var offset = null;
	var paddingTop = page.offsetTop;
	var adjustingSize = 0;
	var recentMenuHidden = false;
	function computeMaxHeightRecentMenu(menu) {
		if (!_isDynamicResizing) return;

		let reducingSize = Math.max(80, page.offsetTop - window.pageYOffset + 80);
		if (adjustingSize < 0) {
			reducingSize = reducingSize + 42;
			if (!recentMenuHidden || offset != reducingSize) {
				recentMenuHidden = true;
				if (!menu) {
					menu = document.getElementById('menu-recent');
				}
				menu.style.maxHeight = '0';
				$(menu).css('display', 'none');
				$('#menu-recent-footer').css('display', 'none');
				$('#alchimie-forum').css('height', 'calc(100vh - ' + reducingSize + 'px)');
				offset = adjustingSize;
			}
		} else {
			reducingSize = reducingSize + adjustingSize;
			if (recentMenuHidden) {
				$(menu).css('display', 'block');
				$('#menu-recent-footer').css('display', 'flex');
			}
			recentMenuHidden = false;
			if (offset != reducingSize) {
				if (!menu) {
					menu = document.getElementById('menu-recent');
				}
				menu.style.maxHeight = 'calc(100vh - ' + reducingSize + 'px)';
				offset = reducingSize;
			}
		}
		
	}

	// fix : changer le libellé de publication de message "Mon profil" -> "Message publics"
	var optionProfil = document.body.querySelector('#whats-new-post-in option:first-child');
	if (optionProfil && optionProfil.innerHTML == 'Mon profil') {
		optionProfil.innerHTML = 'Message publics';
	}

	if (window.self != window.top) {
		document.body.classList.add('in-iframe');
	}
	
	function scrollTo(elt, offset) {
		console.log('');
		elt.scrollIntoView({
			block: "start",
			behavior: "smooth",
	   	});
		$('html, body').animate({
			scrollTop: $(elt).offset().top - (offset ? offset : 0)
		},400);
	}
	
	$('body.group-vallalar-traduction-participative #content > .page-title.hu-pad.group').each(function() {
		//-- tool tip
		let infoAccessVallalarWiki = createCustomElement('div', 'vallar-wiki-info');
		infoAccessVallalarWiki.innerHTML = '<div><span>Utilisateur : </span><span>vallalar</span></div><div><span>Mot de passe : </span><span>OGGUfi3YMO</span></div><a target="_blank" href="https://vallalar:OGGUfi3YMO@vallalar.eltair.org/vallalar/index.php?title=Accueil"><span class="dashicons dashicons-admin-site-alt3"></span>&nbsp;&nbsp;Wiki participatif</a>';
		//-- menu item
		let wikiVallarBtn = createCustomElement('div', 'vallar-wiki-btn');
		wikiVallarBtn.className = 'page-title-btn';
		wikiVallarBtn.innerHTML = '<span class="dashicons dashicons-book-alt"></span>';
		$(wikiVallarBtn).click(function () {
			$(infoAccessVallalarWiki).toggleClass('open');
		});
		$(this).append(infoAccessVallalarWiki);
		$(this).append(wikiVallarBtn);
	});
	
	$('body.group-alchimie-operative #content > .page-title.hu-pad.group').each(function() {
		addAlchimieMenu(this);
	});
	
	$(document.body).has('.bp-group-home-link.alchimie-operative-home-link').has('#menu-recent-wrapper').each(function() {
		addAlchimieForum(this);
	});
	
	function addAlchimieForum(parentPane) {
		const forumTitle = $(createCustomElement('div', 'alchimie-forum-title'));
		forumTitle.html('<i class="fas fa-flask"></i> Alchimie - Forum');
		const forumExpanderMin = $(createCustomElement('div'));
		forumExpanderMin.addClass('forum-expander');
		forumExpanderMin.addClass('min');
		forumExpanderMin.html('<i class="fas fa-caret-up">');
		const forumExpanderMax = $(createCustomElement('div'));
		forumExpanderMax.addClass('forum-expander');
		forumExpanderMax.addClass('max');
		forumExpanderMax.html('<i class="fas fa-caret-down"></i>');
		const forumExpanderMiddle = $(createCustomElement('div'));
		forumExpanderMiddle.addClass('forum-expander');
		forumExpanderMiddle.addClass('middle');
		forumExpanderMiddle.addClass('fa-stack');
		forumExpanderMiddle.html('<i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>');
		forumTitle.append(forumExpanderMin);
		forumTitle.append(forumExpanderMax);
		forumTitle.append(forumExpanderMiddle);
		
		const forumMenu = $(createCustomElement('div', 'alchimie-forum-menu'));
		const forumMenuActivities = $(createCustomElement('div'));
		forumMenuActivities.addClass('selected');
		forumMenuActivities.addClass('loading');
		forumMenuActivities.addClass('forum-menu-item');
		forumMenuActivities.html('<i class="fas fa-feather-alt"></i>&nbsp;&nbsp;&nbsp;Activité');
		forumMenuActivities.click(function() {
			$('.forum-menu-item.selected').removeClass('selected');
			$('.forum-menu-item.loading').removeClass('loading');
			$(this).addClass('selected');
			$(this).addClass('loading');
			$('#alchimie-forum').attr('src', 'https://www.eltair.org/lumiere/alchimie/activity');
			$('#alchimie-forum').addClass('loading-frame');
		});
		forumMenu.append(forumMenuActivities);
		const forumMenuHome = $(createCustomElement('div'));
		forumMenuHome.addClass('forum-menu-item');
		forumMenuHome.html('<i class="fas fa-comments"></i>&nbsp;&nbsp;&nbsp;Forum');
		forumMenuHome.click(function() {
			$('.forum-menu-item.selected').removeClass('selected');
			$('.forum-menu-item.loading').removeClass('loading');
			$(this).addClass('selected');
			$(this).addClass('loading');
			$('#alchimie-forum').attr('src', 'https://www.eltair.org/lumiere/alchimie/');
			$('#alchimie-forum').addClass('loading-frame');
		});
		forumMenu.append(forumMenuHome);
		const forumMenuUnread = $(createCustomElement('div'));
		forumMenuUnread.addClass('forum-menu-item');
		forumMenuUnread.html('<i class="far fa-eye"></i>&nbsp;&nbsp;&nbsp;Non-lus');
		forumMenuUnread.click(function() {
			$('.forum-menu-item.selected').removeClass('selected');
			$('.forum-menu-item.loading').removeClass('loading');
			$(this).addClass('selected');
			$(this).addClass('loading');
			$('#alchimie-forum').attr('src', 'https://www.eltair.org/lumiere/alchimie/unread');
			$('#alchimie-forum').addClass('loading-frame');
		});
		forumMenu.append(forumMenuUnread);
		
		const forumWrapper = $(createCustomElement('iframe', 'alchimie-forum'));
		forumWrapper.attr('src', 'https://www.eltair.org/lumiere/alchimie/activity');
		forumWrapper.load(function() {
			$('.forum-menu-item.selected').removeClass('loading');
			$('#alchimie-forum').removeClass('loading-frame');
		});
		$('#menu-recent-wrapper').addClass('split');
		$('#menu-recent-wrapper').append(forumTitle);
		$('#menu-recent-wrapper').append(forumMenu);
		$('#menu-recent-wrapper').append(forumWrapper);
		forumTitle.click(function () {
			const isAlchimyGroupPage = $(document.body).hasClass('group-alchimie-operative');
			const menu = $('#menu-recent');
			menu.css('transition', '0s all');
			if ($(this).hasClass('expand-max')) {
				$(this).removeClass('expand-mid');
				$(this).removeClass('expand-max');
				$(this).addClass('expand-min');
				adjustingSize = 46;
				computeMaxHeightRecentMenu(menu[0]);
			} else if (isAlchimyGroupPage && $(this).hasClass('expand-min')) {
				$(this).removeClass('expand-min');
				$(this).removeClass('expand-max');
				$(this).addClass('expand-mid');
				adjustingSize = 310;
				computeMaxHeightRecentMenu(menu[0]);
			} else {
				$(this).removeClass('expand-min');
				$(this).removeClass('expand-mid');
				$(this).addClass('expand-max');
				adjustingSize = -1;
				computeMaxHeightRecentMenu(menu[0]);
			}
			setTimeout(function() {
				$('#menu-recent').css('transition', '0.3s all ease-in-out');
			}, 100);
		});
		if ($(document.body).hasClass('group-alchimie-operative') && $(document.body).hasClass('buddypress')) {
			adjustingSize = 310;
			forumTitle.addClass('expand-mid');
			forumWrapper.addClass('expand-mid');
		} else {
			adjustingSize = 46;
			forumTitle.addClass('expand-min');
			forumWrapper.addClass('expand-min');
		}
		computeMaxHeightRecentMenu($('#menu-recent')[0]);
	}
	
	$('body.asgaros-forum.in-iframe').each(function() {
		// page forum alchimie into iframe
		$(this).parent().attr('style', 'margin: 0px !important;overflow: hidden;');
		$(this).find('a').each(function() {
			$(this).attr('target', '_blank');
		});
	});
	
	$('body.group-ame-collective #content > .page-title.hu-pad.group').each(function() {
		addAmeCollectiveMenu(this);
	});
	$('body.group-elevation #content > .page-title.hu-pad.group').each(function() {
		addElevationMenu(this);
	});
	
	$('body.group-videoconference #content > .page-title.hu-pad.group').each(function() {
		addVideoconference(this);
	});
	
	/* Videoconférence rappel
	$('#content > .page-title.hu-pad.group').each(function() {
		if ($('a.elevation-home-link').length === 0) {
			return;
		}
		// add reminder
		const reminder = createCustomElement('a', 'reminder');
		$(reminder).html(`
						<div class="btn-writting"><i class="fas fa-feather-alt writting"></i></div>
						<div style="display: flex; align-items: center;line-height: 16px;">
							<div class="reminder-date">Dimanche<br>22 nov.</div>
							<div class="reminder-title">L'Amour et<br>l'autre</div>
						</div>
						 `);
		$(reminder).attr('href', '/lumiere/groupes/elevaliton-travail/');
		$(this).append(reminder);
		$(reminder).click(function() {
			$(this).css('opacity', '0');
			$(this).css('pointer-events', 'none');
		})
	});
	*/
	
	$('body.group-le-vase-clos #content > .page-title.hu-pad.group').each(function() {
		
		// add messages forum short view
		let iframeMessagesCiel = createCustomElement('iframe', 'vase-clos-messages');
		iframeMessagesCiel.setAttribute('src', 'https://www.eltair.org/lumiere/forum/topic/messages-du-ciel-2/#postid-1094');
		let iframeMessagesCielBack = createCustomElement('div', 'vase-clos-messages-back');
		//-- menu item
		let iframeDisplayBtn = createCustomElement('div', 'vase-clos-messages-btn');
		iframeDisplayBtn.className = 'page-title-btn';
		iframeDisplayBtn.innerHTML = '<i class="fas fa-dove"></i>';
		iframeDisplayBtn.onclick = function(e) {
			$('#vase-clos-messages').toggleClass('open');
			$('#vase-clos-messages-back').toggleClass('open');
			e.stopPropagation();
		};
		$(this).append(iframeDisplayBtn);
		$('body.group-le-vase-clos').append(iframeMessagesCielBack);
		$('body.group-le-vase-clos').append(iframeMessagesCiel);
		
		addMeditationMenu(this);
	});
	
	function addVideoconference(parentPane) {
		const noteName = 'videoconferences';
		const noteTitle = '10 janvier 2021';
		const iconHTML = '<i class="fas fa-play-circle"></i>';
		const expanded = true;
		//-- add content
		const noteData = [
			{
				sectionTitle: '10 janvier',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers audios',
						contentTitle: '<div>Vidéoconférence du 10 janvier</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2021-01-10/[2021-01-10] videoconf-1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2021-01-10/[2021-01-10] videoconf-1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2021-01-10/[2021-01-10] videoconf-2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2021-01-10/[2021-01-10] videoconf-2.mp3" download></a>
	</div>
	</li></ul>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '6 janvier',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Méditation collective',
						contentTitle: '<div>Vidéoconférence du 6 janvier</div>',
						meta: [],
						content: `
	<p>
	Enregistrement :
	</p>
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2021-01-06/[2021-01-06] videoconf.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2021-01-06/[2021-01-06] videoconf.mp3" download></a>
	</div>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '20 décembre',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers complets',
						contentTitle: '<div>Vidéoconférence du 20 décembre</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 2.mp3" download></a>
	</div>
	</li><li>Partie 3 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 3.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-20/[2020-12-20] videoconf - partie 3.mp3" download></a>
	</div>
	</li></ul>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '13 décembre',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers complets',
						contentTitle: '<div>Vidéoconférence du 13 décembre</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 2.mp3" download></a>
	</div>
	</li><li>Partie 3 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 3.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-13/[2020-12-13] videoconf - partie 3.mp3" download></a>
	</div>
	</li></ul>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '6 décembre',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers complets',
						contentTitle: '<div>Vidéoconférence du 6 décembre</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 2.mp3" download></a>
	</div>
	</li><li>Partie 3 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 3.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-12-06/[2020-12-06] videoconf - partie 3.mp3" download></a>
	</div>
	</li></ul>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '29 novembre',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers complets',
						contentTitle: '<div>Vidéoconférence du 29 novembre</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 2.mp3" download></a>
	</div>
	</li><li>Partie 3 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 3.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-29/[2020-11-29] videoconf - partie 3.mp3" download></a>
	</div>
	</li></ul>
<br>
						`
					}
				]
			},
			{
				sectionTitle: '22 novembre',
				sectionContent: [
					{
						type: 'audio',
						date: '',
						menuTitle: 'Fichiers complets',
						contentTitle: '<div>Vidéoconférence du 22 novembre</div>',
						meta: [],
						content: `
	<p>
	Fichiers complets :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 2.mp3" download></a>
	</div>
	</li><li>Partie 3 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 3.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-22/[2020-11-22] videoconf - partie 3.mp3" download></a>
	</div>
	</li></ul>
<br>
<p>
<strong>N.B:</strong> Dans la dernière partie, Jean-Michel et Nicole résolvent leur problème technique et se reconnectent à 12'43.
</p>
						`
					}
				]
			},
			{
				sectionTitle: '15 novembre',
				sectionContent: [
				{
					type: 'audio',
					date: '',
					menuTitle: 'Fichiers bruts',
					contentTitle: '<div>Vidéoconférence du 15 novembre</div>',
					meta: [
						{ type: 'file', action: 'download', subtype: 'doc', name: 'Compte-rendu', src:'https://www.eltair.org/lumiere?get_group_doc=30/1605474560-runion-du-15-11-20.docx' }
					],
					content: `
	<p>
	Participants :
	</p><p>
	Jean-Michel, Nicole, Alex, Anna-Marie, Anouck, Ariane, Barbara, Benoit, Céline B., Céline N., Chantal, Fabienne, Franck, Frédérique, Geneviève, Guy, Isabelle, Jean-Sébastien, Loic, Magalie, Manu, Marc, Nadia, Patricia, Romain G., Romain L., Samia, Sebastien F., Sebastien P., Thierry.
	</p>
	<hr>
	<p>
	Fichiers bruts :
	</p>
	<ul><li>Partie 1 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-brute-1.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-brute-1.mp3" download></a>
	</div>
	</li><li>Partie 2 :
	<div class="audio-wrapper">
	<audio controls preload="metadata" style="flex: 1;"><source src="/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-brute-2.mp3" type="audio/mpeg"></audio>
	<a class="fas fa-file-download" href="/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-brute-2.mp3" download></a>
	</div>
	</li></ul>
					`
				},
				{
					type: 'video',
					date: '',
					menuTitle: 'Petits coucous...',
					contentTitle: 'Mise en place...',
					meta: [],
					content: `
	<video preload="metadata" src="/lumiere/wp-content/uploads/videoconferences/2020-11-15/test.mp4" controls>
	  Votre navigateur ne gère pas l'élément <code>video</code>.
	</video>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/23/5eaf244b84743-bpthumb.jpg',
					date: '25:29',
					menuTitle: 'Gérer la fatigue',
					contentTitle: '<div>Anouck</div><div>Comment libérer son esprit de la fatigue et la confusion mentale ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-01.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Pranayama, pratique physique, hygiène de vie.
	</li><li>Trouver ce qui fonctionne pour améliorer son équilibre énergétique.
	</li><li>Certaines situations posent un problème de compatibilité sur le long terme avec notre travail spirituel et nécessitent une réflexion plus approfondie.
	</li><li>Exercice de Nadia : visualiser la Lumière devant le front, l’inspirer par le front dans l’esprit.
	</li><li>Apprendre à couper les soucis du quotidien dans sa conscience lorsqu’on aborde sa pratique.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '//www.gravatar.com/avatar/66f1bd75542a5b53029f4decac2022f6?s=50&r=g&d=retro',
					date: '13:37',
					menuTitle: 'Ouvrir la conscience',
					contentTitle: '<div>Nadia/div><div>Comment ouvrir la conscience ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-02.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Utiliser les techniques de travail directes sur la conscience (travail d’intégration du soi), observer les structures faire rentrer l’esprit dedans (décristallise). 
	</li><li>Faire aussi rentrer la Lumière dans l’esprit et la conscience.
	</li><li>Ne pas chercher à obtenir quelque chose, car cela replonge dans une identification et l’ego se renforce. Sortir du processus d’acquisition auquel la société nous conditionne. S’en remettre au Divin et à l’inconnu. La Lumière amène l’intelligence de voir les choses (perception du réel), elle les voit sans les garder, à la différence de l’ego qui mémorise.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/51/5f37d4c3affe8-bpthumb.jpg',
					date: '2:50',
					menuTitle: 'Purifier l\'inconscient',
					contentTitle: '<div>Anna-Marie</div><div>Comment purifier l\'inconscient ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-03.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>L’inconscient est une part de la conscience et n’en est pas différent. 
	</li><li>Pas nécessaire d’aller chercher directement des choses enfouies. Le processus d’intégration du soi fait remonter naturellement les problématiques de l’inconscient.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/34/5ef6947162cf7-bpthumb.jpg',
					date: '2:11',
					menuTitle: 'De la mémoire - 1',
					contentTitle: '<div>Isabelle</div><div>Travailler sur soi à partir de ses souvenirs participe-il d’un processus de cristallisation ?</div><div>Partie 1</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-04-1.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>La cristallisation a lieu quand une expérience n’est pas assimilée. L’expérience structure alors la mémoire.
	</li><li>Une mémoire porte l’énergie de l’expérience à laquelle elle est liée. Elle est un panneau indicateur vers l’origine de cette mémoire. Si on suit le chemin qu’elle pointe, on peut remonter à sa source.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/34/5ef6947162cf7-bpthumb.jpg',
					date: '3:11',
					menuTitle: 'De la mémoire - 2',
					contentTitle: '<div>Isabelle</div><div>Travailler sur soi à partir de ses souvenirs participe-il d’un processus de cristallisation ?</div><div>Partie 2</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-04-2.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>La cristallisation a lieu quand une expérience n’est pas assimilée. L’expérience structure alors la mémoire.
	</li><li>Une mémoire porte l’énergie de l’expérience à laquelle elle est liée. Elle est un panneau indicateur vers l’origine de cette mémoire. Si on suit le chemin qu’elle pointe, on peut remonter à sa source.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/18/5ade513c31ce5-bpthumb.jpg',
					date: '6:33',
					menuTitle: 'La peur',
					contentTitle: '<div>Barbara</div><div>D\'où vient la peur de lâcher ses repères ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-05.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Nos habitudes sont structurées par notre conscience, notamment les peurs psychologiques.
	</li><li>Les peurs psychologiques sont basées sur une expérience qui n’est plus d’actualité. Les peurs du vital (différentes) sont liées à un danger réel et imminent.
	</li><li>Toutes nos peurs psychologiques sont présentes dans notre conscience à tout instant et conditionnent notre comportement.
	</li><li>Nous devons d’entrer dans ces peurs pour les résoudre.
	</li><li>Si notre pratique pour résoudre nos peurs ne fonctionne pas, il faut regarder si notre approche est adéquate.
	</li><li>Si on aborde une problématique de manière conflictuelle, examiner d’abord le conflit avant la problématique. Le conflit est lié à un affect et une image de soi : fuite des peurs, désirs des plaisirs.
	</li><li>En travaillant à partir d’une énergie (Lumière, Qi…), l’énergie peut défaire des cristallisations du vital (notamment les peurs, la tristesse).
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/25/5daff8f709a8c-bpthumb.jpg',
					date: '0:46',
					menuTitle: 'Intelligence de l\'ego',
					contentTitle: '<div>Alex</div><div>Y-a-t\'il une intelligence (détournée) dans l\'ego ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-06.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>L'ego a une intelligence relative souvent basé sur une logique et une raison inversée par rapport au réel, mais qui peut être très cohérent.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/29/5ef76bc769be3-bpthumb.jpg',
					date: '3:17',
					menuTitle: 'Lâcher-prise',
					contentTitle: '<div>Sébastien F.</div><div>Se libérer de ses conditionnements. Par le relâchement ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-07.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>A écrire...
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/26/5ace641942c1e-bpthumb.jpg',
					date: '2:21',
					menuTitle: 'La peur et le vital',
					contentTitle: '<div>Benoit</div><div>Peut-on agir sur la peur en travaillant sur le vital ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-08.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>A écrire...
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/51/5f37d4c3affe8-bpthumb.jpg',
					date: '6:47',
					menuTitle: 'Face au mensonge',
					contentTitle: '<div>Anna-Marie</div><div>Que doit-on faire quand quelqu’un est dans le mensonge ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-09.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Quand il s’agit d’un autre artisan : Dépend de la situation. C’est à l’artisan concerné de s’interroger et d’en parler.
	</li><li>Dans sa vie, quand quelqu’un d’autre ment, rester soi-même dans la droiture, l’exemple de sa droiture peut éveiller l’autre à une autre manière d’être. Chaque situation est différente, attention à ne pas agresser l’autre, cela peut être contre-productif.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/34/5ef6947162cf7-bpthumb.jpg',
					date: '3:41',
					menuTitle: 'Déblocage & énergie',
					contentTitle: '<div>Isabelle</div><div>Dans quelle mesure le travail énergétique peut-il décristalliser quelque chose dans nos cellules ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-10.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Les techniques énergétiques peuvent aider, mais insuffisantes. Un travail intérieur d’intégration du soi (perception des mécanismes) est nécessaire pour se libérer.
	</li><li>Dans le travail du vital, la peur est un « gardien du seuil », un mur. Quand on la traverse, le vital peut se transformer.
	</li><li>Accueillir sa peur comme on accueillerait quelqu’un chez soi sans la fuir. Quand elle arrive à son paroxysme quelque chose bascule.
	</li><li>La peur ne peut pas être vue pleinement s’il y a un observateur. C’est un acte d’attention de l’esprit, pas de prise de conscience.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '//www.gravatar.com/avatar/9b977e287b212355747893a4e0d513d2?s=50&r=g&d=retro',
					date: '8:12',
					menuTitle: 'Racine des peurs',
					contentTitle: '<div>Romain L.</div><div>Y-a-t\'il une racine commune aux différentes plus superficielles ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-11.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>A écrire...
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/11/5eaf256705032-bpthumb.jpg',
					date: '6:26',
					menuTitle: 'L\'observateur',
					contentTitle: '<div>Sébastien P.</div><div>Comment avancer quand l’ego récupère tout ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-12.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Se détacher de l’expérience que l’ego récupère et se demander qui vit cette expérience, et par l’attention de l’esprit essayer de le percevoir (pas en prendre conscience).
	</li><li>C’est une intelligence qui s’acquiert avec la pratique.
	</li><li>Quand on prend conscience que tout ce qu’on fait perpétue les mécanismes de l’ego, on arrête de poursuivre un objectif et on entre dans la pleine attention. Pas de méthode.
	</li></ul>
					`
				},
				{
					type: 'audio',
					ico: '/lumiere/wp-content/uploads/avatars/61/5eaedc4a07cd1-bpthumb.jpg',
					date: '9:55',
					menuTitle: 'Travail de Nicole',
					contentTitle: '<div>Romain G.</div><div>Nicole, peux-tu en dire plus sur la manière dont tu vis le travail ?</div>',
					meta: [
						{ type: 'audio', src:'/lumiere/wp-content/uploads/videoconferences/2020-11-15/[2020-11-15] videoconf-13.mp3' }
					],
					content: `
	<p>Résumé des réponses :<p>
	<ul><li>Pour que le travail se fasse, Nicole a reçu une ouverture plus grande pour être dans une connexion permanente. Cela la sensibilise à tout ce qui se passe et entraine des répercussions sur elle, ce qui est éprouvant nerveusement.
	</li><li>Quand le travail n’est pas suivi, cela rompt quelque chose et déstabilise Nicole.
	</li><li>Le plus difficile à vivre est pourquoi une personne ne répond pas.
	</li><li>Dans l’intérêt du travail et de tous, il faut répondre dans les temps.
	</li></ul>
					`
				}
				]
			}
		];
		addGroupMultiNotes(parentPane, noteTitle, noteName, iconHTML, noteData, expanded);
	}
	
	function addElevationMenu(parentPane) {
		const noteName = 'meditations-elevation';
		const noteTitle = 'Elévation';
		const iconHTML = '<div class="group-meditation-ico"></div>';
		//-- add content
		const noteData = [
			{
				type: 'meditation',
				date: '5 janv.',
				menuTitle: 'Reconnexion',
				contentTitle: 'Méditation pour le 5 janvier',
				meta: [],
				content: `
<p>
Pour mardi nous  allons faire une méditation de reconnexion avec nous tous.<br>
<br>
Nous allons nous visualiser en cercle avec au centre un foyer de Lumière christique et nous laisserons ce feu circuler en chacun de nous et former un anneau christique qui nous relieras tous à l’horizontale en passant par le cœur.<br>
<br>
Vous pourrez poster cette méditation, ce qui peut renforcer la connexion, en prenant connaissance de l’expérience des uns et des autres.
</p>
				`
			},
			{
				type: 'meditation',
				date: '29 déc.',
				menuTitle: 'Demeure de Jésus (2)',
				contentTitle: 'Méditation pour le 29 décembre',
				meta: [],
				content: `
<p>
	Pour ce soir mardi 29 décembre la méditation est la même et vous pouvez donner suite à ce qu’il s’est passé lundi. Donc plus (+) d’exploration intérieure.<br>
<br>
	Ce travail se fait dans les trois foyers, donc n’hésitez pas à y amener la Lumière pour la faire travailler. Soyez aussi maitre de ce travail. Si vous avez à l’esprit une problématique, mettez-là en Lumière.
</p>
				`
			},
			{
				type: 'meditation',
				date: '28 déc.',
				menuTitle: 'Demeure de Jésus (1)',
				contentTitle: 'Méditation pour le 28 décembre',
				meta: [],
				content: `
<p>
	Jésus nous propose un travail de méditation qui peut être commencé lundi 28 décembre.<br>
	Pour l’instant il n’y a toujours pas d’obligation de méditer, ni de rapporter son travail.
</p>
<p>
	Méditation:<br>
	Jésus nous demande de le suivre en sa demeure.<br>
	Nous sommes sur un chemin qui monte vers le Christ Solaire.<br>
	Sur ce chemin nous devons passer à travers une porte. C’est un grand anneau doré vertical.<br>
	Le fait de le traverser révèle de l’obscurité que l’on porte, mais pour atteindre le Christ Solaire c’est un passage obligé.<br>
	Une fois l’anneau traversé, Jésus nous amène vers sa demeure, qui en fait est sa kundalini qui se trouve dans le Christ Solaire.<br>
	Et là il dit que nous devons trouver la lumière dans l’esprit (qui est l’illumination),  la lumière dans le cœur, la force dans le vital.
</p>
				`
			},
			{
				type: 'meditation',
				date: '17 déc.',
				menuTitle: 'La tour',
				contentTitle: 'Méditation pour le 17 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/14151/' }
				],
				content: `
<p>
	Cette fois-ci les licornes nous quittent. Nous continuons à marcher avec les anges.<br>
	Nous arrivons devant une tour. Elle est tellement haute qu’elle se perd dans le Ciel divin.<br>
	La tour n’a ni porte, ni fenêtre.<br>
	Nous formons un cercle autour de la tour et nous asseyons en méditation à même le sol.<br>
	La Lumière remonte du sol et pénètre tout le corps. C’est l’énergie du Christ Planétaire qui nous envahit et nous connecte au centre de la Terre à partir du plan divin où nous nous trouvons.<br>
	Le Christ Planétaire est une kundalini.
</p>
				`
			},
			{
				type: 'meditation',
				date: '16 déc.',
				menuTitle: 'Voyage transitoire (2)',
				contentTitle: 'Méditation pour le 16 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/14081/' }
				],
				content: `
<p>
Pour la méditation de mercredi vous faites la même.<br>
Vous continuez à suivre le gardien vers le prochain lieu de travail, au milieu des licornes.<br>
Puis des anges viennent à votre rencontre et prennent le relai pour vous guider. Le gardien prend un autre chemin.
</p>
				`
			},
			{
				type: 'meditation',
				date: '15 déc.',
				menuTitle: 'Voyage transitoire (1)',
				contentTitle: 'Méditation pour le 15 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/14035/' }
				],
				content: `
<p>
J’ai demandé à certain s’ils étaient sortis du dôme, parce qu’il fallait suivre Issaia dans la méditation, partir avec elle et ne pas revenir dans le dôme.<br>
<br>
Difficile d’avoir le bon branchement. Mais toutes vos expériences sont intéressantes, sauf pour ceux qui n’ont pas pu méditer. C’est pour cela qu’il y a un travail d’échange à faire dans le groupe Elevation-travail.<br>
Dans cette méditation il fallait quitter le dôme consacré car il est à présent fermé et mis dans un autre plan.<br>
Donc du coup vous êtes tous dehors, avec les licornes, le gardien de la sagesse au milieu des vertes prairies. Le gardien vous guide vers un autre lieu de travail. Pour l’instant nous n’y sommes pas encore (ce lieu m’a été montré hier en méditation).<br>
Pour la méditation de ce soir vous méditez selon votre propre créativité. Vous êtes dans un plan divin avec les licornes, mais pas dans un espace consacré.
</p>
				`
			},
			{
				type: 'meditation',
				date: '14 déc.',
				menuTitle: 'La reine des licornes',
				contentTitle: 'Méditation pour le 14 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13939/' }
				],
				content: `
<p>
Ce soir (13 novembre) la reine des licornes Issaia, est venue dans le dôme consacré.
Elle s’est approchée de chacun d’entre vous et a touché votre front avec sa corne, puis votre cœur.<br>
C’est la licorne qui a une couronne de fleurs autour de son cou.<br>
Vous méditez avec la licorne et quand elle quitte le dôme vous pouvez la suivre et sortir avec elle.<br>
Elle vous amène dans sa dimension.
</p>
				`
			},
			{
				type: 'meditation',
				date: '13 déc.',
				menuTitle: 'Dieu et le corps (2)',
				contentTitle: 'Méditation pour le 13 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13878/' }
				],
				content: `
<p>
La méditation reste la même.<br>
Si vous avez besoin d’être guidé, posez-vous la question :<br>
Que suis-je face à Dieu? Étant donné qu’il ne doit rester que Dieu et votre corps en présence dans la Lumière, dans le dôme consacré.<br>
Vous devez creuser avec la Lumière dans votre corps. C’est un travail interne. Pas de visualisation proposée par la Lumière.<br>
Vous êtes libre et maitre de vous.<br>
Là il faut vraiment que vous connectiez la Lumière.<br>
<br>
Si vous vous êtes conditionnés à méditer avec des visualisations, c’est le moment de lâcher.
</p>
				`
			},
			{
				type: 'meditation',
				date: '12 déc.',
				menuTitle: 'Dieu et le corps (1)',
				contentTitle: 'Méditation pour le 12 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13842/' }
				],
				content: `
<p>
Vous êtes tous assis sous le dôme consacré.<br>
La pierre est partie. Pas de visualisation pour cette méditation.<br>
Seulement la rencontre de la Lumière et de l’amour divin avec votre corps.<br>
Méditation dans l’unité, la paix, le silence.<br>
Plus rien n’existe, que Dieu et votre corps.
</p>
				`
			},
			{
				type: 'meditation',
				date: '11 déc.',
				menuTitle: 'Coupe et cubes',
				contentTitle: 'Méditation pour le 11 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13801/' }
				],
				content: `
<p>
Au centre se trouve une table blanche ronde.<br>
Sur la table une coupe en cristal, dans la coupe les 35 cubes dorés.<br>
Debout, derrière la table, se trouvent deux anges qui vous offrent un cube.<br>
Chacun de vous se lève pour aller chercher son cube.<br>
Vous retournez à votre place.<br>
A vous d’utiliser le cube à votre convenance.<br>
<br>
Puis un des deux anges s’approche de vous avec la coupe en cristal.<br>
Vous remettez le cube dans la coupe.<br>
Lorsque tous les cubes sont dans la coupe, la pierre se reforme et les deux anges emportent la coupe et la pierre. La pierre est devenue dorée et ne forme plus qu’un cube parfait dans la Lumière.
</p>
				`
			},
			{
				type: 'meditation',
				date: '10 déc.',
				menuTitle: 'Intégration du cube (2)',
				contentTitle: 'Méditation pour le 10 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13756/' }
				],
				content: `
<p>
La situation est la même.<br>
Vous refaite cette méditation de manière neuve.<br>
Cette fois-ci Jésus s’avance vers vous et pose un petit cube sur votre chakra coronal.<br>
Jésus est dans son aspect christique et son regard vous transperce.<br>
Vous plongez dans ses yeux bleu azur et vous vous laissez absorber.
</p>
				`
			},
			{
				type: 'meditation',
				date: '9 déc.',
				menuTitle: 'Intégration du cube (1)',
				contentTitle: 'Méditation pour le 9 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13701/' }
				],
				content: `
<p>
Vous êtes tous debout en cercle dans le dôme consacré.<br>
Jésus est au centre avec la pierre sur son socle doré.<br>
Il s’approche de la pierre qui se transforme en 35 petits cubes.<br>
Il distribue un cube à chacun.<br>
Pour cela vous lui présentez vos deux mains ouvertes côté à côte, au niveau de votre cœur.<br>
Jésus s’approche et pose un cube dans vos mains.<br>
Vous refermez vos mains jointes en prière, vos mains enferment le cube.<br>
Lorsque vos mains sont fermées, le cube se transforme en Lumière qui remonte le long des bras jusqu’à la particule, puis inonde tout votre corps.<br>
Le cube s’est fondu en vous, vous le respirez.<br>
Vous vous placez en observation du phénomène.<br>
A la fin, vous vous donnez les mains, la Lumière circule d’une main à l’autre en passant par vos particules.<br>
A la place de la pierre sur le socle se trouve une étoile christique.<br>
<br>
Jésus quitte le dôme en remontant dans la Lumière.<br>
</p>
<hr>
<p>
Essayez de faire correctement cette méditation. Tout le monde ne suivant pas les consignes.<br>
Visualisez le circuit de la Lumière et faites vraiment le mouvement des mains quand vous méditez.
</p>
				`
			},
			{
				type: 'meditation',
				date: '7-8 déc.',
				menuTitle: 'Le cube (Jésus)',
				contentTitle: 'Méditation pour le 7-8 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13615/' }
				],
				content: `
<p>
Pour ce soir vous continuez la même méditation, vous aurez en plus Jésus qui placera sa main sur votre tête, quand votre tête sera posée sur vos mains.<br>
<br>
Dans cette méditation, Jésus est votre frère de cœur et vous pouvez aussi converser avec lui.
</p>
				`
			},
			{
				type: 'meditation',
				date: '6 déc.',
				menuTitle: 'Le cube (1)',
				contentTitle: 'Méditation pour le 6 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13562/' }
				],
				content: `
<p>
Une variante pour la méditation de ce soir:<br>
Vous poserez les deux mains sur la pierre et votre front sur les mains.<br>
Vous inspirez la Lumière de la pierre par les mains et le front.<br>
Vous laissez agir et observez.<br>
A vous de gérer selon vos besoins et là où la Lumière vous amène.<br>
Vous terminez comme hier.
</p>
				`
			},
			{
				type: 'message',
				date: '5 déc.',
				menuTitle: 'Damanian (méditation)',
				contentTitle: 'Message de Damanian reçu le 5 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13502/' }
				],
				content: `
<p>
Voilà ma méditation qui a duré une heure.<br>
Dans la pièce voutée qui en fait s’appelle: le dôme consacré, la pierre était posée par Damanian sur un socle doré à environ 1,40m à 1,50m du sol, au centre du dôme.<br>
Vous vous êtes tous levés, l’un après l’autre et vous avez posé votre main droite sur la pierre le regard tourné vers le sol.<br>
J’ai assisté à toute la scène et Damanian me transmettait les paroles qu’il adressait à chacun.<br>
A la fin, nous étions tous debout, main dans la main, autour de la pierre, qui envoyait un rayon dans le cœur de chacun, sur sa particule.<br>
<br>
Pour la méditation de ce soir, vous poserez la main sur cette pierre, telle que décrite, et vous méditerez sur les mots transmis pour chacun par Damanian. Et vous terminerez tous en cercle, main dans la main avec le rayonnement de la pierre, dans le cœur et dans la particule de chacun.<br>
<br>
Les paroles que Damanian vous adresse sont liées à votre état méditatif, il vous conseille ou vous oriente.<br>
<br>
Voilà ses paroles:<br>
</p>
<hr>
<ul><li>
Anouck: plus de confiance, moins de stress dans ta vie.
</li><li>
Anna-Marie: rassemble-toi dans ton centre, moins de dispersion.
</li><li>
Ariane: plus de confiance, moins de peur.
</li><li>
Alex: plus de transparence.
</li><li>
Barbara: n’aie crainte, tout en toi est aligné.
</li><li>
Benoit: aie confiance dans ce que tu perçois.
</li><li>
Céline B: tu es à la bonne place.
</li><li>
Céline N: enracine toi bien sur ce chemin.
</li><li>
Chantal: tu es capable de beaucoup plus que ce que tu penses.
</li><li>
Christophe: tout est là devant ta porte, aie confiance.
</li><li>
Colette: il faut cesser de s’ignorer.
</li><li>
Fabienne: la Lumière est aussi là pour toi, donne-t-en plus la possibilité.
</li><li>
Franck: tes capacités sont grandes, met-les en œuvre.
</li><li>
Frédérique: pour que tout cesse (le chaos): le pardon, le vrai amour.
</li><li>
Geneviève: le vrai chemin doit être emprunté.
</li><li>
Guy: ta vie doit continuer à grandir.
</li><li>
Isabelle: trop de dispersion, le véritable travail ne peut pas naitre comme il devrait.<br>
(Isabelle tu as eu du mal à trouver la direction pour poser ta main sur la pierre, il a fallu une canalisation du Ciel).
</li><li>
Jean-Christophe: brise ton cocon pour une autre respiration.
</li><li>
Jean-François: applique toi au discernement pour que ton travail soit plus juste.
</li><li>
Jean-Michel: ton travail est dans Dieu et continue à prendre soin de cette vie.
</li><li>
Jean-Sébastien: la fluidité doit entrer dans ton travail.
</li><li>
Loïc: ton travail est trop long et prend trop de temps.
</li><li>
Marc: tu es en éveil, fais de la confiance: un guide.
</li><li>
Manu: pose ta main, tu ne crains rien, lâche tes résistances.<br>
(Manu tu ne voulais pas poser ta main dur la pierre, non par refus mais par crainte).
</li><li>
Magali: redresse-toi, ne te mets pas à genoux,le Père sait qui tu es, tu n’as pas à l’implorer, femme de ce monde et de ce temps.<br>
(Magali tu t’es agenouillée devant la pierre et Damanian t’a demandé de te redresser).
</li><li>
Nadia: la pierre brule, purification et souplesse.<br><br>
(Nadia, la pierre était brulante pour toi et chauffait ton corps).
</li><li>
Olivier: tu refuses d’obéir, une partie de toi te mène ailleurs.<br>
(Olivier tu ne voulais pas poser ta main sur la pierre, car cela ne correspondait pas a ce que tu ressentais).
</li><li>
Patricia: disparition, car tu empruntes plein de chemins ouverts, plus de discernement.<br>
(Patricia tu t’es volatilisée devant la pierre, tu es partie ailleurs).
</li><li>
Romain Guillot: transparence, mais besoin de certitudes.
</li><li>
Romain Leroy: regard tourné vers le Père.
</li><li>
Samia: il faut lâcher la maitrise du chaos.
</li><li>
Sébastien Faucher: ôte le doute de tes certitudes.
</li><li>
Sébastien Perfendie: trouve en toi celui qui sait prendre les bonnes décisions.
</li><li>
Thierry: utilise ton intelligence et ton discernement pour Dieu.
</li></ul>
<hr>
J’espère que tous ces petits messages ne vont pas trop vous déstabiliser.
</p>
				`
			},
			{
				type: 'message',
				date: '2 déc.',
				menuTitle: 'Damanian (1)',
				contentTitle: 'Message de Damanian reçu le 2 décembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13296/' }
				],
				content: `
<p>
Ce soir j’ai passé la méditation en tête à tête avec Damanian, assis sous le dôme, autour d’une table. Tout était blanc.<br>
Je vous transmets ce qu’il m’a dit. Cela a duré 30mn.
</p>
<hr>
<p>
“Nous attendons encore et encore.<br>
Nous attendons un éveil dans la vie.<br>
La vie existe sur cette planète et elle peut encore continuer longtemps, mais l’humanité doit faire son passage, une lumière doit naître du fond du chaos, un éveil au milieu de la vie qui donnera toute sa signification à cette Terre et cet univers.<br>
Vous êtes loin, trop loin.<br>
Pas assez de force, pas assez de bravoure intérieure.<br>
Vos structures peinent à bouger.<br>
Vous devez vous donner la peine de faire une révolution intérieure, car tout ce que vous êtes aujourd’hui n’est que chaos et vous l’ignorez.<br>
Il vous est en réalité demandé beaucoup plus, mais l’éveil interne ne se fait pas suffisamment pour tout le groupe.<br>
C’est l’éveil qui vous sort de votre petite personne, celle que vous protégez et considérez comme étant vous, la gentille personne aimante et bienfaisante.<br>
C’est l’au- delà de vous, qui doit s’éveiller en vous.<br>
Pour certains il faut examiner le fait de se faire croire d’avancer.<br>
Notre force est votre, mais il faut qu’elle puisse vous atteindre.”
</p>
				`
			},
			{
				type: 'meditation',
				date: '30 nov.',
				menuTitle: 'La carafe (suite)',
				contentTitle: 'A partir du lundi 30 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13109/' }
				],
				content: `
<p>
Pour ce lundi et les jours suivants vous continuez la même méditation avec la prière, dans le même rythme.<br>
Pendant la méditation de 20h, Damanian et l’ange Gézahel sont apparus dans la pièce voutée.<br>
Damanian avait avec lui une pierre taillée comme un cube parfait.<br>
C’est la première pierre du nouvel Eden. Quand il l’a posée au sol elle s’est retrouvée dans un plan astral animal.<br>
Je n’ai pas eu plus d’infos pour l’instant.<br>
Donc continuez le même travail.<br>
</p>
<br>
<p>
Nicole
</p>
<hr>
<p>
Je vous donne ici les explications du plan astral animal:<br>
Lorsque Damanian à posé la pierre, ma vision est descendue en dessous le plan de la salle voutée et la pierre était sur un sol au milieux de pattes d’animaux, d’insectes, de terre, au milieux d’une végétation dans une ambiance qui n’a rien à voir avec la nature que l’on connait sur terre.<br>
C’est un plan inférieur.<br>
Je ne veux donner aucune interprétation à cette vision.<br>
J’attends d’avoir plus d’infos.
</p>
<hr>
<p>
Concernant la pierre du futur Eden, pour l’instant elle commence à émettre de la Lumière au milieu de l’obscurité. Elle émet des rayons qui partent dans tous les sens et qui touchent principalement ajna et la conscience.<br>
Cette obscurité qu’elle éclaire est celle de l’humanité que nous portons tous et là dans ce travail nous sommes directement concernés.<br>
Vous pourrez essayer de vous y connecter demain pendant votre méditation.<br>
C’est une forme cubique, qui ressemble à du cristal. Au début elle était noire et semble se transformer dans le temps. Ses rayons sont aveuglants et remontent du sol.
</p>
				`
			},
			{
				type: 'message',
				date: '28 nov.',
				menuTitle: 'Prière',
				contentTitle: 'Prière reçu le 28 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/13013/' }
				],
				content: `
<p>
Je vous transmets une prière à Dieu reçue ce samedi 28 novembre pendant la méditation de 20h. Cette prière vous pouvez l’utiliser avant la méditation car elle est en relation avec le travail des méditations.
</p>
<hr>
<p>
“Seigneur éclaire moi de l’intérieur.<br>
Que Ton regard pénètre qui je suis, ce que je suis.<br>
Que Ton regard éclaire ma conscience.<br>
Je marche à côté de Toi.<br>
Tu me tiens la main.<br>
Guide moi dans ce corps, matérialité de la vie, substances de l’univers.<br>
Aide-moi à la dépouiller de ses illusions et croyances qui font de moi un être perdu qui veut se relever de l’abysse dans lequel il est tombé jadis.<br>
Car aujourd’hui c’est la vraie Vie qui circule en moi et me traverse de bas en haut parce que je ne suis rien et tout et que Tu l’auras décidé.<br>
Kundalini, accomplissement divin.”
</p>
				`
			},
			{
				type: 'meditation',
				date: '27-29 nov.',
				menuTitle: 'La carafe',
				contentTitle: 'Vendredi 27 au dimanche 29 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/12916/' }
				],
				content: `
<p>
Cette fois-ci Jésus et Mickaël ne sont plus là.<br>
La méditation débute directement dans la pièce voutée.<br>
Vous êtes assis au centre de la pièce sur un grand lotus blanc et vous êtes vêtus de blanc.<br>
Vous avez le dos bien droit, vos 5 premiers chakras sont tous alignés et vous sentez leur présence.<br>
Au-dessus de vous apparait une main qui porte une carafe dorée, c’est la main de Dieu.<br>
Dieu vous verse sur le sommet de la tête le liquide aux couleurs de l’arc en ciel  contenu dans la carafe.<br>
Le contenu dans la carafe sont le parfum et le regard de Dieu.<br>
Le liquide qui vous pénètre vous plonge dans le silence de Dieu.<br>
Le liquide fait son œuvre dans le 7ème et le 6ème chakra, puis il s’écoule dans votre corps pour rejoindre les autres chakras.<br>
Vous devez mener votre méditation selon l’expression de la Lumière, de l’énergie et de votre réceptivité.
<hr>
Je vous joins ci-dessous deux images de la carafe qui se rapprochent le plus de la vision que j’ai eue.
<img src="https://www.eltair.org/lumiere/wp-content/uploads/2020/11/images-8.jpg"/><img src="https://www.eltair.org/lumiere/wp-content/uploads/2020/11/images-5.jpg"/>
</p>
				`
			},
			{
				type: 'meditation',
				date: '22-26 nov.',
				menuTitle: 'Purification',
				contentTitle: 'Du dimanche 22 au jeudi 26 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/12546/' }
				],
				content: `
<p>
Vous êtes tous assis dans la pièce voutée.<br>
Jésus vêtu de blanc et de bleu azur, et l’archange Mickaël dans son armure dorée avec une épée à la main, entrent dans la pièce.<br>
Mickaël se place au centre de la pièce et plante son épée au sol de ses deux mains.<br>
D’où son épée est plantée sortent des rayons de Lumière dorée qui envahissent tout le sol. C’est une Lumière purificatrice qui remonte à travers vos pieds.<br>
Pendant que cette Lumière purificatrice remonte à partir de vos pieds, Jésus s’avance devant chacun de vous.<br>
Il tient dans ses mains un bol en bois d’olivier.<br>
Dans le bol il y a un liquide bleu, comme le bleu de la conscience.<br>
Jésus verse le liquide bleu à travers votre chakra couronne sur la tête.<br>
Lorsque le liquide pénètre, il devient doré et il coule jusqu’à l’emplacement de votre ego, pas plus bas, mais il s’étale jusque dans le 6ème chakra.
<br>
Mais en même temps que Jésus verse le liquide, la Lumière qui remonte à travers vos pieds, remonte le long des jambes et va se loger dans le chakra racine, le muladhara. Cette Lumière ne va pas plus haut. L’exploration se fera dans le 1er chakra.
</p>
<br>
<p>
Quand Jésus a terminé, il s’élève dans la pièce pour se fondre dans la Lumière.
Michaël reste le temps nécessaire à la purification. Lorsqu’il a terminé il s’élève à son tour et se fond dans la Lumière.
</p>
<hr>
</p>
Pour le lundi 23 novembre vous ferez la même méditation, mais la Lumière purificatrice de Mickaël remontera des pieds et s’arrêtera dans le 2ème chakra.
</p>
<p>
Mardi vous ferez le 3ème chakra.
</p>
<p>
Mercredi le 4ème chakra.
</p>
<p>
Jeudi le 5ème.
</p>
<p>
<b>Lorsque la Lumière remonte elle repasse par les autres chakras.</b>
</p>
				`
			},
			{
				type: 'meditation',
				date: '21 nov.',
				menuTitle: 'Le lys',
				contentTitle: 'Méditation - samedi 21 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/12471/' }
				],
				content: `
<p>
Vous entrez dans la pièce voutée.<br>
Jésus, Marie-Madeleine et l’ange sont présents au centre de la pièce.<br>
Lorsque vous êtes tous entrés, c’est Marie qui entre.<br>
Elle porte dans ses bras un bouquet de lys.<br>
Elle se présente devant chacun d’entre vous et  remet une fleur de lys à chacun.<br>
</p>
<p>
Quand elle vous remet la fleur, elle prononce ces mots:<br>
“Une fleur de lys pour que la noblesse s’installe dans ton cœur”.<br>
Le parfum qui exhale des lys embaume toute la pièce.<br>
Quand Marie a terminé, elle vous salue et rejoint Jésus à sa droite.<br>
Tous les quatre quittent la pièce dans une belle aura lumineuse.
</p>
				`
			},
			{
				type: 'meditation',
				date: '20 nov.',
				menuTitle: 'Le parfum',
				contentTitle: 'Méditation - vendredi 20 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/12393/' }
				],
				content: `
<p>
Nous continuons toujours dans la pièce voutée.<br>
Lorsque vous entrez, Marie, Jésus et l’ange sont déjà présents.<br>
Vous vous asseyez, et lorsque tout le monde est entré, c’est Marie-Madeleine qui entre.
</p><p>
Elle est belle et gracieuse. Elle marche pieds nus, on entend le bruit du tissus de sa robe quand elle se déplace. Elle tient dans ses mains un pot de parfum.
</p><p>
Elle s’approche de chacun d’entre vous et dépose une goutte de parfum de nard, sur votre front.<br>
Quand elle a terminé, elle rejoint Jésus et se place à sa gauche entre lui et l’ange.  Marie est à la droite de Jésus. Une aura de Lumière les enveloppe et ils quittent la pièce en vous saluant.
</p>
<hr>
<p>
Explications pour le nard:
</p><p>
Vous pouvez le trouver en huile essentielle et si vous en avez chez vous, vous pouvez vous en mettre une goutte sur le front avant la méditation. L’odeur du nard est lourde et capiteuse, mais dans le temps le parfum devient plus léger.<br>
J’ai mis une goutte sur mon front pour la méditation, car j’avais eu l’info dans l’après midi et j’ai reçu les directives  de la méditation à 20h.
</p><p>
A la fin de la méditation de ce soir, le coffret offert par le gardien du savoir m’est apparu et voilà ce qui c’est présenté et que j’ai besoin:<br>
“J’ai besoin de toute la confiance du groupe et de sa transparence pour que le Ciel continue son œuvre.”
</p><p>
Vous pouvez trouver le nard en magasin bio ou pharmacie qui vendent des huiles essentielles. Prenez celui d’Israël  si on vous le propose, sinon je crois que celui que l’on trouve couramment vient de l’Inde.
</p><p>
Nicole
</p>
</p>
				`
			},
			{
				type: 'meditation',
				date: '19 nov.',
				menuTitle: 'Le coffret',
				contentTitle: 'Méditation - jeudi 19 novembre',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Message...', src:'https://www.eltair.org/lumiere/activites-du-site/p/12230/' }
				],
				content: `
<p>
Nous sommes toujours dans la pièce voutée.<br>
Nous sommes tous assis autour de la pièce.<br>
C’est le gardien du savoir qui entre dans la pièce.<br>
Il tient entre ses mains un coffret.<br>
Il s’approche devant chacun d’entre nous, ouvre le coffret, nous le présente.<br>
Il fait cela à tour de rôle.<br>
Dans le coffret il y a une chose que chacun a besoin et que le Ciel nous envoie.<br>
Que trouvez-vous dans le coffret et qu’en faites vous?<br>
Quand le gardien a terminé sa distribution, il pose le coffret sur la table au centre, et le coffret est emporté par deux anges.<br>
Puis le gardien sort de la pièce et une étoile christique s’installe au centre.
</p>
				`
			},
			{
				type: 'meditation',
				date: '18 nov.',
				menuTitle: 'Objets lumière (3)',
				contentTitle: 'Méditation - mercredi 18 novembre',
				meta: [],
				content: `
<p>
Vous êtes tout seul assis autour de la pièce et tous les autres artisans reçoivent les objets, sauf vous. Vous êtes observateur.
<hr>
Vous avez jusqu’au jeudi 19 novembre à 12h pour rapporter votre méditation.<br>
<br>
N’hésitez pas à me contacter s’il y a quelque chose que vous ne comprenez pas.<br>
<br>
Nicole
</p>
				`
			},
			{
				type: 'meditation',
				date: '17 nov.',
				menuTitle: 'Objets lumière (2)',
				contentTitle: 'Méditation - mardi 17 novembre',
				meta: [],
				content: `
<p>
Vous refaites la même méditation, mais vous n’êtes plus seul, les artisans sont tous assis autour de la pièce, mais il n’y a que vous qui êtes concerné par les objets.
</p>
				`
			},
			{
				type: 'meditation',
				date: '16 nov.',
				menuTitle: 'Objets lumière (1)',
				contentTitle: 'Méditation - lundi 16 novembre',
				meta: [],
				content: `
<p>
Vous vous retrouvez directement dans la pièce voutée.<br>
Vous êtes seul(le), les autres artisans sont absents.<br>
La table au centre de la pièce n’est pas là.<br>
Vous êtes agenouillé au sol. Devant vous se trouve une petite table basse blanche rectangulaire.
</p>
<p>
Sur la table sont disposés: un parchemin avec une plume pour écrire. Un rubis rouge ambré qui tient dans le creux de votre main, le rubis symbolise la particule divine. Une rose dorée de nature christique.  Une coupe, réceptacle de nectar divin.<br>
L’ange est debout devant vous derrière la petite table. Il pose ses mains de Lumière sur votre tête et vous laisse le choix quant à l’utilisation des objets offerts devant vous.
</p>
<p>
Vous laissez la méditation se dérouler en inspirant la Lumière de l’ange.<br>
Cet ange est au service de Dieu et est là pour vous aider quant à l’utilisation des objets.
</p>
				`
			},
			{
				type: 'meditation',
				date: '15 nov.',
				menuTitle: 'Le graal et la rose',
				contentTitle: 'Méditation - dimanche 15 novembre',
				meta: [],
				content: `
<p>
Vous êtes tous assis dans la pièce voutée.<br>
Il n’y a plus de table au centre.<br>
Entrent dans la pièce Jésus et Marie-Madeleine. Ils sont beaux et rayonnants dans leurs habits d’époque.
</p>
<p>
Marie-Madeleine a une longue chevelure noire.<br>
Jésus tient dans ses mains le Graal, la coupe qui a recueilli son sang lors de la crucifixion.<br>
Marie-Madeleine porte un bouquet de roses de Lumière, violettes.
</p>
<p>
Jésus approche le Graal et touche votre front avec, puis il le porte à votre bouche et vous fait boire. Le Graal contient un liquide rouge, de nature christique, qui s’écoule et s’unit à votre sang, qui s’écoule jusque dans vos pieds.<br>
Marie-Madeleine dépose dans vos mains une rose.
</p>
<p>
Quand ils ont terminé, ils se placent au centre de la pièce et au-dessus d’eux apparait un soleil christique avec au centre une étoile.<br>
Et là vous vous placez tous à genoux en signe de respect et d’humilité.<br>
Puis ils quittent l’espace sacré.
</p>
<p>
Cette méditation est en relation avec le foyer christique du bas car Jésus et Marie-Madeleine avaient une relation de nature affective mais christique.
</p>
				`
			},
			{
				type: 'meditation',
				date: '13 nov.',
				menuTitle: 'La pierre',
				contentTitle: 'Méditation - pour samedi 14 novembre',
				meta: [],
				content: `
<p>
Pour la méditation de samedi (14 novembre) :
</p>
<p>
Elle se déroule dans la pièce voutée.<br>
Vous êtes tous assis et vêtus de la tunique blanche.<br>
Le calice est sur la table, mais vous ne buvez pas.
</p>
<p>
Le gardien du savoir remet à chacun une pierre que vous visualisez comme vous voulez. Vous la placez sur votre cœur. Vous la gardez un moment contre vous.
</p>
<p>
Un ange entre dans la pièce, il prend le calice, s’approche de chacun de vous, vous lui offrez la pierre que vous mettez dans le calice et en même temps vous lui offrez une part de vous-même.
</p>
<p>
L’ange quitte la pièce et emporte le calice avec lui vers un lieu secret.
</p>
				`
			},
			{
				type: 'message',
				date: '13 nov.',
				menuTitle: 'Gardien du savoir',
				contentTitle: 'Message du gardien du savoir, le 12 novembre',
				meta: [],
				content: `
<p>
Je vous donne le message du gardien du savoir reçu hier à 20h :
						</p>
						<p><b>
« Boire à ce calice, c’est boire à la Vraie Vie, c’est le miel de la vie.<br>
Je suis le gardien de la sagesse, de la vraie intelligence, de la force insufflée en vous tous, toute l’humanité, celle qui vous fait unique dans cet univers.<br>
Ici est un temple sacré dans l’immensité de l’espace divin.<br>
Vous avez été appelés ici pour la mission de l’Élévation, soyez-en dignes.<br>
Vous êtes dans une aventure précieuse.<br>
Le chaos des hommes est étendu à toute la planète car il demeure en chaque humain.<br>
Ce travail que vous avez à faire n’est pas perçu suffisamment en profondeur par tout le groupe, car manque de confiance, comparaisons, consciences fermées.<br>
Vous devez œuvrer aux manquements tous ensemble pour l’Élévation qui se fait tous ensemble. »
						</b></p>
						<p>
A travers ce message est donnée une direction de travail.<br>
Ce message vous devez le lire consciencieusement.<br>
Vos méditations avec le parchemin sont révélatrices de vos connexions et de votre alignement à la Lumière.
						</p>
						<p>
Nous allons revenir sur le manque de confiance, les comparaisons.<br>
Chacun dans ce travail doit y trouver sa place avec le Ciel, son autonomie, pour pouvoir se fondre avec chacun dans le groupe.<br>
Pour l’instant vous allez vous replonger intimement dans le manque de confiance et les comparaisons et ceux qui sont concernés s’expriment par écrit.<br>
Vous avez jusqu’à mercredi pour vous exprimer à ce sujet.
						</p>
						<p>
Tout le travail que nous allons faire va se faire dans la pièce voutée, comme quand nous étions dans le vase clos qui était un espace de travail.
</p>
				`
			},
			{
				type: 'meditation',
				date: '12 nov.',
				menuTitle: 'Le parchemin',
				contentTitle: 'Méditation - 12 novembre',
				meta: [],
				content: `
						<p>
						Bonsoir à tous
						</p>
						<p>
Voilà une nouvelle méditation que vous commencerez ce jeudi à 20h.<br/><br/>
						</p>
						<p>
Vous êtes tous sur la plate forme. Jésus n’est pas là. La plate forme vous amène vers un monde divin. Le sol de ce monde divin est vert et l’espace au-dessus de vous est bleu.
						</p>
						<p>
Vous descendez de la plate forme  dans cet espace. Vous vous dirigez vers l’entrée d’une pièce ronde, au plafond vouté. Tout est blanc à l’intérieur. Vous vous asseyez en cercle sur un siège qui fait le tour de la pièce. Vous êtes tous vêtus d’une grande tunique blanche.
						</p>
						<p>
Au milieu de la pièce se trouve une table ronde blanche Sur la table se trouve une coupe dorée. Vous buvez tous à cette coupe.
Un gardien du savoir dans la Lumière, vêtu d’une longue tunique blanche, entre dans la pièce et vous donne à chacun un parchemin et une plume pour écrire.
						</p>
						<p>
Sur ce parchemin vous écrivez ce qui se présente à votre esprit, votre cœur, ce que vous entendez etc…
Vous rapporterez tous votre méditation ce jeudi avec ce que vous aurez écrit sur votre parchemin.
Ayez à côté de vous de quoi écrire.
						</p>
						<p>
Il est important d’écrire ce qui remonte sur l’instant, ce qui reflète votre situation. N’inventez pas de belles phrase. Cette méditation est initiatique et doit permettre un travail.
						</p>
						<p>
Nicole
						</p>
				`
			},
			{
				type: 'meditation',
				date: '9 nov.',
				menuTitle: 'Elévation',
				contentTitle: 'Méditation - 9 novembre',
				meta: [],
				content: `
						<p>
						Vous êtes assis en cercle sur une plate forme ronde et dorée.<br />
						Vous êtes sous la voute céleste, la plate forme se trouve au milieu de l'univers, dans le vide sidéral.<br />
						Jésus est debout au milieu de vous tous, il est beau, dans son aspect à la fois physique et christique.<br />
						Vous êtes dans le dépouillement, seuls, au milieu de l'univers, et vous lâchez tout.
						</p>
						<hr>
						<p>
						Le travail reprend et continue sur ce nouveau groupe masqué.
						Il s’appelle Élévation, car le travail doit s’orienter  de notre nature terrestre vers notre nature divine. Le discernement, la justesse, la rigueur, la noblesse de nos personnes sont des qualités qui devront faire partie de notre unité.
						Cette unité qui n’est pas encore présente dans le groupe et qui devrait pouvoir s’incarner lors de rencontres physiques. La Lumière contribuant à cela, par le travail commun et initiations.
						</p>
						<p>
						...
						</p>
						<p>
						Pendant la méditation de ce soir Jésus m’a amené dans sa demeure à travers la porte du Christ Solaire. Il m’a dit que ceux qui auront répondu dans les temps pour la méditation doivent passer la porte. Donc c’est pour cela que vous êtes là.
						</p>
						<p>
						...
						</p>
						<p>
						Pour mardi (10 novembre) vous continuez toujours la même méditation.
						</p>
						<p>
						Nicole
						</p>
				`
			},
		];
		addGroupNote(parentPane, noteTitle, noteName, iconHTML, noteData, false);
	}
	
	function addAmeCollectiveMenu(parentPane) {
		const noteName = 'meditations-ame-collective';
		const noteTitle = 'Méditations';
		const iconHTML = '<div class="group-meditation-ico"></i>';
		//-- add content
		const noteData = [
			{
				date: '9 nov.',
				menuTitle: 'Dépouillement',
				contentTitle: 'Dépouillement',
				meta: [
					{ type: 'link', subtype: 'response', name: 'Ecrire une réponse...', src:'https://www.eltair.org/lumiere/membres/coline/activity/11152/' }
				],
				content: `
						<p><strong>
						Nicole :
						</strong></p>
						<p>
						Bonjour à tous
						</p>
						<p>
						Je vous transmets pour l'instant la nouvelle méditation que vous ferez à partir de ce soir.<br />
						Vous rapporterez votre méditation par écrit jusqu'à la fin de ce jour.<br />
						Demain est un autre jour.<br />
						Le Ciel vous respecte dans ce que vous êtes et ce que vous lui montrez.</b>
						</p>
						<hr/>
						<p>
						Voilà la méditation:<br/>
						<strong>
						Vous êtes assis en cercle sur une plateforme ronde et dorée.<br />
						Vous êtes sous la voute céleste, la plate forme se trouve au milieu de l'univers, dans le vide sidéral.<br />
						Jésus est debout au milieu de vous tous, il est beau, dans son aspect à la fois physique et christique.<br />
						Vous êtes dans le dépouillement, seuls, au milieu de l'univers, et vous lâchez tout.
						</strong>
						</p>
				`
			},
		];
		addGroupNote(parentPane, noteTitle, noteName, iconHTML, noteData, false);
	}
	
	function addAlchimieMenu(parentPane) {
		const noteName = 'alchimie';
		const noteTitle = 'Lectures';
		const iconHTML = '<span class="dashicons dashicons-text-page"></span>'		//-- add content
		const noteData = [
			{
				date: '',
				menuTitle: 'Le testament d’Or - Préface',
				contentTitle: 'Le testament d’Or - Préface',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Bien que je n'eusse pas résolu de laisser ce grand secret des anciens savants à aucun homme par écrit, je l'ay néanmoins fait par cette affection et amour que j'ai pour toi, sachant que tu aurais bien de la peine à en venir à bout autrement, parce que la vie est courte, et cet art fort caché; mais puisqu'une si précieuse perle n'est point pour des pourceaux &amp; qu'il faut qu'on travaille un tel présent du ciel avec prudence et piété, c'est avec constance que je me suis déclaré envers toi et que je te conjure par ma main et bouche saintement, premièrement de garder fidèlement cet écrit de tous ceux qui sont méchants, avaricieux et vicieux, deuxièmement de n'en avoir d'autre but que la gloire de Dieu créateur de lumière, et la commodité de ton pauvre prochain. Garde-le étroitement de peur que mon âme ne t'accuse au jour du jugement. Je t'écris donc ce traité sur la place qui m'est destinée au ciel, tout comme j'ai trouvé ce trésor précieux et comme je l'ai touché de mes doigts. C'est pour cela que je l'ai souscrit de mon propre sang, mourant à Leyden le 23 mars 1672. 
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 1',
				contentTitle: 'Le testament d’Or - Chapitre 1',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Prenez au nom de Dieu du plus pur et net sel de mer, comme il est cuit par le soleil ; il vient d'Espagne par mer. Le mien était de St.Uby. Faites-le bien sécher dans quelque lieu chaud, pillez-le bien subtilement en poudre dans un mortier de marbre afin qu'il se puisse dissoudre plus facilement en eau de rosée dans le mois de Mai ou de juin quand la lune est dans son plein. Remarquez que quand la rosée tombe avec un vent d'est ou de sud-est, il faut avoir planté des pilons d'un pied en terre ; mettez dessus de grands carreaux de verre sur lesquels la rosée s'attachera (on expose les carreaux quand le soleil est couché et on les ôte une demi- heure après son lever). Alors ayez un vase de verre dans lequel vous recevrez la rosée qui sera sur les dit verres plats, par un de leurs coins. Faites ceci tant que vous en ayez assez, car tout le quartier de la pleine lune est bon : en autre temps la rosée est trop faible. Ensuite il faut bien boucher le verre avec de la cire jusqu'à ce que vous en ayez besoin afin que les esprits ne se perdent pas et pour cet effet les mettre dans un endroit froid et non chaud. 
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 2',
				contentTitle: 'Le testament d’Or - Chapitre 2',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Prenez du sel pillé et le jetez dans un verre bien net où vous aurez mis de cette rosée pour le dissoudre peu à peu autant qu'elle en pourra dissoudre, ce que vous connaîtrez si le dernier sel reste quatre jours sans se fondre. Alors c'est signe qu'il y en a assez et la rosée a son poids naturel comme la semence dans la matrice. 
Prenez à discrétion de cette eau imprégnée de sel. Pour moi j'en ai mis 2 £ <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(une £ et demie à peu près. Variante)</span></b></em>; mettez-la en une fiole à courte queue à peu près de cette figure<em></em><em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">&nbsp; &#x1f4a3;</span></b></em>&nbsp; . Remplissez-la <i><span style="font-size:11.0pt;line-height:115%">(<em><b><span style="color:#7030A0">Et faut que la bouteille soit toute pleine de cette eau, et couvrez-la bien de </span></b></em><span class="small-char"><b><span style="color:#7030A0">lut moyennement épois et faites-lui un couvercle bien artistement avec du bon lut</span></b></span><b><span style="color:#7030A0"> <span class="small-char">moyennement épois aussi, de crainte que les esprits de la rosée ne s'envolent, car</span> <span class="small-char">lorsqu'ils sont partis l'opération ne réussit pas.</span></span></b>)</span></i> et lutez adroitement (pour moi je laisserais les trois quarts vides) comme j'apprendrai à faire en appliquant en même temps à son ouverture un couvercle qui ait justement la grandeur qu'il faut, ce qui doit se faire fort adroitement afin que les esprits subtilisés et vifs de la rosée ne s'évaporent, car quand ils sont partis l'âme du sel ne saurait jamais être ramenée, ni l'ouvrage réussi à bien ; faites sécher le lut de lui-même et mettez la fiole dans le fourneau du B.M. comme je vous montrerai à faire pour le faire pourrir. Bouchez-le donc de bonne boue, à cet effet, faites sécher le lut de lui- même et donnez le moyen degré du feu <span style="font-size:11.0pt;line-height:115%">(<em><b><span style="color:#7030A0">Qui est la chaleur de la poule qui couve - la fiente de cheval a ce degré)</span></b></em></span> et le laissez digérer <span style="font-size:11.0pt;line-height:115%">(<em><b><span style="color:#7030A0">De 40 à 45 jours jusqu'à 50 jours au plus.</span></b></em>) </span>40 ou 42 jours et vous verrez la matière devenir noire, qui est une marque de sa pourriture. Lorsqu'elle sera en cet état <span style="font-size:11.0pt;line-height:115%">(<em><b><span style="color:#7030A0">Ayez un fourneau de lampe physique mettez-y la fiole.</span></b></em><b><span style="color:#7030A0">)</span></b></span>, mettez ce verre avec sa matière à une boule de bois <span style="font-size:11.0pt;line-height:115%">(<em><b><span style="color:#7030A0">Creuse pour coaguler.</span></b></em>) </span>au fourneau au sec; donnez un bas degré de feu et continuez cela 13 <b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(<em><span>12 à 15 jours. Variante) </span></em></span></b>jours également. 
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 3',
				contentTitle: 'Le testament d’Or - Chapitre 3',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Alors la matière commence à se coaguler et devenir comme sel grisâtre à l'entour du verre, et quand vous remarquerez cela ne donnez plus de feu afin qu'elle ne sèche trop et la laissez refroidir insensiblement d'elle-même ; alors mettez votre verre au fourneau à pourrir comme devant, donnez le même degré de feu et continuez 40 jours <b><span style="font-size:11.0pt;line-height:115%;color:#7030A0"> (<em><span>40 à 50 jours au plus.</span></em>)</span></b>, et la masse se résoudra d'elle- même; mais il faut bien prendre garde de rompre le lut, et quand vous le mettrez au fourneau à pourrir, il faut couvrir le goulot avec un morceau, de bois fait exprès, avec un petit chapiteau de verre afin que l'humidité ne le gâte pas, et quand vous verrez que la matière commence à noircir <!--[if gte mso 9]&gt;--><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(<em><span>Et si vous voyez encore de la matière qui ne soit pas toute noire, remettez-la </span><span class="small-char">encore à congeler.</span></em>) </span></b>mettez le verre à congeler, et lorsqu'elle sera grisâtre&nbsp;<i><b><span class="small-char"><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0"> </span></span></span></b></i><i><b><span class="small-char"><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0"><i><b><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(</span></span><em><span style="font-size: 11pt;line-height: 115%">Et si vous voyez qu'elle devient grise et qu'elle s'attache, remettez-la comme vous </span></em></b></i>avez fait aux deux précédentes, à pourrir, &amp; coaguler jusqu'à six fois...</span></span></span></b></i><i><b><span class="small-char"><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0"><i><b><em><span style="font-size: 11pt;line-height: 115%">Variante</span></em><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0">)</span></span></b></i>.</span></span></span><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0"> </span></span><em><span style="font-size: 11pt;line-height: 115%"></span></em><span><span style="font-size:11.0pt;line-height:115%;color:#7030A0"></span></span></b></i><span style="font-size:11.0pt;line-height:115%;color:#7030A0"> </span> et s'attache au verre, mettez-la pour la troisième fois et la quatrième à pourrir, et faites comme auparavant, et continuez cela en pourrissant et congelant jusqu'à cinq fois, ou bien jusqu'à ce que vous voyez que votre eau soit claire, nette et transparente dans la résolution et blanche comme neige dans la congélation ; alors elle est préparée et devenue en sel fixe ; mais avant que d'ouvrir la fiole pour la prendre, il faut auparavant, d'abord la faire résoudre en belle eau et ensuite la laisser refroidir doucement. 
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 4',
				contentTitle: 'Le testament d’Or - Chapitre 4',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Ouvrez ensuite la fiole et vous trouverez la matière diminuée d'une troisième ou quatrième partie environ, mais au lieu d'eau salée c'est une espèce d'eau très douce et très pénétrante, un peu épaisse, laquelle est  <b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(<em><span>Appelée par les Philosophes eau céleste ou autrement eau mercurielle.</span></em>)</span></b><span style="font-size:11.0pt;line-height:115%"> </span>cachée par les Philosophes sous des noms singuliers, et c'est le mercure des Philosophes ; c'est l'eau dont le soleil et la lune sont faits, car comme on dit que le soleil est son père et la lune sa mère, ainsi vous trouverez dans cette eau la puissance des deux luminaires véritablement ensemble dans leurs propriétés naturelles. Si vous prenez 15 ou 25 gouttes de cette eau, elle fortifie l'esprit ; la mémoire, rend sage et donne des révélations de choses grandes et merveilleuses de tous les mystères inouïs et inconnus, desquels je n'ose plus parler ici par le serment que j'ai fait à Dieu. Le temps et la matière de vous servir de cette eau bénite vous sera révélé aussitôt que vous l'aurez prise, car vous aurez des influences bénignes comme si le ciel et tous les astres avec leurs forces travaillaient et opéraient miraculeusement en vous. Tous les arts et les perfections célestes vous viendront comme dans un songe, mais le principal est que vous apprendrez à parfaitement connaître la nature de toutes les créatures, et par tous ces miracles, Dieu Tout-Puissant, très Saint, Créateur du Ciel et de la Terre, comme Moïse, David et tous les autres saints, car la sagesse de cette fontaine vivante vous le fera connaître comme elle a fait à Salomon et aux autres frères de notre fraternité.
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 5',
				contentTitle: 'Le testament d’Or - Chapitre 5',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
<p>
Lorsque vous aurez achevé l'œuvre susdit de la manière que je viens de vous l'enseigner, si vous voulez la pousser et procéder à une plus haute perfection, pour en avoir la teinture sur les métaux, écoutez ce fidèle et fructueux conseil : Prenez au nom de Dieu de cette céleste eau de Paradis autant que vous en voudrez, dans un verre à dissoudre, et mettez-la sur un faible feu de cendres afin qu'il reçoive la même chaleur douce que les cendres, et ayez de bon or bien purifié pour l'élixir rouge, ou de l'argent à la coupelle pour le blanc, car le procédé est partout le même, et dans l'un et dans l'autre, cet or ou cet argent doivent être battus en feuilles comme celui des doreurs.
</p>
<p>
Jetez-le dans le verre à dissoudre dans cette eau bénite comme vous avez fait avant avec le sel, et il se fondra comme la glace dans l'eau chaude ; continuez ceci jusqu'à ce que vous voyez que l'or ou l'argent y restent 4 jours sans se dissoudre <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(et que n'en peu dissoudre d'avantage ni en recevoir de superflu, estant contre nature... Variante)</span></b></em>; alors il a reçu son poids naturel ; mettez cette solution comme auparavant dans un verre rond ; et le remplissez jusqu'au tiers du verre, de sorte que les deux tiers soient vides, scellez hermétiquement, faites sécher le lut et mettez après dans le fourneau de l'humidité, faites le feu et le tenez 40 jours dans un continuel bain ; lors le soleil et la lune seront résouds radicalement et vous verrez la plus grande noirceur du monde. Sitôt que vous la remarquerez, ayez votre fourneau sec, et faites-le chauffer à son degré; mettez-y le verre avec la matière et donnez égal degré de feu, c'est-à- dire bas et doux pendant quinze jours ; avant ce terme vous verrez et entendrez des merveilles surprenantes qui m'ont surpris moi-même, et entendrez un bruit et un murmure qui se fait dans la fiole, comme si c'était de l'eau et de la glace qui se brisent et se fondent, et mille diverses couleurs paraîtront à vos yeux, et vous verrez comment le monde a été fait et créé dans son commencement, et quelle est l'origine, le milieu et la fin des temps. Après 12 ou 15 jours de temps, la matière se rassoira en une poudre de très beau rouge, mais pour la lune, d'une couleur comme un gris de perles. Alors le corps, l'âme et l'esprit seront unis ensemble, de quoi les Philosophes ont parlé <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">( Les bruits qui arrivent pendant cette dernière cuisson sont causez par les différents éléments et constellations joints ensemble, et desquels cette eau divine est produite en premier lieu, lesquels se combattent et causent toutes ces différentes couleurs et changements, chacun dans leur force et vertu tant céleste que terrestre. Faut faire cuire, digérer et pourrir ces matières jusqu'à ce qu'elles soient réduites les unes dans les autres en une égalle proportion, que l'être corporel et spirituel et l'incompréhensible Puissance les unissent... Variante )</span></b></em>
</p>
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 6',
				contentTitle: 'Le testament d’Or - Chapitre 6',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Il n'y a point de vraie solution de corps sans que les esprits soient auparavant coagulés et bien réduits l'un dans l'autre et de l'autre dans une proportion égale afin que l'être corporel devienne comme une pénétrante puissance spirituelle, et au contraire l'incompréhensible puissance essentielle s'unit à lui corporellement par le feu, car il y a une telle communication entre eux deux, qui, comme le Ciel coopère dans le plus profond de la terre et produit tous les trésors et richesses du monde, ce que les Philosophes ont entendu quand ils ont dit : 0h l'admirable sympathie de la nature, connue aux vrais Philosophes. Cette poudre est déjà bonne à faire projection sur les métaux de cette manière : Faites fondre 5 parts de bon or ou argent dans un creuset, et mettez une part de votre poudre laquelle vous incorporerez dans un peu de cire. Jetez-la dedans et donnez fort grand feu pendant une heure. Otez après le creuset et vous trouverez l'or frangible et calciné. Jetez-en une part sur dix de quelqu'autre métal fondu que ce soit : il le changera assurément en soleil ou lune meilleurs que ceux des mines, mais je vous conseille néanmoins de ne point consumer la teinture à cela si ce n'était pour faire une épreuve ; car si vous mettez cette belle poudre rouge à pourrir encore une fois dans le Bain <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(Comme je l'ai fait ... Variante)</span></b></em> elle se changera en 25 jours en huile rouge pour l'or et pour l'argent blanche tirant sur le bleu. Si vous prenez quelque monnaie ou quelque métal et que vous le plongiez dans cette huile, il se changera dans le moment sans se gâter en pur or ou argent comme je vous en ai donné ici 4 preuves ; mais il s'en perd beaucoup en faisant cela, c'est pourquoi il le faut faire bien vite et adroitement si l'on en veut faire épreuve.
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 7',
				contentTitle: 'Le testament d’Or - Chapitre 7',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
Quant à l'usage de cette huile pour le corps humain, 3 gouttes prises dans de l'eau de mélisse ou de bon vin du Rhin guérit toutes les maladies du corps en un moment radicalement, rajeunit le corps comme s'il était régénéré, chasse toutes les faiblesses des membres, fait croître les cheveux, les dents et les ongles en moins d'un mois : en un mot il chasse toutes les infirmités et tout ce qui est mauvais dehors par une grande sueur, raccommode tout ce qui est gâté et conserve l'homme dans une continuelle santé <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(Fraîcheur embonpoint &amp; beauté, léger et souple de corps, ferme d'esprit et de bon sens, confortant la mémoire et le cerveau ... Variante)</span></b></em> jusqu'à la fin de sa vie qui lui est destinée de Dieu. Si vous voulez achever cette huile pour en faire une projection plus forte, mettez-la encore à coaguler et durcir et elle se changera <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(en 8 à 10 jours de temps) </span></b></em>en poudre rouge plus belle qu'un rubis en 12 jours avec une variété incroyable de couleurs, laquelle deviendra beaucoup plus rouge qu'auparavant, semblable aux escarboucles, et pour le blanc plus blanche sur la neige. Une partie de cette poudre mise sur 5 d'or ou d'argent fondus après avoir donné grand feu pendant une heure comme j'ai dit déjà donneront une poudre de laquelle une partie sur 100 ou 150 d'autre métal fondu le change dans le moment en pur or ou argent selon que l'on a travaillé. 
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Chap. 8',
				contentTitle: 'Le testament d’Or - Chapitre 8',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
<p>
 Si vous voulez augmenter cette médecine, mettez encore pour la troisième fois la poudre dans le bain pour dissoudre, ce qui se fait en 20 jours <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(30 jours... Variante)</span></b></em>. Elle deviendra d'un beau clair transparent en huile rouge, mais pour le blanc, comme un cristal transparent, duquel une goutte fait tout ce que nous avons dit, mais il faut continuer à la prendre deux fois par an comme je l'ai expérimenté moi-même. La poudre est trop chaude et trop violente ; ainsi usez-en avec prudence, car il y va de la vie. 
<p></p>
Cette dernière huile, afin que l'on en puisse faire projection se doit coaguler dans le fourneau au sec, &amp; il paraîtra toutes sortes de couleurs et comme de petits animaux montants et descendants <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(au travers de cette liqueur, que j'en ai été si surpris que je ne le pouvois me persuader, quoique je le visse bien réellement)</span></b></em> et enfin dans 8 jours la matière est au fond comme un corps mort et mise une partie sur cinq d'or ou d'argent fondus fait comme auparavant une médecine dont une partie choit sur 300 et plus de métal imparfait. 
<p></p>
On peut continuer à résoudre &amp; coaguler de cette manière jusqu'à quatre fois ; après la quatrième opération une partie de cette pierre ira sur 500 d'autre métal ; la cinquième fois elle ira sur 700. Quand vous l'avez augmentée et perfectionnée de la sorte jusqu'à cinq fois, il se résout en trois jours et se coagule en 24 heures en une rougeur d'une clarté incroyable et pour le blanc comme un rayon de lumière <em><b><span style="font-size:11.0pt;line-height:115%;color:#7030A0">(A partir d'ici est donné la version de la B.N 4039 N.F., plus cohérente. )</span></b></em>. 
<p></p>
Je l'ai poussée jusqu'à la huitième fois, mais la septième elle était si subtile que j'en ai perdu beaucoup en ce qu'elle s'évapore subtilement en l'air, et à la huitième fois elle s'est tout évanouie et remplit l'air d'une odeur si suave et si agréable qu'il me semblait être en Paradis tant j'avais les sens saisis, surpris et enchantés d'une si charmante odeur. Aussi je vous conseille de ne pas pousser cet œuvre plus loin que la sixième fois, de peur qu'il ne vous arrive de même.
</p>
				`
			},
			{
				date: '',
				menuTitle: 'Le testament d’Or - Conclusion',
				contentTitle: 'Le testament d’Or - Conclusion',
				meta: [
					{ type: 'file', subtype: 'pdf', action: 'nav', name: 'Le manuscrit', src:'?get_group_doc=27/1601073825-manuscrit-le-testament-dor.pdf' }
				],
				content: `
<p>
Je pourrais écrire encore beaucoup de merveilles de cet art céleste, savoir comme on peut préparer toutes sortes de pierres précieuses avec cela, mais il faudrait faire une grand livre pour le bien faire connaître par écrit, parce que cet art est infini et ne peut être tout à fait compris par la vue. 
<p></p>
Mon propos, cher fils et neveu a été de te mener avec dévotion dans les mystères de la nature qui enseigne notre science ce que j'ai fait fidèlement. Commence ton ouvrage au nom du Seigneur comme j'ai fait, sois secret et charitable de tout ton cœur, ainsi tout te réussira dans le travail, et cependant que tu seras occupé beaucoup de frères de notre ordre t'iront voir en cachette car je t'ai écrit la vérité sur la place que Dieu m'a destinée dans le Ciel et par le même Dieu éternel tout ce que j'ai trouvé par le moyen de mes continuelles prières et toute diligence possible, ce que j'ai vu et manié. 
C'est pour cela que j'ai souscrit ce testament avec mon propre sang au dernier jour de mon temps sur mon lit mourant à Leyden le 23 mars 1672
</p>
				`
			},
			{
				date: '',
				menuTitle: 'L’actum leyden',
				contentTitle: 'L’actum leyden',
				meta: [],
				content: `
Cette lettre est aussi appelée «&nbsp;L’actum leyden&nbsp;». Elle est essentiellement un manuscrit alchimique dépeignant un processus alchimique secret appelé également la méthode de la rosée et du sel. Ce manuscrit fait référence aux alchimistes travaillant avec de la rosée et du sel de mer dans une recette ou une formule d’alchimie très secrète. Certaines versions de l’actum leyden mentionnent également l’utilisation du chlorure d’or ainsi que du chlorure d’argent. On parle aussi d’envelopper la «&nbsp;pierre philosophale&nbsp;» dans de la cire et de la fondre avec de l’or pour créer «&nbsp;la poudre de projection&nbsp;». La
multiplication est également décrite, ainsi que les instructions pour le chauffage et les flacons ouverts/fermés.

<p class="MsoNormal">Dans cette lettre le titre dit&nbsp;: "Un moine cappucin mourant a laissé ce tract à son frère bien-aimé et l’a signé avec son sang. Prague 3-29-1672"<br /> <br />
Cette lettre ne comprend pas l’introduction par le moine et la lettre toute entière est écrite d’une manière simple résumée, sans le libellé élégant utilisé dans la lettre originale des moines d’une date antérieure. Ce qui laisse supposer
que c’est une lettre re-écrite. Elle comprend également des choses qui ne se trouvent pas dans la lettre originale et qui doivent venir de l’expérience de la personne qui a réellement fait le processus lui-même et utilisé l’élixir.</p>

<p class="MsoNormal"><u>Voici quelques différences clées :</u><br />
<br />
1 - Il dit de remplir la fiole seulement à moitié avec de l’eau salée de rosée au début du processus.<br />
<br />
2. Un bouchon en verre est utilisé et scellé avec du lutem (plâtre mélangé avec des blancs d’œufs)<br />
<br />
3. Il dit que l’eau elle-même va devenir noire, puis déposer un sel gris sur les côtés de la fiole lorsque vous la mettez sur une flamme faible dans le Balneum Siccum au lieu d’utiliser directement un bain de sable. (Balneo Siccum = bain
de sable). Ensuite, quand vous le remettez au Balneum Mary (bain marie), le sel gris est censé se dissoudre dans l’eau. Finalement, à la 5e coagulation et dissolution, le sel sera blanc et l’eau sera claire. Le sel doit être testé en le mettant sur une plaque d’argent chaud et voir si elle coule comme de la cire. Si c’est le cas, il faut le replacer dans la fiole et  poursuivre le processus.<br />
<br />
4. Au lieu de la dose de seulement 5 gouttes, il dit d’administrer 25 gouttes pour guérir complètement une personne de la pire maladie.<br />
<br />
5. Maintenant, il dit d’ajouter un peu de poudre d’oxyde d’or ou de fine feuille d’or dans l’eau peu à peu jusqu’à ce qu’il ne puisse plus absorber. Ensuite, décanter soigneusement la solution de l’or non dissous dans une autre fiole que vous remplissez seulement à 1/4 au lieu de 2/3.<br />
<br />
6. Il dit que pendant les 40 premiers jours de la digestion, vous verrez beaucoup de matière noire. Ensuite, vous le mettez sur la flamme faible du Balneum Siccum et vous verrez un bel affichage de couleurs, et vous entendrez un bruit comme l’eau et la glace, et vous observerez la création du monde entier. Puis après 13 ou 14 jours, il se transforme en une  poudre rouge brunâtre comme le cinabre rouge. Mais si l’argent a été utilisé, il deviendra comme une matière cristalline claire.<br />
<br />
7. Il dit de prendre une partie de cette poudre de cinabre et de l’enrober dans de la cire, et de la placer avec 5 parties d’or dans un récipient fermé que vous chauffez ensuite sur le feu pendant une heure. Après cette heure, l’or sera fragile et deviendra la poudre de projection. Vous enveloppez une partie de ceci dans la cire, puis la mélangez avec 10 parties inférieures de métal comme le plomb, et la chauffez à l’état fondu mais pas dans un récipient fermé, et après une heure il sera changé en or.<br />
<br />
8. Il dit que vous pouvez prendre cette poudre rouge de premier ordre, la mettre dans une fiole et la chauffer doucement dans le bain d’eau Balneum Mary pendant 35 jours, et il se transformera en une belle huile rouge. La pierre d’argent deviendra une huile bleue (ce qui a du sens parce que l’argent dissous dans l’acide devient bleu donc peut-être y a-t-il une explication chimique pour cet Alkahest). Il dit que 3 gouttes de cette huile guérira toutes les blessures, et guérira toutes les maladies, et gardera un humain en bonne santé en les faisant perdre tous leurs cheveux et ongles et ils repousseront de nouveau et jeune. (Tout comme la description du Premum Ens de Melissa) Il dit qu’il guérira aussi tout en augmentant votre température et la perte de force sera bientôt renouvelée.<br />
<br />
9. Maintenant, la multiplication est différente de la lettre originale -- il dit de remettre l’huile dans la digestion Siccum Balneum sur la flamme, et en 10 jours, il se transformera en une poudre avec les plus belles couleurs, seulement beaucoup plus rouge et plus jolie qu’avant, brillant comme un rubis ou un carboncle. L’huile bleue de l’argent deviendra comme la neige. (A ce point quand il dit rougeoyant, il signifie seulement reflétant la lumière brillamment à la façon dont un rubis le fait, parce que ce n’est pas encore assez multiplié pour briller littéralement)<br />
<br />
10. Maintenant, il affirme qu’à ce stade, on est seulement à la deuxième multiplication parce qu’il dit que vous utilisez une partie sur 50 parties d’or, puis une partie de la poudre de projection sur 100 parties de métal inférieur pour la transmuter en or.<br />
<br />
11. Pour le porter au 3ème ordre, on le chauffe de nouveau dans la fiole du bain d’eau Balneum Mary pendant 30 jours cette fois au lieu de 35 et il devient une huile. Cette fois l’huile d’or est rouge foncé, et celle d’argent est blanche au lieu de bleue. Ce qui est remarquable, c’est qu’il dit en fait que vous pouvez ingérer 1 goutte de cette huile du 3ème ordre comme un bon cru, et il guérira toutes les maladies et fera tomber vos ongles et vos cheveux puis les régénérer et régénérer votre corps entier, mais vous ne devez le prendre que deux fois en un an, ou seulement une fois tous les 6 mois, parce qu’il est si brûlant qu’il peut vous tuer. Il dit que vous devez faire attention parce que le corps et l’âme sont affectés.<br />
<br />
12. Il dit de le porter à la 4ème multiplication, de le mettre dans le bain de sable Balneum Siccum comme avant, et vous observerez toutes sortes de couleurs et de choses vivantes se déplaçant de haut en bas, et vous aurez une poudre rouge profonde à la fin. Maintenant juste 1 partie est utilisée sur 500 pièces d’or pour faire la poudre de projection. Et 1 partie de la poudre est utilisée sur 1000 pièces de métal inférieur pour la transmuter en or, attendant encore une heure entière avant de la laisser refroidir.<br />
<br />
13. Il continue à décrire les multiplications, et dit finalement qu’il l’a amenée jusqu’au 5ème et qu’une partie de la poudre de projection transmet 100&nbsp;000 parties de plomb à l’or. Il dit qu’il n’est pas allé plus loin parce qu’il va trouer le verre provoquant une odeur "délicieuse". Il ne mentionne pas qu’il brille. Peut-être qu’il doit être porté au 6ème ordre pour briller, et les seuls alchimistes pour y parvenir sont ceux qui savent que l’on a besoin de quartz <b><i><span style="color:#7030A0">(note de Jean-Michel&nbsp;: le récipient de quartz est plus solide que le verre)</span> </i></b>.<br />
<br />
14. Il met en garde contre le fait que beaucoup de Fratres Rosea Crucis (Rosicruciens) viendront à vous au cours de votre travail parce que « vous les avez fait voir ». <span>Apparemment par des visions psychiques ?<br />
<br />
</span>Puis il termine la lettre comme si l’Actum Leyden la signait de son propre sang. C’est peut-être la version originale, et l’autre lettre avec moins de détails est la version réécrite ?<br />
<br />
Je pense que cela répond à beaucoup de questions parce qu’il nous dit comment utiliser l’élixir et nous permet de savoir que nous pouvons en effet l’ingérer dans le 3ème ordre si nous prenons soin d’attendre 6 mois d’abord. Et la multiplication doit se faire sans l’eau alcaline, qui est un détail très important. Cela explique pourquoi les multiplications d’or ne fonctionnent pas toujours.</p>
				`
			},
		];
		addGroupNote(parentPane, noteTitle, noteName, iconHTML, noteData, false);
		
		// add forum button
		//-- references
		const forumButtonId = 'group-forum-theory-btn-alchimie';
		const forumButtonClass = 'group-note-btn';
		//-- build note menu button
		let forumDisplayBtn = createCustomElement('a', forumButtonId);
		forumDisplayBtn.className = forumButtonClass;
		forumDisplayBtn.innerHTML = '<i class="fas fa-comments"></i>';
		$(forumDisplayBtn).attr('target', '_blank');
		$(forumDisplayBtn).attr('href', 'https://www.eltair.org/lumiere/alchimie');
		$(parentPane).append(forumDisplayBtn);
	}

	function addGroupNote(parentPane, noteTitle, noteName, iconHTML, noteData, isExpanded) {
		//-- references
		const menuButtonId = 'group-note-btn-' + noteName;
		const menuButtonClass = 'group-note-btn';
		const popupId = 'group-note-popup-' + noteName;
		const popupItemClass = 'group-note-popup';
		
		//-- build note menu button
		let noteDisplayBtn = createCustomElement('div', menuButtonId);
		noteDisplayBtn.className = menuButtonClass;
		noteDisplayBtn.innerHTML = iconHTML;
		noteDisplayBtn.onclick = function(e) {
			$('.'+menuButtonClass+':not(#'+menuButtonId+')').removeClass('open');
			$('#'+menuButtonId).toggleClass('open');
			$('.'+popupItemClass+':not(#'+popupId+')').removeClass('open');
			$('#'+popupId).toggleClass('open');
			e.stopPropagation();
		};
		
		//-- build note popup
		const notePopupPane = createCustomElement('div', popupId);
		notePopupPane.className = popupItemClass;
		const notePopupMenu = createCustomElement('div');
		notePopupMenu.className = 'menu';
		const notePopupContent = createCustomElement('div');
		notePopupContent.className = 'content';
		const notePopupMeta = createCustomElement('div');
		notePopupMeta.className = 'meta';
		const notePopupTitle = createCustomElement('h4');
		notePopupTitle.className = 'menu-header';
		notePopupTitle.innerHTML = noteTitle;
		const notePopupDate = createCustomElement('div');
		notePopupDate.className = 'date';
		const notePrintBtn = createCustomElement('a');
		notePrintBtn.className = 'print-btn';
		notePrintBtn.innerHTML = 'Imprimer';
		const noteCloser = createCustomElement('a');
		noteCloser.className = 'closer';
		noteCloser.innerHTML = 'OK';
		$(notePopupPane).append(notePopupTitle);
		$(notePopupPane).append(notePopupDate);
		$(notePopupPane).append(notePopupContent);
		$(notePopupPane).append(notePopupMeta);
		$(notePopupPane).append(notePopupMenu);
		$(notePopupPane).append(notePrintBtn);
		$(notePopupPane).append(noteCloser);
		if (!isExpanded) {
			const noteExpander = createCustomElement('div');
			noteExpander.className = 'expander fas';
			$(notePopupPane).append(noteExpander);
		}
		
		//-- feed note popup content
		let idx = 0;
		for (const data of noteData) {
			const menuItem = createCustomElement('div');
			menuItem.innerHTML = '<span class="menu-title">' + data.menuTitle + '</span><span>' + data.date + '</span>';
			if (data.ico != null) {
					menuItem.innerHTML = '<img class="ico-img" src="'+data.ico+'">' + menuItem.innerHTML;
			} else if (data.type != null) {
				switch(data.type) {
				case 'message':
					menuItem.innerHTML = '<i class="data-type fas fa-comment fa-flip-horizontal"></i>' + menuItem.innerHTML;
					break;
				case 'meditation':
						/*
					menuItem.innerHTML = '<div class="data-type use-mask group-meditation-ico"></div>' + menuItem.innerHTML;
					*/
					break;
				case 'video':
					menuItem.innerHTML = '<i class="data-type fab fa-youtube"></i>' + menuItem.innerHTML;
					break;
				case 'audio':
					menuItem.innerHTML = '<i class="data-type fas fa-volume-up"></i>' + menuItem.innerHTML;
					break;
				default: 
					menuItem.innerHTML = '<div class="data-type"></div>' + menuItem.innerHTML;
					break;
				}
			}
			menuItem.className = 'menu-item' + (idx == 0 ? ' active' : '');
			$(menuItem).data('key', idx);
			$(notePopupMenu).append(menuItem);
			const contentItem = createCustomElement('div');
			contentItem.className = 'content-item' + (idx == 0 ? ' active' : '');
			contentItem.innerHTML = data.content;
			$(contentItem).data('key', idx);
			$(contentItem).data('title', data.contentTitle);
			$(notePopupContent).append(contentItem);
			const metaItem = createCustomElement('div');
			metaItem.className = 'meta-item' + (idx == 0 ? ' active' : '');
			for (const meta of data.meta) {
				switch(meta.type) {
					case 'file':
						const metaBtn = createCustomElement('a');
						metaBtn.className = 'meta-item-btn';
						metaBtn.innerHTML = '<span class="file-ico-'+meta.subtype+'"></span>&nbsp;' + meta.name;
						metaBtn.setAttribute('href', meta.src);
						if (meta.action != null && meta.action === 'link') {
							metaBtn.setAttribute('target', '_blank');
						}
						$(metaItem).append(metaBtn);
						break;
					case 'link':
						const linkBtn = createCustomElement('a');
						linkBtn.className = 'meta-item-btn';
						linkBtn.innerHTML = '<span class="link-ico '+meta.subtype+'"></span>&nbsp;' + meta.name;
						linkBtn.setAttribute('href', meta.src);
						linkBtn.setAttribute('target', '_blank');
						$(metaItem).append(linkBtn);
						break;
					case 'audio':
						const player = createCustomElement('div');
						player.className='audio-wrapper';
						player.innerHTML = `
							<audio controls preload="metadata" style="flex: 1;">
								<source src="`+meta.src+`" type="audio/mpeg">
							</audio>
							<a class="fas fa-file-download" href="`+meta.src+`" download></a>
						`;
						$(metaItem).append(player);
						break;
					default:
						break;
				}
			}
			$(metaItem).data('key', idx);
			$(notePopupMeta).append(metaItem);
			idx++;
		}
		
		//-- listening events
		notePopupPane.onclick = function(e) {
			if ($(e.target).hasClass('print-btn')) {
				printElem($('#'+popupId+' .content .active').html());
			} else {
				const srcMenuItem = $(e.target).closest('.menu-item', this);
				if (srcMenuItem.length) {
					console.log('click change menu-item');
					if (!srcMenuItem.hasClass('active')) {
						const popupPane = $('#'+popupId);
						// remove old selection
						popupPane.find('.active').removeClass('active');
						// new selection
						const key = srcMenuItem.data('key');
						let title = '';
						popupPane.find('.content-item').each(function() {
							if ($(this).data('key') === key) {
								$(this).addClass('active');
								title = $(this).data('title');
							}
						});
						popupPane.find('.date').html(title);
						popupPane.find('.meta-item').each(function() {
							if ($(this).data('key') === key) {
								$(this).addClass('active');
							}
						});
						srcMenuItem.addClass('active');
					}
				} else if ($(e.target).hasClass('closer')) {
					$(this).removeClass('open');
					$('.group-note-btn').removeClass('open');
				} else if ($(e.target).hasClass('expander')) {
					$(this).toggleClass('expanded');
				}
			} 
			e.stopPropagation();
		};
		
		$(notePopupPane).find('.content-item.active').each(function () {
			$(notePopupDate).html($(this).data('title'));
		});
		
		// noteName
		//-- Auto-opening on new meditation
		const lastChange = noteData[0].menuTitle;
		const key = noteName + '-last-change';
		const lastCheck = localStorage.getItem(key);
		if (lastCheck !== lastChange) {
			$(notePopupPane).addClass('open');
			localStorage.setItem(key, lastChange);
		}
		
		$(notePopupPane).toggleClass('expanded', isExpanded);
		
		$(parentPane).append(noteDisplayBtn);
		$(parentPane).append(notePopupPane);
	}

	function addGroupMultiNotes(parentPane, noteTitle, noteName, iconHTML, noteData, isExpanded) {
		//-- references
		const menuButtonId = 'group-note-btn-' + noteName;
		const menuButtonClass = 'group-note-btn';
		const popupId = 'group-note-popup-' + noteName;
		const popupItemClass = 'group-note-popup';
		
		//-- build note menu button
		let noteDisplayBtn = createCustomElement('div', menuButtonId);
		noteDisplayBtn.className = menuButtonClass;
		noteDisplayBtn.innerHTML = iconHTML;
		noteDisplayBtn.onclick = function(e) {
			$('.'+menuButtonClass+':not(#'+menuButtonId+')').removeClass('open');
			$('#'+menuButtonId).toggleClass('open');
			$('.'+popupItemClass+':not(#'+popupId+')').removeClass('open');
			$('#'+popupId).toggleClass('open');
			e.stopPropagation();
		};
		
		//-- build note popup
		const notePopupPane = createCustomElement('div', popupId);
		notePopupPane.className = popupItemClass;
		const notePopupContent = createCustomElement('div');
		notePopupContent.className = 'content';
		const notePopupMeta = createCustomElement('div');
		notePopupMeta.className = 'meta';
		const notePopupDate = createCustomElement('div');
		notePopupDate.className = 'date';
		const notePrintBtn = createCustomElement('a');
		notePrintBtn.className = 'print-btn';
		notePrintBtn.innerHTML = 'Imprimer';
		const noteCloser = createCustomElement('a');
		noteCloser.className = 'closer';
		noteCloser.innerHTML = 'OK';
		const notePopupAccordionMenu = createCustomElement('div');
		notePopupAccordionMenu.className = 'accordion-menu';
		$(notePopupPane).append(notePopupAccordionMenu);
		$(notePopupPane).append(notePopupDate);
		$(notePopupPane).append(notePopupContent);
		$(notePopupPane).append(notePopupMeta);
		$(notePopupPane).append(notePrintBtn);
		$(notePopupPane).append(noteCloser);
		if (!isExpanded) {
			const noteExpander = createCustomElement('div');
			noteExpander.className = 'expander fas';
			$(notePopupPane).append(noteExpander);
		}
		let sectionIdx = 0;
		for (const dataSection of noteData) {
			const sectionTitle = createCustomElement('div');
			sectionTitle.className = 'section-title';
			sectionTitle.innerHTML = dataSection.sectionTitle;
			$(sectionTitle).attr('data-section', dataSection.sectionTitle);
			const sectionMenu = createCustomElement('div');
			sectionMenu.className = 'section-menu collapsed';
			$(sectionMenu).attr('data-section', dataSection.sectionTitle);
			sectionTitle.click(function (e) {
				const sectionName = $(e.currentTarget).attr('data-section');
				$('#'+popupId+' .section-menu:not([data-section="'+sectionName+'"])').addClassName('collapsed');
				$('#'+popupId+' .section-menu[data-section="'+sectionName+'"]').removeClassName('collapsed');
			});
			$(notePopupAccordionMenu).append(sectionTitle);
			$(notePopupAccordionMenu).append(sectionMenu);
			//-- build menu content
			let idx = 0;
			for (const data of dataSection.sectionContent) {
				const menuItem = createCustomElement('div');
				menuItem.innerHTML = '<span class="menu-title">' + data.menuTitle + '</span><span>' + data.date + '</span>';
				if (data.ico != null) {
						menuItem.innerHTML = '<img class="ico-img" src="'+data.ico+'">' + menuItem.innerHTML;
				} else if (data.type != null) {
					switch(data.type) {
					case 'message':
						menuItem.innerHTML = '<i class="data-type fas fa-dove"></i>' + menuItem.innerHTML;
						break;
					case 'meditation':
						menuItem.innerHTML = '<div class="data-type use-mask group-meditation-ico"></div>' + menuItem.innerHTML;
						break;
					case 'video':
						menuItem.innerHTML = '<i class="data-type fab fa-youtube"></i>' + menuItem.innerHTML;
						break;
					case 'audio':
						menuItem.innerHTML = '<i class="data-type fas fa-volume-up"></i>' + menuItem.innerHTML;
						break;
					default: 
						menuItem.innerHTML = '<div class="data-type"></div>' + menuItem.innerHTML;
						break;
					}
				}
				menuItem.className = 'menu-item' + (sectionIdx === 0 && idx === 0 ? ' active' : '');
				$(menuItem).data('key', dataSection.sectionTitle + '-' + idx);
				$(sectionMenu).append(menuItem);
				const contentItem = createCustomElement('div');
				contentItem.className = 'content-item' + (sectionIdx === 0 && idx === 0 ? ' active' : '');
				contentItem.innerHTML = data.content;
				$(contentItem).data('key', dataSection.sectionTitle + '-' + idx);
				$(contentItem).data('title', data.contentTitle);
				$(notePopupContent).append(contentItem);
				const metaItem = createCustomElement('div');
				metaItem.className = 'meta-item' + (sectionIdx === 0 && idx === 0 ? ' active' : '');
				
				for (const meta of data.meta) {
					switch(meta.type) {
						case 'file':
							const metaBtn = createCustomElement('a');
							metaBtn.className = 'meta-item-btn';
							metaBtn.innerHTML = '<span class="file-ico-'+meta.subtype+'"></span>&nbsp;' + meta.name;
							metaBtn.setAttribute('href', meta.src);
							if (meta.action != null && meta.action === 'link') {
								metaBtn.setAttribute('target', '_blank');
							}
							$(metaItem).append(metaBtn);
							break;
						case 'link':
							const linkBtn = createCustomElement('a');
							linkBtn.className = 'meta-item-btn';
							linkBtn.innerHTML = '<span class="link-ico '+meta.subtype+'"></span>&nbsp;' + meta.name;
							linkBtn.setAttribute('href', meta.src);
							linkBtn.setAttribute('target', '_blank');
							$(metaItem).append(linkBtn);
							break;
						case 'audio':
							const player = createCustomElement('div');
							player.className='audio-wrapper';
							player.innerHTML = `
								<audio controls preload="metadata" style="flex: 1;">
									<source src="`+meta.src+`" type="audio/mpeg">
								</audio>
								<a class="fas fa-file-download" href="`+meta.src+`" download></a>
							`;
							$(metaItem).append(player);
							break;
						default:
							break;
					}
				}
				$(metaItem).data('key', dataSection.sectionTitle + '-' + idx);
				$(notePopupMeta).append(metaItem);
				idx++;
			}
			sectionIdx++;
		}
		
		//-- listening events
		notePopupPane.onclick = function(e) {
			if ($(e.target).hasClass('print-btn')) {
				printElem($('#'+popupId+' .content .active').html());
			} else {
				const srcMenuItem = $(e.target).closest('.menu-item', this);
				if (srcMenuItem.length) {
					console.log('click change menu-item');
					if (!srcMenuItem.hasClass('active')) {
						const popupPane = $('#'+popupId);
						// remove old selection
						popupPane.find('.active').removeClass('active');
						// new selection
						const key = srcMenuItem.data('key');
						let title = '';
						popupPane.find('.content-item').each(function() {
							if ($(this).data('key') === key) {
								$(this).addClass('active');
								title = $(this).data('title');
							}
						});
						popupPane.find('.date').html(title);
						popupPane.find('.meta-item').each(function() {
							if ($(this).data('key') === key) {
								$(this).addClass('active');
							}
						});
						srcMenuItem.addClass('active');
					}
				} else if ($(e.target).hasClass('closer')) {
					$(this).removeClass('open');
					$('.group-note-btn').removeClass('open');
				} else if ($(e.target).hasClass('expander')) {
					$(this).toggleClass('expanded');
				}
			} 
			e.stopPropagation();
		};
		
		$(notePopupPane).find('.content-item.active').each(function () {
			$(notePopupDate).html($(this).data('title'));
		});
		
		// noteName
		//-- Auto-opening on new meditation
		const currentMeditationDate = noteData[0].sectionTitle;
		const lastCheck = localStorage.getItem(noteName + '-last-change');
		if (lastCheck !== currentMeditationDate) {
			$(notePopupPane).addClass('open');
			localStorage.setItem(noteName + '-last-change', currentMeditationDate);
		}
		
		$(notePopupPane).toggleClass('expanded', isExpanded);
		
		$(parentPane).append(noteDisplayBtn);
		$(parentPane).append(notePopupPane);
	}


	function addMeditationMenu(groupPageTitle) {
		
		// add meditation description forum short view
		let meditationDescription = createCustomElement('div', 'group-meditation-desc');
		let meditationDescMenu = createCustomElement('div');
		meditationDescMenu.className = 'meditation-menu';
		let meditationDescContent = createCustomElement('div');
		meditationDescContent.className = 'meditation-content';
		let meditationDescTitle = createCustomElement('h4');
		meditationDescTitle.innerHTML = 'Méditations';
		let meditationDescMenuItemsPane = createCustomElement('div');
		meditationDescMenuItemsPane.className = 'meditation-menu-pane';
		let meditationDescDate = createCustomElement('div');
		meditationDescDate.className = 'meditation-date';
		$(meditationDescMenu).append(meditationDescTitle);
		$(meditationDescMenu).append(meditationDescMenuItemsPane);
		$(meditationDescription).append(meditationDescDate);
		$(meditationDescription).append(meditationDescContent);
		$(meditationDescription).append(meditationDescMenu);
		//-- print button
		let meditationPrintBtn = createCustomElement('a');
		meditationPrintBtn.className = 'group-meditation-print-btn';
		meditationPrintBtn.innerHTML = 'Imprimer';
		$(meditationDescription).append(meditationPrintBtn);
		
		//-- Auto-opening on new meditation
		const currentMeditationDate = '9 nov. 2020';
		const lastCheck = localStorage.getItem('last-meditation-change');
		if (lastCheck !== currentMeditationDate) {
			$(meditationDescription).addClass('open');
			localStorage.setItem('last-meditation-change', currentMeditationDate);
		}
		//-- close event button
		let meditationEventCloser = createCustomElement('a');
		meditationEventCloser.className = 'group-meditation-event-closer';
		meditationEventCloser.innerHTML = 'OK';
		$(meditationDescription).append(meditationEventCloser);
		
		//-- meditations :
		let meditationContentItem = null;
		let meditationMenuItem = null;
		let meditationMenuTitle = null;
		let meditationContentTitle = null;
		let meditationDate = null;
		let isFirst = true;
		
		if ($(document.body).hasClass('group-ame-collective')) {
			isFirst = false;
			
			//---- meditation : Dépouillement 
			meditationDate = `9 nov.`;
			meditationMenuTitle = `Dépouillement`;
			meditationContentTitle = `9 novembre 2020`;
			meditationMenuItem = createCustomElement('div');
			meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
			meditationMenuItem.className = 'meditation-menu-item active';
			$(meditationMenuItem).data('key', meditationDate);
			$(meditationDescMenuItemsPane).append(meditationMenuItem);
			meditationContentItem = createCustomElement('div', 'meditation-coupe');
			meditationContentItem.className = 'meditation-content-item active';
			meditationContentItem.innerHTML = `
										<p><strong>
										Nicole :
										</strong></p>
										<p>
										Bonjour à tous
										</p>
										<p>
										Je vous transmets pour l'instant la nouvelle méditation que vous ferez à partir de ce soir.<br />
										Vous rapporterez votre méditation par écrit jusqu'à la fin de ce jour.<br />
										Demain est un autre jour.<br />
										Le Ciel vous respecte dans ce que vous êtes et ce que vous lui montrez.</b>
										</p>
										<hr/>
										<p>
										Voilà la méditation:<br/>
										<strong>
										Vous êtes assis en cercle sur une plate forme ronde et dorée.<br />
										Vous êtes sous la voute céleste, la plate forme se trouve au milieu de l'univers, dans le vide sidéral.<br />
										Jésus est debout au milieu de vous tous, il est beau, dans son aspect à la fois physique et christique.<br />
										Vous êtes dans le dépouillement, seuls, au milieu de l'univers, et vous lâchez tout.
										</strong>
										</p>
									`;
			$(meditationContentItem).data('key', meditationDate);
			$(meditationContentItem).data('title', meditationContentTitle);
			$(meditationDescContent).append(meditationContentItem);
			
			//---- meditation : Gabriel
			meditationDate = `26 oct.`;
			meditationMenuTitle = `Gabriel`;
			meditationContentTitle = `26 octobre 2020`;
			meditationMenuItem = createCustomElement('div');
			meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
			meditationMenuItem.className = 'meditation-menu-item';
			$(meditationMenuItem).data('key', meditationDate);
			$(meditationDescMenuItemsPane).append(meditationMenuItem);
			meditationContentItem = createCustomElement('div', 'meditation-coupe');
			meditationContentItem.className = 'meditation-content-item';
			meditationContentItem.innerHTML = `
										<p>
										<img src="https://www.eltair.org/lumiere/wp-content/uploads/2020/10/P1120429-300x225.jpg" style="box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);margin: auto;display: block;margin-bottom: 20px;border-radius: 5px;">
										</p>
										<hr>
										<p>Comme je vous l'ai dit nous allons commencer à travailler avec l'Archange Gabriel. C'est l'ange annonciateur de Marie. Il est représenté avec une fleur de lys à la main.</p>
										<p>Il m'est apparu vendredi 20 octobre durant la méditation de 20h.</p>
										<p>Nous étions tout en cercle, agenouillés, le front au sol. Gabriel a déposé devant chacun de nous une branche d'olivier en guise de paix.</p>
										<p>Son visage était comme de la porcelaine, d'une grande pureté, son regard bleu azur d'un amour profond qui n'existe pas sur Terre.</p>
										<p>Pour la méditation de 20h, vous visualiserez ce que je vous décris ci-dessus. Gabriel est un archange, il peut être dans une Lumière dorée, il est là pour la paix, l'âme, l'amour.
										<p>Pour l'instant vous allez vous imprégner de sa présence.</p>
										<p>Vous pourrez raconter votre méditation qui se fait dans un espace bleu azur, c'est un espace angélique, c'est un espace de guérison pour l'âme.</p>
										<p>Je vous joins une photo de  mosaïque de Gabriel prise à Lourdes.</p>
										<p>Nicole</p>
									`;
			$(meditationContentItem).data('key', meditationDate);
			$(meditationContentItem).data('title', meditationContentTitle);
			$(meditationDescContent).append(meditationContentItem);
		}
		
		//---- meditation : Recentrage
		meditationDate = `22 oct.`;
		meditationMenuTitle = `Recentrage`;
		meditationContentTitle = `22 octobre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item' + (isFirst ? ' active' : '');
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-coupe');
		meditationContentItem.className = 'meditation-content-item' + (isFirst ? ' active' : '');
		meditationContentItem.innerHTML = `
									<p>Nicole :<p>
									<p>"A ce jour le vase clos est fermé et emporté par des anges.<br>
									Nous sommes dans une zone neutre.  Vous stoppez la méditation avec la coupe.<br>
									Vous ferez à 20h une méditation en cercle, de recentrage de vos énergies avec la Lumière."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : La Coupe
		meditationDate = `12 oct.`;
		meditationMenuTitle = `La Coupe`;
		meditationContentTitle = `12 octobre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-coupe');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous visualisez les artisans debout en cercle. Le sol est argenté. Au centre du cercle il y a une coupe dorée à hauteur de votre cœur. Dans la coupe s’écoule du Ciel du nectar divin de couleur blanche. Vous respirez dans le cœur.</p>
									<p>Au-dessus de vous tous se trouvent: Jésus, Marie, Babaji, Damanian, Mickaël.</p>
									<p>Vous choisissez l’un d’entre eux. Celui que vous avez choisi vous apporte une coupe et vous fait boire.</p>
									<p>Chaque jour vous méditerez différemment avec l’un ou l’autre, mais à chaque fois vous buvez à la coupe qui vous est tendue.</p>
									<p>Le liquide que vous buvez s’écoule dans tout votre corps.</p>
									<p>Vous échangez sur vos méditations."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Christ Solaire
		meditationDate = `8 oct.`;
		meditationMenuTitle = `Christ Solaire`;
		meditationContentTitle = `8 octobre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous visualisez le groupe comme d’habitude.<br>
									Au centre des artisans il y a le soleil et Jésus qui marche au centre du cercle.<br>
									C’est un travail avec le Christ solaire et Jésus.<br>
									Le Christ solaire se place sur vos trois foyers.</p>
									<p>Vous êtes le guide de votre propre méditation.</p>
									<p>C’est le moment de travailler sur l’humilité et de purifier vos centres."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Licornes
		meditationDate = `1 oct.`;
		meditationMenuTitle = `Licornes`;
		meditationContentTitle = `1 octobre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous visualisez le groupe et vous vous placez dans le vase clos comme d’habitude.<br>
									Au centre du groupe, il y a une ouverture au sol, et de là remonte une colonne de Lumière blanche, c’est le Christ Planétaire qui remonte.<br>
									En même temps, la Lumière blanche remonte à travers votre périnée, le long de votre colonne et ressort à travers le crâne pour rejoindre l’Absolu.<br>
									Le sol se transforme en prairie, et des licornes viennent vers vous.</p>
									<p>A vous d’établir la relation.<br>
									Vous êtes maitre à bord, vous respirez comme vous voulez et vous vivez la méditation à votre guise.<br>
									Vous parlerez de vos méditations chaque fois que vous le souhaiterez. Les échanges sont importants."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Marie
		meditationDate = `16 sept.`;
		meditationMenuTitle = `Marie`;
		meditationContentTitle = `16 septembre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous êtes assis en cercle dans le vase clos, sur la terre où poussent de l’herbe verte, des fleurs.<br>
									Marie est au centre debout. Elle regarde chacun d’entre vous dans vos yeux, votre cœur, votre âme.<br>
									L’enfant que vous étiez sort de vous et court vers Marie dans ses bras. (Ceci est une direction, mais dans la créativité les choses peuvent changer selon vos expressions et vécus intérieurs).<br>
									Marie emporte cet enfant vers le Père.<br>
									Vous respirez la Lumière par le cœur dans lequel une rose s’épanouit.</p>
									<p>Ici Marie devient la mère de cet enfant.<br>
									Ici l’affect doit vivre, se libérer, s’exprimer.<br>
									Vous ramenez vos expériences de méditations par écrit. C’est un travail sur le 3ème foyer christique (le ventre) avec l’aide de Marie."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Envol du vaisseau
		meditationDate = `7 sept.`;
		meditationMenuTitle = `Envol du Vaisseau`;
		meditationContentTitle = `7 septembre 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous vous placez dans l’unité de groupe (ce doit être une chose acquise et automatique dans l’énergie).<br>
									Vous visualisez Mickaël, Jésus, Babaji dans le vaisseau.<br>
									Le miroir est mouvant.<br>
									La Lumière est partout, elle emplit le vase clos.<br>
									Vous respirez la Lumière par tout votre corps.<br>
									Le vaisseau s’envole dans la Lumière, que faites-vous?</p>
									<p>Ce sera un travail de visualisation créative.<br>
									C’est aussi une méditation interrogative.<br>
									Vous devez échanger sur vos méditations."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Mikael
		meditationDate = `30 août`;
		meditationMenuTitle = `Mikael`;
		meditationContentTitle = `30 août 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous allez travailler en méditation avec l’archange Mickaël toute la durée de ce travail.<br>
									Pour la méditation, à la place de Jésus, vous visualisez Mickaël au-dessus de vous, qui vous transperce le haut du crâne avec son épée.<br>
									Vous êtes toujours tous assis sur le miroir, en cercle, avec le vaisseau au milieu.<br>
									L’épée rentre par le centre de la tête , vous inspirez son énergie jusqu’au centre de la conscience et vous expirez la même énergie à travers votre corps jusqu’en bas vers le miroir, et l’épée vous traverse et traverse le miroir sur lequel vous êtes assis. Et vous continuez autant de fois que vous le souhaitez.</p>
									<p>Si vous avez des questions n’hésitez pas à les poser."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Le Vaisseau
		meditationDate = `23 août`;
		meditationMenuTitle = `Le Vaisseau`;
		meditationContentTitle = `23 août 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Pendant la méditations de 20h, vous visualisez les artisans en cercle, nul besoin de se relier à chacun, le lien doit s’imposer.<br>
									Vous vous visualisez tous assis sur un miroir, dans le vase clos, ce miroir est l’eau divine, c’est aussi un miroir qui reflète la Lumière ou votre image.<br>
									Au milieu du cercle vous visualisez le vaisseau de Lumière, à vous de l’imaginer, soit en construction, soit terminé.<br>
									Et au-dessus de tout cela, Jésus les bras ouverts tendus vers le bas qui vous envoie de la Lumière qui sort de ses mains et qui rentre par le haut de votre crâne et au centre de votre coeur par l’extérieur. Vous inspirez sa Lumière par le crâne et vous l’expirez dans le coeur.</p>
									<p>Prenez le temps de bien visualiser et bien respirer."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Remontée
		meditationDate = `11 août`;
		meditationMenuTitle = `Remontée`;
		meditationContentTitle = `11 août 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Faire remonter la force de vie de vos racines en passant par le périnée, jusqu’au crâne en inspirant et en expirant la faire ressortir au-dessus de la tête, à travers le sommet du crane  vers le Ciel. L’arbre reste au centre. En même temps que la sève remonte en vous, elle remonte aussi dans l’arbre par ses racines. Vous continuez aussi la prière."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Enracinement
		meditationDate = `1 août`;
		meditationMenuTitle = `Enracinement`;
		meditationContentTitle = `1 août 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Vous allez faire un mouvement de descente de la Lumière, ça ne doit pas remonter.<br>
									Vous inspirez la Lumière dans le Ciel, dans l’Absolu, vous la faite descendre par le haut du crane, elle traverse le cœur, le ventre, le périnée et s’enracine à la Terre.<br>
									Inspiration dans le Ciel et expiration jusque dans la Terre, puis vous vous replacez en haut avec votre esprit sans mouvement de remonté de la Lumière et vous refaites le processus.</p>
									<p>Cette méditation n’est pas en lien avec le Christ Planétaire, donc ne faites pas descendre jusqu’au centre de la Terre. Vous vous enracinez comme un arbre.<br>
									C’est une méditation dans votre corps uniquement avec la force de l’Absolu.<br>
									Il faut aller dans le vital.<br>
									Une fois la méditation en place, vous vous visualisez tous en cercle autour d’un arbre (travail en référence à l’arbre de vie et de la connaissance).<br>
									Vous visualisez chacun un arbre, celui qui vous correspond, celui qui est pour vous l’arbre de vie."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Introspection
		meditationDate = `23 juil.`;
		meditationMenuTitle = `Introspection`;
		meditationContentTitle = `23 juillet 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>« Citez dans votre corps, votre âme et votre esprit, ce qui vous fait dire que vous êtes chuté, en dehors des mots: ego, mort, maladie, que vous ne devez pas utiliser. »<br>
(Vous donnez une réponse pour le corps, une réponse pour l’âme, une réponse pour l’esprit.)</p>
<p>« Quelle est l’unique chose qui vous fait dire que vous devez vous redresser ? »<br>
(Les réponses vous devez aller les chercher au plus profond de vous, vous pouvez utiliser la méditation de 20h.)</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Le jugement
		meditationDate = `8 juil.`;
		meditationMenuTitle = `Le jugement (suite)`;
		meditationContentTitle = `8 juillet 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>Les directions du Ciel doivent être suivies pour le travail de la deuxième marche.<br>
									Le vaisseau doit être construit par tout le groupe. Pas d’exception.<br>
									Conservez vos notes sur papier.</p>
									<p>Vous allez répondre à cette nouvelle question:<br>
									« Pourquoi je veux juger? »<br>
									Vous faites le même travail en individuel et à 20h.<br>
									Vous devez creuser en vous au plus loin et faire émerger en Lumière ce qui vient.<br>
									Si vous jugez la structure proposée, vous jugez le Ciel.<br>
									Si vous avez de la médisance pour cette structure, que vous êtes hypocrite, c’est que le travail sur le mensonge n’est pas suffisamment entré dans la dynamique.<br>
									Et si vous êtes totalement en désaccord, vous quittez ce travail.<br>
									Dieu veut des âmes qui s’enracinent dans le Ciel.</p>
									<p>La 3ème question:<br>
									« Etes-vous jugé par Dieu ? »</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Le jugement
		meditationDate = `6 juil.`;
		meditationMenuTitle = `Le jugement`;
		meditationContentTitle = `6 juillet 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>Message de Damanian :</p>
									<p>« Tu ne jugeras point » est un commandement divin.</p>
									Pouvez-vous répondre à cette question:<br>
									Pourquoi je ne dois pas juger?</p>
									<p>A la méditation de 20h, vous allez tous ensemble méditer sur cette question en introspection avec la Lumière.<br>
									Cela un certain nombre de jours.<br>
									Vous allez noter sur papier vos réflexions durant la méditation et aussi dans la journée. C’est à vous de voir.<br>
									Et après quelques jours, le moment venu, vous apporterez chacun par écrit,  dans le groupe vos réflexions. »</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//---- meditation : Le jugement
		meditationDate = `3 mai`;
		meditationMenuTitle = `Unité`;
		meditationContentTitle = `3 main 2020`;
		meditationMenuItem = createCustomElement('div');
		meditationMenuItem.innerHTML = '<span>' + meditationMenuTitle + '</span><span>' + meditationDate + '</span>';
		meditationMenuItem.className = 'meditation-menu-item';
		$(meditationMenuItem).data('key', meditationDate);
		$(meditationDescMenuItemsPane).append(meditationMenuItem);
		meditationContentItem = createCustomElement('div', 'meditation-christ-solaire');
		meditationContentItem.className = 'meditation-content-item';
		meditationContentItem.innerHTML = `
									<p>"Le Ciel attend de vous une dynamique que nous appellerons "edenique". Cette dynamique doit vous sortir de vos limites.<br>
									Vous allez profiter de votre situation de confinement.<br>
									Puisque vous ne vous voyez pas physiquement.<br>
									Tous les soirs à 20h précise, vous allez tous vous visualiser et vous mettre en unité à distance les uns avec les autres. Cela peut durer seulement 1 minute, et vous allez tous vous aimer. Ce sera 1 mn de silence intérieur, de prise de communication télépathique."

									<p>"Le Ciel veut que chacun soit d'une grande sincérité avec lui-même pour ce travail.<br>
									D'une clarté d'esprit avec le fait d'être artisan.<br>
									Car l'état permanent d'humain chuté ne vous donne pas accès au Ciel si vous ne posez pas des actes de dépassement intérieur et c'est là qu'interviennent la Lumière ou l'ego.<br>
									L'ego pour vous maintenir dans l'obscurité, vous faire reculer ou abandonner, douter.<br>
									Et la Lumière pour tout éclairer et permettre une avancée.<br>
									Aujourd'hui la compétition et comparaison spirituelle entre artisans étant présentes."</p>
								`;
		$(meditationContentItem).data('key', meditationDate);
		$(meditationContentItem).data('title', meditationContentTitle);
		$(meditationDescContent).append(meditationContentItem);
		
		//-- menu
		let meditationDisplayBtn = createCustomElement('div', 'group-meditation-btn');
		meditationDisplayBtn.className = 'page-title-btn';
		meditationDisplayBtn.innerHTML = '<div class="group-meditation-ico"></i>';
		meditationDisplayBtn.onclick = function(e) {
			$('#group-meditation-desc').toggleClass('open');
			e.stopPropagation();
		};
		meditationDescription.onclick = function(e) {
			if ($(e.target).hasClass('group-meditation-print-btn')) {
				printElem($('#group-meditation-desc .meditation-content .active').html());
			} else {
				const srcMenuItem = $(e.target).closest('.meditation-menu-item', this);
				if (srcMenuItem.length) {
					console.log('click changeMeditationItem');
					if (!srcMenuItem.hasClass('active')) {
						// remove old selection
						$(meditationDescription).find('.active').removeClass('active');
						// new selection
						const key = srcMenuItem.data('key');
						$(meditationDescription).find('.meditation-content-item').each(function() {
							if ($(this).data('key') === key) {
								$(this).addClass('active');
								console.log('update date ? ' + $(meditationDescription).find('.meditation-content-date').length);
								$(meditationDescription).find('.meditation-date').html($(this).data('title'));
							}
						});
						srcMenuItem.addClass('active');
					}
				} else if ($(e.target).hasClass('group-meditation-event-closer')) {
					$(this).removeClass('open');
					$('.group-note-btn').removeClass('open');
				}
			} 
			e.stopPropagation();
		};
		$(meditationDescription).find('.meditation-content-item.active').each(function () {
			$(meditationDescDate).html($(this).data('title'));
		});
		$(groupPageTitle).append(meditationDisplayBtn);
		$(groupPageTitle).append(meditationDescription);
	}
	
	
	// adjust connected user & chat panel position
	$('.footer-widget-1').css('right', (($(window).width() - $('#wrapper').width()) / 2)+'px');
	/*
	$('#wrapper').prepend($('.footer-widget-1'));
	*/
	$('.footer-widget-1').each(function() {
		console.log('INIT TOOLTIP : ' + $(this).data('bp-tooltip'));
		$(this).attr('title', $(this).data('bp-tooltip'));
	});
	var waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
		if (!uniqueId) {
		  uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
		  clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	  };
	})();
	$(window).resize(function () {
		waitForFinalEvent(function(){
			// window resize 
			// => refresh connected user & chat panel position
			$('.footer-widget-1').css('right', (($(window).width() - $('#wrapper').width()) / 2)+'px');
		}, 100, "refresh_chat_pos");
	});
	/*
	const chatInfos = $(createCustomElement('div', 'chat-infos'));
	const chatExternalLink = $(createCustomElement('a', 'external-chat-link'));
	chatExternalLink.attr('href', 'https://rumbletalk.com/client/chat.php?Ii2XiQMk');
	chatExternalLink.attr('target', '_blank');
	chatExternalLink.html('<img src="https://www.eltair.org/lumiere/wp-content/uploads/2020/10/1603921449-chat-float.png"/>')
	$(chatInfos).append(chatExternalLink);
	$('#bp_core_whos_online_widget-3').append(chatInfos);
	
	// Rumbletalk chat infos loading...
	const lastChatMessagePane = $(createCustomElement('div', 'last-chat-message'));
	lastChatMessagePane.html('<i class="fa fa-spinner fa-pulse fa-fw margin-bottom"></i>');
	lastChatMessagePane.data('msg-id', '');
	$('#chat-infos').append(lastChatMessagePane);
	// Rumbletalk chat listening
	listenRumbleTalkMessages();
	
	function listenRumbleTalkMessages() {
		const k = 'f39885bdbc9ab73517fa0785298bfa1d';
		const sk = 'b08bef9a445f8211dde1913dc010166bdc3ca00e24d9a1c0c5e190bc5bdb63a9';
		authenticate(k, sk, getChatInfos);
	}
	
	function authenticate(k, sk, callback) {
		const xhr = new XMLHttpRequest();
		const url = 'https://api.rumbletalk.com/token';
		const data = JSON.stringify({"key": k, 
								   "secret": sk});
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log("Auth. resp: " + xhr.responseText);
				var json = JSON.parse(xhr.responseText);
				console.log("Auth. resp JSON: " + JSON.stringify(xhr.responseText));
				if (json.status == true) {
					// service available
					const token = json.token;
					callback(token);
				} else {
					// service unavailable
					// TODO : ...
				}
			} else {
				console.log("Auth. resp: ERROR :: status " + xhr.status);
			}
		};
		xhr.send(data);
	}
	
	function getChatInfos(token) {
		const xhr = new XMLHttpRequest();
		let url = 'https://api.rumbletalk.com/chats';
		console.log("Get chat - url : " + url);
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + token);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				if (json.status == true) {
					retrieveLastMessage(token, json.data[0].id);
				} else {
				 	console.log("Get chat - status KO");
				}
			} else {
				console.log("Get chat - ERROR : status " + xhr.status + " ; readyState : " + xhr.readyState);
			}
		};
		xhr.send();
	}
	
	function retrieveLastMessage(token, chatId) {
		const xhr = new XMLHttpRequest();
		let url = 'https://api.rumbletalk.com/chats/'+chatId+'/messages?fast=true&limit=1';
		console.log("Get chat messages - url : " + url);
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + token);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				if (json.status == true && json.data.length == 1) {
					refreshLastMessage(json.data[0]);
				} else {
				 	console.log("Get chat last message - status KO");
				}
			} else {
				console.log("Get chat last message - ERROR : status " + xhr.status + " ; readyState : " + xhr.readyState);
			}
		};
		xhr.send();
	}
	
	function refreshLastMessage(msg) {
		let lastChatMessagePane = $('#last-chat-message');
		if (lastChatMessagePane.length == 0) {
			lastChatMessagePane = $(createCustomElement('div', 'last-chat-message'));
			lastChatMessagePane.data('msg-id', '');
			$('#chat-infos').append(lastChatMessagePane);
		}
		console.log('current message id : ' + lastChatMessagePane.data('msg-id'));
		console.log('new message id : ' + msg.messageId);
		if (lastChatMessagePane.data('msg-id') != msg.messageId) {
			lastChatMessagePane.data('msg-id', msg.messageId);
			console.log('new message time : ' + msg.time);
			let msgDate = new Date(msg.time * 1000);
			if (isToday(msgDate)) {
				msgDate = '<i class="fa fa-clock-o" aria-hidden="true" style="font-size: 12px !important;"></i> ' + msgDate.toLocaleTimeString("fr-FR", {hour: 'numeric', minute:'2-digit'});
			lastChatMessagePane.html('<div class="chat-msg-user">' + msg.userName + '</div><div>' + msgDate + '</div><div class="chat-msg-content">' + msg.text + '</div>');
			} else {
				msgDate = msgDate.toLocaleDateString("fr-FR", { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
				lastChatMessagePane.html('<div style="display: flex; align-items: center;"><i class="fa fa-clock-o" aria-hidden="true" style="font-size: 12px !important;"></i>&nbsp;&nbsp;' + msgDate + '</div>');
			}
		}
	}
	function isToday(date) {
	  const today = new Date()
	  return date.getDate() == today.getDate() &&
		  date.getMonth() == today.getMonth() &&
		  date.getFullYear() == today.getFullYear();
	}

	*/
	
	////////////////// Chat link ////////////////////
	
	function customChatLink() {
		const chatLink = $('#menu-communaute #menu-item-2504 a');
		if (chatLink.length === 0) {
			return;
		}
		chatLink.attr('target', '_blank');
	}
	customChatLink();
	
	////////////////// Videoconference link ////////////////////
	
	function addVideoLink() {
		const menu = $('.widget_nav_menu ul#menu-communaute');
		console.log('DEBUG - menu ? ' +menu.length);
		if (menu.length === 0 || $('a.elevation-home-link').length === 0) {
			console.log('DEBUG => no menu');
			return;
		}
		const videolink = $(createCustomElement('li', 'menu-item-video-link'));
		videolink.attr('class', 'menu-item menu-item-type-post_type menu-item-object-page menu-item-826');
		videolink.html('<a href=/lumiere/groupes/videoconference/buddymeet/">Vidéoconférence</a>');
		
		menu.append(videolink);
		
		// activate poll
		$(document.body).addClass('private-access');
	}
	addVideoLink();
	
	////////////////// Modal lib ////////////////////
	
	// components
	const modal = $(createCustomElement('div', 'modal'));
	const modalContent = $(createCustomElement('div', 'modal-content'));
	const modalButtons = $(createCustomElement('div', 'modal-buttons'));
	const modalPrimaryBtn = $(createCustomElement('div', 'modal-primary-button'));
	const modalSecondaryBtn = $(createCustomElement('div', 'modal-secondary-button'));
	const modalBack = $(createCustomElement('div', 'modal-back'));
	$(modalButtons).append(modalPrimaryBtn);
	$(modalButtons).append(modalSecondaryBtn);
	$(modal).append(modalContent);
	$(modal).append(modalButtons);
	$(document.body).append(modalBack);
	$(document.body).append(modal);
	
	// closing
	modalBack.click(closeModal);
	function closeModal() {
		console.log('closeModal :: BEGIN');
		$(document.body).removeClass('showing-modal');
		console.log('closeModal :: END');
	}
	
	// opening
	function openModal(data, content, primaryCallback, secondaryCallback, primaryBtnLabel, secondaryBtnLabel) {
		console.log('openModal :: BEGIN');
		const modalContent = $('#modal-content');
		const modalPrimaryBtn = $('#modal-primary-button');
		const modalSecondaryBtn = $('#modal-secondary-button');
		// content
		modalContent[0].textContent = '';
		modalContent.append(content);
		// buttons labels
		if (primaryBtnLabel == null) {
			modalPrimaryBtn.html('OK');
			console.log('openModal :: primaryBtnLabel = OK');
		} else {
			console.log('openModal :: primaryBtnLabel = ' + primaryBtnLabel);
			modalPrimaryBtn.html(primaryBtnLabel);
		}
		if (secondaryBtnLabel == null) {
			modalSecondaryBtn.html('Annuler');
			console.log('openModal :: secondaryBtnLabel = Annuler');
		} else {
			console.log('openModal :: secondaryBtnLabel = ' + secondaryBtnLabel);
			modalSecondaryBtn.html(secondaryBtnLabel);
		}
		// buttons callbacks
		if (primaryCallback == null) {
			console.log('openModal :: no primaryCallback');
			modalPrimaryBtn[0].onclick = closeModal;
		} else {
			console.log('openModal :: new primaryCallback');
			modalPrimaryBtn[0].onclick = function () {
				primaryCallback(data);
				closeModal();
			};
		}
		if (secondaryCallback == null) {
			console.log('openModal :: no secondaryCallback');
			modalSecondaryBtn[0].onclick = closeModal;
		} else {
			console.log('openModal :: new secondaryCallback');
			modalSecondaryBtn[0].onclick = function () {
				secondaryCallback(data);
				closeModal();
			};
		}
		$(document.body).addClass('showing-modal');
		console.log('openModal :: END');
	}
	
	
	function openDeleteModal(event) {
		console.log('DEBUG - openDeleteModal :: ' + $(event.currentTarget).data('href'));
		const msgContent = $(createCustomElement('div'));
		msgContent.html('Voulez-vous supprimer le message ?');
		openModal($(event.currentTarget), msgContent, removeTarget)
	}
	function removeTarget(src) {
		console.log('removeTarget :: ' + src.data('href'));
		const isComment = src.parent().hasClass('acomment-options');
		if (isComment) {
			// removing a comment
			let commentPane = src.closest('li[id^="acomment-"]');
			console.log('removeTarget :: commentPane : ' + commentPane.attr('class'));
			const observer = new MutationObserver(notifyCommentRemove.bind(commentPane.attr('id')));
			observer.observe(commentPane.parent()[0], {
				childList:    true
			});
		} else {
			// removing an activity
			let activityPane = src.closest('li.activity_update');
			console.log('removeTarget :: activityPane : ' + activityPane.attr('class'));
			const observer = new MutationObserver(notifyActivityRemove.bind(activityPane.attr('id')));
			observer.observe(activityPane[0], {
				attributes:    true,
				attributeFilter: ["style"]
			});
		}
		$('a[href="'+src.data('href')+'"]').click();
	}
	function notifyCommentRemove(mutations, observer) {
		console.log('DEBUG - notifyCommentRemove :: ' + this);
		const msgToRemove = $('#'+this);
		if (msgToRemove.length > 0) {
			return;
		}
		// remove just done !
		observer.disconnect();
		const msg = $(createCustomElement('div'));
		msg.attr('id', 'message');
		msg.attr('class', 'bp-template-notice updated');
		msg.html('<p>Commentaire supprimé !</p>');
		$('#template-notices').append(msg);
	}
	function notifyActivityRemove(mutations, observer) {
		console.log('DEBUG - notifyActivityRemove :: ' + this);
		const msgToRemove = $('#'+this);
		if (msgToRemove.length === 0) {
			observer.disconnect();
			return;
		}
		if (msgToRemove.css('display') !== 'none') {
			return;
		}
		// remove just done !
		observer.disconnect();
		const msg = $(createCustomElement('div'));
		msg.attr('id', 'message');
		msg.attr('class', 'bp-template-notice updated');
		msg.html('<p>Message supprimé !</p>');
		msg.click(closeNotification);
		$('#template-notices').append(msg);
	}
	function closeNotification(e) {
		$(e.currentTarget).addClass('ok');
	};
	
	
	/** Reminder **/
	function addSideReminder(parent) {
		const currentDay = new Date().getDay();
		const lastDay = localStorage.getItem('alarm-tag');
		if (currentDay != lastDay) {
			const sideReminder = $(createCustomElement('div', 'side-reminder'));
			sideReminder.html('<i class="fas fa-info-circle"></i><span>Visioconférence<br>dimanche 20 déc. à 17h</span><div><span>L’obéissance, la désobéissance</span> <span>et la liberté divine</span></div>');
			$(parent).append(sideReminder);
			sideReminder.click(function(e) {
				localStorage.setItem('alarm-tag', currentDay);
				$(e.currentTarget).css('opacity', '0');
				$(e.currentTarget).css('pointer-events', 'none');
			});
		}
		
	}

})( jQuery );
