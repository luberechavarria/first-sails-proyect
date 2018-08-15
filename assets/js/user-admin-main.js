      
    function deleteUserAdmin(IdUser){
			$.post("/userAdminDelete/" + IdUser, function(data){
				if (data == "OK") {
						$("#userItem-" + IdUser).remove();
					};
	
			}).fail(function(err){
				console.log("There was a err deleting this user", err)
				$("#msg-notAllowed").html(data.errorMsg);
				
			});
    };