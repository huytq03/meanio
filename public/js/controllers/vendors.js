angular.module('mean.vendors').controller('VendorsController', ['$scope', '$routeParams', 'Global', '$filter', 'Vendors','ngTableParams','$translate', '$location' ,'$dialogs', function ($scope, $routeParams, Global,$filter, Vendors, ngTableParams, $translate, $location, $dialogs) {
    $scope.global = Global;
    $scope.vendors = [];
     
    $scope.save = function() {
        // var vendor = new Vendors({
        //     name: this.name,
        //     address: this.address,
        //     email: this.email,
        //     phone: this.phone,
        //     bankAcc: this.bankAcc,
        //     bank: this.bank,
        //     website: this.website
        // });
        if($scope.vendor._id == undefined) {
        $scope.vendor.$save(function(response) {
            if(response.errors == undefined) {
                $location.path("vendors");
                notification.success('VendorsController', $translate('SAVESUCCESS'));
            }

        });
        } else {
        $scope.vendor.$update(function(response) {
            $location.path("vendors");
            notification.success('VendorsController', $translate('SAVESUCCESS'));
        });
    }
    };

    $scope.delete = function(vendor) {
      dlg = $dialogs.confirm($translate('CONFIRMHEADER'),$translate('CONFIRMMESSAGE'));
        dlg.result.then(function(btn){
            if (vendor) {
                vendor.$remove();  

                for (var i in $scope.vendors) {
                    if ($scope.vendors[i] == vendor) {
                        $scope.vendors.splice(i, 1);
                    }
                }
            }
            else {
                $scope.vendor.$remove();
                $location.path('vendors');
            }
        },function(btn){
          //closed box normally
        });
    };

    $scope.update = function() {
    
    };

    $scope.init = function() {
        Vendors.query(function(vendors) {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                filter: {
                    name: ''       // initial filter
                },
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: vendors.length, // length of data
                getData: function($defer, params) {
                   // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(vendors, params.filter()) :
                            vendors;
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            vendors;
                    params.total(orderedData.length); // set total for recalc pagination        
                    $scope.vendors = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve($scope.vendors);
                }
            });
            notification.success('VendorsController', $translate('LOADSUCCESS'));    
        });
    };
    
    $scope.findOne = function() {
        if($routeParams.vendorId == undefined) {
            $scope.vendor = new Vendors();
        } else {
            Vendors.get({
                vendorId: $routeParams.vendorId
            }, function(vendor) {
                $scope.vendor = vendor;
            });
    }
    };

    
}]);