//Articles service used for articles REST endpoint
angular.module('mean.vendors').factory("Vendors", ['$resource', function($resource) {
    return $resource('vendors/:venorId', {
        venorId: '@_id'    
    });
}]);