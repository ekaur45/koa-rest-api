const { Schema } = require("mongoose");
const userSchema = require("./user.model");
const accountSchema = new Schema({
   password:String
});
accountSchema.add(userSchema);
module.exports = accountSchema;