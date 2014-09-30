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
	    $scope.storeVal = {};

	    $scope.removeStore = function (item) {
	        var r = confirm("Are you sure you want to delete " + item.name + "?");
	        if (r == true) {
	            storeService.removeStore(item);
	        }
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
    'kmApp.libraries.notification.screenNotifyService',
    'kmApp.libraries.waitLoader','$filter',
    function ($scope, $rootScope, $routeParams, $location, storeService, userNotificationLibrary, waitLoader, $filter) {
        $scope.countryList = [{
            text: 'USA',
            someprop: 'USA'
        }, {
            text: 'Canada',
            someprop: 'Canada'
        }];
        $scope.countryVal = {};

        $scope.countyList = [{
            text: 'Option1',
            someprop: 'Option1'
        }, {
            text: 'Option2',
            someprop: 'Option2'
        }];
        $scope.countyVal = {};

        $scope.storeLists = storeService.getStores();
        $scope.storeVal = {};

        $scope.iscopy = $routeParams.copy;
        $scope.merchantid = 0;
        if ($scope.iscopy == null)
            $scope.iscopy = 'false';

        $scope.storeid = $routeParams.storeid;
        if ($scope.storeid != 0) {
            //finding element from json
            $scope.model = storeService.getStore($scope.storeid);

            var found = $filter('filter')($scope.countryList, { text: $scope.model.country }, true);
            $scope.countryVal = found[0];

            var found = $filter('filter')($scope.countyList, { text: $scope.model.county }, true);
            $scope.countyVal = found[0];

            var found = $filter('filter')($scope.storeLists, { groupname: $scope.model.groupname }, true);
            $scope.storeVal = found[0];

            if ($scope.iscopy == 'true') {
                $scope.model.name = $scope.model.name + ' copy';
                $scope.model.storeid = $scope.model.storeid + 1;
            }
            $scope.merchantid = $scope.model.merchantid;
        }

        $scope.saveStore = function () {
            $scope.model.country = $scope.countryVal.text;
            $scope.model.county = $scope.countyVal.text;
            //$scope.model.groupname = $scope.storeVal.groupname;

            if ($scope.storeid != 0 && $scope.iscopy == 'false')
                storeService.editStore($scope.storeid, $scope.model);
            else
                storeService.addStore($scope.model);

            userNotificationLibrary.addSuccess('store saved successfully!!!' + '<a href="#/store/id/' + $scope.storeid + '">' + $scope.model.name + '</a>');

            $location.path('/store/view');
        }
    }
]);

storeModule.controller('kmApp.modules.store.storeImportAction', ['$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'kmApp.libraries.store.storeService',
	'kmApp.libraries.notification.screenNotifyService',
	   function ($scope, $rootScope, $routeParams, $location, storeService,userNotificationLibrary) {
		   
		   $scope.fileInfo;
		   $scope.csvJSON=function (csv){	 
			  var lines=csv.split("\n");	 
			  var result = [];	 
			  var headers=lines[0].split(",");		 
			  for(var i=1;i<lines.length;i++){		 
				  var obj = {};
				  var currentline=lines[i].split(","); 
				  for(var j=0;j<headers.length;j++){
					  obj[headers[j]] = currentline[j];
				  }
				  result.push(obj); 
			  }
			  return JSON.stringify(result);
			}
			$scope.upload=function(file) {	
			 	
				if(file.type.match(/text\/csv/)){
					  $scope.fileInfo=file;	
					oFReader = new FileReader();
					oFReader.onloadend = function() {	
						var json = $scope.csvJSON(this.result);		
		                // console.log(json);
						 console.log(json);
						 $scope.$apply();
					};
					oFReader.readAsText(file);
				} else {
					console.log('error');
					userNotificationLibrary.addError("This file does not seem to be a CSV.");
				}
			}
	   }
]);