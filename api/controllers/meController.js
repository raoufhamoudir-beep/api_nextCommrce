 const User = require('../models/User');
 
 

 
exports.getMyInpho = async (req, res) => {
  
    
    try {
        const user = await User.findById(    req.user.userId  ) ;
        console.log(user.password);

         res.json({ good: true,   result: user });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.updateMyInpho = async (req, res) => {
    console.log( req.user.userId, req.body);
    
    try {
        const user = await User.findByIdAndUpdate(    req.user.userId, req.body  ) ;
        res.json({ good: true,   result: user });
    } catch (error) {
        res.status(500).json({ good: false, message: error.message });
    }
};


exports.updatePassword = async (req, res) => {
  
  try {
     const { currentPassword, newPassword } = req.body;
    
    
    const userId = req.user.userId; 
    
    console.log(currentPassword, newPassword, userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

     
    user.password = newPassword;

     
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
 