const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


exports.getMyOrders = async (req, res) => {
    try {        
        const orders = await Order.find({ store: req.params.id }).sort({ createdAt: -1 });        
        res.json({ good: true, length: orders.length, result: orders });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.createOrder = async (req, res) => {
     
    try {
        const storeOwnerId = req.body.user;
         
        const user = await User.findById(storeOwnerId);
 
        if (!user) return res.status(404).json({ message: "التاجر غير موجود" });

        let shouldShow = true;
        //  free trel  (30 order)
        if (user.ordersCount > 30 && !user.isPaid) {
            shouldShow = false;
        }
 
        const newOrder = await Order.create({
            ...req.body.item,
            show: shouldShow,
        });
 
         await User.findByIdAndUpdate(storeOwnerId, { $inc: { ordersCount: 1 } });
        
         if (req.body.item && req.body.item._id) {
             await Product.findByIdAndUpdate(req.body.item._id, { $inc: { ordersCount: 1 } });
        }

        res.status(201).json({ good: true, result: newOrder });

    } catch (error) {
         console.log(error.message);
         
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.createOrderfromdashboard = async (req, res) => {
     
    try {
        const storeOwnerId = req.body.user; 
         
        const user = await User.findById(storeOwnerId);
 
        if (!user) return res.status(404).json({ message: "التاجر غير موجود" });

        let shouldShow = true;
        //  free trel  (30 order)
        if (user.ordersCount > 30 && !user.isPaid) {
            shouldShow = false;
        }
 
        const newOrder = await Order.create({
            ...req.body ,
            show: shouldShow,
        });
 
         await User.findByIdAndUpdate(storeOwnerId, { $inc: { ordersCount: 1 } });
        
         if (req.body.item && req.body.item._id) {
             await Product.findByIdAndUpdate(req.body.item._id, { $inc: { ordersCount: 1 } });
        }

        res.status(201).json({ good: true, result: newOrder });

    } catch (error) {
         console.log(error.message);
         
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
       

        const newOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(201).json({ good: true, result: newOrder });

    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
       

        const newOrder = await Order.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({ good: true, result: newOrder });

    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};




