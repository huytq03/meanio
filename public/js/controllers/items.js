angular.module('mean.items').controller('ItemsController', ['$scope', '$routeParams', '$location', 'Global', 'Items', '$dialogs', '$modalStack', '$filter', 'ngTableParams', '$translate',
    function ($scope, $routeParams, $location, Global, Items, $dialogs, $modalStack, $filter, ngTableParams, $translate) {
        $scope.global = Global;
        $scope.items = [];

        $scope.create = function (item) {
            dlg = $dialogs.create('/views/items/create.html', 'ItemsController', {}, {});
            dlg.result.then(function (newItem) {
                if (item) {
                    newItem.parentId = item._id;
                }
                newItem.$save(function (response) {
                    $scope.items.push(response);
                }, function (error) {
                    $dialogs.error('server error when save');
                });
            }, function () {
                $scope.name = 'You decided not to enter in your name, that makes me sad.';
            });
        };

        $scope.cancel = function () {
            $modalStack.getTop().key.dismiss('canceled');
        };

        $scope.save = function (a, b) {
            var item = new Items({
                name: this.name,
                description: this.description,
                created: new Date().getTime(),
                updated: new Date().getTime(),
                parentId: '-1'
            });
            $modalStack.getTop().key.close(item);
        };

        $scope.remove = function (item) {
            dlg = $dialogs.confirm($translate('CONFIRMHEADER'), $translate('CONFIRMMESSAGE'));
            dlg.result.then(function (btn) {
                    if (!item) {
                        item = $scope.item;
                    }
                    item.$remove(function (value) {
                        for (var i in $scope.items) {
                            if ($scope.items[i] == item) {
                                $scope.items.splice(i, 1);
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

        $scope.update = function () {
            var item = $scope.item;
            
            item.updated = new Date().getTime();

            item.$update(function () {
                $location.path('items/' + item._id);
            }, function (err) {
                        $dialogs.error('server error when delete');
                    });
        };

        $scope.init = function (parentId) {
            Items.query(function (items) {
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
                    total: items.length, // length of data
                    getData: function ($defer, params) {
                        items = $filter('filter')(items, {parentId: parentId});//load parent only
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                            $filter('filter')(items, params.filter()) :
                            items;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            items;
                        params.total(orderedData.length); // set total for recalc pagination        
                        $scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.items);
                    }
                });
                notification.success('ItemsController', $translate('LOADSUCCESS'));
            }, function (err) {
                $dialogs.error('server error when query');
            });
        };

        $scope.findOne = function () {
            Items.get({
                itemId: $routeParams.itemId
            }, function (item) {
                $scope.item = item;
                $scope.init(item._id);           
            }, function (err) {
                $dialogs.error('server error when findOne');
            });
        };
    }
]);