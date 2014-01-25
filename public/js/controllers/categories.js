angular.module('mean.categories').controller('CategoriesController', ['$scope', '$routeParams', '$location', 'Global', 'Categories', '$dialogs', '$modalStack', '$filter', 'ngTableParams', '$translate',
    function ($scope, $routeParams, $location, Global, Categories, $dialogs, $modalStack, $filter, ngTableParams, $translate) {
        $scope.global = Global;
        $scope.categories = [];

        $scope.create = function (category) {
            dlg = $dialogs.create('/views/categories/create.html', 'CategoriesController', {}, {});
            dlg.result.then(function (newCateogry) {
                if (category) {
                    newCateogry.parentId = category._id;
                }
                newCateogry.$save(function (response) {
                    $scope.categories.push(response);
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
            var category = new Categories({
                name: this.name,
                description: this.description,
                created: new Date().getTime(),
                updated: new Date().getTime(),
                parentId: '-1'
            });
            $modalStack.getTop().key.close(category);
        };

        $scope.remove = function (category) {
            dlg = $dialogs.confirm($translate('CONFIRMHEADER'), $translate('CONFIRMMESSAGE'));
            dlg.result.then(function (btn) {
                    if (!category) {
                        category = $scope.category;
                    }
                    category.$remove(function (value) {
                        for (var i in $scope.categories) {
                            if ($scope.categories[i] == category) {
                                $scope.categories.splice(i, 1);
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
            var category = $scope.category;
            
            category.updated = new Date().getTime();

            category.$update(function () {
                $location.path('categories/' + category._id);
            }, function (err) {
                        $dialogs.error('server error when delete');
                    });
        };

        $scope.init = function (parentId) {
            Categories.query(function (categories) {
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
                    total: categories.length, // length of data
                    getData: function ($defer, params) {
                        categories = $filter('filter')(categories, {parentId: parentId});//load parent only
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                            $filter('filter')(categories, params.filter()) :
                            categories;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            categories;
                        params.total(orderedData.length); // set total for recalc pagination        
                        $scope.categories = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.categories);
                    }
                });
                notification.success('CategoriesController', $translate('LOADSUCCESS'));
            }, function (err) {
                $dialogs.error('server error when query');
            });
        };

        $scope.findOne = function () {
            Categories.get({
                categoryId: $routeParams.categoryId
            }, function (category) {
                $scope.category = category;
                $scope.init(category._id);           
            }, function (err) {
                $dialogs.error('server error when findOne');
            });
        };
    }
]);