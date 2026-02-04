

// دالة توليد كود التتبع

const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const visits = require("../models/visits");

// @desc    جلب طلباتي
// @route   GET /api/orders
exports.getMyvisits = async (req, res) => {
    try {        
        const myvisits = await visits.find({ store: req.params.id }).sort({ createdAt: -1 });        
        res.json({ good: true, length: myvisits.length, result: myvisits });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};

// @desc    إنشاء طلب جديد
// @route   POST /api/orders
exports.createVisits = async (req, res) => {
    try {
        // 1. Destructure only the data we expect (Security)
        const { page, ...otherData } = req.body; 

        // 2. Validate input
        if (!page) {
            return res.status(400).json({ good: false, message: "Page identifier is required." });
        }

        // 3. Prepare the visit object (Add IP or UserID here if needed)
        const visitData = {
            page: page,
            // Capture IP explicitly for analytics reliability
            ip: req.ip, 
            ...otherData
        };

        // 4. Create the visit record
        const newVisit = await visits.create(visitData);

        // 5. Update Product Counter (Conditionally)
        // Check if page is not "home" AND is a valid MongoDB ObjectId
        if (page !== "home" && mongoose.Types.ObjectId.isValid(page)) {
            await Product.findByIdAndUpdate(page, { 
                $inc: { visitsCount: 1 } 
            });
        }

        // 6. Success Response
        res.status(201).json({ good: true, result: newVisit });

    } catch (error) {
        console.error("Create Visits Error:", error); // Log internal error for debugging
        res.status(500).json({ good: false, message: "Server error occurred." });
    }
};




