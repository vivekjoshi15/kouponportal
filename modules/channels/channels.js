var channelModule = angular.module('kmApp.modules.channel', ['angular.filter', 'kmApp.libraries.notification','ui.select','colorpicker.module']);

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
	$scope.model={};
	$scope.channelid = $routeParams.id;
	
    $scope.channelTypeList=[{type:'Type 1'},{type:'Type 2'},{type:'Type 3'}];
    $scope.model.channel_type = undefined;
						    
    if($scope.channelid != 0){
		  $scope.model=channelService.getChannel($scope.channelid);
	  };

	
   $scope.county = {};
   $scope.countyList = [{ code: "Option1", name: 'Option1' }, { name: 'Option2', code: "Option2" }];
   $scope.county.selected = undefined;
		
   $scope.model;
   $scope.saveChannel=function(){
	   	 if ($scope.channelid != 0){
                channelService.editChannel($scope.channelid, $scope.model);
		  }			
            else{
				channelService.addChannel($scope.model);
			} 
	 notification.addSuccess('Channel saved successfully!!!');
	 $location.path('/'+$rootScope.UserData.clientName+'/channels/design/'+$scope.channelid);
   }
   
}]);

channelModule.controller('kmApp.modules.channels.design',
						 ['$scope',
						  '$rootScope',
						  '$routeParams',
						  '$location',
						  'kmApp.libraries.channel.channelService',
						  function ($scope,$rootScope,$routeParams,$location,channelService) {
	
	$scope.channelid = $routeParams.id;
	if($scope.channelid != 0){
		  $scope.model=channelService.getChannel($scope.channelid);
	  };
	$scope.saveChannel=function(){
		 if ($scope.channelid != 0){
                channelService.editChannel($scope.channelid, $scope.model);
		  }			
          else{
				channelService.addChannel($scope.model);
			} 
	  $location.path('/'+$rootScope.UserData.clientName+'/channels/details/'+$scope.channelid);
	}
}]);


channelModule.controller('kmApp.modules.channels.details',
						 ['$scope',
						  '$rootScope',
						  '$routeParams',
						  '$location', 
						  function ($scope,$rootScope,$routeParams,$location) {
		
	$scope.channelid = $routeParams.id;
		

}]);channelModule.controller('kmApp.modules.channels.details.done',
							 ['$scope',
							  '$rootScope',
							  '$routeParams',
							  '$location', 
							  function ($scope,$rootScope,$routeParams,$location) {
		
	$scope.channelid = $routeParams.id;

	
}]);

