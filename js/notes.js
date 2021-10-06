var Note =function()
{
    this.destinataire='';
    this.expediteur='';
    this.description='';
    this.dateCreat=new Date();
    this.dateCible=new Date();
    this.priority='LOW';
    this.titre='';   
}
var Notes=function(){
    var _liste=[];
    /*
    this.push=_liste.push;
    */
    /**
     * push dans l'array
     * @param {Note} obj objet a pousser dans la liste
     * @returns {number} length de la liste apres push
     */
    this.push=function(o){
        //controlle de l'instance du parametre dentree
        if(o instanceof Note)
        {
            return _liste.push(o);
        }
        else return _liste.length;
    }

    this.find=function(titre){
       return _liste.find(function(elementDeListe){
            return elementDeListe.titre===titre
        });
    }
    /**
     * Fonction de recuperation d'un element
     * @param {number} index position dans la liste
     */
    this.get=function(index){
        return _liste[index];
    }
}
var notes = new Notes();