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
// ];

// var usersComment = [
//     {
//         idProduct: 3,
//         name: "Mario Agudelo",
//         comment: "it is working in a perfect speed",
//         imgUser: "https://bootdey.com/img/Content/user_1.jpg"
//     },
//     {
//         idProduct: 4,
//         name: "Mario Agudelo",
//         comment: "the product is too expense for what it does",
//         imgUser: "https://bootdey.com/img/Content/user_1.jpg"
//     },
//     {
//         idProduct: 1,
//         name: "Mario Agudelo",
//         comment: "I am so happy with this pruduct",
//         imgUser: "https://bootdey.com/img/Content/user_1.jpg"
//     },
//     {
//         idProduct: 1,
//         name: "Sandra Bedolla",
//         comment: "it  works in a perfect speed",
//         imgUser: "https://bootdey.com/img/Content/user_2.jpg"
//     }, {
//         idProduct: 1,
//         name: "Rosbert Echavarria",
//         comment: "it is perfect",
//         imgUser: "https://bootdey.com/img/Content/user_3.jpg"
//     },
// ];


function getProductById(id) {
    Product.findOne({ id: id }).exec(function (error, result) {
        if (error) {
            console.log("Error finding products");
            return {};
        }

        return result;
    });
}

function getCommentById(id) {
    var array = [];
    for (var i = 0; i < usersComment.length; i++) {
        if (usersComment[i].idProduct == id) {
            array.push(usersComment[i]);
        }
    }
    return array
}
function AddUserComment(comment, idProductComment) {
    usersComment.push({
        idProduct: idProductComment,
        name: "Nuevo user",
        comment: comment,
        imgUser: "https://pbs.twimg.com/media/Dd-Qnp2V4AAcaah.jpg"
    });


}

function renderProductComments(req, res) {
    console.log("Product Id is: ", req.param("productId"));

    var productInfo = getProductById(req.param("productId"));
    var commentInfo = getCommentById(req.param("productId"));


    res.view('pages/ProductComments', { comments: commentInfo, productInfo: productInfo });
}



module.exports = {
    showProductComment: renderProductComments,

    loadProducts: function (req, res) {
        Product.find().exec(function (err, products) {
            if (err) {
                console.log("Couldn't find products: ", err);
                return;
            }

            res.view('pages/products', { products: products });
        });
    },

    addUserComment: function (req, res) {
        console.log(req.param("comment"));
        AddUserComment(req.param("comment"), req.param("productId"));
        renderProductComments(req, res);
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
        Comments.find().exec(function (err, comment) {
            if (err) {
                console.log("Couldn't find products: ", err);
                return;
            }
            
            Product.find().exec(function (err, products) {
                if (err) {
                    console.log("Couldn't find products: ", err);
                    return;
                }
    
                res.view('pages/ProductComments', { product: products, comments:comment});
            });
        });

      
    },

    
};

