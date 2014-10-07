var campaignLibrary = angular.module('kmApp.libraries.campaign', []);

campaignLibrary.service('kmApp.libraries.campaign.campaignService', ['$filter', function ($filter) {
    var campaignList = [
							{  campaign_id: 1,
							   start_date_date:'jul 6 2014',
							   start_date_time:'04:00 AM',
							   end_date_date:'jul 16 2014',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Scratcher 60+10% (1 in 5)',
							   campaign_title: '60% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: 'AORPI', 
							   categories: '', 
							   discount: '50%', 
							   amount: '$50', 
							   mob_category: '', 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?' ,
							   isActive:'DeActivated' },
							{  campaign_id: 2,
							   start_date_date:'jul 6 2014',
							   start_date_time:'04:00 AM',
							   end_date_date:'jul 16 2014',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Scratcher 60+10% (1 in 5)',
							   campaign_title: '60% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: 'AORPI', 
							   categories: '', 
							   discount: '50%', 
							   amount: '$50', 
							   mob_category: '', 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?',
							   isActive:'DeActivated'  },
							{  campaign_id: 3,
							   start_date_date:'jul 6 2014',
							   start_date_time:'04:00 AM',
							   end_date_date:'jul 16 2014',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Scratcher 60+10% (1 in 5)',
							   campaign_title: '60% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: 'AORPI', 
							   categories: '', 
							   discount: '50%', 
							   amount: '$50', 
							   offer_mob_category: '', 
							   Disclaimer: 'Customer must be 13 years or older to participate. (1) One game play allowed per customer.', 
							   coupon_instructions: 'Valid in U.S. only. We accept competitor custom frame coupons.', 
							   DoneMsg: 'THANKS! Looking for more Michaels?',
							   isActive:'DeActivated'  },
							{  campaign_id: 4,
							   start_date_date:'jul 6 2014',
							   start_date_time:'04:00 AM',
							   end_date_date:'jul 16 2014',
							   end_date_time:'03:99 AM',
							   campaign_name: 'Scratcher 60+10% (1 in 5)',
							   campaign_title: '60% Off + 10% Off Sale Price Classic Collections',
							   campaign_desc:'',
							   valid_date_description: 'Valid 1/6-1/12/13', 
							   ddType: 'AORPI', 
							   categories: '', 
							   discount: '50%', 
							   amount: '$50', 
							   offer_mob_category: '', 
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
        var found = $filter('filter')(campaignList, { campaignid: parseInt(campaignid) }, true);
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