const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    

    const token = req.cookies.access_token || 
                  (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        console.log("❌ No token found in cookies or headers");
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY );
         req.user = decoded;
        next(); 
    } catch (error) {
        console.log("❌ Token verification failed:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;