function findExistedUser(email, cb){
    if(typeof cb !== "function") return;

    Users.findOne({email: email}).exec(function(err, user){
        if(err){
            cb("this user already existed" + err, user);
            return;
        }

            cb(err, user);
        
    });

}

module.exports= {

    showLoginUser: function (req, res){

        res.view("pages/loginUser");

    },

    showHomepage: function (req, res){

        res.view('pages/homepage') 

    },

    createUser: function (req, res){
        var email = req.param("email");
        var pwd = req.param("password");
        findExistedUser(email,function(err, user){

           if (user ){
               res.view("pages/signUp",{existingUserMsg: "This email is already being used"});
               console.log("This email is already being used", err) 
               return; 
            };

            Users.create({
                firstName:         req.param("first_name"),
                lastName:    req.param("last_name"),
                email:        req.param("email"),
                password:     req.param("password")
            }).exec(function(err, result){

                if(err){
                    // TODO: Send error message to view
                    res.view("pages/signUp",{err:"there was a problem creating the user Account"});
                    return console.log("there was a error creating the user Account", err)
                };

                res.redirect("/loginUser");

            });
            
        });
    },

    validateAccountUser: function (req, res){
        var pwd = req.param( "password");
        var email = req.param( "email");

        Users.findOne({email: email, password: pwd}).exec(function(err, user){

            if(err){
                res.view("pages/loginUser",{error: "something went wrong finding user to login in"});
                console.log("there was a error logining in ", err)
                return;
            }

            if(user){
                res.cookie('userId', user.id);
                res.redirect("/");
            }else{
                res.view("pages/loginUser",{unregisterUser: "the user has not been found"});
            }  
        });  
    },

    showUsersAdmin: function(req, res){
        
        Users.find().exec(function(err, user){
           res.view("pages/userAdmin",{User: user})

        });
    },

    showUserAdminEdit: function(req, res){
        var userId = req.param("IdUser")
        Users.findOne({id: userId}).exec(function(err, user){
        if(err){
            res.view("pages/userAdminEdit",{user: user});
            console.log("there was a error to show edit user view", err)
            return;  
        }

            res.view("pages/userAdminEdit",{user: user})

        });
    },

    userAdminEdit: function(req, res){
        var IdUser = req.param("IdUser");
        var name = req.param("Name");
        var lastName = req.param("lastName");
        var email = req.param("Email");
        var  isAdmin = req.param("isAdmin");
        if(typeof isAdmin === 'undefined'){
            isAdmin = false
          }else{
            isAdmin = true
        };

            Users.update({id: IdUser}).set({firstName: name, email: email, isAdmin: isAdmin, lastName: lastName}).exec(function(err){
                if(err){
                    res.redirect('/userAdmin');
                    console.log("there was a error to show edit user view", err)
                    return;  
                }

                res.redirect('/userAdmin');
            });
    }
}