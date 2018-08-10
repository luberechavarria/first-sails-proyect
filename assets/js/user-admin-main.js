      
    function deleteUserAdmin(IdUser){
        $.post("/userAdminDelete/" + IdUser, function(data){
            console.log("lubeeer",data)
            if (data == "OK") {
                $("#userItem-" + IdUser).remove();
              
            // } else {
    
            //     if (counter == 0) {
            //         $("#msg-notAllowed").html(data.msg);
            //         counter = 1;
            //     }else{
    
            //         $("#msg-notAllowed").html("");
            //         counter = 0;
            //     }

             };
    
        });
    };