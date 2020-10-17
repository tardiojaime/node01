var Imagen = require("../models/imagenes");
module.exports = function(image,req, resp){

    if(req.method == "GET" && req.path.indexOf("edit") < 0){
        return true;
    }

    if(typeof image.creator == "undefined") return false;

    if(image.creator._id.toString() == resp.locals.user._id){
        return true;
    }
    return false;
}