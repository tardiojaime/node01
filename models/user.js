var mongo = require("mongoose");

mongo.connect("mongodb://localhost/mongodb1");

var Schema = mongo.Schema;

var userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
    email: String,
    date_of_birth: Date
});

userSchema.virtual("confirmation").get(function() {
    return this.c_p;
}).set(function(password) {
    this.c_p = password;
})

var User = mongo.model("User", userSchema);
module.exports.User = User;