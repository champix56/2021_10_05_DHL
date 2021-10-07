/**
 * Objet de conteneur de datas pour une note unique
 */
 var Note =function()
{
    this.id=undefined;
    this.destinataire='';
    this.expediteur='';
    this.description='';
    this.dateCreat=moment().format('YYYY-MM-DDTHH:MM');
    this.dateCible=moment().format('YYYY-MM-DDTHH:MM');
    this.priority='LOW';
    this.titre='';   
}
/**
 * Objet de manipulation de liste de notes controller
 */
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

    /**
     * fonction de recherche d'une note en fonction du titre
     * @param {string} titre titre absolue de la note a chercher 
     * @returns {Note|null} note trouvée ou null si pas dans la liste 
     */
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
    this.length=function(){return _liste.length;}
}