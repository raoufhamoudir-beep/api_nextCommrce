 
const DeliveryPrice = require('../models/DeliveryPrice');

 
exports.getMyDeliveryPrice = async (req, res) => {
    try {
         
        const orders = await DeliveryPrice.findOne({ store:   req.params.id }).sort({ createdAt: -1 });
         
        res.json({ good: true,   result: orders });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
 
exports.updateDeliveryPrice = async (req, res) => {
     
    try {
        console.log("hello",  req.params.id );
        
        const product = await DeliveryPrice.findOneAndUpdate(
            {  store: req.params.id  }, 
            req.body ,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: "المنتج غير موجود أو لا تملكه" });

 
        res.status(200).json({ good: true, result: product });
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ good: false, message: error.message });
    }
};




