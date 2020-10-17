var Imagen  =  require("../models/imagenes");
//var check = require("./img_permission");
module.exports = function(req, resp, next){
    Imagen.findById(req.params.id)
        .populate("creator")
        .exec(function(err, image){
        if(image !=null){
            console.log("datos optenidos "+image.title);
            resp.locals.img = image;
            next();
        }else{
            resp.redirect("/app");
        }
    })
}
