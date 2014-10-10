var accountModule = angular.module('kmApp.modules.account', ['angular.filter', 'kmApp.libraries.notification','ui.select']);

accountModule.value('alinks', [
    'Account Settings',
    [{
        "url": "account",
        "title": "User"
    },
    {
        "url": "account/plan",
        "title": "Plan"
    }]
]);

accountModule.controller('kmApp.modules.account.user',
						 ['$scope',
						  '$rootScope',
						  '$location',
						  'alinks',
						  'kmApp.libraries.account.accountService',
						 function ($scope,$rootScope,$location,alinks, accountService) {
	$scope.links=alinks;
	$scope.title='User';
							 
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

accountModule.controller('kmApp.modules.account.plan',
						 ['$scope',
						  '$rootScope',
						  '$location',
						  'alinks',
						  function ($scope,$rootScope,$location,alinks) {
	$scope.links=alinks;
	$scope.title='Plan';
	
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
}]);

accountModule.controller('kmApp.modules.account.search',
						 ['$scope',
						  '$rootScope',
						  '$location',
						  'kmApp.libraries.account.accountService',
						 function ($scope,$rootScope,$location, accountService) {
	 $rootScope.isMenu=false;
	
		 $scope.tabledata = {};
     $scope.selectedtagid = 0;
     $scope.pagesize = 3;
     $scope.searchtext = '';
     $scope.currentpage = 1;
     $scope.skipsize = 0;
     $scope.pagenumbers = [1];
	 $scope.getnextpage = function () {
        $rootScope.skipsize = $scope.currentpage;
        $scope.currentpage = $scope.currentpage + 1;
        $rootScope.getPassTableDetail();
    }
    $scope.getprevpage = function () {
        $scope.currentpage = $scope.currentpage - 1;
        $rootScope.skipsize = $scope.currentpage - 1;
        $rootScope.getPassTableDetail();
    }
    $scope.getselectpage = function (num) {
        $scope.currentpage = num;
        $rootScope.skipsize = $scope.currentpage - 1;
        $rootScope.getPassTableDetail();
    }
    $scope.getPageNumbers = function (pageNum) {
        var totalPages = $scope.numberOfPages();
        $scope.pagenumbers = [];
        var endPage = $scope.pagesize;
        if (totalPages < $scope.pagesize + pageNum) {
            endPage = totalPages;
        }
        else {
            endPage = $scope.pagesize + pageNum;
        }
        if (pageNum == 0) { pageNum++; }
        for (var i = pageNum; i <= endPage; i++) {
            $scope.pagenumbers.push(i);
        }
    };

    $scope.numberOfPages = function () {
        if ($scope.tabledata === undefined)
            return 0;
        if ($scope.tabledata.rowval === undefined)
            return 0;
        return Math.ceil($scope.tabledata.totalcount / $scope.pagesize);
    }
	
	var data=accountService.getAccounts();
	var rowval=[];
	 for (var i = 0; i < data.length; i++) {
		    var rowdata=[];
			    rowdata.push(data[i].UserID);
				rowdata.push(data[i].UserName);
				rowdata.push(data[i].plan);
				rowval.push(rowdata);
				
		 } 
    $scope.tabledata = {
        "header": [
		        { "name": "id", "desc": "ID", "type": "ID" },
                { "name": "account", "desc": "Account Name", "type": "n" },
                { "name": "plan", "desc": "Plan", "type": "s" },

        ],
        "rowval": []
    };
	$scope.tabledata.rowval=rowval;
	
    $scope.totalcount = $scope.tabledata.rowval.length;
	
    $scope.tabledata.totalcounttext = 'Total Accounts';
	$scope.getPageNumbers($scope.currentpage);
}]);						 		
accountModule.controller('kmApp.modules.account.account',
						 ['$scope',
						  '$rootScope',
						  '$location',
						  'kmApp.libraries.account.accountService',
						 function ($scope,$rootScope,$location, accountService) {
							 
	 $rootScope.isMenu=false;



}]);				 