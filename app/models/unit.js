/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Unit Schema
 */
var UnitSchema = new Schema({
    name: {
        type: String,
        default: '',
        unique: true,
        required:true,
        trim: true
    },
    description: {
        type: String,
        default: '',
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

UnitSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(cb);
};

mongoose.model('Unit', UnitSchema);