angular.module('mean.units').controller('UnitsController', ['$scope', '$routeParams', '$location', 'Global', 'Units', '$dialogs', '$modalStack', '$filter', 'ngTableParams', '$translate',
    function ($scope, $routeParams, $location, Global, Units, $dialogs, $modalStack, $filter, ngTableParams, $translate) {
        $scope.global = Global;
        $scope.units = [];

        $scope.create = function (unit) {
            dlg = $dialogs.create('/views/units/createOrEdit.html', 'UnitsController', {}, {});
            dlg.result.then(function (newUnit) {
                newUnit.$save(function (response) {
                    $scope.units.push(response);
                    notification.success('UnitsController', $translate('SAVESUCCESS'));
                }, function (error) {
                    $dialogs.error('server error when save');
                });
            }, function () {
                $scope.name = 'You decided not to enter in your name, that makes me sad.';
            });
        };

        $scope.edit = function (unitId) {
            if (unitId == undefined) {
                $dialogs.error('invaild unitId');
            } else {
                Units.get({
                    unitId: unitId
                }, function (unit) {
                    $scope.unit = unit;
                    dlg = $dialogs.create('/views/units/createOrEdit.html', 'UnitsController', {}, {}, $scope);
                    dlg.result.then(function (changedUnit) {
                        changedUnit.$update(function (response) {
                            $location.path("units");
                            notification.success('UnitsController', $translate('SAVESUCCESS'));
                        }, function (error) {
                            $dialogs.error('server error when save');
                        });
                    }, function () {
                        $scope.name = 'You decided not to enter in your name, that makes me sad.';
                    });
                }, function (err) {
                    $dialogs.error('server error when find unit');
                });
            }
            
        };

        $scope.cancel = function () {
            $modalStack.getTop().key.dismiss('canceled');
        };

        $scope.save = function (a, b) {
            if(this.unit._id == undefined) {
                var unit = new Units({
                    name: this.unit.name,
                    description: this.unit.description,
                    created: new Date().getTime()                    
                });
            } else {
                var unit = this.unit;
            }
            unit.updated = new Date().getTime();
            $modalStack.getTop().key.close(unit);
        };

        $scope.remove = function (unit) {
            dlg = $dialogs.confirm($translate('CONFIRMHEADER'), $translate('CONFIRMMESSAGE'));
            dlg.result.then(function (btn) {
                    if (!unit) {
                        unit = $scope.unit;
                    }
                    unit.$remove(function (value) {
                        for (var i in $scope.units) {
                            if ($scope.units[i] == unit) {
                                $scope.units.splice(i, 1);
                            }
                        }
                    }, function (err) {
                        $dialogs.error('server error when delete');
                    });
                },
                function (btn) {
                    //closed box normally
                });

        };

        // $scope.update = function () {
        //     var unit = $scope.unit;
            
        //     unit.updated = new Date().getTime();

        //     unit.$update(function () {
        //         $location.path('units/' + unit._id);
        //     }, function (err) {
        //                 $dialogs.error('server error when delete');
        //             });
        // };

        $scope.init = function () {
            Units.query(function (units) {
                $scope.tableParams = new ngTableParams({
                    page: 1, // show first page
                    count: 10, // count per page
                    filter: {
                        name: '' // initial filter
                    },
                    sorting: {
                        name: 'asc' // initial sorting
                    }
                }, {
                    total: units.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                            $filter('filter')(units, params.filter()) :
                            units;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            units;
                        params.total(orderedData.length); // set total for recalc pagination        
                        $scope.units = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.units);
                    }
                });
                notification.success('UnitsController', $translate('LOADSUCCESS'));
            }, function (err) {
                $dialogs.error('server error when query');
            });
        };

    }
]);