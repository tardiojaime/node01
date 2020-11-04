var express = require("express");
var Imagen = require("./models/imagenes");
var find_imagenes = require("./middlewares/find_image");

var route = express.Router();

route.get('/', function(req, resp){
    resp.render("app/home");
});
//cerrar session
route.post("/salir", function(req, resp){
    req.session = null;
    resp.redirect("app");
});
//new form
route.get('/imagenes/new', function(req, resp){
    resp.render("app/img/new");
});
// Enlace al middleware
route.all("/imagenes/:id*", find_imagenes);

route.get('/imagenes/:id/edit', function(req,resp){
    resp.render("app/img/edit");
});
// rest
route.route('/imagenes/:id')
    .get(function(req, resp){
        resp.render("app/img/show");
    })
    .put(function(req, resp){
        resp.locals.img.title = req.body.titulo;
        resp.locals.img.save().then(function(us){
            resp.render("app/img/show")
        }, function(err){
            resp.send("Datos erroneos");
        })
    })
    .delete(function(req, resp){
        Imagen.findOneAndRemove({_id:req.params.id}, function(err){
            if(!err){
                resp.redirect("app/imagenes");
            }else{
                console.log(err);
                resp.redirect("app/imagenes/"+req.params.id);
            }
        })
    });
    route.route('/imagenes')
        .get(function(req, resp){
            Imagen.find({creator: resp.locals.user._id}, function(err, data){
                if(err){
                    resp.redirect("/app"); return;
                }
                resp.render("app/img/index", {img: data});
            })
        })
        .post(function(req, resp){
            let imag = {
                title: req.body.titulo,
                creator: resp.locals.user._id
            };
            let image  = new Imagen(imag);
            image.save().then(function(img){
                resp.redirect("imagenes");
            }, function(err){
                console.log(String(err));
                resp.send("Datos no guardados");
            })
            
        });

module.exports = route;