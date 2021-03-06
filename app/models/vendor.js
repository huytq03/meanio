/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Vendor Schema
 */
var VendorSchema = new Schema({
    name: {
        type: String,
        default: '',
        unique: true,
        required:true,
        trim: true
    },
    phone: {
        type: Number,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    address: {
        type: String,
        default: '',        
        required:true,
        trim: true
    },
    website: {
        type: String,
        default: '',
        trim: true
    },
    bankAcc: {
        type: Number,
        default: '',
        trim: true
    },
    bank: {
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

/**
 * Validations
 */
// VendorSchema.path('name').validate(function(name) {
//     return name.length;
// }, 'Name cannot be blank');

// VendorSchema.path('email').validate(function(email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email.text);
// }, 'Email cannot be blank');

// VendorSchema.path('address').validate(function(address) {
//     return address.length;
// }, 'Address cannot be blank');
/**
 * Statics
 */
VendorSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('createdBy', 'name username').populate('updatedBy', 'name username').exec(cb);
};

mongoose.model('Vendor', VendorSchema);