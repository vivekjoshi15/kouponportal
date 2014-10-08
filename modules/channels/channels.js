var channelModule = angular.module('kmApp.modules.channel', ['angular.filter', 'kmApp.libraries.notification','ui.select']);

channelModule.controller('kmApp.modules.channels.channels',
						 ['$scope',
						  'kmApp.libraries.channel.channelService',
						  function ($scope,channelService) {


   $scope.channels=channelService.getChannels();
   console.log(channelService.getChannels())
}]);

channelModule.controller('kmApp.modules.channels.summaryEditAction',
							['$scope',
							 '$rootScope',
							 '$routeParams',
							 '$location',
							 'kmApp.libraries.notification.screenNotifyService',
							 'kmApp.libraries.channel.channelService',
                               function ($scope,$rootScope,$routeParams,$location,notification,channelService) {
   $scope.channelid = $routeParams.id;
    if($scope.channelid != 0){
		  $scope.model=channelService.getChannel($scope.channelid);
	  };
	  
   $scope.channelTypeList=['Type 1','Type 2','Type 3'];
   $scope.channelType;
   $scope.model;
   $scope.saveChannel=function(){
	   	 if ($scope.channelid != 0){
                channelService.editChannel($scope.channelid, $scope.model);
		  }			
            else{
				channelService.addChannel($scope.model);
			} 
	 notification.addSuccess('Channel saved successfully!!!');
	 $location.path('/'+$rootScope.UserData.clientName+'/channels');
   }
   
}]);

channelModule.controller('kmApp.modules.channels.design', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.design.custom', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.details', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.details.done', function ($scope) {



});
