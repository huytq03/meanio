/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Item = mongoose.model('Item'),
    _ = require('lodash');


/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
    Item.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.item = item;
        next();
    });
};

/**
 * Create a item
 */
exports.create = function(req, res) {
    var item = new Item(req.body);
    item.createdBy = item.updatedBy = req.user;

    item.save(function(err) {
        if (err) {
            return res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Update a item
 */
exports.update = function(req, res) {
    var item = req.item;

    item = _.extend(item, req.body);
    item.updatedBy = req.user;
    //item.updated = Date.now;
    item.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Delete an item
 */
exports.destroy = function(req, res) {
    var item = req.item;

    item.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Show an item
 */
exports.show = function(req, res) {
    res.jsonp(req.item);
};

/**
 * List of items
 */
exports.all = function(req, res) {
    Item.find().sort('-created').populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(items);
        }
    });
};