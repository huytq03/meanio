/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Unit = mongoose.model('Unit'),
    _ = require('lodash');


/**
 * Find unit by id
 */
exports.unit = function(req, res, next, id) {
    Unit.load(id, function(err, unit) {
        if (err) return next(err);
        if (!unit) return next(new Error('Failed to load unit ' + id));
        req.unit = unit;
        next();
    });
};

/**
 * Create a unit
 */
exports.create = function(req, res) {
    var unit = new Unit(req.body);
    unit.createdBy = unit.updatedBy = req.user;

    unit.save(function(err) {
        if (err) {
            return res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(unit);
        }
    });
};

/**
 * Update a unit
 */
exports.update = function(req, res) {
    var unit = req.unit;

    unit = _.extend(unit, req.body);
    unit.updatedBy = req.user;
    //unit.updated = Date.now;
    unit.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(unit);
        }
    });
};

/**
 * Delete an unit
 */
exports.destroy = function(req, res) {
    var unit = req.unit;

    unit.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(unit);
        }
    });
};

/**
 * Show an unit
 */
exports.show = function(req, res) {
    res.jsonp(req.unit);
};

/**
 * List of units
 */
exports.all = function(req, res) {
    Unit.find().sort('-created').populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(function(err, units) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(units);
        }
    });
};