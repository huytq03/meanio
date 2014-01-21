//Articles service used for articles REST endpoint
angular.module('mean.vendors').factory("Vendors", ['$resource', function($resource) {
    return $resource('vendors/:vendorId', {
        vendorId: '@_id'    
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);