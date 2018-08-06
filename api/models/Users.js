module.exports={
   attributes:{
        firstName: {
            type: 'string',
            required: true
        },

        lastName: {
            type: 'string',
            defaultsTo: ''
        },

        email: {
            type: 'string',
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        cookie: {
            type: 'string',
            defaultsTo: ''
        },

        isAdmin: {
            type: 'boolean',
            defaultsTo: false
        },
        
    },
};
   

