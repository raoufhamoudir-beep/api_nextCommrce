const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
     const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',  
    });

     const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('access_token', token, {
        httpOnly: true,  
        secure: true,  // Always true in prod (required for sameSite: 'none')        sameSite: isProduction ? 'strict' : 'lax',  
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7d
    });
};

module.exports = generateTokenAndSetCookie;