
if (localStorage.getItem('display-message-date') === 'false') {
	document.body.classList.add('no-date');
}
if (localStorage.getItem('message-menu-position-alt') === 'true') {
	document.body.classList.add('message-menu-position-alt');
}
if (localStorage.getItem('message-menu-mini-mode') === 'true') {
	document.body.classList.add('message-menu-mini-mode');
}

function doWhenChildCreated(root, callback) {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    new MutationObserver((mutationsList) => {
        for (var mutation of mutationsList) {
            // parse new node added into the chat
            for (var node of mutation.addedNodes) {
                // check init to avoid auto-play media from old msg
                if (node.nodeType === Node.ELEMENT_NODE) {
                    var myNode = node;
                    callback(myNode);
                }
            }
        }
    }).observe(root, {
        childList: true
    });
}
function isNotRecent(dateStr) {
    return !dateStr.includes('aujourd');
}
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
function decorate() {
    console.log('CUSTOM SCRIPT: BEGIN');
    elements = document.querySelectorAll('.acomment-meta .activity-time-since .time-since');
    for (e of elements) {
        if (isNotRecent(e.innerHTML)) {
            e.parentNode.classList.remove('recent');
        } else {
            var parent = e.parentNode;
            parent.parentNode.parentNode.classList.add('recent');
        }
    }


    elements = document.querySelectorAll('.activity-header .activity-time-since .time-since');
    for (e of elements) {
        if (isNotRecent(e.innerHTML)) {
            e.parentNode.classList.remove('recent');
        } else {
            var parent = e.parentNode;
            parent.parentNode.parentNode.parentNode.parentNode.classList.add('recent');
        }
    }
    console.log('CUSTOM SCRIPT: END');
}

var bp = document.getElementById('buddypress');
var activities = bp.querySelector('.activity');
doWhenChildCreated(activities, decorate);
decorate();




