//Api/model/comments.js
module.exports = {
    attributes:{
        idProduct:{
          type:"number",
          required:true
        },

        name:{
          type:"string",
          required: true
        },

        comment:{
            type:"string",
            required: true
        },

        imgUser:{
            type:"string",
            defaultsTo: "https://bootdey.com/img/Content/user_1.jpg"
        }

    }
};
