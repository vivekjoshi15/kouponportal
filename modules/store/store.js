var storeModule = angular.module('kmApp.modules.store', ['angular.filter', 'kmApp.libraries.notification', 'kmApp.libraries.store']);

/* Controllers */
storeModule.controller('kmApp.modules.store.storelistAction',
					   ['$scope',
						'$rootScope',
						'$routeParams',
						'$location',
						'$filter',
						'kmApp.libraries.store.storeService',
						function ($scope, $rootScope, $routeParams,$location,$filter,storeService) {
							
		$scope.tabledata = {};
		$scope.selectedtagid = 0;
		$scope.pagesize = 3;
		$scope.searchtext = '';
		$scope.currentpage = 1;
		$scope.skipsize = 0;
		$scope.pagenumbers = [1];
		
		$rootScope.getPassTableDetail = function () {
        var stext = $scope.searchtext;
			if (stext == '') {
				stext = '-';
			}
	   // var data=campaignService.searchCampaign(stext);
		
		}
		$scope.getnextpage = function () {
			$rootScope.skipsize = $scope.currentpage;
			$scope.currentpage = $scope.currentpage + 1;
			$rootScope.getPassTableDetail();
		}
		$scope.getprevpage = function () {
			$scope.currentpage = $scope.currentpage - 1;
			$rootScope.skipsize = $scope.currentpage - 1;
			$rootScope.getPassTableDetail();
		}
		$scope.getselectpage = function (num) {
			$scope.currentpage = num;
			$rootScope.skipsize = $scope.currentpage - 1;
			$rootScope.getPassTableDetail();
		}
		$scope.getPageNumbers = function (pageNum) {
			var totalPages = $scope.numberOfPages();
			$scope.pagenumbers = [];
			var endPage = $scope.pagesize;
			if (totalPages < $scope.pagesize + pageNum) {
				endPage = totalPages;
			}
			else {
				endPage = $scope.pagesize + pageNum;
			}
			if (pageNum == 0) { pageNum++; }
			for (var i = pageNum; i <= endPage; i++) {
				$scope.pagenumbers.push(i);
			}
		};
	
		$scope.numberOfPages = function () {
			if ($scope.tabledata === undefined)
				return 0;
			if ($scope.tabledata.rowval === undefined)
				return 0;
			return Math.ceil($scope.tabledata.totalcount / $scope.pagesize);
		}
		
	    $scope.tableRowVal=function(data){
		     var rowval=[];
		     for (var i = 0; i < data.length; i++) {
		 		var rowdata=[];
					rowdata.push(data[i].merchantid);
					rowdata.push(data[i].name);
					rowdata.push(data[i].groupname);
					rowdata.push(data[i].address);
					rowdata.push(data[i].city);
					rowdata.push(data[i].state);
					rowval.push(rowdata);				
			 } 
			 return rowval;
	    }
		
		$scope.data = storeService.getStores();	
		$scope.tabledata = {
			"header": [
					{ "name": "MerchId", "desc": "Merch Id", "type": "ID" },
					{ "name": "storeName", "desc": "Store Name", "type": "n" },
					{ "name": "groups", "desc": "Groups", "type": "s" },
					{ "name": "address", "desc": "Address", "type": "s" },
					{ "name": "city", "desc": "City ", "type": "s" },
					{ "name": "state", "desc": "State ", "type": "s" }
			],
			"rowval": []
		};
		$scope.tabledata.rowval= $scope.tableRowVal($scope.data);
		
		$scope.totalcount = $scope.tabledata.rowval.length;
		
		$scope.tabledata.totalcounttext = 'Total Stores';
			
		
		$scope.editStore=function(I,K){
			 var found = $filter('filter')($scope.data, { merchantid: parseInt(K[0]) }, true);
			 $location.path('/'+$rootScope.UserData.clientName+'/store/id/'+found[0].storeid);
		}
		
        $scope.copyStore=function(I,K){
			var found = $filter('filter')($scope.data, { merchantid: parseInt(K[0]) }, true);
			$location.path('/'+$rootScope.UserData.clientName+'/store/id/'+found[0].storeid+'/copy/true');
		}


	   $scope.removeStore = function (I,K) {
		   var found = $filter('filter')($scope.data, { merchantid: parseInt(K[0]) }, true);
		   console.log($scope.tableRowVal);
	        var r = confirm("Are you sure you want to delete " + found[0].name + "?");
	        if (r == true) {
	           $scope.data = storeService.removeStore(found[0]);
			   $scope.tabledata.rowval=$scope.tableRowVal($scope.data);
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
		
		$scope.country={};
		$scope.countryList = [{ code: "USA", name: 'USA' }, { code: "Canada", name: 'Canada' }];

        $scope.county = {};
        $scope.countyList = [{ code: "Option1", name: 'Option1' }, { name: 'Option2', code: "Option2" }];

        $scope.storeLists = storeService.getStoreName();
        $scope.groupname = {};

        $scope.state = {};
        $scope.states = [ 
            { code: "AL", name: "Alabama" },
            { code: "AK", name: "Alaska" },
            { code: "AZ", name: "Arizona" },
            { code: "AR", name: "Arkansas" },
            { code: "CA", name: "California" },
            { code: "CO", name: "Colorado" },
            { code: "CT", name: "Connecticut" },
            { code: "DE", name: "Delaware" },
            { code: "DC", name: "District Of Columbia" },
            { code: "FL", name: "Florida" },
            { code: "GA", name: "Georgia" },
            { code: "HI", name: "Hawaii" },
            { code: "ID", name: "Idaho" },
            { code: "IL", name: "Illinois" },
            { code: "IN", name: "Indiana" },
            { code: "IA", name: "Iowa" },
            { code: "KS", name: "Kansas" },
            { code: "KY", name: "Kentucky" },
            { code: "LA", name: "Louisiana" },
            { code: "ME", name: "Maine" },
            { code: "MD", name: "Maryland" },
            { code: "MA", name: "Massachusetts" },
            { code: "MI", name: "Michigan" },
            { code: "MN", name: "Minnesota" },
            { code: "MS", name: "Mississippi" },
            { code: "MO", name: "Missouri" },
            { code: "MT", name: "Montana" },
            { code: "NE", name: "Nebraska" },
            { code: "NV", name: "Nevada" },
            { code: "NH", name: "New Hampshire" },
            { code: "NJ", name: "New Jersey" },
            { code: "NM", name: "New Mexico" },
            { code: "NY", name: "New York" },
            { code: "NC", name: "North Carolina" },
            { code: "ND", name: "North Dakota" },
            { code: "OH", name: "Ohio" },
            { code: "OK", name: "Oklahoma" },
            { code: "OR", name: "Oregon" },
            { code: "PA", name: "Pennsylvania" },
            { code: "RI", name: "Rhode Island" },
            { code: "SC", name: "South Carolina" },
            { code: "SD", name: "South Dakota" },
            { code: "TN", name: "Tennessee" },
            { code: "TX", name: "Texas" },
            { code: "UT", name: "Utah" },
            { code: "VT", name: "Vermont" },
            { code: "VA", name: "Virginia" },
            { code: "WA", name: "Washington" },
            { code: "WV", name: "West Virginia" },
            { code: "WI", name: "Wisconsin" },
            { code: "WY", name: "Wyoming" }
        ];

        $scope.state.selected = undefined;

        $scope.iscopy = $routeParams.copy;
        $scope.merchantid = 0;
        if ($scope.iscopy == null)
            $scope.iscopy = 'false';

        $scope.storeid = $routeParams.storeid;
        if ($scope.storeid != 0) {
            //finding element from json
            $scope.model = storeService.getStore($scope.storeid);

            var found = $filter('filter')($scope.countryList, { code: $scope.model.country }, true);
            $scope.countryVal = found[0];

            var found = $filter('filter')($scope.countyList, { code: $scope.model.county }, true);
            $scope.countyVal = found[0];

            var found = $filter('filter')($scope.storeLists, { groupname: $scope.model.groupname }, true);
            $scope.groupname = found[0];

            var found = $filter('filter')($scope.states, { code: $scope.model.state }, true);
            $scope.state.selected = found[0];

            if ($scope.iscopy == 'true') {
                $scope.model.name = $scope.model.name + ' copy';
                $scope.model.storeid = $scope.model.storeid + 1;
            }
            $scope.merchantid = $scope.model.merchantid;
        }

        $scope.saveStore = function () {
            $scope.model.state = $scope.state.selected.code;
            $scope.model.country = $scope.countryVal.code;
            $scope.model.county = $scope.countyVal.code;
            //$scope.model.groupname = $scope.groupname.code;
            console.log($scope.model.state);
            console.log($scope.model.country);

            if ($scope.storeid != 0 && $scope.iscopy == 'false')
                storeService.editStore($scope.storeid, $scope.model);
            else
                storeService.addStore($scope.model);

            userNotificationLibrary.addSuccess('store saved successfully!!!' + '<a href="#/store/id/' + $scope.storeid + '">' + $scope.model.name + '</a>');

            $location.path('/'+$rootScope.clientName+'/store/view');
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
		   $scope.removeFile=function(){
			     $scope.fileInfo='';
				 $scope.storeList="";
		   }
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
			  return result;
			}
			$scope.upload=function(file) {	
			 	console.log(file)
				//if(file.type.match(/text\/csv/)){
				if(file.name.match(/csv/)){
					$scope.fileInfo=file;	
					oFReader = new FileReader();
					oFReader.onloadend = function() {	
						$scope.storeList = $scope.csvJSON(this.result);		
		                // console.log(json);
						// console.log($scope.storeList);
						 $scope.$apply();
					};
					oFReader.readAsText(file);
				} else {
					userNotificationLibrary.addError("This file does not seem to be a CSV.");
					$scope.$apply();
				}
			}
			$scope.storeUpload =function(){
				if($scope.storeList != null){
			      for(var i=0;i<$scope.storeList.length;i++){
					   storeService.addStore($scope.storeList[i]);   
				  }
				  userNotificationLibrary.addSuccess('Upload list Successfully');
				}
				else{
					 userNotificationLibrary.addError('Please Select a CSV file');
				}
				$scope.$apply();
			}
	   }
]);