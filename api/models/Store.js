const mongoose = require('mongoose');

 
 

const storeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true  
    },
    logo: { 
        type: String, 
        default: "https://i.ibb.co/JwzSDFw5/logo.png" 
    },
    storeName: { 
        type: String, 
        required: true, 
        trim: true  
    },
      language: { 
        type: String, 
       default: "ar"
    }, 
        enableBureau: { 
        type: Boolean, 
       default: true
    },  
     categories: [],
    domain: { 
        type: String, 
        required: true, 
        unique: true,  
        lowercase: true,  
        trim: true,
        index: true  
    },
    faqs: [],  
    
     deliveryCompany: {
        name: String,
        key: String,
        token: String
    },
    contacts: { 
        phone: String,
        instagram: String,
        tiktok: String,
        facebook: String,
        whatsapp: String
    }, 
    header: {
        name: { type: Boolean, default: true },
        logo: { type: Boolean, default: true },
        headerColor: { type: String, default: "#ffffff" },  
        textColor: { type: String, default: "#000000" },
        barColor: { type: String, default: "#000000" }
    },
    thanks: {
        img: { type: Boolean, default: true },
        title: { type: Boolean, default: true },
        about: { type: Boolean, default: true },
        homeButton: { type: Boolean, default: true }, 
        phone: { type: Boolean, default: true },
        media: { type: Boolean, default: true },
        titleText: { type: String, default: "شكرا لثقتكم" },
        aboutText: { type: String, default: "سوف نتواصل معكم قريبا لتأكيد طلبكم" }
    },
    mainColor: { type: String, default: "#000000" },  
    
     facebookPixel: {
        name: String,
        id: { type: String, trim: true }
    },
    tiktokPixel: {
        name: String,
        id: { type: String, trim: true }
    },
    ProductCardType: { type: String, default: "A" },
    CategoryCardType: { type: String, default: "A" },
}, {
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;