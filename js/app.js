var restCrud = new CRUD(REST_SERVER_ADR);
/**
 * instance de tableau de users
 */
var users = [];
function initUsers(callback) {
    restCrud.GET(function (resp) {
        var liste=JSON.parse(resp);
        liste.forEach(function(e,i){
            users.push(new User(e.name,e.img,e.id));
        })
        console.log(users);
        if (callback) {
          callback();
        }
      }, "/users");
}
initUsers();
/**
 * instance de manager des notes
 */
var notes = new Notes();
function initNotes(callback) {}
/**
 * model textuel html d'une note
 */
var noteModel = null;
function initModel(callback) {
  var crud = new CRUD(VIEW_DIRECTORY);
  crud.GET(function (resp) {
    noteModel = '<div id="note-" class="note">' + resp + "</div>";
    console.log(noteModel);
    if (callback) {
      callback();
    }
  }, "/note.html");
}
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
  document.querySelector("form").addEventListener("submit", onsubmitnote);
  document
    .querySelector("#form-title")
    .addEventListener("change", onchangevalue);
  document
    .querySelector("#form-desc")
    .addEventListener("change", onchangevalue);
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

  element.querySelector(".note-destinataire-name").innerHTML = note.destinataire
    ? destinataire.name
    : "tout le monde";

  //udt de la source de limage
  element.querySelector(".note-destinataire-img").src = note.destinataire
    ? destinataire.img
    : "/img/robot.png";

  element.querySelector(".note-content-right").innerHTML = note.description;
  element.querySelector(".note-date-post").innerHTML = note.dateCible;

  //mise en place des event pour cette element
  addNoteEvent(element);
  //retour de l'element completement rempli
  return element;
}

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

/**
 * fonction de soumission du formulaire d'une note
 * @param {SubmitEvent} evt evenement qui a declencher la fonction
 */
function onsubmitnote(evt) {
  evt.preventDefault();
  var auMoinsUnChampsInvalid = false;
  //pas interessant dans notre cas de submit car pas de declenchement en cascade de "submit"
  //evt.stopPropagation();
  console.log(evt.target, evt);
  var note = new Note();
  if (evt.target["form-title"].value.length <= 2) {
    evt.target["form-title"].classList.add("invalid");
    auMoinsUnChampsInvalid = true;
  }
  note.titre = evt.target["form-title"].value;

  if (evt.target["form-desc"].value.length <= 2) {
    evt.target["form-desc"].classList.add("invalid");
    auMoinsUnChampsInvalid = true;
  }
  note.description = evt.target["form-desc"].value;

  note.priority = evt.target["form-priority"].value;
  //correlation des info d'unuser en fonction de la selection
  var destinataire = users.find(function (unUserDuTableau) {
    return unUserDuTableau.getId() === Number(evt.target["form-dest"].value);
  });
  note.destinataire = destinataire;

  note.dateCible =
    evt.target["form-date"].value + "T" + evt.target["form-time"].value;
  //lib de formatage et parsing de date / time
  note.dateCreat = moment().format("YYYY-MM-DDTHH:MM");
  console.log(note);
  if (!auMoinsUnChampsInvalid) {
    document.querySelector("#messages-list").append(createElementNote(note));
  }
}
/**
 * fonction de suppression d'invalid class lors d'un change
 * @params {InputEvent} evt event declencheur
 */
function onchangevalue(evt) {
  evt.target.classList.remove("invalid");
}
