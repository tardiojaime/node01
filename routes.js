var express = require("express");
var Imagen = require("./models/imagenes");

var route = express.Router();

route.get('/', function(req, resp){
    resp.render("app/home");
});
//new form
route.get('/imagenes/new', function(req, resp){
    resp.render("app/img/new");
});
route.get('/imagenes/:id/edit', function(req,resp){
    Imagen.findById(req.params.id, function(err, img){
        resp.render("app/img/edit", {img:img});
    });
});
// rest
route.route('/imagenes/:id')
    .get(function(req, resp){
        Imagen.findById(req.params.id, function(err, img){
            resp.render("app/img/show", {img: img});
        })
    })
    .put(function(req, resp){
        Imagen.findById(req.params.id, function(err, img){
            img.title = req.body.titulo;
            img.save().then(function(us){
                resp.render("app/img/show", {img:img})
            }, function(err){
                resp.send("Datos erroneos");
            })
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
            Imagen.find({}, function(err, data){
                if(err){
                    resp.redirect("/app"); return;
                }
                resp.render("app/img/index", {img: data});
            })
        })
        .post(function(req, resp){
            var data = {
                title : req.body.titulo
            }
            var Imag = new Imagen(data);
            Imag.save(function(err){
                if(!err){
                    resp.redirect('/app/imagenes/'+Imag._id);
                }else{
                    resp.render(err);
                }
            })
        });

module.exports = route;