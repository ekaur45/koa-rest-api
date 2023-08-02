const { Schema } = require("mongoose");
const companySchema = new Schema({
    name: String,
    catchPhrase: String,
    bs: String,
});
const geoSchema = new Schema({
    lat: String,
    lng: String,
});

const addressSchema = new Schema({
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: geoSchema
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: String,
    email: {type:String,required:[true,'Email is required'],unique:[true,'Email already taken.']},
    address:addressSchema,
    phone:String,
    website:String,
    company:companySchema
});

module.exports = userSchema;