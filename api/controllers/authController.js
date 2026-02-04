 const User = require('../models/User');
const generateTokenAndSetCookie = require('../utils/generateToken');

 
exports.registerUser = async (req, res) => {
    try {
         const user = await User.create(req.body);


        if (user) {
             generateTokenAndSetCookie(res, user._id);
            
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message );
        
    }
};

 
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
         if (user && (await user.matchPassword(password))) {
            
             generateTokenAndSetCookie(res, user._id );

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isPaid: user.isPaid
            });
        } else {
            res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

 
exports.logoutUser = (req, res) => {
    // تدمير الكوكي بوضع تاريخ انتهاء في الماضي
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "تم تسجيل الخروج" });
};


exports.CheckPhoneAndEmail  =async (req, res) => {
 const { email, phone } = req.body;

    try {
         if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(200).json({
                    available: false,
                    field: "email",
                    message: "Email is already registered"
                });
            }
        }
        
         if (phone) {
            const phoneExists = await User.findOne({ phone });
            if (phoneExists) {
                return res.status(200).json({
                    available: false,
                    field: "phone",
                    message: "Phone number is already registered"
                });
            }
        }
         return res.status(200).json({
            available: true,
            message: "Email and phone are available"
        });
         } catch (error) {
        console.error('Error checking email/phone:', error);
        return res.status(500).json({
            available: false,
            error: 'Internal server error',
            message: 'Could not check availability'
        });
    }
}