var express = require("express");
var bodyparser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var app = express();

app.use(session({
    secret: "1215gdfg54tyrty",
    //modifica la session
    resave: false,
    saveUninitialized: false
}));
//enlace para los archivos estaticos css, js, img
app.use('/style', express.static('public'));
app.use('/img', express.static('asset'));
//para obtener datos de un formulario
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//conexion con el motor de vistas jade
app.set('view engine', 'jade');
//ruta get
app.get('/login', function(req, resp){
    resp.render("firts/login");
})
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
        console.log(data);
        req.session.user_id = data._id;
        resp.send("Datos encontrados");
    })
});

app.listen(8080);