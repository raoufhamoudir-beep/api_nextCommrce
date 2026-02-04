const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
    phone: { type: String, required: true, unique: true },
    
     Stores: [],  
    orders: { type: Number, default: 0 },
     isPaid: { type: Boolean, default: false },
    dateOfPay: { type: Date },     
    dateOfExpire: { type: Date },  
    credit: {
        type: Number,
        default: 1000
    },
     ordersCount: { type: Number, default: 0 },  
}, {
    timestamps: true 
});

 userSchema.pre('save', async function () {
     if (!this.isModified('password')) return;
    
     const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

 userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;