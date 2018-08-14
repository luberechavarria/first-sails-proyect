
module.exports = {
	authenticateUser: function (req, cb) {
		var currentCookie = req.cookies.dd;
		Users.findOne({ cookie: currentCookie }).exec(function (err, user) {

			if (typeof cb === "function") {
				cb(err, user)
			}

		});
	}

};
