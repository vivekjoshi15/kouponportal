var generalModule= angular.module('kmApp.modules.general',[]);

generalModule.controller('kmApp.modules.general.offer', function ($scope, $location, $rootScope) {
    
	    $scope.TextMessagesOption=[{text:'Per Week'},{text:'Per Month'},{text:'Per Day'}];
	    $scope.TextMessagesSelectVal;
		
		$scope.NotificationsOption=[{text:'Per Week'},{text:'Per Month'},{text:'Per Day'}];
	    $scope.NotificationsSelectVal;
		
		$scope.emailMessagesOption=[{text:'Per Week'},{text:'Per Month'},{text:'Per Day'}];
	    $scope.emailSelectVal;
	
});

generalModule.controller('kmApp.modules.general.codepools', function ($scope) {
    $scope.poolList = [
                 { name: "Victoria's Secret PLU Codes", id: 1, selectCodeType: "Select Code Type", file: 'filename.cvs' }
    ];
    $scope.edit = function (item) {
        $scope.editIndex = $scope.poolList.indexOf(item);
        $scope.model = item;
        $scope.newpool = true;
        $scope.IsEdit = true;
    };
    $scope.remove = function (item) {
        $scope.poolList.splice($scope.poolList.indexOf(item), 1);
    }
    $scope.uploadPool = function () {
        $scope.poolList.push($scope.model);
        $scope.model = "";
        $scope.newpool = false;
    }
    $scope.UpdatePool = function () {
        //$scope.poolList[editIndex]=$scope.model;
        $scope.model = "";
        $scope.newpool = false;
        $scope.IsEdit = false;
    }
	
	$scope.selectCodeList=[{text:'Code type'},{text:'Code type 2'},{text:'Code type 3'}];
	
	
	

});

generalModule.controller('kmApp.modules.general.connected', function ($scope) {

    $scope.model = {
        'provider': [{ text: 'Twillio' },
                    { text: 'Twillio 2' },
                    { text: 'Twillio 3' },
        ],
        'accesstoken': '324234asdff',
        'shortcode': '32443',
        'keyword': '234234'
    };
    $scope.selectprovider = $scope.model.provider[0]; // init selected item
    $scope.selectProviderList=$scope.model.provider;
    $scope.selected = function (item) {
        $scope.selectprovider = item;
    }

});

generalModule.controller('kmApp.modules.general.store', function ($scope) {


    $scope.storeGroup = [{ name: 'Albany Stores East', value: 12 },
                        { name: 'Coast Stores North', value: 06 },
                        { name: 'tores Southern Stores', value: 07 }];

    $scope.GeofenceGroup = [{ name: 'Albany Stores East', value: 12 },
                          { name: 'Coast Stores North', value: 06 },
                          { name: 'tores Southern Stores', value: 07 }];

    $scope.BeaconGroup = [{ name: 'Albany Stores East', value: 12 },
                        { name: 'Coast Stores North', value: 06 },
                        { name: 'tores Southern Stores', value: 07 }];


});