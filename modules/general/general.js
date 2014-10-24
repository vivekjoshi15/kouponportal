var generalModule = angular.module('kmApp.modules.general', ['angular.filter', 'kmApp.libraries.notification', 'ngSanitize', 'ui.select']);

generalModule.value('links',
    {
        "module": "General Settings",
        "items":
        [{
            "url": "general",
            "title": "Offers"
        },
        {
            "url": "general/codepools",
            "title": "Code Pools"
        },
        {
            "url": "general/connected",
            "title": "Connected Services"
        },
        {
            "url": "general/store",
            "title": "Stores"
        },
        {
            "url": "general/apikeys",
            "title": "API Keys"
        }]
    });

generalModule.controller('kmApp.modules.general.offer', [
    '$scope',
    '$routeParams',
    '$location',
    'links',
    'kmApp.libraries.general.generalService',
    '$filter',
     'kmApp.libraries.notification.screenNotifyService',
     'kmApp.libraries.waitLoader',
    function ($scope, $routeParams, $location, links, generalService, $filter, userNotificationLibrary, waitLoader) {
        $scope.title = "Offers";
        $scope.links = links;

        $scope.disabled = undefined;
        $scope.disable = function () {
            $scope.disabled = true;
        };

        //Fetching Json for General Offer Settings
        $scope.GeneralOffers = generalService.getGeneralOffersResponse();

        $scope.clear = function () {
            $scope.TextMessagesOption.selected = $scope.TextMessagesOptions[$scope.TextMessagesOptions.indexOf($filter('filter')($scope.TextMessagesOptions, { value: parseInt($scope.GeneralOffers.TextmessageLimitPeriod) }, true)[0])];
            $scope.NotificationsOption.selected = $scope.NotificationsOptions[$scope.NotificationsOptions.indexOf($filter('filter')($scope.NotificationsOptions, { value: parseInt($scope.GeneralOffers.PushmessageLimitPeriod) }, true)[0])];
            $scope.EmailMessagesOption.selected = $scope.EmailMessagesOptions[$scope.EmailMessagesOptions.indexOf($filter('filter')($scope.EmailMessagesOptions, { value: parseInt($scope.GeneralOffers.EmailmessageLimitPeriod) }, true)[0])];
        };

        $scope.TextMessagesOption = {};
        $scope.TextMessagesOptions = [{ 'title': 'Per Day', 'value': 0 }, { 'title': 'Per Week', 'value': 1 }, { 'title': 'Per month', 'value': 2 }];
        $scope.TextMessagesOption.selected = $scope.TextMessagesOptions[$scope.TextMessagesOptions.indexOf($filter('filter')($scope.TextMessagesOptions, { value: parseInt($scope.GeneralOffers.TextmessageLimitPeriod) }, true)[0])];

        $scope.NotificationsOption = {};
        $scope.NotificationsOptions = [{ 'title': 'Per Day', 'value': 0 }, { 'title': 'Per Week', 'value': 1 }, { 'title': 'Per month', 'value': 2 }];
        $scope.NotificationsOption.selected = $scope.NotificationsOptions[$scope.NotificationsOptions.indexOf($filter('filter')($scope.NotificationsOptions, { value: parseInt($scope.GeneralOffers.PushmessageLimitPeriod) }, true)[0])];

        $scope.EmailMessagesOption = {};
        $scope.EmailMessagesOptions = [{ 'title': 'Per Day', 'value': 0 }, { 'title': 'Per Week', 'value': 1 }, { 'title': 'Per month', 'value': 2 }];
        $scope.EmailMessagesOption.selected = $scope.EmailMessagesOptions[$scope.EmailMessagesOptions.indexOf($filter('filter')($scope.EmailMessagesOptions, { value: parseInt($scope.GeneralOffers.EmailmessageLimitPeriod) }, true)[0])];

        $scope.Name = ''; // This will hold the selected item
        $scope.onItemSelected = function () { // this gets executed when an item is selected
            console.log('selected=' + $scope.Name);
        };

        //Updating General Offers Settings
        $scope.saveGeneralOffers = function () {

            $scope.GeneralOffers.TextmessageLimitPeriod = $scope.TextMessagesOption.selected.value;
            $scope.GeneralOffers.PushmessageLimitPeriod = $scope.NotificationsOption.selected.value;
            $scope.GeneralOffers.EmailmessageLimitPeriod = $scope.EmailMessagesOption.selected.value;

            console.log($scope.GeneralOffers.OfferCategories);

            $scope.GeneralOffers.PushMessageLimit = parseInt($scope.GeneralOffers.PushMessageLimit);
            $scope.GeneralOffers.TextMessageLimit = parseInt($scope.GeneralOffers.TextMessageLimit);
            $scope.GeneralOffers.EmailMessageLimit = parseInt($scope.GeneralOffers.EmailMessageLimit);
            $scope.GeneralOffers.LocationRadius = parseFloat($scope.GeneralOffers.LocationRadius);
            $scope.GeneralOffers.AllowUserCreateCategories = Boolean.valueOf($scope.GeneralOffers.AllowUserCreateCategories);

            generalService.updateGeneralOffersResponse($scope.GeneralOffers);

            userNotificationLibrary.addSuccess('general offer settings saved successfully!!!');
            $location.path($routeParams.clientName + '/general');
        }
    }]);

