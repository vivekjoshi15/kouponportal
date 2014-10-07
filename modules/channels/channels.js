var channelModule = angular.module('kmApp.modules.channel', ['angular.filter', 'kmApp.libraries.notification','ui.select']);

channelModule.controller('kmApp.modules.channels.channels', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.summary', function ($scope) {

   $scope.channelTypeList=['Type 1','Type 2','Type 3'];
   $scope.channelType;
   $scope.model;
});

channelModule.controller('kmApp.modules.channels.design', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.design.custom', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.details', function ($scope) {



});

channelModule.controller('kmApp.modules.channels.details.done', function ($scope) {



});
