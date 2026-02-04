const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
   user: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'user'
       },
    price: Number,
    OfferTypeValue: String,
    offerTitle: String,
    PaymentImage: String,
    userName: String,
    status: {
        type: String,
        default: "pending"
    },
}, {
    timestamps: true  
});

module.exports = mongoose.model('Offer', OfferSchema);