var storeModule = angular.module('kmApp.modules.store', ['angular.filter', 'kmApp.libraries.notification', 'kmApp.libraries.store']);

/* Controllers */
storeModule.controller('kmApp.modules.store.storelistAction', ['$scope',
     '$rootScope',
   '$routeParams',
    'kmApp.libraries.store.storeService',
	function ($scope, $rootScope, $routeParams, storeService) {

	    $scope.sel = 'MerchId';
	    $scope.sortField = 'merchantid';
	    $scope.reverse = true;

	    $scope.storeLists = storeService.getStores();

	    $scope.copyStore = function (item) {
	        storeService.copyStore(item);
	    }

	    $scope.removeStore = function (item) {
	        storeService.removeStore(item);
	    }

	    $scope.deActiveStore = function (item) {

	    }

	    $scope.saveAsTempStore = function (item) {

	    }
	}
]);

storeModule.controller('kmApp.modules.store.storeEditAction', ['$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'kmApp.libraries.store.storeService',
	   function ($scope, $rootScope, $routeParams, $location, storeService) {
	       $scope.iscopy = $routeParams.copy;
	       $scope.merchantid = 0;
	       if ($scope.iscopy == null)
	           $scope.iscopy = 'false';

	       $scope.storeid = $routeParams.storeid;
	       if ($scope.storeid != 0) {
	           //finding element from json
	           $scope.model = storeService.getStore($scope.storeid);
	           if ($scope.iscopy == 'true') {
	               $scope.model.name = $scope.model.name + ' copy';
	               $scope.model.storeid = $scope.model.storeid + 1;
	           }
	           $scope.merchantid = $scope.model.merchantid;
	       }

	       $scope.saveStore = function () {
	           if ($scope.storeid != 0 && $scope.iscopy == 'false')
	               storeService.editStore($scope.storeid, $scope.model);
	           else
	               storeService.addStore($scope.model);
	           $location.path('/store/view');
	       }
	   }
]);

storeModule.controller('kmApp.modules.store.storeImportAction', ['$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'kmApp.libraries.store.storeService',
	   function ($scope, $rootScope, $routeParams, $location, storeService) {
	       
	   }
]);