const config = require("./../config/index");
const jwt = require("jsonwebtoken");
const JwtUtil = {}
JwtUtil.generateToken = (data)=>{
    return jwt.sign(data,config.secret);
}
/**
 * 
 * @param {String} token 
 * @returns 
 */
JwtUtil.verify = (token) =>{
    try {
        return jwt.verify(token,config.secret);
        
    } catch (error) {
        return null;
    }
}
module.exports = JwtUtil;