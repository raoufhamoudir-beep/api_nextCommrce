const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
     const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',  
    });

     const isProduction = process.env.NODE_ENV === 'production';

   res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,                  // Must be true for sameSite: 'none' + HTTPS
        sameSite: 'none',              // ← THIS IS THE KEY FIX
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

module.exports = generateTokenAndSetCookie;
