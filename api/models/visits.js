const mongoose = require('mongoose');

const VisisSchema = new mongoose.Schema({
   store: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'Store'
       },
    page: String,
    imagepage: String,
    ip: String
}, {
    timestamps: true  
});

module.exports = mongoose.model('Visis', VisisSchema);