function createCustomElement(type, id) {
    const e = document.createElement(type);
    if (id != null && id) {
        e.id = id;
    }
    return e;
}
/**
* Native scrollTo with callback
* @param offset - offset to scroll to
* @param callback - callback function
*/
function scrollTo(offset, callback) {
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
        if (window.pageYOffset.toFixed() === fixedOffset) {
            window.removeEventListener('scroll', onScroll);
            callback();
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}

function buildConfigItem(desc, keystore, defaultValue, callback) {
    // -- menu title
    var item = createCustomElement('div');
    item.className = 'message-config-menu-item';
    
    /* -- creating switchItem material component, following sample :
    <label for="basic-switch">off/on</label>
    <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
            <div class="mdc-switch__thumb"></div>
            <input type="checkbox" id="basic-switch" class="mdc-switch__native-control" role="switch" aria-checked="false">
        </div>
    </div>
    */
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

    item.appendChild(label);
    item.appendChild(switchItem);
    switchItem.appendChild(switchTrack);
    switchItem.appendChild(switchThumbUnderlay);
    switchThumbUnderlay.appendChild(switchThumb);
    switchThumbUnderlay.appendChild(switchInput);
    
    item.onclick = (e) => {
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

function buildMessageConfigBtn() {
    // button
    let btn = createCustomElement('div', 'message-config-btn');
    btn.onclick = (e) => {
        if (e.target !== btn) return;
        btn.classList.toggle('on');
    };

    // menu configuration :
    let menuDiv = createCustomElement('div', 'message-config-menu');
    // -- menu title
    let title = createCustomElement('div', 'message-config-menu-title');
    title.innerHTML = 'Paramètres d\'affichage';
    // -- close button
    let closeBtn = createCustomElement('div', 'message-config-menu-close-btn');
    closeBtn.innerHTML = 'OK';
    closeBtn.onclick = (e) => {
        btn.classList.toggle('on');
    };
	
	let miniModeItem = buildConfigItem('<b>Menu discret</b> lorsqu\'il est fermé', 
										     'message-menu-mini-mode', false, 
											 (isEnabled) => {
													if (isEnabled) {
														document.body.classList.add('message-menu-mini-mode');
													} else {
														document.body.classList.remove('message-menu-mini-mode');
													}
												});
	
	let dateActivationItem = buildConfigItem('Afficher la <b>date des messages</b><br/>(heure de française pour le moment)', 
										     'display-message-date', true, 
											 (isEnabled) => {
													if (isEnabled) {
														document.body.classList.remove('no-date');
													} else {
														document.body.classList.add('no-date');
													}
												});
	
	let menuPositionItem = buildConfigItem('Affichage du <b>menu à droite</b> de la page', 
										     'message-menu-position-alt', false, 
											 (isEnabled) => {
													if (isEnabled) {
														document.body.classList.add('message-menu-position-alt');
													} else {
														document.body.classList.remove('message-menu-position-alt');
													}
												});
	
	let menuClickBehaviorItem = buildConfigItem('Faire disparaître le menu lors du <b>clic</b> sur un message', 
										     'message-menu-click-behaviour', false);
	
	let autoDisplayItem = buildConfigItem('Affichage <b>automatique</b> du menu à l\'ouverture d\'une page avec message', 
										  'auto-display-message-menu', false);

    menuDiv.appendChild(title);
    menuDiv.appendChild(miniModeItem);
    menuDiv.appendChild(dateActivationItem);
    menuDiv.appendChild(menuPositionItem);
    menuDiv.appendChild(menuClickBehaviorItem);
    menuDiv.appendChild(autoDisplayItem);
    menuDiv.appendChild(closeBtn);
    btn.appendChild(menuDiv);

    return btn;
}

var _isDynamicResizing = true;
function generateHistory() {

    var wrapper = document.getElementById('history-wrapper');
    var counter = 0;
    var counterMsg = 0;
    var counterCom = 0;
    var root = document.getElementById('menu-recent');
    if (root) {
        root.innerHTML = '';
    } else {
        root = createCustomElement('div', 'menu-recent');
    }
    var activities = document.body.querySelectorAll('li[id^="activity-"].activity_update');
    var sortList = [];
    for (let activity of activities) {
        let row = createCustomElement('div');
        row.className = 'activity-event';
        row.style.display = 'flex';
        row.style.flexFlow = 'row';
        row.style.flexWrap = 'wrap';

        let activityAuthor = activity.querySelector('.activity-header a:first-child').innerHTML;
        let authorDiv = createCustomElement('div');
        authorDiv.innerHTML = activityAuthor;
        authorDiv.style.flex = '1 0';
        authorDiv.className = 'author';

        let date = activity.querySelector('.time-date').innerHTML;
        let dateDiv = createCustomElement('div');
        if (isNotRecent(date)) {
            dateDiv.innerHTML = date;
        } else {
            dateDiv.innerHTML = date.substring(18);
        }
        dateDiv.className = 'date';
		
        let since = activity.querySelector('.time-since').innerHTML;
        let sinceDiv = createCustomElement('div');
        sinceDiv.innerHTML = since.substring(7);
        sinceDiv.className = 'since';

        if (!isNotRecent(date)) {
            row.classList.add('recent');
            counter++;
            counterMsg++;
        }

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
        let messageDiv = createCustomElement('div');
        messageDiv.innerHTML = message;
        messageDiv.style.flex = '1 0 calc(100% - 40px)';
        messageDiv.style.whiteSpace = 'no-wrap';
        messageDiv.className = 'message';

        let temp = activity.querySelector('.activity-time-since');
        temp = temp.href;
        temp = temp.substring(0, temp.length - 1);
        temp = temp.substring(temp.lastIndexOf('/') + 1);
        row.setAttribute('data-id', temp);

        let avatarImg = activity.querySelector('.activity-avatar img');
        row.style.backgroundImage = "url('" + avatarImg.src + "')";

        let groupName = null;
        if (activity.classList.contains('groups')) {
            groupName = activity.querySelector('.activity-header > p > a:nth-child(3)').innerHTML;
        }
        if (groupName) {
            let groupDiv = createCustomElement('div');
            groupDiv.setAttribute('flag', 'group');
            groupDiv.innerHTML = groupName;
            row.appendChild(messageDiv);
        }

        row.appendChild(authorDiv);
        row.appendChild(dateDiv);
        row.appendChild(sinceDiv);
        row.appendChild(messageDiv);

        if (groupName) {
            let groupDiv = createCustomElement('div');
            groupDiv.setAttribute('flag', 'group');
            groupDiv.innerHTML = groupName;
            row.appendChild(groupDiv);
        }

        row.onclick = () => {
            _isDynamicResizing = false;
            activity.scrollIntoView();
			if (localStorage.getItem('message-menu-click-behaviour') === 'true') {
				wrapper.classList.toggle('on');
			}
            _isDynamicResizing = true;
            computeMaxHeightRecentMenu(root);
        }
        sortList.push(row);

        let comments = activity.querySelectorAll('li[id^="acomment-"]');
        for (let comment of comments) {
            let row = createCustomElement('div');
            row.className = 'comment-event';
            row.style.display = 'flex';
            row.style.flexFlow = 'row';
            row.style.flexWrap = 'wrap';

            let author = comment.querySelector('.acomment-meta a:first-child').innerHTML;
            let authorDiv = createCustomElement('div');
            authorDiv.innerHTML = author;
            authorDiv.style.flex = '1 0';
            authorDiv.className = 'author';

            let date = comment.querySelector('.acomment-meta .time-date').innerHTML;
            let dateDiv = createCustomElement('div');
            if (isNotRecent(date)) {
                dateDiv.innerHTML = date;
            } else {
                dateDiv.innerHTML = date.substring(18);
            }
            dateDiv.className = 'date';

            let since = comment.querySelector('.acomment-meta .time-since').innerHTML;
            let sinceDiv = createCustomElement('div');
			sinceDiv.innerHTML = since.substring(7);
            sinceDiv.className = 'since';

            if (!isNotRecent(date)) {
                row.classList.add('recent');
                counter++;
                counterCom++;
            }

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
            messageDiv.style.flex = '1 0 calc(100% - 40px)';
            messageDiv.style.whiteSpace = 'no-wrap';
            messageDiv.className = 'message';

            let temp = comment.id;
            temp = temp.substring(temp.lastIndexOf('-') + 1);
            row.setAttribute('data-id', temp);

            let avatarImg = comment.querySelector('.acomment-avatar img');
            row.style.backgroundImage = "url('" + avatarImg.src + "')";

            row.appendChild(authorDiv);
            row.appendChild(dateDiv);
            row.appendChild(sinceDiv);
            row.appendChild(messageDiv);

            if (groupName) {
                let groupDiv = createCustomElement('div');
                groupDiv.setAttribute('flag', 'group');
                groupDiv.innerHTML = groupName;
                row.appendChild(groupDiv);
            }

            let commentId = comment.id;
            row.onclick = () => {
                _isDynamicResizing = false;
                if (comment.offsetWidth <= 0 || comment.offsetHeight <= 0) {
                    activity.scrollIntoView();
                } else {
                    comment.scrollIntoView();
                }
				if (localStorage.getItem('message-menu-click-behaviour') === 'true') {
					wrapper.classList.toggle('on');
				}
                _isDynamicResizing = true;
                computeMaxHeightRecentMenu(root);
            }
            sortList.push(row);
        }
    }

    sortList.sort((a, b) => {
        if (a.getAttribute('data-id') > b.getAttribute('data-id')) {
            return -1;
        }
        if (a.getAttribute('data-id') < b.getAttribute('data-id')) {
            return 1;
        }
        // a doit être égal à b
        return 0;
    });
    var lastRecent = null;
    for (let e of sortList) {
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

    computeMaxHeightRecentMenu(root);

    wrapper.appendChild(root);

    var counterDiv = document.getElementById('history-counter');
    counterDiv.innerHTML = counter;
    var counterMsgDiv = document.getElementById('history-counter-msg');
    counterMsgDiv.innerHTML = counterMsg;
    var counterComDiv = document.getElementById('history-counter-comment');
    counterComDiv.innerHTML = counterCom;
}

var page = document.getElementById('page');
function createHistoryBtn(isActivated, isExpanded) {

    var wrapper = createCustomElement('div', 'history-wrapper');
    var btn = createCustomElement('div', 'history-btn');
    btn.className = 'ripple';
    btn.innerHTML = 'Messages Récents ';
    btn.onclick = (e) => {
        if (e.target !== btn) return;
        wrapper.classList.toggle('on');
		if (!wrapper.classList.contains('on')) {
			// close config pannel upon close menu
			let configBtn = document.getElementById('message-config-btn');
			configBtn.classList.remove('on');	
		}
    };

    if (isActivated) {
        wrapper.classList.add('on');
    }

    var counter = createCustomElement('span', 'history-counter');
    counter.title = 'Messages postés aujourd\'hui';
    var counterMsg = createCustomElement('span', 'history-counter-msg');
    var counterCom = createCustomElement('span', 'history-counter-comment');
    counterCom.title = 'Réponse postées aujourd\'hui';

    btn.appendChild(counter);
    wrapper.appendChild(buildMessageConfigBtn());
    wrapper.appendChild(btn);
    wrapper.appendChild(counterMsg);
    wrapper.appendChild(counterCom);
    page.prepend(wrapper);
}
if (window.self == window.top && document.body.querySelector('#buddypress .activity .activity_update')) {
    var autoDisplayEnabled = (localStorage.getItem('auto-display-message-menu') === 'true');
    createHistoryBtn(autoDisplayEnabled, true);
    generateHistory();
}
doWhenChildCreated(activities, () => {
    if (window.self != window.top) {
        return;
    }
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
});

window.addEventListener('scroll', function (e) {
    computeMaxHeightRecentMenu();
});

var offset = null;
var paddingTop = page.offsetTop;
function computeMaxHeightRecentMenu(menu) {
    if (!_isDynamicResizing) return;

    let reducingSize = Math.max(0, page.offsetTop - window.pageYOffset) + 40;
    if (offset != reducingSize) {
        if (!menu) {
            menu = document.getElementById('menu-recent');
        }
        menu.style.maxHeight = 'calc(100vh - ' + reducingSize + 'px)';
        offset = reducingSize;
    }
}

// fix : changer le libellé de publication de message "Mon profil" -> "Message publics"
var optionProfil = document.body.querySelector('#whats-new-post-in option:first-child');
if (optionProfil && optionProfil.innerHTML == 'Mon profil') {
    optionProfil.innerHTML = 'Message publics';
}

console.log('CUSTOM SCRIPT: END END');

if (window.self != window.top) {
    document.body.classList.add('in-iframe');
}

