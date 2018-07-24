function requestDeleteProduct(IdPruduct) {
    var myRequest = $.post("/product/delete/" + IdPruduct, function (data) {
        console.log("Server Response here: ", data)
        if (data == "OK") {
            $("#item-" + IdPruduct).remove();
        };

    }).fail(function (err) {
        console.log(IdPruduct);
        console.log(" something wrong with the post request to deleted product", err)

    })

};