const mongoose = require('mongoose');

const DeliveryPricetSchema = new mongoose.Schema({
   store: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'Store'
       },
    States : []
}, {
    timestamps: true 
});

module.exports = mongoose.model('DeliveryPrice', DeliveryPricetSchema);