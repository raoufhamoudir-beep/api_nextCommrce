const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   store: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'Store'
       },
    name: { type: String, required: true },
    subTitel : String,
    price: { type: Number, required: true },
    Oldprice: Number,
    ShortDescription: String,
    Description: String,
    tags: [],
    note: String,
     
     show: { type: Boolean, default: true },
    type: String,  
    
    // images and veraints
    images: [],
    LadingPages: [],
    colorOpions: [],
    sizeOpions: [],
    Offers: [],

     visitsCount: { type: Number, default: 0 },
    ordersCount: { type: Number, default: 0 },  

}, {
    timestamps: true  
});

module.exports = mongoose.model('Product', productSchema);