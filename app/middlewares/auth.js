const { verify } = require("../utils/jwt");
const Response = require("../utils/response");
/**
 * 
 * @param {Array<string>} roles 
 * @returns 
 */
const checkAuth = function(roles = []){
    /**
     * 
     * @param {import("koa").Context} ctx 
     * @param {import("koa").Next} next 
     */
    return function (ctx,next){
        console.log("Here");
        if(ctx.query.token || ctx.request.headers["authorization"] || ctx.request.headers["x-auth-header"]){
            let token = ctx.query.token || ctx.request.headers["authorization"] || ctx.request.headers["x-auth-header"];
            if(token.toLowerCase().startsWith("bearer")){
                token = token.split(' ').at(-1).trim();
            }
            let payload = verify(token);
            if(payload){
                ctx.state.tokenPayload = payload;
                return next();
            }
        }
        Response.unauthorized(ctx);
    }
}
module.exports = {checkAuth};