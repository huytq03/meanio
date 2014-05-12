//Articles service used for articles REST endpoint
angular.module('mean.items').factory("Items", ['$resource', function($resource) {
    return $resource('items/:itemId', {
        itemId: '@_id'    
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);