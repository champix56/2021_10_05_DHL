/**
 * fonction d'init de notre app bloc note
 */
function init() {
  //corps de declaration
  // document.getElementById('jsLoaded').remove();

  var jsl = document.getElementById("jsLoaded");
  jsl.style.backgroundColor = "skyblue";
  jsl.innerHTML = "Js bien chargé";
  
  
  var note0 = document.querySelector("#note-0");
  addNoteEvent(note0);
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



