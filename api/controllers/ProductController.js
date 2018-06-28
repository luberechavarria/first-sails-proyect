/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var products = [
    {
        title: " WiFi Block",
        description: "A radio block very handy!",
        image: "images/lapto.jpeg",
        id: 1,
        name: "Mario Agudelo",
    },

    {
        title: " IMU Block",
        description: "Measure acceleration!",
        image: "images/lapto.jpeg",
        id: 4,
        name: "Juan Carlos",
    },

    {
        title: " WiFi Block",
        description: "A radio block very handy!",
        image: "images/lapto.jpeg",
        id: 3,
        name: "Fernando Osorio",
    },

    {
        title: " IMU Block",
        description: "Measure acceleration!",
        image: "images/lapto.jpeg",
        id: 5,
        name: "Marcela Cuellar",
    },
    {
        title: " WiFi Block",
        description: "A radio block very handy!",
        image: "images/lapto.jpeg",
        id: 4,
        name: "Rosbeert Henao",
    },

    {
        title: " IMU Block",
        description: "Measure acceleration!",
        image: "images/lapto.jpeg",
        id: 6,
        name: "Luis Eduardo",
    }
];


// function getProductById(id) {
//     products.some
//     products.forEach
//     for(var i...)

//     return products[].id
        
// }
module.exports = {
    productComment: function (req, res) {

        var productInfo = getProductById(req.param("productId"));

        var usersComment = [
            {
                idProduct: req.param('productId'),
                name: "Mario Agudelo",
                comment: "it is works in a perfect speed",
            },
            {
                idProduct: req.param('productId'),
                name: "Mario Agudelo",
                comment: "the product is too expense for what it does",
            },
            {
                idProduct: req.param('productId'),
                name: "Mario Agudelo",
                comment: "I am so happy with this pruduct",
            },
        ];

        res.view('pages/ProductComments', { comments: usersComment, productInfo: productInfo });

    },

    loadProducts: function (req, res) {
        res.view('pages/products', { products: products });

    }
};

