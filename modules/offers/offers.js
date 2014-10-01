var offerModule = angular.module('kmApp.modules.offer', ['ngDropdowns']);

offerModule.controller('kmApp.modules.offers.offers',['$scope','$sce', function ($scope,$sce) {
	 $scope.to_trusted = function (html_code) {
		 console.log(html_code);
        return $sce.trustAsHtml(html_code);
    }
	
    $scope.tabledata = {};
	$scope.selectedtagid = 0;
    $scope.pagesize = 10;
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
	$scope.tabledata= {
						"header": [
								{ "name": "offer", "desc": "Offer", "type": "n" },
								{ "name": "headline", "desc": "Headline", "type": "s" },
								{ "name": "start", "desc": "Start", "type": "s" },
								{ "name": "end", "desc": "End ", "type": "s" },
								{ "name": "status", "desc": "Status ", "type": "s" },
						],
						"rowval":[['a French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'],
						          ['b French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'], 
								  ['d French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'],
								  ['c French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'],
								  ['a French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'],
								  ['f French Fry Promotion','Save 50% off French Fries Today','jul 6 2014','jul 26 2014','DeActivated'] 
								 ]
	                 }
	 $scope.tabledata.totalcount = $scope.tabledata.rowval.length;

}]);
offerModule.controller('kmApp.modules.offers.template', function ($scope) {



});
offerModule.controller('kmApp.modules.offers.details', function ($scope) {
	
 $scope.model2={ offerid: 1, offer_name: 'Scratcher 60+10% (1 in 5)',offer_headline:'60% Off + 10% Off Sale Price Classic Collections' ,sub_headline:'Valid 1/6-1/12/13',offer_type:'AORPI',offer_categories:'',offer_discount:'50%',offer_amount:'$50',offer_mob_category:'',offer_disclaimer:'Customer must be 13 years or older to participate. (1) One game play allowed per customer.',offer_instructions:'Valid in U.S. only. We accept competitor custom frame coupons.',offer_redemption_copy:'THANKS! Looking for more Michaels?'};

});
offerModule.controller('kmApp.modules.offers.redemption', function ($scope) {



});
offerModule.controller('kmApp.modules.offers.channels', function ($scope) {



});