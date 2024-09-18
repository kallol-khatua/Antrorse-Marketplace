const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId


const cartSchema = new mongoose.Schema ({

    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },

    items: [{
        product_id: {
            type: ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        sizes: [{}],
        color:[],
    }],
   
    totalItems: {
        type: Number,
        required: true,
    },
   
    

},{ timestamps: true})

//  ----------------- 

module.exports = mongoose.model( 'Cart', cartSchema)