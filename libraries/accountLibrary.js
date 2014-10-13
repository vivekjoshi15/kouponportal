var accountLibrary = angular.module('kmApp.libraries.account', []);

accountLibrary.service('kmApp.libraries.account.accountService', ['$filter', function ($filter) {
    var accountList = [
        {
            clientId: 01
                   , clientName: 'admin koupon'
                   , authKey: 'fgdfhgtfgjhytgj6756456'
                   , roleId: 1
                   , planId: 4
                   , email: 'admin@kou.pn'
                   , loginId: 1
                   , uploadCDN: 'https://c815555.ssl.cf2.rackcdn.com'
                   , isMichaels: false
                   , isCumberland: false
                   , lastActivity: ''
                   , channelData: ''
                   , featureList: ''
                   , webOfferType: ''
                   , wireon: ''
        },
        {
            clientId: 01
                   , clientName: 'james'
                   , authKey: 'fgdfhgtfgjhytgj6756456'
                   , roleId: 2
                   , planId: 1
                   , email: 'user@kou.pn'
                   , loginId: 2
                   , uploadCDN: 'https://c815555.ssl.cf2.rackcdn.com'
                   , isMichaels: false
                   , isCumberland: false
                   , lastActivity: ''
                   , channelData: ''
                   , featureList: ''
                   , webOfferType: ''
                   , wireon: ''
        }
    ];

    var planList = [
        {
            planId: 1,
            name: 'pro',
            stores: 250,
            features: ['Offer Management', 'Offer Distribution', 'Location Targeting']
        },
        {
            planId: 2,
            name: 'enterprise',
            stores: 250,
            features: ['Offer Management', 'Offer Distribution', 'Location Targeting']
        },
        {
            planId: 3,
            name: 'core',
            stores: 250,
            features: ['Offer Management', 'Offer Distribution', 'Location Targeting']
        },
        {
            planId: 4,
            name: 'advanced',
            stores: 250,
            features: ['Offer Management', 'Offer Distribution', 'Location Targeting']
        }
    ];

    var addAccount = function (item) {
        accountList.push(item);
    }

    var getAccounts = function () {
        return accountList;
    }

    var searchAccount = function (stext) {
        return $filter('filter')(accountList, { $: stext }, true);
    }

    var getAccount = function (clientId) {
        var found = $filter('filter')(accountList, { clientId: parseInt(clientId) }, true);
        return found[0];
    }

    var editAccount = function (clientId, item) {
        var found = $filter('filter')(accountList, { clientId: parseInt(clientId) }, true);
        accountList[accountList.indexOf(found[0])] = item;
    }

    var removeAccount = function (clientId) {
        var found = $filter('filter')(accountList, { clientId: clientId }, true);
        accountList.splice(accountList.indexOf(found), 1);
        return accountList;
    }

    var copyAccount = function (item) {
        item.name = item.name + ' copy';
        item.accountid = item.clientId + 1;
        accountList.push(item);
        return accountList;
    }

    var getPlans = function () {
        return planList;
    }

    var getPlan = function (planId) {
        var found = $filter('filter')(planList, { planId: parseInt(planId) }, true);
        return found[0];
    }

    return {
        addAccount: addAccount,
        getAccounts: getAccounts,
        removeAccount: removeAccount,
        copyAccount: copyAccount,
        getAccount: getAccount,
        editAccount: editAccount,
        searchAccount: searchAccount,
        getPlans: getPlans,
        getPlan: getPlan
    };

}]);