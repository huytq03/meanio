//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/vendors', {
            templateUrl: 'views/vendors/list.html'
        }).
        when('/vendors/create', {
            templateUrl: 'views/vendors/create.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

//translation
angular.module('mean').config(['$translateProvider',function ($translateProvider) {

    $translateProvider.translations('en_EN', {
        'NAME': 'Name',
        'ADDRESS': 'Address',
        'EMAIL': 'Email',
        'HOMEPHONE': 'Home Phone',
        'PHONE': 'Phone',
        'ARTICLES' : 'Articles',
        'VENDOR' : 'vendor',
        'HOME' : 'Home',
        'en_EN' : 'English',
        'vn_VN' : 'vietnames',
        'LANGUAGE' : 'Language',
        'SIGNUP' : 'Signup',
        'SIGNIN' : 'Signin',
        'SIGNOUT' : 'Sigout',
        'LOADSUCCESS' : 'Load successfully',
        'STORE' :'Store',
        'CUSTOMERS' : 'Customers'
    });   

    $translateProvider.translations('vn_VN', {
        'NAME': 'ten',
        'ADDRESS': 'dia chi',
        'EMAIL': 'email',
        'HOMEPHONE': 'dien thoai ban',
        'PHONE': 'di dong',        
        'ARTICLES' : 'bai viet',
        'VENDOR' : 'nha cung cap',
        'HOME' : 'nha',        
        'en_EN' : 'tieng anh',
        'vn_VN' : 'tieng viet',
        'LANGUAGE' : 'ngon ngu',
        'SIGNUP' : 'dang ky',
        'SIGNIN' : 'dang nhap',
        'SIGNOUT' : 'dang xuat',
        'CUSTOMERS' : 'khach hang'
    });   
    
}]);