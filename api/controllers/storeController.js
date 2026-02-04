const DeliveryPrice = require('../models/DeliveryPrice');
const Store = require('../models/Store');
const User = require('../models/User');
const states = require('../constants/states.json')
const axios = require("axios")


const revalidateStore = async (subdomain) => {
    try {
        await axios.post('http://localhost:3000/api/revalidate', {
            "secret": "MY_SECRET_KEY_123",
            "tag": `store-${subdomain}`
        });
    } catch (e) {
        console.error("Revalidation Error:", e.message);
    }
};


exports.registerStore = async (req, res) => { 
    
    try {
       
            const domainExists = await Store.findOne({ domain: req.body.domain });
            console.log(domainExists);
            
            if (domainExists) {
                return res.status(500).json({
                    available: false,
                    field: "domain",
                    message: "domain is already registered"
                });
            }
     

        const store = await Store.create({ ...req.body, user: req.user.userId });

         await User.findByIdAndUpdate(req.user.userId, {
            $push: {
                Stores: {
                    id: store._id,
                    logo: store.logo,
                    storeName: store.storeName
                }
            }
        });
        await DeliveryPrice.create({store :store._id, States : states })

        if (store) {
            res.status(201).json({
                success: true,
                result: {
                    id: store._id,
                    logo: store.logo,
                    storeName: store.storeName
                }
            });
        }
    } catch (error) {
        console.error(error.message);  
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateStore = async (req, res) => {    
    try {
         const store = await Store.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );

        if (!store) {
            return res.status(404).json({ success: false, message: "المنتج غير موجود أو لا تملكه" });
        }
       
        
       revalidateStore(store.domain)

        res.status(200).json({ success: true, result: store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




exports.getMyStores = async (req, res) => {
    try {
         
        const stores = await Store.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json({ success: true, count: stores.length, result: stores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getOneStore = async (req, res) => {
    try {
        const store = await Store.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!store) {
            return res.status(404).json({ success: false, message: "المتجر غير موجود" });
        }

        res.json({ success: true, result: store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.deleteStore = async (req, res) => {
    try {
        // 1. Delete the Store
        const store = await Store.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.userId 
        });

        // Safety Check: If store doesn't exist or doesn't belong to user, stop here
        if (!store) {
            return res.status(404).json({ success: false, message: "Store not found or unauthorized" });
        }

        // 2. Remove the store reference from the User's "Stores" array
        await User.findByIdAndUpdate(req.user.userId, {
            $pull: { 
                Stores: { id: store._id } // Matches the item with this ID and removes it
            }
        });

        res.json({ success: true, message: "Store deleted successfully", result: store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// the pablic area


exports.getStoreFromWebesite = async (req, res) => {
    console.log(req.params.id );
    
    try {
        const store = await Store.findOne({ domain: req.params.id });

        if (!store) {
            return res.status(404).json({ success: false, message: "المنتج غير موجود أو لا تملكه" });
        }

        const StoreDlevryPrices = await DeliveryPrice.findOne({store: store._id})

        
       

        res.status(200).json({ success: true, result: store, StoreDlevryPrices: StoreDlevryPrices.States  });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};