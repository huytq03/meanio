angular.module('mean', ['ngTable','pascalprecht.translate', 'ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.vendors', 'mean.notifications']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.vendors',['ngTable']);
angular.module('mean.notifications', []);