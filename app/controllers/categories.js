/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    _ = require('lodash');


/**
 * Find Category by id
 */
exports.category = function (req, res, next, id) {
    Category.load(id, function (err, category) {
        if (err) return next(err);
        if (!category) return next(new Error('Failed to load category ' + id));
        req.category = category;
        next();
    });
};

/**
 * Create a Category
 */
exports.create = function (req, res) {
    var category = new Category(req.body);
    category.createdBy = category.updatedBy = req.user;
    category.save(function (err) {
        if (err) {
            return res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(category);
        }
    });
};

/**
 * Update a Category
 */
exports.update = function (req, res) {
    var category = req.category;
    category.updatedBy = req.user;
    category = _.extend(category, req.body);
    category.save(function (err) {
        res.jsonp(category);
    });
};

/**
 * Delete an Category
 */
exports.destroy = function (req, res) {
    var category = req.category;
    Category.find({
        parentId: category._id
    }).exec(function (err, categories) {
        if (err) {
            res.render('error', {
                status: 500,
                error: err
            });
        } else {
            if (categories.length) {
                categories.forEach(function (value) {
                    value.remove(function (err) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                            return;
                        }
                    });
                });
            }
            category.remove(function (err) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(category);
                }
            });
        }
    });

};

/**
 * Show an Category
 */
exports.show = function (req, res) {
    res.jsonp(req.category);
};

/**
 * List of Categorys
 */
exports.all = function (req, res) {
    Category.find().sort('-created').populate('user', 'name username').exec(function (err, categories) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(categories);
        }
    });
};