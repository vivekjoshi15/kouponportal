var offerModule = angular.module('kmApp.modules.campaign', ['angular.filter', 'kmApp.libraries.notification','ui.bootstrap','ui.select']);

offerModule.controller('kmApp.modules.campaign.offer', ['$scope', '$sce', '$rootScope', '$filter','kmApp.libraries.campaign.campaignService',
                                               function ($scope, $sce, $rootScope, $filter,campaignService) {
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
	  var data=campaignService.searchCampaign(stext);
	  console.log(data);
	  var rowval=[];
	  for (var i = 0; i < data.length; i++) {
		    var rowdata=[];
				rowdata.push(data[i].campaign_name);
				rowdata.push(data[i].campaign_title);
				rowdata.push(data[i].start_date_date);
				rowdata.push(data[i].end_date_date);
				rowdata.push(data[i].isActive);
				rowval.push(rowdata);
		 } 
	 //$scope.tabledata.rowval=rowval
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
	
	var data=campaignService.getCampaigns();
	var rowval=[];
	 for (var i = 0; i < data.length; i++) {
		    var rowdata=[];
				rowdata.push(data[i].campaign_name);
				rowdata.push(data[i].campaign_title);
				rowdata.push(data[i].start_date_date);
				rowdata.push(data[i].end_date_date);
				rowdata.push(data[i].isActive);
				rowval.push(rowdata);
		 } 
    $scope.tabledata = {
        "header": [
                { "name": "offer", "desc": "Offer", "type": "n" },
                { "name": "headline", "desc": "Headline", "type": "s" },
                { "name": "start", "desc": "Start", "type": "s" },
                { "name": "end", "desc": "End ", "type": "s" },
                { "name": "status", "desc": "Status ", "type": "s" }
        ],
        "rowval": []
    };
	$scope.tabledata.rowval=rowval;
	
    $scope.tabledata.totalcount = $scope.tabledata.rowval.length;
    $scope.tabledata.totalcounttext = 'Total Offers';

    $scope.deleteTemplate = function (I, K) {
		 var data=campaignService.removeCampaign(K);
		 var rowval=[];
			 for (var i = 0; i < data.length; i++) {
					var rowdata=[];
						rowdata.push(data[i].campaign_name);
						rowdata.push(data[i].campaign_title);
						rowdata.push(data[i].start_date_date);
						rowdata.push(data[i].end_date_date);
						rowdata.push(data[i].isActive);
						rowval.push(rowdata);
				 } 	
		 $scope.tabledata.rowval=rowval;
		  $scope.tabledata.totalcount = $scope.tabledata.rowval.length;
        //alert($scope.tabledata.rowval.indexOf(K));	
    }
	$scope.editTemplate=function(I,K){
	     	
	}

}]);
offerModule.controller('kmApp.modules.campaign.template', function ($scope) {



});
offerModule.controller('kmApp.modules.campaign.details',['$scope','$rootScope','kmApp.libraries.campaign.campaignService','$filter','kmApp.libraries.store.storeService',
                                                           function ($scope,$rootScope,campaignService,$filter,storeService) {
	 $scope.disabled = undefined;
	  $scope.disable = function () {
		  $scope.disabled = true;
	  };
	  $scope.ddTypeList=['AORPI','AORPI 2','AORPI 3'];
	  $scope.ddType;
	  $scope.categoriesList=['categories','categories 2','categories 3'];
	  $scope.categories;
	  $scope.mob_categoriesList=['Mob categories','Mob categories 2','Mob categories 3']
	  $scope.mob_categories;
      
      $scope.saveCampaign=function(){
		  var date=new Date();
		    $scope.model.start_date_date=$filter('date')(date, 'MMM dd yyyy', 'UTC');
			$scope.model.end_date_date=$filter('date')(date, 'MMM dd yyyy', 'UTC');
			$scope.model.isActive="DeActivated";
		    campaignService.addCampaign($scope.model);
	  }
}]);
offerModule.controller('kmApp.modules.campaign.redemption',['$scope','datepickerConfig','kmApp.libraries.store.storeService', function ($scope,datepickerConfig,storeService) {
	  datepickerConfig.showWeeks = false;
	  $scope.showButtonBar=false;
	  $scope.today = function() {
		$scope.dt = new Date();
		$scope.dt2 = new Date();
		$scope.dt3 = new Date();
	  };
	  $scope.today();	
	  $scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();
	
	  $scope.open = function($event,opens) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened=false;
		$scope.opened2 = false;
		$scope.opened3 = false;
		switch(opens){
		 case 'opened':
		   $scope.opened = true;
		        break;
		 case 'opened2':
		 	   $scope.opened2 = true;
		        break;
		 case 'opened3':
		 	  $scope.opened3 = true;
		      break;
		  default:
		  console.log('undefined');
		}
		
	  };
	
	  $scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	  };
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.codetypeList=['CODE 128 A','CODE 128 B','CODE 128 C'];
	  $scope.codetype;
	  $scope.format = $scope.formats[0];
      $scope.advancedCapList=['cap','cap 2','cap 3'];
	  $scope.advancedCap;
	  $scope.availableStoreList=storeService.getStoreName();

	  console.log($scope.availableStoreList);
      $scope.availableStore;
	  $scope.poolList=['pool','pool 2','pool 3'];
	  $scope.pool;
}]);
offerModule.controller('kmApp.modules.campaign.channels', function ($scope) {



});