generalModule.controller('kmApp.modules.general.codepools', [
    '$scope',
    '$routeParams',
    '$location',
    'links',
    'kmApp.libraries.general.generalService',
     'kmApp.libraries.pool.poolService',
    '$filter',
     'kmApp.libraries.notification.screenNotifyService',
     'kmApp.libraries.waitLoader',
    function ($scope, $routeParams, $location, links, generalService, poolService, $filter, userNotificationLibrary, waitLoader) {

        $scope.title = "Code Pools";
        $scope.links = links;

        $scope.disabled = undefined;
        $scope.disable = function () {
            $scope.disabled = true;
        };

        $scope.poolList = poolService.getPools();
        $scope.fileInfo;


        $scope.csvJSON = function (csv) {
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length - 1; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
                console.log(obj);
            }
            return result;
        }
        $scope.upload = function (file) {
            //if(file.type.match(/text\/csv/)){

            if (file.name.match(/csv/)) {
                $scope.model.fileInfo = file;
                oFReader = new FileReader();
                oFReader.onloadend = function () {
                    $scope.poolUploadFile = $scope.csvJSON(this.result);
                    console.log($scope.poolListUpload);

                };
                oFReader.readAsText(file);
            } else {
                userNotificationLibrary.addError("This file does not seem to be a CSV.");
            }
            $scope.$apply();
        }
        $scope.uploadPool = function () {

            if ($scope.IsEdit) {
                poolService.editPool($scope.model.poolid, $scope.model);
            }
            else {
                $scope.model.poolid = Math.floor((Math.random() * 1000) + 1);
                $scope.model.file_name = $scope.fileInfo;
                $scope.model.fileData = $scope.poolUploadFile;
                poolService.addPool($scope.model);
                userNotificationLibrary.addSuccess('Upload list Successfully');

                $scope.model = '';  //clear model
                $scope.fileInfo = ''; //clear fileinfo	

                $scope.$apply();
            }
            $scope.newpool = false;
        }

        $scope.edit = function (item) {
            $scope.editIndex = $scope.poolList.indexOf(item);
            $scope.model = item;
            $scope.newpool = true;
            $scope.IsEdit = true;
        };
        $scope.remove = function (item) {
            poolService.removePool(item);
            // $scope.poolList.splice($scope.poolList.indexOf(item), 1);
        }
        $scope.removefileInfo = function () {
            $scope.model.fileInfo = '';
        }

        $scope.codeList = ['Code type', 'Code type1', 'Code type 2', 'Code type 3'];
        $scope.selectedCodeList = ['Code type', 'Code type1'];
    }]);

