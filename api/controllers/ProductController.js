/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// collection / table
// var products = [
//     {
//         title: " WiFi Block",
//         description: "1 A radio block very handy!",
//         image: "/images/lapto.jpeg",
//         id: 1,
//         name: "Mario Agudelo",
//     },

function getProductsAndComments(cb) {
	Comments.find().exec(function (err, comments) {
		if (err) {
			console.log("Couldn't find products: ", err);
			cb(err);
			return;
		}

		Product.find().exec(function (err, products) {

			if (err) {
				console.log("Couldn't find products: ", err);
				cb(err);
				return;
			}
			if (typeof cb === 'function') {
				cb(false, comments, products)
			}
		});
	});
}

module.exports = {

	loadProducts: function (req, res) {
		Product.find().exec(function (err, products) {
			AccountAuth.authenticateUser(req, function (err, user) {

				res.view('pages/products', { products: products, user: user });
			});
		});
	},

	showNewProduct: function (req, res) {
		AccountAuth.authenticateUser(req, function (err, user) {
			var success = (req.param('errorMsg') !== undefined);
			res.view('pages/newProduct', { success: success, errorMsg: req.param('errorMsg'), user: user });
		});
	},

	addNewProduct: function (req, res) {
		var errorMsg = "";
		AccountAuth.authenticateUser(req, function (err, user) {
			if (err) errorMsg = 'Error authenticating user';
			if (!err && user && user.isAdmin === true) {
				Product.create({
					title: req.param('title'),
					description: req.param('description')
				}).exec(function (err, result) {
					if (err) {
						console.log(err);
						errorMsg = 'Error creating new product';
					};
				});
			}

			res.redirect("/product/new?errorMsg=" + errorMsg);
		});
	},

	addUserComment: function (req, res) {

		Comments.create({
			idProduct: req.param("productId"),
			name: req.param("nombre"),
			comment: req.param("comment"),

		}).exec(function (err, result) {
			var errorOccurred = false;
			var errorMsg = "";
			if (err) {
				errorOccurred = true;
				errorMsg = "Error saving your comment";
				// return res.view('pages/ProductComments', { sucess: false, errorMsg: 'Error saving comment' });
			}

			res.redirect('/product/' + req.param("productId") + "/comments?errMsg=" + errorMsg);
		});
	},

	showProductComment: function (req, res) {
		AccountAuth.authenticateUser(req, function (err, user) {
			getProductsAndComments(function (err, comments, products) {
				var errorMsg = req.param('errMsg');

				if (err) {
					console.log("There was an error!", err)
					errorMsg = "" + errorMsg + "\nError searching for products and comments";
				}

				var itemSelected = req.param('productId');
				var myItem = 0;
				for (var product of products) {
					if (product.id == itemSelected) {
						myItem = product;
						break;
					}
				}

				var productComments = [];
				for (var comment of comments) {
					if (comment.idProduct == myItem.id) {
						productComments.push(comment);
					}
				}

				if (productComments.length == 0) {
					productComments.push({
						idProduct: 0,
						name: "",
						comment: "NOT COMMENTS TO THIS ITEM",
						imgUser: ""
					});
				};

				res.view('pages/ProductComments', { user: user, product: myItem, comments: productComments, errMsg: req.param('errMsg') || false });
			});
		});
	},

	showProductsToDelete: function (req, res) {
		var errMsg;
		var user;
		AccountAuth.authenticateUser(req, function (err, user) {
			if (!err && user && user.isAdmin === true) {
				getProductsAndComments(function (err, comments, products) {
					if (err) {
						console.log("There was an error!", err)
						errMsg = "there was a err loding this view"
					}
					for (var product of products) {
						var counter = 0;
						for (var comment of comments) {
							if (product.id == comment.idProduct) counter++;
						}

						product.numberOfComments = counter;
					}
					
					res.view('pages/deleteProducts', { product: products, user: user, isAdmin: true, errMsg: errMsg });
				});
			} else {
				console.log("some one who is not admin try to delete" + err, user)
				res.view('pages/deleteProducts', { user: user, isAdmin: false, errMsg: "You are not allowed to access to see this view" });
			}
		});
	},

	deleteProduct: function (req, res) {
		var IdProduct = req.param("IdProduct");
		AccountAuth.authenticateUser(req, function (err, user) {
			if (!err && user && user.isAdmin === true) {
				Product.destroy({ id: IdProduct }).exec(function (err) {
					if (err) {
						console.log("somthig wrong deleting product", err)
						res.send({msg: 'there was a err to delete this product' });
					}
					Comments.destroy({ id: IdProduct }).exec(function (err) {
						if (err) {
							console.log("somthig wrong deleting all comments belong to this product ", err)
							res.send({ msg: 'there was a err to delete the comment of this product' });
						}
							res.ok();
					});		
				});
			}else {
				res.send({ msg: 'You are not authorized to perform this action' });
				console.log('You are not authorized to perform this action' + err)
			};
		});
	},

	ShowDeleteProductComments: function (req, res) {
    var errMsg;
		var productId = req.param("productId");
		AccountAuth.authenticateUser(req, function (err, user) {
			if (!err && user && user.isAdmin === true) {
					Comments.find({ idProduct: productId }).exec(function (err, comments) {
						if (err) {
							console.log("could not find comments", err)
							res.view('pages/deleteComments', { comments: comments, errMsg: "there was a err finding comments of this product" });
						}

						var counter = 0;
						for (var comment of comments) {
							counter++
							comment.commentNumber = counter;

						}
						res.view('pages/deleteComments', { user: user, isAdmin: true, errMsg: errMsg, comments: comments });
					});
			}else{
				console.log("this user is not allowed to access to the view of deleteProductsComments ")
				res.view('pages/deleteComments', { user: user, isAdmin: false, errMsg: "You are not allowed to access to this view" });
			}		
		});			
	},

	deleteComment: function (req, res) {
		var IdComment = req.param("IdComment");
		AccountAuth.authenticateUser(req, function (err, user) {
			if (!err && user && user.isAdmin === true) {
				Comments.destroy({ id: IdComment }).exec(function (err) {
					if (err) {
						console.log("there is error deleting this comment", err);
						res.send({errMsg:"there was a err deleting this comment"});
					}

					res.ok();
				});
			}else{
				console.log("you are not allowed to access to this action" + user);
				res.send({errMsg:"there was a err deleting this comment"});
			}
		});
	},

	editComment: function (req, res) {
		var newComment = req.param("newComment");
		var idComment = req.param("IdComment");;
		AccountAuth.authenticateUser(req, function (err, user) {
			if (!err && user && user.isAdmin === true) {
				Comments.update({ id: idComment }).set({ comment: newComment }).exec(function (err) {
					if (err) {
						console.log("there is error editing this comment", err)
						res.send({errMsg:"there was a err  editing this comment"});
					};

					res.ok();
				});
			}else{
				console.log("you are not admin to edit this comment" + err, user)
				res.send({errMsg:"You are not allowed to access to this action"});

			}	
		});
	}
};
