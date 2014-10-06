var offerModule = angular.module('kmApp.modules.campaign', ['angular.filter', 'kmApp.libraries.notification','ui.bootstrap','ui.select']);

offerModule.controller('kmApp.modules.campaign.offer', ['$scope', '$sce', '$rootScope', '$filter', function ($scope, $sce, $rootScope, $filter) {
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
    $rootScope.getPassTableDetail = function () {
        var stext = $scope.searchtext;
        if (stext == '') {
            stext = '-';
        }

        //    $scope.$prepareForReady();
        //
        //	        GetTemplateListTableSvc.get({
        //	            pagesize: $scope.pagesize.toString(),
        //	            skipsize: $scope.skipsize.toString(),
        //	            searchtext: stext,
        //	            tagid: $scope.selectedtagid.toString()
        //	        }, function (data) {
        //
        //	            var text = "[";
        //
        //	            for (var i = 0; i < data.templates.length; i++) {
        //	                text += "[" + '"' + data.templates[i].templateId + '"';
        //	                text += "," + '"' + data.templates[i].templateName + '"';
        //	                text += "," + '"' + data.templates[i].templateConfig + '"';
        //	                text += "," + '"' + "Store Card" + '"' + "],";
        //	            }
        //	            if (data.templates.length != 0)
        //	                text = text.substr(0, text.length - 1);
        //	            text += "]";
        //	            $scope.tabledata = {
        //	                "header": [
        //                            { "name": "Id", "desc": "Id", "type": "n" },
        //                            { "name": "name", "desc": "Template Name", "type": "s" },
        //                            { "name": "wallet_type", "desc": "Wallet Type", "type": "s" },
        //                            { "name": "wallet_style", "desc": "Template Style", "type": "s" },
        //	                ],
        //	                "rowval": eval(text)
        //	            };
        //
        //	            $scope.tabledata.totalcount = $scope.tabledata.rowval.length;
        //	            if ($scope.currentpage == 1) {
        //	                $scope.getPageNumbers($scope.currentpage);
        //	            }
        //	            $scope.$onReady();
        //	        }, function (data) {
        //	            console.log("Error");
        //	            $scope.tabledata = data;
        //	            if ($scope.currentpage == 1) {
        //	                $scope.getPageNumbers($scope.currentpage);
        //	            }
        //	            $scope.$onReady();
        //	        });


    }
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
    $scope.tabledata = {
        "header": [
                { "name": "offer", "desc": "Offer", "type": "n" },
                { "name": "headline", "desc": "Headline", "type": "s" },
                { "name": "start", "desc": "Start", "type": "s" },
                { "name": "end", "desc": "End ", "type": "s" },
                { "name": "status", "desc": "Status ", "type": "s" },
        ],
        "rowval": [['a French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['b French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['d French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['c French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['a French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['f French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['a French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated'],
                  ['b French Fry Promotion', 'Save 50% off French Fries Today', 'jul 6 2014', 'jul 26 2014', 'DeActivated']
        ]
    }
    $scope.tabledata.totalcount = $scope.tabledata.rowval.length;
    $scope.tabledata.totalcounttext = 'Total Offers';

    $scope.deleteTemplate = function (I, K) {
        //alert($scope.tabledata.rowval.indexOf(K));	
    }

}]);
offerModule.controller('kmApp.modules.campaign.template', function ($scope) {



});
offerModule.controller('kmApp.modules.campaign.details', function ($scope) {
	 $scope.disabled = undefined;
	  $scope.disable = function () {
		  $scope.disabled = true;
	  };
	  $scope.offertypeList=['AORPI','AORPI 2','AORPI 3'];
	  $scope.offer_categoriesList=['categories','categories 2','categories 3'];
	  $scope.offer_mob_categoriesList=['Mob categories','Mob categories 2','Mob categories 3']
    $scope.model2 = { offerid: 1, offer_name: 'Scratcher 60+10% (1 in 5)', offer_headline: '60% Off + 10% Off Sale Price Classic Collections', sub_headline: 'Valid 1/6-1/12/13', offer_type: 'AORPI', offer_categories: '', offer_discount: '50%', offer_amount: '$50', offer_mob_category: '', offer_disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', offer_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', offer_redemption_copy: 'THANKS! Looking for more Michaels?' };

});
offerModule.controller('kmApp.modules.campaign.redemption', function ($scope,datepickerConfig) {
	  datepickerConfig.showWeeks = false;
	  $scope.showButtonBar=false;
	  $scope.today = function() {
		$scope.dt = new Date();
	  };
	  $scope.today();
	
	  $scope.clear = function () {
		$scope.dt = null;
	  };
	
	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };
	
	  $scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();
	
	  $scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
	
		$scope.opened = true;
	  };
	
	  $scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	  };
	
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];


});
offerModule.controller('kmApp.modules.campaign.channels', function ($scope) {



});