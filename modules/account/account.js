var accountModule = angular.module('kmApp.modules.account', ['angular.filter', 'kmApp.libraries.notification', 'ngDropdowns']);

accountModule.controller('kmApp.modules.account.user', function ($scope, $location, $rootScope) {

    $scope.ActiveUser = [
            { UserID: 1, UserName: 'Samantha Longname', UserEmail: 'samanthalongname@gmail.com', UserManagement: 'Offer Management' },
            { UserID: 2, UserName: 'Samantha Longname', UserEmail: 'samanthalongname@gmail.com', UserManagement: 'Offer Management' }
    ]
    $scope.UsrRemove = function (item) {
        var r = confirm("Are you sure you want to delete '" + item.UserName + "'?");
        if (r == true) {
            $scope.ActiveUser.splice($scope.ActiveUser.indexOf(item), 1);
        }
    }
    $scope.Invite = function () {
        //alert(console.log($scope.InviteUser));
    }

    $scope.UserManagementList = [{
        text: 'Offer Management',
        someprop: 'Offer Management'
    }, {
        text: 'Offer Distribution',
        someprop: 'Offer Distribution'
    }, {
        text: 'Location Targeting',
        someprop: 'Location Targeting'
    }];
    $scope.UserManagementVal = $scope.UserManagementList[0];

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


});

accountModule.controller('kmApp.modules.account.plan', function ($scope, $location, $rootScope) {


});