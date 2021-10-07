var notes;
/**
 * fonction d'init de notre app bloc note
 */
function init() {
  //corps de declaration
  notes = new Notes();
  document.getElementById("jsLoaded").remove();

  document.querySelector("form").addEventListener("submit", submitNote);
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
  element.querySelector(".note-date").innerHTML = note.dateCreat.substring(0,10);
  element.querySelector(".note-titre").innerHTML = note.titre;
  element.querySelector(".note-priority").innerHTML = note.priority;
  element.querySelector(".note-expediteur-name").innerHTML = note.expediteur;
  element.querySelector(".note-destinataire-name").innerHTML =
    note.destinataire;
  element.querySelector(".note-content-right").innerHTML = note.description;
  element.querySelector(".note-date-post").innerHTML = note.dateCible.substring(0,10);

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
        <div class="note-titre"></div>\
        <img src="/img/fold.png" alt="" class="note-toggle">\
        <img src="/img/edit.png" alt="" class="note-edit">\
        <img src="/img/close.png" alt="" class="note-close">\
    </div>\
    <div class="note-header">\
        <div class="note-date"></div>\
        <div class="empty"></div>\
        <div class="note-priority"></div>\
    </div>\
    <div class="note-content">\
        <div class="note-content-left">\
            <div class="note-expediteur">\
                <img class="note-expediteur-img" src="" alt="">\
                <br/>\
                <span class="note-expediteur-name"></span>\
            </div>\
            <div class="note-datepost">Postée le <br><span class="note-date-post"></span></div>\
            <div class="note-destinataire">par :<br/><img class="note-destinataire-img" src="" alt="">\
                <br/>\
                <span class="note-destinataire-name"></span>\
            </div>\
        </div>\
        <div class="note-content-right"></div>\
</div>';

function submitNote(evt) {
  evt.preventDefault();
  var form = evt.target;
  var note = new Note();
  note.titre = form["form-title"].value;
  note.description = form["form-desc"].value;
  note.destinataire = form["form-dest"].value;
  note.priority = form["form-priority"].value;
  note.dateCible = form["form-date"].value+'T'+form["form-time"].value;
  notes.push(note);
  var listDOM = document.querySelector("#messages-list");
  listDOM.append(createElementNote(note));
  form.reset();
}
