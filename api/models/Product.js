// api/models/Product.js
module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true
		},

		description: {
			type: 'string',
		},

		image: {
			type: 'string',
			defaultsTo: "/images/lapto.jpeg"
		}


	},
};