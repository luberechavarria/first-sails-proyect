/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    loadProducts: function(req, res) {
        var items = [
            {
                title: "WiFi Block",
                description: "A radio block very handy!",
                image: "images/lapto.jpeg"
            },

            {
                title: "IMU Block",
                description: "Measure acceleration!",
                image: "images/lapto.jpeg"
            },

            {
                title: "WiFi Block",
                description: "A radio block very handy!",
                image: "images/lapto.jpeg"
            },

            {
                title: "IMU Block",
                description: "Measure acceleration!",
                image: "images/lapto.jpeg"
            },
            {
                title: "WiFi Block",
                description: "A radio block very handy!",
                image: "images/lapto.jpeg"
            },

            {
                title: "IMU Block",
                description: "Measure acceleration!",
                image: "images/lapto.jpeg"
            }
        ];

        res.view('pages/products', {products: items});
    }
};

