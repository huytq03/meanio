angular.module('mean.categories').controller('CategoriesController', ['$scope', '$routeParams', '$location', 'Global', 'Categories', '$dialogs', '$modalStack', '$filter', 'ngTableParams', '$translate',
    function ($scope, $routeParams, $location, Global, Categories, $dialogs, $modalStack, $filter, ngTableParams, $translate) {
        $scope.global = Global;
        $scope.categories = [];

        $scope.create = function () {
            dlg = $dialogs.create('/views/categories/create.html','CategoriesController',{},{});
            dlg.result.then(function(data){
              $scope.name = data;
            },function(){
              $scope.name = 'You decided not to enter in your name, that makes me sad.';
            });

            // var category = new Categories({
            //     title: this.title,
            //     content: this.content
            // });
            // category.$save(function (response) {
            //     $location.path("categories/" + response._id);
            // });

            // this.title = "";
            // this.content = "";
        };

        $scope.cancel = function () {
            $modalStack.getTop().key.dismiss('canceled');  
        };
        
        $scope.save = function () {
            $modalStack.getTop().key.close();

            var category = new Categories({
                name: this.name,
                description: this.description,
                created : new Date().getTime(),
                updated : new Date().getTime()
                });
            category.$save(function(response) {
                $location.path("categories");
            },function(error) {
                $dialogs.error('server error when save');
            });
        };

        $scope.remove = function (category) {
            dlg = $dialogs.confirm($translate('CONFIRMHEADER'), $translate('CONFIRMMESSAGE'));
            dlg.result.then(function (btn) {
                if (!category) {
                    category = $scope.category;
                }
                category.$remove(function (value) {
                    for (var i in $scope.categories) {
                        if ($scope.categories[i] == $scope.category) {
                            $scope.categories.splice(i, 1);
                        }
                    }
                    $location.path('categories');
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
            if (!category.updated) {
                category.updated = [];
            }
            category.updated.push(new Date().getTime());

            category.$update(function () {
                $location.path('categories/' + category._id);
            });
        };

        $scope.init = function () {
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
            });
        };
    }
]);