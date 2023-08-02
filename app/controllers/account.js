const { AccountModel } = require("../models");
const { generateToken } = require("../utils/jwt");
const Response = require("../utils/response");

const Account = {};
/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.getAllAccounts = async ctx =>{}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.addAccount= async ctx =>{
    try {        
        await AccountModel.validate(ctx.request.body);
    } catch (error) {        
        return Response.badRequest(ctx,{data:error});
    }
    let d = ctx.request.body;
    d["password"] = require("bcrypt").hashSync(d["password"],10);
    const result = await AccountModel.create(ctx.request.body);
    const data = result.toObject();
    data["token"] = generateToken(data);
    Response.ok(ctx,{data:data});
}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.bulkAddAccounts= async ctx =>{}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.getAccountById= async ctx =>{}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.updateAccount= async ctx =>{}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.deleteAccount= async ctx =>{}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.login= async ctx =>{
    const {email,password} = ctx.request.body;
    let account = await AccountModel.findOne({"email":email},["email","name","password"]);
    if(account){
        let d = account.toObject();
        if(require("bcrypt").compareSync(password,d["password"])){
            delete d.password;
            d["token"] = generateToken(d);
            return Response.ok(ctx,{data:d});
        }
    }
    return Response.error(ctx,{});
    
}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
Account.getMyAccount = async ctx =>{
    return Response.ok(ctx,{data:ctx.state.tokenPayload});
}
module.exports = Account;