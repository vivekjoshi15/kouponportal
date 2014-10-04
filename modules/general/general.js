var generalModule = angular.module('kmApp.modules.general', ['ngDropdowns']);

generalModule.controller('kmApp.modules.general.offer', function ($scope, $location, $rootScope) {

    $scope.TextMessagesOption = [{ text: 'Per Week' }, { text: 'Per Month' }, { text: 'Per Day' }];
    $scope.TextMessagesSelectVal;

    $scope.NotificationsOption = [{ text: 'Per Week' }, { text: 'Per Month' }, { text: 'Per Day' }];
    $scope.NotificationsSelectVal;

    $scope.emailMessagesOption = [{ text: 'Per Week' }, { text: 'Per Month' }, { text: 'Per Day' }];
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

    $scope.selectCodeList = [{ text: 'Code type' }, { text: 'Code type 2' }, { text: 'Code type 3' }];
});

generalModule.controller('kmApp.modules.general.connected', function ($scope, $http, $timeout) {

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
	
    $scope.selectprovider = $scope.model.provider[0]; // init selected item
    $scope.selectProviderList = $scope.model.provider;
    $scope.selected = function (item) {
        $scope.selectprovider = item;
    }
	$scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.someGroupFn = function (item){

    if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';

    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';

  };


  $scope.counter = 0;
  $scope.someFunction = function (item, model){
    $scope.counter++;
    $scope.eventResult = {item: item, model: model};
  };

  $scope.person = {};
  $scope.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'United States' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'United States' }
  ];

  $scope.country = {};
  $scope.countries = [ 
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},

  ];

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