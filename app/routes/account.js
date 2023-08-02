"use strict"
const Router = require("koa-router");
const accountRouter = new Router();
const controller = require('./../controllers/account.js');
const { checkAuth } = require("../middlewares/auth.js");
accountRouter.get('/',controller.getAllAccounts);
accountRouter.post('/',controller.addAccount);
accountRouter.post('/login',controller.login);
accountRouter.post('/bulk-add',controller.bulkAddAccounts);
// accountRouter.get('/get/:id',controller.getAccountById);
accountRouter.put('/update/:id',controller.updateAccount);
accountRouter.delete('/delete/:id',controller.deleteAccount);
accountRouter.get('/get',checkAuth(),controller.getMyAccount)
module.exports = accountRouter.routes();