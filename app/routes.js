'use strict';

const Router = require('koa-router');
const miscController = require('./controllers/misc');
const usersRouter = require('./routes/users.js');
const accountRouter = require('./routes/account.js');


const router = new Router();
router.get('/', miscController.getApiInfo);
router.get('/spec', miscController.getSwaggerSpec);
router.get('/status', miscController.healthcheck);
router.get('/data', miscController.getData);
router.use('/users',usersRouter);
router.use('/account',accountRouter);
module.exports = router;
