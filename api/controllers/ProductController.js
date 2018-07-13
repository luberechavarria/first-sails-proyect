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

//     {
//         title: " IMU Block",
//         description: " 2 Measure acceleration!",
//         image: "/images/lapto.jpeg",
//         id: 4,
//         name: "Juan Carlos",
//     },

//     {
//         title: " WiFi Block",
//         description: "3 A radio block very handy!",
//         image: "/images/lapto.jpeg",
//         id: 3,
//         name: "Fernando Osorio",
//     },

//     {
//         title: " IMU Block",
//         description: "4 Measure acceleration!",
//         image: "images/lapto.jpeg",
//         id: 5,
//         name: "Marcela Cuellar",
//     },
//     {
//         title: " WiFi Block",
//         description: "5 A radio block very handy!",
//         image: "/images/lapto.jpeg",
//         id: 4,
//         name: "Rosbeert Henao",
//     },

//     {
//         title: " IMU Block",
//         description: "6 Measure acceleration!",
//         image: "/images/lapto.jpeg",
//         id: 6,
//         name: "Luis Eduardo",
//     }
// ]
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

    addNewComment: function (req, res) {
        Comments.create({
            idProduct: req.param("productId"),
            name: req.param('nombre'),
            comment: req.param("comment"),
            imgUser: req.param(''),
        }).exec(function (err, result) {
            if (err) {
                return res.view('pages/ProductComments', { sucess: false, errorMsg: 'Error saving comment' });

            }
            res.view('pages/ProductComments', { success: true });
        });

    },

    showProductComment: function (req, res) {


        getProductsAndComments(function (err, comments, products) {
            if (err) {
                console.log("There was an error!")
                return;
            }

            //products.some(function(item){
            //         if (item.id == itemSelected) {
            //             myItem = item;
            //             return true;
            //         }
            //      });

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
            console.log(myItem.image, "lubeer");
            res.view('pages/ProductComments', { product: myItem, comments: productComments });
        });
       

    },

    showProductsToDelete: function (req, res) {

        res.view('pages/deleteProducts', {});
    }


};

