var offerModule = angular.module('kmApp.modules.campaign', ['angular.filter','kmApp.libraries.notification','ui.bootstrap','ui.select']);

offerModule.controller('kmApp.modules.campaign.offer', 
						 ['$scope',
						  '$sce', 
						  '$rootScope', 
						  '$filter',
						  '$location',
						  'kmApp.libraries.campaign.campaignService',
                           function ($scope, $sce, $rootScope, $filter,$location,campaignService) {
    $scope.to_trusted = function (html_code) {
        console.log(html_code);
        return $sce.trustAsHtml(html_code);
    }

    $scope.tabledata = {};
    $scope.selectedtagid = 0;
    $scope.pagesize = 3;
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
			    rowdata.push(data[i].campaign_id);
				rowdata.push(data[i].campaign_name);
				rowdata.push(data[i].campaign_title);
				rowdata.push($filter('date')(new Date(data[i].start_date_date),'MMM dd yyyy' , 'utc'));
				rowdata.push($filter('date')(new Date(data[i].end_date_date),'MMM dd yyyy' , 'utc'));
				rowdata.push(data[i].isActive);
				rowval.push(rowdata);
				
		 } 
    $scope.tabledata = {
        "header": [
		        { "name": "Id", "desc": "Id", "type": "Id" },
                { "name": "offer", "desc": "Offer", "type": "n" },
                { "name": "headline", "desc": "Headline", "type": "s" },
                { "name": "start", "desc": "Start", "type": "s" },
                { "name": "end", "desc": "End ", "type": "s" },
                { "name": "status", "desc": "Status ", "type": "s" }
        ],
        "rowval": []
    };
	$scope.tabledata.rowval=rowval;
	
    $scope.totalcount = $scope.tabledata.rowval.length;
	
    $scope.tabledata.totalcounttext = 'Total Offers';
	$scope.getPageNumbers($scope.currentpage);
    $scope.deleteTemplate = function (I, K) {
		 var data=campaignService.removeCampaign(K);
		 var rowval=[];
			 for (var i = 0; i < data.length; i++) {
					var rowdata=[];
						rowdata.push(data[i].campaign_id);
						rowdata.push(data[i].campaign_name);
						rowdata.push(data[i].campaign_title);
						rowdata.push($filter('date')(new Date(data[i].start_date_date),'MMM dd yyyy' , 'utc'));
						rowdata.push($filter('date')(new Date(data[i].end_date_date),'MMM dd yyyy' , 'utc'));
						rowdata.push(data[i].isActive);
						rowval.push(rowdata);						
				 } 	
		 $scope.tabledata.rowval=rowval;
        //alert($scope.tabledata.rowval.indexOf(K));	
    }
	$scope.editTemplate=function(I,K){
	     	$location.path('/'+$rootScope.UserData.clientName+'/campaign/details/'+K[0]);
	}
	$scope.copyTemplate=function(I,K){
	     	$location.path('/'+$rootScope.UserData.clientName+'/campaign/details/'+K[0]+'/copy/true');
	}

}]);
offerModule.controller('kmApp.modules.campaign.template',
                          function ($scope) {
});
offerModule.controller('kmApp.modules.campaign.detailsEditAction',
					   ['$scope',
						'$rootScope',
						'$routeParams',
						'$filter',
						'$location',
						'kmApp.libraries.notification.screenNotifyService',
						'kmApp.libraries.campaign.campaignService',
						'kmApp.libraries.store.storeService',
                        function ($scope,$rootScope,$routeParams,$filter,$location,notification,campaignService,storeService) {
							
	  $scope.title='New Offer';						
	  $scope.iscopy = $routeParams.copy;
      $scope.campaign_id = $routeParams.id;
	  
	  $scope.model={};
	  
	  $scope.categoriesList=[{offer_category:'categories'},{offer_category:'categories 2'},{offer_category:'categories 3'}];
	  $scope.model.categories=undefined;
	  
	  $scope.ddTypeList=[{offer_type:'AORPI'},{offer_type:'AORPI 2'},{offer_type:'AORPI 3'}];
	  $scope.model.ddType=undefined;

	  
	  $scope.passbookTemplateList=[{template_name:'Passbook Template'},{template_name:'Passbook Template 2'},{template_name:'Passbook Template 3'}];
      $scope.model.passbook_template=undefined;
	  
      if ($scope.iscopy == null)
            $scope.iscopy = 'false';
	 
	  if($scope.campaign_id != 0){
		   if($scope.iscopy=='true'){
		      $scope.title='Copy Offer';
		      $scope.copy='/copy/true';
		   }
		   else
		      $scope.title='Edit Offer';
			  
		  $scope.model=campaignService.getCampaign($scope.campaign_id);
	  }
	  
	  if($rootScope.draftCampaign!=null)
	     $scope.model=$rootScope.draftCampaign;
	  
								
	  $scope.disabled = undefined;
	  $scope.disable = function () {
		  $scope.disabled = true;
	  };
	    
	  if($scope.campaign_id != 0){
		  $scope.model = campaignService.getCampaign($scope.campaign_id);
		  if ($scope.iscopy == 'true') {
                $scope.model.campaign_name = $scope.model.campaign_name + ' copy';
                $scope.model.campaign_id = $scope.model.campaign_id + 100;
            }
	  }
	  
	 $scope.saveCampaign=function(){
		  if ($scope.campaign_id != 0 && $scope.iscopy == 'false'){
                campaignService.editCampaign($scope.campaign_id, $scope.model);
				//$location.path('/'+$rootScope.UserData.clientName+'/campaign/redemption/'+$scope.campaign_id);
				notification.addSuccess("Offer saved successfully!!!");
		  }			
            else{
				$scope.model.isActive="DeActivated";
				$scope.model.campaign_id=Math.floor((Math.random() * 1000) + 1);
				$rootScope.draftCampaign=$scope.model;
				notification.addSuccess("Offer saved as draft!!!");
				//$location.path('/'+$rootScope.UserData.clientName+'/campaign/redemption/0');
			} 
	  }
}]);
offerModule.controller('kmApp.modules.campaign.redemptionEditAction',
					    ['$scope',
						 '$rootScope',
						 '$filter',
						 '$location',
						 '$routeParams',
						 'datepickerConfig',
						 'kmApp.libraries.notification.screenNotifyService',
						 'kmApp.libraries.campaign.campaignService',
						 'kmApp.libraries.store.storeService',
						 'kmApp.libraries.pool.poolService', 
						 function ($scope,$rootScope,$filter,$location,$routeParams ,datepickerConfig,notification,campaignService,storeService,poolService) {
	  $scope.model={};
	  datepickerConfig.showWeeks = false;
	  $scope.showButtonBar=false;
	  $scope.today = function() {
		$scope.start_date_date = new Date();
		$scope.end_date_date = new Date();
		$scope.publish_date_date = new Date();
	  };
	  $scope.today();	
	  $scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date('Thu Jul 03 2014 13:34:18 GMT+0530 (India Standard Time)');
	  };
	  $scope.toggleMin();
	  $scope.title='New Offer';
	  $scope.campaign_id = $routeParams.id; 
	  $scope.iscopy = $routeParams.copy; 
      if ($scope.iscopy == null)
            $scope.iscopy = 'false';
			
	  if($scope.campaign_id != 0){
		  if($scope.iscopy=='true'){
		      $scope.title='Copy Offer';
		      $scope.copy='/copy/true';
			  $scope.model=$rootScope.draftCampaign;
		  }
		  else{
		    $scope.title='Edit Offer';			  
			$scope.model=campaignService.getCampaign($scope.campaign_id);
			$scope.start_date_date=new Date($scope.model.start_date_date);
			$scope.end_date_date= new Date($scope.model.end_date_date);
		   }
	  }else{
		  if($rootScope.draftCampaign!=null)
		      $scope.model=$rootScope.draftCampaign;
	  }
	
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
	  $scope.availableStoreList=storeService.getStoreName();

      $scope.availableStore;
	  $scope.poolList=poolService.getPoolName();

	  if(!$scope.model.hasOwnProperty('pools')){
		 $scope.model.pools=[{pool:''}];
	   }
	  $scope.addMorePools=function(){
		  if($scope.poolList.length-$scope.model.pools.length!=0)
		  $scope.model.pools.push({'pool':''});
	  }
	 $scope.removepools=function(index){
		   $scope.model.pools.splice(index,1);
	 }
	  
	  $scope.pool;
	  
	  $scope.saveRedemption=function(){
		  $scope.model.start_date_date=$filter('date')($scope.start_date_date,'MMM dd yyyy' , 'utc');
		  $scope.model.end_date_date=$filter('date')($scope.end_date_date,'MMM dd yyyy' , 'utc');
		  $scope.model.publish_date_date=$filter('date')($scope.publish_date_date,'MMM dd yyyy' , 'utc');
		  
		  var draft=$rootScope.draftCampaign;
		 if(draft!=null){ 
		       $rootScope.draftCampaign=$scope.model;
		 }
		 else{
			 campaignService.editCampaign($scope.campaign_id,$scope.model);
		 }	
		 notification.addSuccess("Offer saved successfully!!!");
		 // $location.path('/'+$rootScope.UserData.clientName+'/campaign/channels/'+$scope.campaign_id);	  
	  }
	 $scope.advancedCapList=['cap','cap 2','cap 3'];
	 $scope.advancedCap;
	  
	 $scope.advancedCaps=[{total:500}] ;
	 
	 $scope.addAdvancedCap=function(){
		   $scope.advancedCaps.push({total:400});
	 }
	  
}]);
offerModule.controller('kmApp.modules.campaign.channels', 
                       ['$scope',
					    '$rootScope',
						'$routeParams',
						'$location',
						'kmApp.libraries.campaign.campaignService',
					    'kmApp.libraries.channel.channelService',
					   function ($scope,$rootScope,$routeParams,$location,campaignService,channelService) {

		$scope.channelsList=channelService.getChannels();
		$scope.campaign_id = $routeParams.id;
		
		$scope.title='New Offer';
		
		if($scope.campaign_id != 0){
			 $scope.model=campaignService.getCampaign($scope.campaign_id);
		  }else{
			  $scope.model=$rootScope.draftCampaign;
			  console.log($scope.model);
		  }
		$scope.campaignSave=function(){
		   if($scope.campaign_id != 0){
			 campaignService.getCampaign($scope.campaign_id,$scope.model);
		   }
		   else{
			  campaignService.addCampaign($scope.model);
		   }	
		   $location.path('/'+$rootScope.UserData.clientName+'/campaign');	   	
		}			
}]);
