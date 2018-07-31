function requestDeleteProduct(IdPruduct) {
    var myRequest = $.post("/product/delete/" + IdPruduct, function (data) {
        console.log("Server Response here: ", data)

        if (data == "OK") {
            $("#item-" + IdPruduct).remove();
            $("#item-" + IdComment).remove();
        };

    }).fail(function (err) {
        console.log(IdPruduct);
        console.log(" something wrong with the post request to deleted product IdProduct" + IdPruduct, err)

    })

};

function requestDeleteComment(IdComment) {

    $.post("/product/comment/" + IdComment + "/delete", function (data) {

        if (data == "OK") {
            $("#item-" + IdComment).remove();
        };

    }).fail(function (err) {

    })

};

function requestEditComment(IdCommentAndElement) {
    var errorMessage = "";


    $("#" + IdCommentAndElement).text(function (error, commentEdited) {
        if (error) {
            errorMessage = error
            console.log("somethin went wrong getting new productComment", err);
        };
        
        $.post("/product/" + IdCommentAndElement + "/comments/edit/" + commentEdited, function (data) {
            console.log("this data", data)
        if(data=="OK"){


        };

        }).fail(function (err) {
            errorMessage = err
            console.log(" something wrong  editing the productComment" , err);

        });
    });
};