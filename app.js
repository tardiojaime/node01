var express = require("express");
var bodyparser = require("body-parser");
var User = require("./models/user").User;
//var session = require("express-session");
var ruta_app = require("./routes");
var session_midd = require("./middlewares/session");
var methodoverride = require("method-override");
var cookieSession = require("cookie-session");

var app = express();

app.use(cookieSession({
    name : "session",
    keys : ['clave1', 'clave2']
}));
app.use(methodoverride("_method"));
//enlace para los archivos estaticos css, js, img
app.use('/app/style', express.static('public'));
app.use('/img', express.static('asset'));
//para obtener datos de un formulario
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//conexion con el motor de vistas jade
app.set('view engine', 'jade');
//ruta get
app.get('/login', function(req, resp){
    resp.render("home/index");
});

app.get('/', function (req, respuesta) {
    console.log(req.session.user_id);
    respuesta.render("firts/home");
});
app.get("/register", function(req, resp){
    resp.render("firts/register");
});
app.post('/saves', function (soli, resp) {
    var user = new User({
        name: soli.body.name,
        username: soli.body.username,
        age: soli.body.age,
        email: soli.body.email,
        password: soli.body.password,
        confirmation: soli.body.confirmation
    });
    //    console.log(user.confirmation);
    // save con collbarck
    //    user.save(function() {
    //        resp.send("Datos Guardados");
    //    })
    //****-- Promises */
    user.save().then(function (us) {
        resp.send("Guardamos los datos");
    }, function (err) {
        if (err) {
            console.log(String(err));
            resp.send("Error al guardar los datos");
        }
    })
})
app.post('/inits', function(req, resp){
    let user =  req.body.user;
    let pas = req.body.password;
    console.log("User: "+user + " Password: "+pas);
    User.findOne({username: user, password: pas}, function(err, data){
        if(!err){
            console.log(data);
            req.session.user_id = data._id;
            resp.redirect("/app");
        }else{
            resp.send("/login");
        }
    })
});
// Rutes
app.use('/app', session_midd);
app.use("/app", ruta_app);

app.listen(8080);