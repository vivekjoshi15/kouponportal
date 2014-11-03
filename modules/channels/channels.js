var channelModule = angular.module('kmApp.modules.channel', ['angular.filter', 'kmApp.libraries.notification', 'ui.select', 'colorpicker.module']);

channelModule.controller('kmApp.modules.channels.channels', [
    '$scope',
	'kmApp.libraries.channel.channelService',
	 function ($scope, channelService) {
	     $scope.nochannel = true;
	     $scope.channels = channelService.getChannels();

	     if ($scope.channels.length > 0)
	         $scope.nochannel = false;

	 }]);

channelModule.controller('kmApp.modules.channels.summaryEditAction', [
    '$scope',
	'$rootScope',
	'$routeParams',
	'$location',
    'kmApp.libraries.notification.screenNotifyService',
	'kmApp.libraries.channel.channelService',
    function ($scope, $rootScope, $routeParams, $location, notification, channelService) {
        $scope.model = {};
        $scope.id = $routeParams.id;
        $scope.isnew = true;

        if ($scope.id == undefined || $scope.id == 0)
            $scope.isnew = false;

        $scope.channelTypeList = [{ type: 'web' }, { type: 'android' }, { type: 'ios' }];
        $scope.model.channel_type = undefined;

        if ($scope.id != 0) {
            $scope.model = channelService.getChannel($scope.id);
        } else {
            if ($rootScope.draftChannel != undefined && $rootScope.draftChannel != null)
                $scope.model = $rootScope.draftChannel;
        }

        $scope.saveChannel = function () {
            if ($scope.id != 0) {
                channelService.editChannel($scope.id, $scope.model);
            }
            else {
                $rootScope.draftChannel = {};
                $rootScope.draftChannel = $scope.model;
            }
            $location.path('/' + $rootScope.UserData.clientName + '/channels/design/' + $scope.id);
        }

    }]);

channelModule.controller('kmApp.modules.channels.design', [
    '$scope',
	'$rootScope',
	'$routeParams',
	'$location',
	'kmApp.libraries.channel.channelService',
	function ($scope, $rootScope, $routeParams, $location, channelService) {
	    $scope.model = {};
	    $scope.id = $routeParams.id;
	    $scope.isnew = true;

	    if ($scope.id == undefined || $scope.id == 0)
	        $scope.isnew = false;

	    if ($scope.id != 0) {
	        $scope.model = channelService.getChannel($scope.id);
	        if ($scope.model.template_type == "offerviewer") {
	            $scope.templateTypeCustom = false;
	            $scope.templateCustomTitle = 'Select';
	            $scope.templateViewTitle = 'Selected';
	        }
	        else if ($scope.model.template_type == "custom") {
	            $scope.templateTypeCustom = true;
	            $scope.templateCustomTitle = 'Selected';
	            $scope.templateViewTitle = 'Select';
	        }

	        console.log($scope.model.template_type);
	    }
	    else {
	        if ($rootScope.draftChannel != undefined && $rootScope.draftChannel != null)
	            $scope.model = $rootScope.draftChannel;

	        $scope.templateTypeCustom = false;
	        $scope.templateCustomTitle = 'Select';
	        $scope.templateViewTitle = 'Selected';
	    }

	    $scope.saveChannel = function () {
	        if ($scope.templateTypeCustom == false) {
	            $scope.model.template_type = "offerviewer";
	        }
	        else {
	            $scope.model.template_type = "custom";
	        }

	        if ($scope.id != 0) {
	            channelService.editChannel($scope.id, $scope.model);
	        }
	        else {
	            $rootScope.draftChannel = $scope.model;
	        }
	        $location.path('/' + $rootScope.UserData.clientName + '/channels/details/' + $scope.id);
	    }
	}]);


channelModule.controller('kmApp.modules.channels.details', [
    '$scope',
	'$rootScope',
	'$routeParams',
	'$location',
    'kmApp.libraries.channel.channelService',
	function ($scope, $rootScope, $routeParams, $location, channelService) {
	    $scope.model = {};
	    $scope.id = $routeParams.id;
	    $scope.isnew = true;

	    if ($scope.id == undefined || $scope.id == 0)
	        $scope.isnew = false;

	    if ($scope.id != 0) {
	        $scope.model = channelService.getChannel($scope.id);
	    } else {
	        if ($rootScope.draftChannel != undefined && $rootScope.draftChannel != null)
	            $scope.model = $rootScope.draftChannel;
	    }

	}]);

channelModule.controller('kmApp.modules.channels.details.done', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'kmApp.libraries.channel.channelService',
    function ($scope, $rootScope, $routeParams, $location, channelService) {
        $scope.model = {};
        $scope.id = $routeParams.id;
        $scope.isnew = true;

        if ($scope.id == undefined || $scope.id == 0)
            $scope.isnew = false;

        if ($scope.id != 0) {
            $scope.model = channelService.getChannel($scope.id);
        }
        else {
            if ($rootScope.draftChannel != undefined && $rootScope.draftChannel != null)
                $scope.model = $rootScope.draftChannel;
        }

        $scope.saveChannel = function () {
            if ($scope.id != 0) {
                channelService.editChannel($scope.id, $scope.model);
            }
            else {
                $scope.model.id = 5;//adding custom value due to static object

                console.log($scope.model.channel_name);
                channelService.addChannel($scope.model);
            }

            $location.path('/' + $rootScope.UserData.clientName + '/channels');
        }

    }]);