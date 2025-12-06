const jwt = require('jsonwebtoken');
const logEvent = require('../utilities/logger.js');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] : null;

        if (!token) {
            logEvent(`AUTH FAILED | Missing Token | IP: ${req.ip}`);
            return res.status(401).json({ error: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId, role: decoded.role };
        next(); 
    } catch (err) {
        logEvent(`AUTH FAILED | Invalid Token | Reason: ${EvalError.message} | IP: ${req.ip}`);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};