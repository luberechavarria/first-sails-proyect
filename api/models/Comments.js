//Api/model/comments.js
module.export= {
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
            type:"strindg",
            defaultsTo: "https://bootdey.com/img/Content/user_1.jpg"
        }

    }
};
