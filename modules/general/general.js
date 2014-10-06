var generalModule = angular.module('kmApp.modules.general', ['angular.filter', 'kmApp.libraries.notification', 'ui.select']);

generalModule.controller('kmApp.modules.general.offer', function ($scope, $location, $rootScope) {

    $scope.TextMessagesOption = ['Per Week', 'Per Month','Per Day'];
    $scope.TextMessagesSelectVal;

    $scope.NotificationsOption = ['Per Week','Per Month','Per Day'];
    $scope.NotificationsSelectVal;

    $scope.emailMessagesOption = ['Per Week','Per Month','Per Day'];
    $scope.emailSelectVal;

});

generalModule.controller('kmApp.modules.general.codepools', function ($scope) {
    $scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };

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

    $scope.codeList = ['Code type', 'Code type1', 'Code type 2', 'Code type 3'];
    $scope.selectedCodeList = ['Code type', 'Code type1'];
});

generalModule.controller('kmApp.modules.general.connected', function ($scope, $http, $timeout) {
	$scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };
    $scope.model = {
        'provider': [{
            text: 'Twillio',
            someprop: 'Twillio'
                   },
                    {
                        text: 'Twillio 2',
                        someprop: 'Twillio 2'
                    },
                    {
                        text: 'Twillio 3',
                        someprop: 'Twillio 3'
                    },
        ],
        'accesstoken': '324234asdff',
        'shortcode': '32443',
        'keyword': '234234'
    };
	$scope.provider=[{ text: 'Twillio', someprop: 'Twillio'},
                     {text: 'Twillio 2', someprop: 'Twillio 2'},
                     {text: 'Twillio 3',someprop: 'Twillio 3'},
                    ];
	
    $scope.selectprovider = ['Twillio','asdas']; // init selected item
    $scope.selectProviderList = ['Twillio','Twillio 2','Twillio 3'];

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