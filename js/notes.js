/**
 * Object Note
 * @param {string} exp expediteur
 * @param {string} dest destinataire
 * @param {string} desc description de la note
 * @param {string} dateCrea date de creation
 * @param {string} dateExe date cible de la note
 * @param {string} titre titre de la note
 * @param {string} priority priorité de la note
 */
function Note(exp,dest,desc,dateCrea,dateExe,titre,priority){
    var _exp=exp,_desc=desc,_dateCrea=dateCrea,_dateExe=dateExe,_titre=titre,_priority=priority;
    /**
     * maj du titre de la note
     * @param {string} titre 
     */
    function _updateTitre(titre){
        _titre=titre;
    }
    //exposition pubilc d'une fonction privée
    this.setTitre=_updateTitre;
    //declaration public d'une fonction
    this.setPriority=function(priority){
        _priority=priority;
    };
    //getter
    this.getExpediteur=function(){
        return _exp;
    };
    //setter
    this.setExpediteur=function(exp){
        _exp=exp;
    };
    //moddif d'un champs public depuis l'interrieurde l'instance de l'objet
    this.AddCiviliteToDestinataire=function(civ){

        this.destinataire=civ+' '+this.destinataire;
    }
    //moddif. et lecture depuis l'exterieur controle
    this.destinataire=dest;
    
    this.toJson=function(){
        return '{"expediteur":"'+_exp+'", "dest":"'+_dest+'", "desc":"'+_desc+'", "titre":"'+_titre+'", "priority":"'+_priority+'"}';
    }
}
var note=new Note('moi','toi','cdzszd');
var note2=new Note('Le grand Duc','Roi','cdzszd');

//surcharge de champs public de toutes les instance 
Note.prototype.maValeur=1234;
Note.prototype.showMavaleur=function(){
    console.log(this.maValeur);
};
//disponible pour tt les instance s'appuyant sur l'objet Note
note.showMavaleur();
note.maValeur;
note2.showMavaleur();
note2.maValeur;