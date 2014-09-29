var toolTipLibrary = angular.module('kmApp.libraries.toolTip', []);

toolTipLibrary.service('kmApp.libraries.toolTip', [
    function () {
        var toolTips = {
            dashboard_filter: {
                fromdt: 'Start Date for Analysis. Applicable on entire page',
                todt: 'End Date for Analysis. Applicable on entire page',
                offerList: 'Narrow analysis to specific campaigns. Applicable on entire page',
                channelList: 'Narrow analysis to a given channel. Applicable on entire page'
            },
            dashboard_campaign: {
                total: 'The total number for each metric.',
                unique: 'The total number of unique interactions for each metric',
                timespan: 'Select a time period for for data summarization',
                delivered: 'The total number of offers delivered during the analysis time period. Based on filters at the top of the page.',
                accessed: 'The total number of offers accessed during the analysis time period. Based on filters at the top of the page.',
                accessedPercent: 'The percentage of offers that were accessed. Based on filters at the top of the page.',
                viewed: 'The total number of offers viewed during the analysis time period. Based on filters at the top of the page.',
                viewedPercent: 'The percentage of offers that were viewed. Based on filters at the top of the page.',
                redeemed: 'The total number of offers redeemed during the analysis time period.  Based on filters at the top of the page.',
                redeemedPercent: 'The percentage of offers that were redeemed. Based on filters at the top of the page.',
                promoName: 'The name of the offer. Based on filters at the top of the page.',
                promoViews: 'The number of times the offer was viewed. Based on filters at the top of the page.',
                promoRedemptions: 'The number of times the offer was redeemed. Based on filters at the top of the page.',
                promoConversion: 'The percentage of viewed offers that were redeemed. Based on filters at the top of the page.'
            },
            dashboard_user: {
                byChannel: 'The number of unique users by marketing channel.  Based on filters at the top of the page.',
                byTime: 'The number of unique users by (time resolution).  Based on filters at the top of the page.',
                timeSelector: 'Select a time period for for data summarization.'
            },
            dashboard_store: {
                storeRedemption: 'The number of redemptions by store. Based on filters at the top of the page.'    
            }
            
        };
        return {
            getToolTips: function (namespace) {
                if (namespace === undefined) {
                    return toolTips;
                } else {
                    return toolTips[namespace];
                }
            }
        };
    }]);


