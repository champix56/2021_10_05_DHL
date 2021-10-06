function init() {
  document.getElementById("jsLoaded").remove();
//   document.getElementById("jsLoaded").style.backgroundColor = "skyblue";
//   document.getElementById("jsLoaded").innerHTML = "Js bien chargé";
}
init();

function addNoteListeners(note){
    note.querySelector('img.note-toggle').addEventListener('click',function(evt){
        var content=note.querySelector('.note-content');
        content.style.display=content.style.display==='none'?'flex':'none';
    });
    note.querySelector('img.note-close').addEventListener('click',function(evt){
        note.remove()
    });
}
addNoteListeners(document.querySelector('#note-0'))