var accountLibrary = angular.module('kmApp.libraries.account', []);

accountLibrary.service('kmApp.libraries.account.accountService', ['$filter', function ($filter) {
    var accountList = [
					    { UserID: 1, UserName: 'Samantha Longname', UserEmail: 'samanthalongname@gmail.com', UserManagement: 'Offer Management',plan:'Pro'  },
                       { UserID: 2, UserName: 'Samantha Longname', UserEmail: 'samanthalongname@gmail.com', UserManagement: 'Offer Management',plan:'Pro' }
    ];

    //console.log(storeList[0]);

    var addAccount = function (item) {
        accountList.push(item);
    }

    var getAccounts = function () {
        return accountList;
    }
    var searchAccount = function (stext) {
        return $filter('filter')(accountList,{$:stext}, true);
    }
    var getAccount = function (accountid) {
        var found = $filter('filter')(accountList, { account_id: parseInt(accountid) }, true);
        return found[0];
    }

    var editAccount = function (accountid, item) {
        var found = $filter('filter')(accountList, { accountid: parseInt(accountid) }, true);
        accountList[accountList.indexOf(found[0])] = item;
    }

    var removeAccount = function (UserID) {
		 var found = $filter('filter')(accountList, { UserID: UserID }, true);
          accountList.splice(accountList.indexOf(found), 1);
        return accountList;
    }

    var copyAccount = function (item) {
        item.name = item.name + ' copy';
        item.accountid = item.accountid + 1;
        accountList.push(item);
        return accountList;
    }

    return {
        addAccount: addAccount,
        getAccounts: getAccounts,
        removeAccount: removeAccount,
        copyAccount: copyAccount,
        getAccount: getAccount,
        editAccount: editAccount,
		searchAccount:searchAccount
    };

}
]);