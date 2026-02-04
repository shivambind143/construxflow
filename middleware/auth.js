const requireAuth = (req, res, next) => {
    if (!req.cookies.userId) {
        return res.redirect('/login');
    }
    next();
};

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.cookies.userId || !req.cookies.userRole) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.cookies.userRole)) {
            return res.status(403).send('Access Denied');
        }
        next();
    };
};

const redirectIfAuth = (req, res, next) => {
    if (req.cookies.userId && req.cookies.userRole) {
        return res.redirect(`/${req.cookies.userRole}/dashboard`);
    }
    next();
};

module.exports = { requireAuth, requireRole, redirectIfAuth };
