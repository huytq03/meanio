angular.module('mean.vendors').controller('VendorsController', ['$scope', 'Global', 'Vendors', function ($scope, Global, Vendors, ngTableParams) {
    $scope.global = Global;
    $scope.vendors = [];
    $scope.create = function() {
        var vendor = new Vendors({
            name: this.name,
            phone: this.phone,
            homePhone: this.homePhone,
            email: this.email,
            address: this.address
        });
        vendor.$save(function(response) {
            if(response.errors == undefined) {
                $location.path("vendors/" + response._id);
                notification.success('hay', 'qua');
            }

        });
    };

    $scope.remove = function(article) {
      
    };

    $scope.update = function() {
    
    };

    $scope.init = function() {
        Vendors.query(function(vendors) {
            $scope.vendors = vendors;
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                filter: {
                    name: ''       // initial filter
                }
            }, {
                total: vendors.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ?
                           $filter('filter')(vendors, params.filter()) :
                           vendors;
                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.users);
                }
            });
            notification.success('qua', 'hay');      
        });
    };
    
    $scope.findOne = function() {
        
    };

    
}]);