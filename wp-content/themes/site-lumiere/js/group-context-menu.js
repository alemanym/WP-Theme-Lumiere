window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  
  (function($) {
      
      if (window.mobileCheck()) {
          return;
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
          addlAchimieMenu(this);
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
          const noteTitle = '15 novembre 2020';
          const iconHTML = '<i class="fas fa-play-circle"></i>';
          const expanded = true;
          //-- add content
          const noteData = [
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
          ];
          addGroupNote(parentPane, noteTitle, noteName, iconHTML, noteData, expanded);
      }
      
      function addElevationMenu(parentPane) {
          const noteName = 'meditations';
          const noteTitle = 'Elévation';
          const iconHTML = '<div class="group-meditation-ico"></div>';
          //-- add content
          const noteData = [
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
          const noteName = 'meditations';
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
                          Vous êtes assis en cercle sur une plate forme ronde et dorée.<br />
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
      
      function addlAchimieMenu(parentPane) {
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
          const currentMeditationDate = '12 nov. 2020';
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
  
  })( jQuery );
  