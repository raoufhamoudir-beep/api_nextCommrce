const Offer = require("../models/Offer");


 
exports.getMyOffers = async (req, res) => {
    try {        
         
        const myOffer = await Offer.find({ user: req.user.userId }).sort({ createdAt: -1 });        
         res.json({ good: true, length: myOffer.length, result: myOffer });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

 
exports.createOffer = async (req, res) => {
    try {
        
      
       const newVisit = await Offer.create(req.body);
      
        
      
        res.status(201).json({ good: true, result: newVisit });

    } catch (error) {
        console.error("Create Visits Error:", error); 
        res.status(500).json({ good: false, message: "Server error occurred." });
    }
};




