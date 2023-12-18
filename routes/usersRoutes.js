var express = require('express');
var usersCtrl = require('../controllers/usersController');

exports.router = (function(){
    var apiRouter = express.Router();
    apiRouter.route('/users/').get(usersCtrl.getAllUsers);
    apiRouter.route('/user/:idUser').get(usersCtrl.getAnUserById);
    apiRouter.route('/createUser').post(usersCtrl.createUser);
    apiRouter.route('/updateUser').put(usersCtrl.updateUser);
    apiRouter.route('/deleteUser/:idUser').delete(usersCtrl.deleteUser);
return apiRouter;
})();

