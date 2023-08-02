const mongoose = require("mongoose");
const userSchema = require("./user.model");
const accountSchema = require("./account.model");
const Models = {};
Models.User = mongoose.model("User",userSchema);
Models.AccountModel= mongoose.model("Account",accountSchema);
module.exports = Models;