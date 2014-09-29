var accountModule = angular.module('kmApp.modules.account', ['angular.filter', 'kmApp.libraries.notification']);

accountModule.controller('kmApp.modules.account.user',function ($scope,$location,$rootScope){
		
		$scope.ActiveUser=[
				{UserID:1,UserName:'Samantha Longname',UserEmail:'samanthalongname@gmail.com', UserManagement:'Offer Management'},
				{UserID:2,UserName:'Samantha Longname',UserEmail:'samanthalongname@gmail.com', UserManagement:'Offer Management'}
			]
		$scope.UsrRemove=function(item){
		   $scope.ActiveUser.splice($scope.ActiveUser.indexOf(item), 1);      	
		}
		$scope.Invite=function(){
			 //alert(console.log($scope.InviteUser));
		}
		
		$scope.UserManagementList=[{text:'Offer Management'},{text:'Offer Distribution'},{text:'Location Targeting'}];
	    $scope.UserManagementVal;
		
		$scope.selectRoleList=[{text:'Offer Management'},{text:'Offer Distribution'},{text:'Location Targeting'}];
	    $scope.Invite.UserManagement=$scope.selectRoleVal;
		
		
	});
	
accountModule.controller('kmApp.modules.account.plan',function ($scope,$location,$rootScope){
		
		
	});