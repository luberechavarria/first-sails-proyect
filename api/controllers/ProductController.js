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
            if (err) {
                console.log("Couldn't find products: ", err);
                return;
            }



            res.view('pages/products', { products: products });

        });
    },

    showNewProduct: function (req, res) {
        res.view('pages/newProduct');
    },

    addNewProduct: function (req, res) {
        Product.create({
            title: req.param('title'),
            description: req.param('description')
        }).exec(function (err, result) {
            if (err) {
                console.log("Error saving product");
                return res.view('pages/newProduct', { sucess: false, errorMsg: 'Error saving product' });
            }

            res.view('pages/newProduct', { success: true });
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

            res.view('pages/ProductComments', { product: myItem, comments: productComments, errMsg: req.param('errMsg') || false });
        });

    },

    showProductsToDelete: function (req, res) {
        getProductsAndComments(function (err, comments, products) {
            if (err) {
                console.log("There was an error!", err)
                return;
            }

            for (var product of products) {
                var counter = 0;
                for (var comment of comments) {
                    if (product.id == comment.idProduct) counter++;
                }

                product.numberOfComments = counter;
            }


            res.view('pages/deleteProducts', { product: products });

        });
    },

    deleteProduct: function (req, res) {
        var IdProduct = req.param("IdProduct");

        console.log("this is a test", IdProduct);
        var userId = req.cookies.userId;
       
        Users.findOne({ id: userId }).exec(function (err, user) {
            if (user && user.isAdmin) {
                Product.destroy({ id: IdProduct }).exec(function (err) {
                    if (err) {
                        console.log("somthig wrong deleting product", err)

                    }

                    Comments.destroy({ id: IdProduct }).exec(function (err) {
                        if (err) {
                            console.log("somthig wrong deleting all comments belong to this product ", err)
                        }

                        res.ok();

                    });
                });
            } else {
                res.send({isAdmin:false, msg:'You are not authorized to perform this action'});
                console.log('You are not authorized to perform this action' + err)
            }
        });
    },

    ShowDeleteProductComments: function (req, res) {

        var productId = req.param("productId");

        Comments.find({ idProduct: productId }).exec(function (err, comments) {
            if (err) {
                console.log("could not find comments", err)
            }

            var counter = 0;
            for (var comment of comments) {
                counter++
                comment.commentNumber = counter;

            }
            res.view('pages/deleteComments', { comments: comments });
        });
    },

    deleteComment: function (req, res) {

        var IdComment = req.param("IdComment");

        Comments.destroy({ id: IdComment }).exec(function (err) {

            if (err) {
                console.log("there is error deleting this comment", err);
            }

            res.ok();
        });

    },

    editComment: function (req, res) {
        var newComment = req.param("newComment");
        var idComment = req.param("IdComment");;

        Comments.update({ id: idComment }).set({ comment: newComment }).exec(function (err) {
            if (err) {
                console.log("there is error editing this comment", err)
            };

            //  res.redirect('pages/product/7/comments/delete');

            res.ok();
        });

    }


};
