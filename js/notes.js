function Note(){
    var _exp,_dest,_desc,_dateCrea,_dateExe,_titre,_priority;
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
    }
    //getter
    this.getExpediteur=function(){
        return _exp;
    };
    //setter
    this.setExpediteur=function(exp){
        _exp=exp;
    };
    
    //moddif. et lecture depuis l'exterieur controle
    this.destinataire=_dest;
    
    this.toJson=function(){
        return '{"expediteur":"'+_exp+'", "dest":"'+_dest+'", "desc":"'+_desc+'", "titre":"'+_titre+'", "priority":"'+_priority+'"}';
    }
}
var note=new Note();