generalModule.controller('kmApp.modules.general.connected', [
    '$scope',
    '$routeParams',
    '$location',
    'links',
    'kmApp.libraries.general.generalService',
    '$filter',
     'kmApp.libraries.notification.screenNotifyService',
     'kmApp.libraries.waitLoader',
    function ($scope, $routeParams, $location, links, generalService, $filter, userNotificationLibrary, waitLoader) {
        $scope.title = "Connected Services";
        $scope.links = links;

        $scope.disabled = undefined;
        $scope.disable = function () {
            $scope.disabled = true;
        };

        //Fetching Json for Connected Services Settings
        $scope.ConnectedServices = generalService.getConnectedServicesResponse().ConnectedServices[0];

        //Fetching Json for Providers 
        $scope.providers = generalService.getProvidersResponse().Providers;

        $scope.provider = {};
        $scope.provider.selected = $scope.providers[$scope.providers.indexOf($filter('filter')($scope.providers, { id: parseInt($scope.ConnectedServices.provider_id) }, true)[0])];

        //Updating Connected Services Settings
        $scope.saveConnectedServices = function () {
            $scope.ConnectedServices.provider_id = parseInt($scope.provider.selected.id);

            generalService.updateConnectedServicesResponse($scope.ConnectedServices);

            userNotificationLibrary.addSuccess('general connected services settings saved successfully!!!');
            $location.path($routeParams.clientName + '/general/connected');
        }
    }]);

generalModule.controller('kmApp.modules.general.store', [
    '$scope',
    '$routeParams',
    '$location',
    'links',
    'kmApp.libraries.general.generalService',
    '$filter',
     'kmApp.libraries.notification.screenNotifyService',
     'kmApp.libraries.waitLoader',
    function ($scope, $routeParams, $location, links, generalService, $filter, userNotificationLibrary, waitLoader) {
        $scope.title = "Stores";
        $scope.links = links;

        //Fetching Json for Store Groups
        $scope.storeGroup = generalService.getStoreGroupResponse().Stores;
        //Fetching Json for Geofence Groups
        $scope.GeofenceGroup = generalService.getGeofenceGroupResponse().Geofences;
        //Fetching Json for Beacon Groups
        $scope.BeaconGroup = generalService.geBeaconGroupResponse().Beacons;

        $scope.name1 = ''; // This will hold the selected item
        $scope.onItemSelected1 = function () { // this gets executed when an item is selected
            console.log('selected=' + $scope.name1);
        };

        $scope.name2 = ''; // This will hold the selected item
        $scope.onItemSelected2 = function () { // this gets executed when an item is selected
            console.log('selected=' + $scope.name2);
        };

        $scope.name3 = ''; // This will hold the selected item
        $scope.onItemSelected3 = function () { // this gets executed when an item is selected
            console.log('selected=' + $scope.name3);
        };

        //Updating Stores Settings
        $scope.saveStores = function () {
            // generalService.updateConnectedServicesResponse($scope.ConnectedServices);

            userNotificationLibrary.addSuccess('general store settings saved successfully!!!');
            $location.path($routeParams.clientName + '/general/store');
        }

    }]);

generalModule.controller('kmApp.modules.general.apikeys', [
    '$scope',
     '$rootScope',
    '$routeParams',
    '$location',
    'links',
    'kmApp.libraries.account.accountService',
    '$filter',
     'kmApp.libraries.notification.screenNotifyService',
     'kmApp.libraries.waitLoader',
    function ($scope, $rootScope, $routeParams, $location, links, accountService, $filter, userNotificationLibrary, waitLoader) {
        $scope.title = "API Keys";
        $scope.links = links;
       
        //Fetching Json for User Services
        $scope.APIKeys = accountService.getAccount($rootScope.UserData.clientId);
    }]);