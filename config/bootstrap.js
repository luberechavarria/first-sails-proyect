/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  var usersComments = [
    {
        idProduct: 3,
        name: "Mario Agudelo",
        comment: "it is working in a perfect speed",
        imgUser: "https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 4,
        name: "Mario Agudelo",
        comment: "the product is too expense for what it does",
        imgUser: "https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 1,
        name: "Mario Agudelo",
        comment: "I am so happy with this pruduct",
        imgUser: "https://bootdey.com/img/Content/user_1.jpg"
    },
    {
        idProduct: 1,
        name: "Sandra Bedolla",
        comment: "it  works in a perfect speed",
        imgUser: "https://bootdey.com/img/Content/user_2.jpg"
    }, {
        idProduct: 1,
        name: "Rosbert Echavarria",
        comment: "it is perfect",
        imgUser: "https://bootdey.com/img/Content/user_3.jpg"
    },
    
  ];

  Comments.find(function(err, comments){
    if(err) return console.error("There was an error initialising");
    if(!comments.length){
      usersComments.forEach(function(comment){
        Comments.create(comment, function(err){
          if(err) console.error("Error adding comment: ", err);
        });
      });
    }
  });

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
