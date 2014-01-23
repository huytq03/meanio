/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Vendor = mongoose.model('Vendor'),
    _ = require('lodash');


/**
 * Find vendor by id
 */
exports.vendor = function(req, res, next, id) {
    Vendor.load(id, function(err, vendor) {
        if (err) return next(err);
        if (!vendor) return next(new Error('Failed to load vendor ' + id));
        req.vendor = vendor;
        next();
    });
};

/**
 * Create a vendor
 */
exports.create = function(req, res) {
    var vendor = new Vendor(req.body);
    vendor.createdBy = vendor.updatedBy = req.user;

    vendor.save(function(err) {
        if (err) {
            return res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Update a vendor
 */
exports.update = function(req, res) {
    var vendor = req.vendor;

    vendor = _.extend(vendor, req.body);
    vendor.updatedBy = req.user;
    //vendor.updated = Date.now;
    vendor.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Delete an vendor
 */
exports.destroy = function(req, res) {
    var vendor = req.vendor;

    vendor.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Show an vendor
 */
exports.show = function(req, res) {
    res.jsonp(req.vendor);
};

/**
 * List of vendors
 */
exports.all = function(req, res) {
    Vendor.find().sort('-created').populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(function(err, vendors) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(vendors);
        }
    });
};