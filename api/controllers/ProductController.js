/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var products = [
    {
        title: " WiFi Block",
        description: "1 A radio block very handy!",
        image: "/images/lapto.jpeg",
        id: 1,
        name: "Mario Agudelo",
    },

    {
        title: " IMU Block",
        description: " 2 Measure acceleration!",
        image: "/images/lapto.jpeg",
        id: 4,
        name: "Juan Carlos",
    },

    {
        title: " WiFi Block",
        description: "3 A radio block very handy!",
        image: "/images/lapto.jpeg",
        id: 3,
        name: "Fernando Osorio",
    },

    {
        title: " IMU Block",
        description: "4 Measure acceleration!",
        image: "images/lapto.jpeg",
        id: 5,
        name: "Marcela Cuellar",
    },
    {
        title: " WiFi Block",
        description: "5 A radio block very handy!",
        image: "/images/lapto.jpeg",
        id: 4,
        name: "Rosbeert Henao",
    },

    {
        title: " IMU Block",
        description: "6 Measure acceleration!",
        image: "/images/lapto.jpeg",
        id: 6,
        name: "Luis Eduardo",
    }
];
var usersComment = [
    {
        idProduct: 3,
        name: "Mario Agudelo",
        comment: "it is works in a perfect speed",
        imgUser:"https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 4,
        name: "Mario Agudelo",
        comment: "the product is too expense for what it does",
        imgUser:"https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 1,
        name: "Mario Agudelo",
        comment: "I am so happy with this pruduct",
        imgUser:"https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 1,
        name: "Sandra Bedolla",
        comment: "it  works in a perfect speed",
        imgUser:"https://bootdey.com/img/Content/user_2.jpg"
    }, {
        idProduct: 1,
        name: "Rosbert Echavarria",
        comment: "it is perfect",
        imgUser:"https://bootdey.com/img/Content/user_3.jpg"
    },
];


function getProductById(id) {
    //  products.some
    //  products.forEach
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i];
        }
    }
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
function AddUserComment(){
    usersComment.push ({  
        idProduct: 1,
        name: "new User",
        comment: res,
        imgUser:"https://bootdey.com/img/Content/user_3.jpg"
    });


}

 function renderProductComments(req, res) {
    console.log("Product Id is: ", req.param("productId"));
    
    var productInfo = getProductById(req.param("productId"));
    var commentInfo = getCommentById(req.param("productId"));
   

    res.view('pages/ProductComments', { comments: commentInfo, productInfo: productInfo });
}



module.exports = {
    productComment: renderProductComments,

    loadProducts: function (req, res) {
        res.view('pages/products', { products: products });

    },

    addUserComment: function(req, res){
        console.log(req.param("comment"));

        renderProductComments(req, res);
        
        
    }
    
};

