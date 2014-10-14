var channelModule = angular.module('kmApp.modules.channel', ['angular.filter', 'kmApp.libraries.notification','ui.select']);

channelModule.value('clinks',
	{
	  "module":'Channels',
	  "items":
			  [{
				  "url": "channels",
				  "title": "Summary"
			  },
			  {
				  "url": "channels/design",
				  "title": "Design"
			  },
			  {
				  "url": "channels/details",
				  "title": "Details"
			  }]
	}
);
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
							 'clinks',
							 'kmApp.libraries.notification.screenNotifyService',
							 'kmApp.libraries.channel.channelService',
                               function ($scope,$rootScope,$routeParams,$location,clinks,notification,channelService) {
	
	$scope.arrow=true;
	$scope.links=clinks;
	$scope.title='Summary';
	$scope.links.module='Channels';
		
		console.log($scope.links);						   
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

channelModule.controller('kmApp.modules.channels.design',
						 ['$scope',
						  '$rootScope',
						  '$routeParams',
						  '$location',
						  'clinks', 
						  function ($scope,$rootScope,$routeParams,$location,clinks) {
    $scope.arrow=true;     
    $scope.links=clinks;
	$scope.title='Design';
	$scope.links.module='New Channel';
}]);


channelModule.controller('kmApp.modules.channels.details',
						 ['$scope',
						  '$rootScope',
						  '$routeParams',
						  '$location',
						  'clinks', 
						  function ($scope,$rootScope,$routeParams,$location,clinks) {
		
		$scope.arrow=true;
		$scope.links=clinks;
		$scope.title='Details';
		$scope.links.module='VS Web Channel';
		

}]);channelModule.controller('kmApp.modules.channels.details.done',
							 ['$scope',
							  '$rootScope',
							  '$routeParams',
							  '$location',
							  'clinks', 
							  function ($scope,$rootScope,$routeParams,$location,clinks) {
		
		$scope.arrow=true;
		$scope.links=clinks;
		$scope.title='Details';
		$scope.links.module='VS Web Channel';
		


}]);

