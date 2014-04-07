//Units service used for articles REST endpoint
angular.module('mean.units').factory("Units", ['$resource', function($resource) {
    return $resource('units/:unitId', {
        unitId: '@_id'    
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);