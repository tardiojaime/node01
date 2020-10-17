var mongodb = require("mongoose");

mongodb.connect("mongodb://localhost:27017/mongodb1", {useNewUrlParser:true, useUnifiedTopology:true});

mongodb.set('useFindAndModify', true);
var Schema = mongodb.Schema;

var imgSchema = new Schema({
    title : {type:String, required:true}
});
var Imagen = mongodb.model("Imagen", imgSchema);

module.exports = Imagen;