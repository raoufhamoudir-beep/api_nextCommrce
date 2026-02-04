const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    user:{
         type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
     name: String,
    DelevryPrice: Number,
    phone: String,
    state: String,
    city: String,
    stateNumber: String,
    
    //  about the product
    productData: {},  
    price: Number,
    quantity: Number,
    total: Number,
    color: String,
    size: String,
    
    // order status
    status: { type: String, default: 'pending' },
    show: { type: Boolean, default: true },  
    
     SendTo: { type: Boolean, default: false },  
    home: Boolean,  
    
     offer: Boolean,
    freeDelevry: Boolean,
    offerNmae: String,
    note: String,  

}, {
    timestamps: true
});

 module.exports = mongoose.model('Order', orderSchema);