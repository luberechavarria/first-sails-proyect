function requestDeleteProduct(IdPruduct) {
	var myRequest = $.post("/product/delete/" + IdPruduct, function (data) {
		console.log("Server Response here: ", data)
		var counter = 0;
		if (data == "OK") {
			$("#item-" + IdPruduct).remove();

		} else {

			if (counter == 0) {
				$("#msg-notAllowed").html(data.msg);
				counter = 1;
			} else {

				$("#msg-notAllowed").html("");
				counter = 0;
			}
		}
	}).fail(function (err) {
		$("#msg-notAllowed").html("There was a err deleting this item");
		console.log(" something wrong with the post request to deleted product and comment " + IdPruduct, err)

	})

};

function requestDeleteComment(IdComment) {

	$.post("/product/comment/" + IdComment + "/delete", function (data) {

		if (data == "OK") {
			$("#item-" + IdComment).remove();
		};

	}).fail(function (err) {
		$("#msg-notAllowed").html("There was a err deleting this comment");
		console.log(" something wrong with the post request to deleted this comment " + IdPruduct, err)
	})

};

function requestEditComment(IdCommentAndElement) {

	$("#cmnt-" + IdCommentAndElement).text(function (error, currentComment) {
		if (error) {

			console.log("something went wrong getting new productComment", error);
		};

		$.post("/product/" + IdCommentAndElement + "/comments/edit/" + currentComment, function (data) {
			if (data == "OK") {
			 $("#cmnt-" + IdCommentAndElement).attr("backupComment-txt", currentComment);
			};

		}).fail(function (err) {

			var oldComment = $("#cmnt-" + IdCommentAndElement).attr("backupComment-txt");

			$("#cmnt-" + IdCommentAndElement).html(oldComment);

			$("#msg-notAllowed").html("There was a err deleting this comment");

			console.log(" something wrong  editing the productComment", err);

		});
	});
};
$("input[placeholder]").val($("input[placeholder]").attr("placeholder"));