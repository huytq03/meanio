angular.module('mean.system').controller('HeaderController', ['$scope', 'Global' ,'$translate','$cookieStore', '$location', function ($scope, Global,$translate, $cookieStore, $location) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "HOME",
        "link": "/",
        "active" : true,
        "icon" : "../img/icons/home.png"
    }, {
        "title": "ARTICLES",
        "link": "articles",
        "active" : false,
        "icon" : "../img/icons/articles.png"
    }, {
        "title": "CUSTOMERS",
        "link": "VENDOR",
        "active" : false,
        "icon" : "../img/icons/customers.png"
    }, {
        "title": "STORE",
        "link": "CATEGORY",
        "active" : false,
        "icon" : "../img/icons/store.png"
    }];
    
    $scope.submenus = [{
                "title": "CUSTOMERS",
                "link": "customers",
                "parent" : "CUSTOMERS"
            }, {
                "title": "VENDOR",
                "link": "vendors",
                "parent" : "CUSTOMERS"
            }, {
                "title": "CATEGORY",
                "link": "categories",
                "parent" : "STORE"
            }, {
                "title": "ITEMS",
                "link": "items",
                "parent" : "STORE"
            }];

    $scope.submenu = [];        
    $scope.languages = Global.languages;
    $scope.isCollapsed = false;
    if($cookieStore.get('currentLanguage') == null)
        $cookieStore.put('currentLanguage',$scope.languages[0]);
    $translate.uses($cookieStore.get('currentLanguage'));

    $scope.changeLanguale = function(lang) {
        if(Global.languages.indexOf(lang) != -1) {
            $translate.uses(lang);
            $cookieStore.put('currentLanguage',lang);
            notification.success('Changed language successfully', 'HeaderController');
        } else {
            notification.warning('This language doesn\'t supported','HeaderController');
        }
    }

    $scope.navigation = function(item) {
        $scope.menu.forEach(function(value){
            value.active = false;
        });
        item.active = true;
        menu = [];
        link = '/';
        $scope.submenus.forEach(function(value) { 
            if(value.parent == item.title) {
                menu.push(value);
            }
            if(value.title == item.link) {
                link = value.link;
            }
        });
        $scope.submenu = menu;
        $location.path(link);
    }
}]);