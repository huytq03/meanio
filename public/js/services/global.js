//Global service for global variables
angular.module('mean.system').factory("Global", [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user,
            //huytq Hard code global data
            showPage : 1,
            itemsPerPage : 10
            //end huytq
        };
       
        return _this._data;
    }
]);
