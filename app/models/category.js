/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Category Schema
 */
var CategorySchema = new Schema({
    
    name: {
        type: String,
        trim: true,
        unique: true,        
        required:true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    parentId: {
        type: String,
        default: '-1',
        trim: true
    },
    created: {
        type: Number,
        required:true
    },
    updated: {
        type: Number,
        required:true
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    }
});

/**
 * Validations
 */
CategorySchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
CategorySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(cb);
};

mongoose.model('Category', CategorySchema);
