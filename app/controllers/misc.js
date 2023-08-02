'use strict';

const os = require('os');
const pkginfo = require('../../package.json');
const spec = require('../spec');


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *     - misc
 *     - public
 *     summary: Get a general API information.
 *     operationId: getApiInfo
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               name: 'koa-rest-api-boilerplate'
 *               version: 'v2.0.0'
 *               description: 'Boilerplate for Koa RESTful API application with Docker, Swagger, Jest, Coveralls, and Circle CI'
 *               environments:
 *                 nodeVersion: '10.15.0'
 *                 hostname: 'my-pc'
 *                 platform: 'darwin/x64'
 */
exports.getApiInfo = ctx => {
  // BUSINESS LOGIC
  const environments = {
    nodeVersion: process.versions['node'],
    hostname: os.hostname(),
    platform: `${process.platform}/${process.arch}`
  };
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    environments
  };

  ctx.body = data;
};

/**
 * @swagger
 * /spec:
 *   get:
 *     tags:
 *     - misc
 *     - public
 *     summary: Get Open API Specification.
 *     operationId: getSwaggerSpec
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: Describe Swagger Open API Specification
 */
exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};

/**
 * @swagger
 * /status:
 *   get:
 *     tags:
 *     - misc
 *     - public
 *     summary: Provide a detailed information about the service health.
 *     operationId: getSwaggerSpec
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: Healthy Service
 *         content:
 *           application/json:
 *             example:
 *               status: 'pass'
 */
exports.healthcheck = async ctx => {
  var mongoose = require('mongoose');
  await mongoose.connect('mongodb+srv://db-mongodb-nyc1-51183-107aa92a.mongo.ondigitalocean.com',{dbName:'admin',user:'doadmin',pass:'mG3258R4Hr6Xq07V'});
  var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
 
 var Person = mongoose.model("Person", personSchema);
  // TODO: Improve healthcheck logic
  // status: ['pass', 'fail', 'warn']
  
  var newPerson = new Person({
    name: "John",
    age: 102,
    nationality: "American"
 });
 await newPerson.save();
//  newPerson.save(function(err, res) {
//   if(err)
//      self.render('show_message', 
//         {message: "Database error", type: "error"});
//   else
//      self.render('show_message', 
//         {message: "New person added", type: "success", person: personInfo});
// });
let res = await Person.find({});
   //console.log(res.toArray());
//Person.find({},(err,res)=>{
  ctx.body = res;
//})
};


/**
 * @swagger
 * /data:
 *   get:
 *     tags:
 *     - misc
 *     - public
 *     summary: Provide a detailed information about the service health.
 *     operationId: getSwaggerSpec
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: Healthy Service
 *         content:
 *           application/json:
 *             example:
 *               status: 'pass'
 */
exports.getData = async ctx =>{
  var mongoose = require('mongoose');
  await mongoose.connect('mongodb+srv://db-mongodb-nyc1-51183-107aa92a.mongo.ondigitalocean.com/myapp');
  ctx.data = {};
}