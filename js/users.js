'use strict';
/**
 * objet d'un user
 * @param {string} name nom du user
 * @param {URL} img chemin de l'image
 * @param {number|undefined} id id du user si existant
 */
//ab=123;
var User=function (name,img,id) {
    var _id=id;
    this.name=name;
    this.img=img;
    this.getId=function () {
        return _id;
    }
}
var users=[];
users.push(new User('pierre','/img/users/2.jpg',2));
users.push(new User('paul','/img/users/3.jpg',3));
users.push(new User('jacques','/img/users/1.jpg',1));
