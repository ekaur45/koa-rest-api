"use strict"
const Router = require("koa-router");
const userRouter = new Router();
const controller = require('./../controllers/users.js');
userRouter.get('/',controller.getAllUsers);
userRouter.post('/',controller.addUser);
userRouter.post('/bulk-add',controller.bulkAddUser);
userRouter.get('/get/:id',controller.getUserById);
userRouter.put('/update/:id',controller.updateUser);
userRouter.delete('/delete/:id',controller.deleteUser);
module.exports = userRouter.routes();