/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Vendor = mongoose.model('Vendor'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var vendor = new Vendor(req.body);
    vendor.createdBy = vendor.updatedBy = req.user;

    vendor.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                vendor: vendor
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var vendor = req.vendor;

    vendor = _.extend(vendor, req.body);
    vendor.updatedBy = req.user;
    vendor.updated = Date.now;
    vendor.save(function(err) {
        res.jsonp(vendor);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var vendor = req.vendor;

    vendor.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.vendor);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Vendor.find().sort('-created').exec(function(err, vendors) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(vendors);
        }
    });
};