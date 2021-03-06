var restCrud = new CRUD(REST_SERVER_ADR);
/**
 * model textuel html d'une note
 */
var noteModel = undefined;
function initNoteModel(callback) {
  var htmlCrud = new CRUD(VIEW_DIRECTORY);
  htmlCrud.GET(function (resp) {
    console.log(resp);
    noteModel = resp;
    if (callback) callback();
  }, "/note.html");
}
var users = [];
function initUsersData(callback) {
  restCrud.GET(function (resp) {
    var us = JSON.parse(resp);
    console.log(resp);
    us.forEach(function (unUserDeListe) {
      users.push(
        new User(unUserDeListe.name, unUserDeListe.img, unUserDeListe.id)
      );
    });
    callback();
    console.log(users);
  }, "/users");
}
var notes = new Notes();
function initNotesDatas(callback) {
  restCrud.GET(function (resp) {
    var objetFromJsonStr = JSON.parse(resp);
    objetFromJsonStr.forEach(function (noteDeListe) {
      var noteTmp = new Note();
      Object.assign(noteTmp, noteDeListe);
      noteTmp.destinataire = users.find(function (e) {
        return e.getId() === noteTmp.destinataireId;
      });
      noteTmp.expediteur = users.find(function (e) {
        return e.getId() === noteTmp.expediteurId;
      });
      // delete noteTmp.destinataireId;
      // delete noteTmp.expediteurId;
      console.log(noteTmp);
      notes.push(noteTmp);
    });
    if (callback) {
      callback();
    }
  }, "/notes");
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
  initUsersData(function () {
    initSelectUsers(users);
    initNotesDatas(function () {
      initNoteModel(function () {
        refreshListMessages();
      });
    });
  });
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
    var noteId=Number(note.id.substring(5));//note-{id}
    restCrud.DELETE(function(){
        notes.deleteById(noteId);
        note.remove();
    },'/notes',noteId);
  });
  //event du toggle
  note.querySelector(".note-toggle").addEventListener('click',function(evt){
    var content=note.querySelector(".note-content");
    if(content.style.display==='none'){
      content.style.display='flex';
      evt.target.src='./img/fold.png';
    }
    else{
      content.style.display='none';
      evt.target.src='./img/unfold.png';
    }
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
    ? note.destinataire.name
    : "tout le monde";

  //udt de la source de limage
  element.querySelector(".note-destinataire-img").src = note.destinataire
    ? note.destinataire.img
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
  note.destinataireId=Number(evt.target["form-dest"].value);
  var destinataire = users.find(function (unUserDuTableau) {
    return unUserDuTableau.getId() === note.destinataireId;
  });
  note.destinataire = destinataire;
  
  note.expediteurId=0;
  note.expediteur = users.find(function (unUserDuTableau) {
    return unUserDuTableau.getId() === note.expediteurId;
  });
  note.dateCible =
    evt.target["form-date"].value + "T" + evt.target["form-time"].value;
  //lib de formatage et parsing de date / time
  note.dateCreat = moment().format("YYYY-MM-DDTHH:MM");
  console.log(note);
  if (!auMoinsUnChampsInvalid) {
    var note4Rest=JSON.parse(JSON.stringify(note));
    delete note4Rest.expediteur;
    delete note4Rest.destinataire;
    restCrud.POST(function(resp){
      note.id=JSON.parse(resp).id;
      document.querySelector("#messages-list").append(createElementNote(note));
    },'/notes',note4Rest);  
  }
}
/**
 * fonction de suppression d'invalid class lors d'un change
 * @params {InputEvent} evt event declencheur
 */
function onchangevalue(evt) {
  evt.target.classList.remove("invalid");
}
