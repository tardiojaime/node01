//middleware
var User = require("../models/user").User;
module.exports = function(req, resp, next){
    if(!req.session.user_id){
        resp.redirect("/login")
    }else{
        User.findById(req.session.user_id, function(err, user){
            if(err){
                console.log(err);
                resp.redirect('/login');
            }else{
                resp.locals = {user : user};
                next();
            }
        });
    }
};