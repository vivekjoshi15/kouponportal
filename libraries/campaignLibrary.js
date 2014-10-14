var campaignLibrary = angular.module('kmApp.libraries.campaign', []);

campaignLibrary.service('kmApp.libraries.campaign.campaignService', ['$filter', function ($filter) {
    var campaignList = [
							{  campaign_id: 1,
							   start_date_date:'Thu Jul 10 2014 13:34:18 GMT+0530 (India Standard Time)',
							   start_date_time:'04:00 AM',
							   end_date_date:'Thu Jul 17 2014 13:34:18 GMT+0530 (India Standard Time)',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Scratcher 60+10% (1 in 5)',
							   campaign_title: '$10 Off Sale Price Classic',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: {offer_type:'AORPI 1'}, 
							   categories: {offer_category:'categories'}, 
							   discount: '50%', 
							   amount: '$50', 
							   passbook_template: {template_name:'Passbook Template'}, 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?' ,
							   isActive:'DeActivated' },
							{  campaign_id: 2,
							   start_date_date:'Thu Jul 03 2014 13:34:18 GMT+0530 (India Standard Time)',
							   start_date_time:'04:00 AM',
							   end_date_date:'Thu Jul 10 2014 13:34:18 GMT+0530 (India Standard Time)',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Offer 60+10% (1 in 5)',
							   campaign_title: 'Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: {offer_type:'AORPI 2'}, 
							   categories: {offer_category:'categories 3'}, 
							   discount: '50%', 
							   amount: '$50', 
							   passbook_template: {template_name:'Passbook Template 2'}, 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?',
							   isActive:'DeActivated'  },
							{  campaign_id: 3,
							   start_date_date:'Thu Jul 03 2014 13:34:18 GMT+0530 (India Standard Time)',
							   start_date_time:'04:00 AM',
							   end_date_date:'Thu Jul 10 2014 13:34:18 GMT+0530 (India Standard Time)',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Campaign 60+10% (1 in 5)',
							   campaign_title: '60% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: {offer_type:'AORPI 3'}, 
							   categories: {offer_category:'categories 2'}, 
							   discount: '50%', 
							   amount: '$50', 
							   passbook_template: {template_name:'Passbook Template 3'}, 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?',
							   isActive:'DeActivated'  },
							{  campaign_id: 4,
							   start_date_date:'Thu Jul 10 2014 13:34:18 GMT+0530 (India Standard Time)',
							   start_date_time:'04:00 AM',
							   end_date_date:'Thu Jul 17 2014 13:34:18 GMT+0530 (India Standard Time)',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Item 60+10% (1 in 5)',
							   campaign_title: '40% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: {offer_type:'AORPI 4'}, 
							   categories: {offer_category:'categories'}, 
							   discount: '50%', 
							   amount: '$50', 
							   passbook_template: {template_name:'Passbook Template'}, 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?',
							   isActive:'DeActivated'  },

    ];

    //console.log(storeList[0]);

    var addCampaign = function (item) {
        campaignList.push(item);
    }

    var getCampaigns = function () {
        return campaignList;
    }
    var searchCampaign = function (stext) {
        return $filter('filter')(campaignList,{$:stext}, true);
    }
    var getCampaign = function (campaignid) {
        var found = $filter('filter')(campaignList, { campaign_id: parseInt(campaignid) }, true);
        return found[0];
    }

    var editCampaign = function (campaignid, item) {
        var found = $filter('filter')(campaignList, { campaignid: parseInt(campaignid) }, true);
        campaignList[campaignList.indexOf(found[0])] = item;
    }

    var removeCampaign = function (item) {
		 var found = $filter('filter')(campaignList, { campaign_name: item[0] }, true);
          campaignList.splice(campaignList.indexOf(found), 1);
        return campaignList;
    }

    var copyCampaign = function (item) {
        item.name = item.name + ' copy';
        item.campaignid = item.campaignid + 1;
        campaignList.push(item);
        return campaignList;
    }
     
    return {
        addCampaign: addCampaign,
        getCampaigns: getCampaigns,
        removeCampaign: removeCampaign,
        copyCampaign: copyCampaign,
        getCampaign: getCampaign,
        editCampaign: editCampaign,
		searchCampaign:searchCampaign
    };

}
]);

$(document).ready(function () {
	
		$(document).on("click", ".dd_options", function (e) {
		   $(this).addClass('on');
	   }).on("mouseleave", ".dd_options", function (e) {
		    $(this).removeClass('on');
		});
	
    function dropcheckbox(obj) {
        var column = obj.attr('data-column');
        if (obj.is(":checked")) {
            obj.siblings('.checked').show();
            obj.siblings('.unchecked').hide();
            $("." + column).show();
        }
        else {
            obj.siblings('.checked').hide();
            obj.siblings('.unchecked').show();
            $("." + column).hide();
        }
    }
    $("body").on('change','.dd_options input', function () {	
        dropcheckbox($(this));
    });
});