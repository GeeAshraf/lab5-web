const logEvent = require('../utilities/logger.js');

module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            logEvent(`AUTH FAILED | No User Info | IP: ${req.ip}`);
            return res.status(401).json({ error: "Not authenticated" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            logEvent(`AUTH DENIED | User ID: ${req.user.userId} | Rrquired: ${allowedRoles.join('.')} | IP: ${req.ip}`);
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};
