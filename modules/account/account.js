var accountModule = angular.module('kmApp.modules.account', ['angular.filter', 'kmApp.libraries.notification','ui.select']);

accountModule.controller('kmApp.modules.account.user',
						 ['$scope',
						  '$rootScope',
						  '$location',
						  'kmApp.libraries.account.accountService',
						 function ($scope,$rootScope,$location, accountService) {
	$scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };
    $scope.ActiveUser=accountService.getAccounts();
	
    $scope.UsrRemove = function (item) {
        var r = confirm("Are you sure you want to delete '" + item.UserName + "'?");
        if (r == true) {
             accountService.removeAccount(item.UserID)
        }
    }
	$scope.model;
    $scope.Invite = function () {
		 
        //alert(console.log($scope.InviteUser));
    }
	$scope.addUser=function(){
	      $scope.NewUsr=false;
		  $scope.model.UserID = Math.floor((Math.random() * 1000) + 1);
		  $scope.model.UserName ="Samantha Longname";
		  accountService.addAccount($scope.model);
		  console.log($scope.model);	
	}

    $scope.userManagementList = ['Offer Management','Offer Distribution', 'Location Targeting'];
    $scope.userManagementVal;

    $scope.selectRoleList = [{
        text: 'Offer Management',
        someprop: 'Offer Management'
    }, {
        text: 'Offer Distribution',
        someprop: 'Offer Distribution'
    }, {
        text: 'Location Targeting',
        someprop: 'Location Targeting'
    }];
    $scope.selectRoleVal = $scope.selectRoleList[0];
    $scope.Invite.UserManagement = $scope.selectRoleVal;


}]);

accountModule.controller('kmApp.modules.account.plan', function ($scope, $location, $rootScope) {

  $scope.planList=[
			       { plan:'pro',
			          stores:250,
	                  features:['Offer Management','Offer Distribution','Location Targeting'] 
				   } ,
			       { plan:'enterprise',
					 stores:250,
			   		 features:['Offer Management','Offer Distribution','Location Targeting']
	               }, 
			       { plan:'core',
					 stores:250,
			         features:['Offer Management','Offer Distribution','Location Targeting']
	               } 
			  ];
	$scope.currentPlan={ plan:'advanced',
	                     stores:250,
	                     features:['Offer Management','Offer Distribution','Location Targeting']
	                   }
});