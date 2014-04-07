/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Article authorizations routing middleware
 */
exports.article = {
    hasAuthorization: function(req, res, next) {
        if (req.article.user.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Vendor authorizations routing middleware
 */
exports.vendor = {
    hasAuthorization: function(req, res, next) {
        // if (req.vendor.user.id != req.user.id) {
        //     return res.send(401, 'User is not authorized');
        // }
        //allways pass
        next();
    }
};

/**
 * Category authorizations routing middleware
 */
exports.category = {
    hasAuthorization: function(req, res, next) {
        //allways pass
        next();
    }
};

/**
 * Unit authorizations routing middleware
 */
exports.unit = {
    hasAuthorization: function(req, res, next) {
        //allways pass
        next();
    }
};

/**
 * Category authorizations routing middleware
 */
exports.item = {
    hasAuthorization: function(req, res, next) {
        //allways pass
        next();
    }
};