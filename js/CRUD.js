var CRUD = function (RestAdress) {
  var _xhrCall = function (callback,method, ressourceName, id, jsonObjString) {
    var xhr = new XMLHttpRequest();
    xhr.open(method,RestAdress+ressourceName+(id!==undefined?'/'+id:''));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function (evt) {
        if(xhr.readyState < XMLHttpRequest.DONE){return;}
        if(xhr.status!==200 && xhr.status!==201){console.log('error : '+xhr.statusText); return;}
        //execution de la fonction de traitement du resultat
        callback(xhr.response);
    };
    xhr.send(jsonObjString);
  };
  /**
   * fonction pour appel http method GET
   * @param {Function} callback fonction de traitement
   * @param {String} ressourceName nom de la ressource commencant par '/'
   * @param {number|undefined} id id de la ressource (facultatif)
   */
  this.GET = function (callback, ressourceName, id) {
    _xhrCall(callback,'GET', ressourceName, id);
  };
   /**
   * fonction pour appel http method DELETE
   * @param {Function} callback fonction de traitement
   * @param {String} ressourceName nom de la ressource commencant par '/'
   * @param {number|undefined} id id de la ressource (facultatif)
   */
  this.DELETE = function(callback, ressourceName, id){
    _xhrCall(callback,'DELETE', ressourceName, id);
  };
   /**
   * fonction pour appel http method PUT (remplacement de ressource)
   * @param {Function} callback fonction de traitement
   * @param {String} ressourceName nom de la ressource commencant par '/'
   * @param {Number|undefined} id id de la ressource (facultatif)
   * @param {Object} obj objet JS a envoyer
   */
  this.PUT = function(callback, ressourceName, id,obj){
    _xhrCall(callback,'PUT', ressourceName, id, JSON.stringify(obj));
  };
  /**
   * fonction pour appel http method PATCH (fusion de ressource existant /envoyée)
   * @param {Function} callback fonction de traitement
   * @param {String} ressourceName nom de la ressource commencant par '/'
   * @param {Number|undefined} id id de la ressource (facultatif)
   * @param {Object} obj objet JS a envoyer
   */
  this.PATCH = function(callback, ressourceName, id,obj){
    _xhrCall(callback,'PATCH', ressourceName, id, JSON.stringify(obj));
  };
  /**
   * fonction pour appel http method POST (remplacement de ressource)
   * @param {Function} callback fonction de traitement
   * @param {String} ressourceName nom de la ressource commencant par '/'
   * @param {Object} obj objet JS a envoyer
   */
  this.POST = function(callback, ressourceName,obj){
    _xhrCall(callback,'POST', ressourceName, undefined, JSON.stringify(obj));
  };
};
var crud=new CRUD(REST_SERVER_ADR);
// crud.GET(function(resp){console.log(resp);},'/notes');
// crud.GET(function(resp){console.log(resp);},'/notes',0);