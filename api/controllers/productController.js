const Product = require('../models/Product');
const axios = require('axios');
const Store = require('../models/Store');

 

const revalidateStore = async (subdomain) => {
    try {
        await axios.post('http://localhost:3000/api/revalidate', {
            "secret": "MY_SECRET_KEY_123",
            "tag": `products-${subdomain}`
        });
    } catch (e) {
        console.error("Revalidation Error:", e.message);
    }
};




exports.getall = async (req, res) => {
    
    try {
        // ✅ الأمان: نأخذ الـ ID من الكوكي (req.user) وليس من الرابط
        const products = await Product.find( ) 
        res.json({ good: true, length: products.length, result: products });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

exports.getMyProducts = async (req, res) => {
    
    try {
         const products = await Product.find({ store: req.params.id }).sort({ createdAt: -1 });
 
        res.json({ good: true, length: products.length, result: products });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
exports.createProduct = async (req, res) => {
     
    try {
         const newProduct = await Product.create({
            ...req.body  
        });

        
revalidateStore( req.body.subdomain)

        res.status(201).json({ good: true, result: newProduct });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
exports.updateProduct = async (req, res) => {
    
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id  },  
            req.body ,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: "المنتج غير موجود أو لا تملكه" });
revalidateStore( req.body.subdomain)
 
        res.status(200).json({ good: true, result: product });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
exports.deleteProduct = async (req, res) => {

    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id  });

        if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
const store = await Store.findById(product.store)
 revalidateStore(store.domain)

        res.status(200).json({ good: true, message: "تم الحذف" });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
exports.incrementVisit = async (req, res) => {
    try {
        console.log(req.params.id);
      const product =  await Product.findById(req.params.id);
        console.log(product);
        
        res.status(200).json({ good: true, result: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};