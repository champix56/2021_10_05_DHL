var notes = new Notes();
/* creation d'une liste de note remplis avec des valeurs par defult pour toutes les notes ajoutées*/
var n = new Note();
n.titre = "demat breizh";
n.description = "oh breizh ma bro";
notes.push(n);
notes.push(new Note());
notes.push(new Note());
notes.push(new Note());
notes.push(new Note());
notes.push(new Note());
notes.push(new Note());

/**
 * fonction d'init de notre app bloc note
 */
function init() {
  //corps de declaration
  // document.getElementById('jsLoaded').remove();

  var jsl = document.getElementById("jsLoaded");
  jsl.style.backgroundColor = "skyblue";
  jsl.innerHTML = "Js bien chargé";

  initSelectUsers(users);
}

init();

/**
 * Fonction d'ajout des evenements d'une note
 * @param {Element} note une note unique
 * @returns {undefined} pas de retour
 */
function addNoteEvent(note) {
  var closeButton = note.querySelector(".note-close");
  closeButton.addEventListener("click", function (evt) {
    note.remove();
  });
}

function refreshListMessages() {
  var listDOM = document.querySelector("#messages-list");
  listDOM.innerHTML = "";

  for (var i = 0; i < notes.length(); i++) {
    var e = createElementNote(notes.get(i));
    listDOM.append(e);
  }
}
/**
 * creation d'un html Element a partir des datas d'un note
 * @param {Note} note instance d'objet note pour la creation DOM d'une note
 * @returns {HTMLElement} element div constitué du contenu d'une note
 */
function createElementNote(note) {
  //verif. que note est bien une 'Note' sinon retour null, creation impossible
  if (!(note instanceof Note)) return null;

  //creation du conteneur div principale pour une note a partir d'un model
  var element = document.createElement("div");
  element.className = "note";
  element.id = "note-" + note.id;
  element.innerHTML = noteModel;

  //remplissage des valeurs d'une note passée en parametre de la fonction
  element.querySelector(".note-date").innerHTML = note.dateCreat;
  element.querySelector(".note-titre").innerHTML = note.titre;
  element.querySelector(".note-priority").innerHTML = note.priority;
  element.querySelector(".note-expediteur-name").innerHTML = note.expediteur;
  element.querySelector(".note-destinataire-name").innerHTML =
    note.destinataire;
  element.querySelector(".note-content-right").innerHTML = note.description;
  element.querySelector(".note-date-post").innerHTML = note.dateCible;

  //mise en place des event pour cette element
  addNoteEvent(element);
  //retour de l'element completement rempli
  return element;
}
/**
 * model textuel html d'une note
 */
var noteModel =
  '\
    <div class="note-buttons">\
        <div class="empty"></div>\
        <img src="/img/fold.png" alt="" class="note-toggle">\
        <img src="/img/edit.png" alt="" class="note-edit">\
        <img src="/img/close.png" alt="" class="note-close">\
    </div>\
    <div class="note-header">\
        <div class="note-date"></div>\
        <div class="note-titre"></div>\
        <div class="note-priority"></div>\
    </div>\
    <div class="note-content">\
        <div class="note-content-left">\
            <div class="note-expediteur">\
                <img class="note-expediteur-img" src="" alt="">\
                <br/>\
                /<span class="note-expediteur-name"></span>\
            </div>\
            <div class="note-datepost">Postée le <br><span class="note-date-post"></span></div>\
            <div class="note-destinataire"><img class="note-destinataire-img" src="" alt="">\
                <br/>\
                /<span class="note-destinataire-name"></span>\
            </div>\
        </div>\
        <div class="note-content-right"></div>\
</div>';
/**
 * initialisation du select pour les destinataire
 * @param {Array} users liste des users a charger
 */
function initSelectUsers(users) {
  var selectDest = document.querySelector("#form-dest");
  //vidange avec function es6 et preservation de l'option avec value a -1
  var children = selectDest.querySelectorAll("*");
  children.forEach((opt, i) => {
    if (opt.value !== "-1") {
      opt.remove();
    }
  });
  //remplissage
  users.forEach(function (user, i) {
    var opt = document.createElement("option");
    opt.value = user.getId();
    opt.innerHTML = user.name;
    selectDest.append(opt);
  });
}
