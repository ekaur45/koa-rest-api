const { default: mongoose } = require("mongoose");
const { User } = require("../models");
const Response = require("../utils/response");
/**
 * 
 * @param {import("koa").Context} ctx 
 */
const getAllUsers = async ctx =>{    
    let count = await User.count();
    let limit = ctx.request.query.limit??5;
    let skip = ctx.request.query.page ? Number(ctx.request.query.page) * Number(limit) : 0;
    let users = await User.find({},{},{skip,limit});
    Response.ok(ctx,{data:{users:users,count:count}});
}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
const addUser = async ctx =>{    
    let data = ctx.request.body;
    try {
        await User.create(data);
        Response.created(ctx);
    } catch (error) {
        Response.internalServerError(ctx,{data:error})
    }
}


/**
 * 
 * @param {import("koa").Context} ctx 
 */
const bulkAddUser = async ctx =>{    
    let data = ctx.request.body;
    try {
        await User.create(data);
        Response.created(ctx);
    } catch (error) {
        Response.internalServerError(ctx,{data:error})
    }
}


/**
 * 
 * @param {import("koa").Context} ctx 
 */
const getUserById = async ctx =>{    
    //Response.ok(ctx,{data:ctx.params.id});
    try {
        let user = await User.findOne({"_id":new mongoose.Types.ObjectId(ctx.params.id)});
    Response.ok(ctx,{data:user});
    } catch (error) {
        ctx.body = error;
    }
}

/**
 * 
 * @param {import("koa").Context} ctx 
 */
const updateUser = async ctx =>{    
    //Response.ok(ctx,{data:ctx.params.id});
    try {
        let user = await User.updateOne({"_id":ctx.params.id},{$set:ctx.request.body});
        Response.ok(ctx,{data:user});
    } catch (error) {
        ctx.body = error;
    }
}


/**
 * 
 * @param {import("koa").Context} ctx 
 */
const deleteUser = async ctx =>{    
    //Response.ok(ctx,{data:ctx.params.id});
    try {
        let user = await User.findByIdAndDelete({"_id":ctx.params.id});
        Response.ok(ctx,{data:user});
    } catch (error) {
        ctx.body = error;
    }
}

module.exports = {getAllUsers,addUser,getUserById,updateUser,deleteUser,bulkAddUser};