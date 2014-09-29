var kmAppService = angular.module('kmApp.services',['kmApp.libraries.notification','ngResource']);

//basic appsettings
kmAppService.service('kmApp.services.appSettings',[
function() {
	return {
	    	serviceHost: "/PortalService.svc"
	};
}]);

//client channels
kmAppService.factory('kmApp.modules.campaign.GetValidChannelGroups', ['kmResource',
	function (kmResource) {
	    return kmResource.factory('GetValidChannelGroups/:ClientId');
	}
]);

//km-level resource object
kmAppService.service('kmResource',[
	'$location',
	'$resource',
	'kmApp.libraries.notification.screenNotifyService',
	'kmApp.services.appSettings',
function(
	$location,
	ngResource,
	notificationLibrary,
	appSettingSvc) {

	return {
		//factory
		factory: function(uri) {

			//extension of angularjs resource object
			function kmResourcePrototype(uri) {

				//acts as constructor
				var apiUri = appSettingSvc.serviceHost + '/' + uri;

				return {
					//wrapper for angularjs get
					get: function(apiVals, successFn, errorFn, options) {
						apiVals.timestamp = new Date().getTime();
						ngResource( apiUri, {}, options ).get(
							apiVals, 
							
							//success handler
							function (data){
								if(data.code == 200){
									//call custom success function
									successFn(data);
								}else if(data.code == 403) {
									//show error message and do a logout function
									notificationLibrary.addError("Session Expired, please sign in again.");
										localStorage.clear();
										$location.path("/login");
								} else{
                                    //call custom error function
                                    errorFn(data);
                                }
							},

							//error handler
							function (data){

								//call custom error function
								errorFn(data);
							});
					},
                    query: function(apiVals, successFn, errorFn) {
                    	apiVals.timestamp = new Date().getTime();
                        ngResource( apiUri ).query(
                            apiVals,

                            //success handler
                            function (data){

                                if(data[0].code == 200){
                                    //call custom success function
                                    successFn(data);
								}else if(data[0].code == 403) {
                                    //show error message and do a logout function
									notificationLibrary.addError("Session Expired, please sign in again.");
									localStorage.clear();
									$location.path("/login");
                                } else{
                                    //call custom error function
                                    errorFn(data);
                                }
                            },

                            //error handler
                            function (data){

                                //call custom error function
                                errorFn(data);
							});
                    },
                    save: function(apiVals, successFn, errorFn) {
                    	apiVals.timestamp = new Date().getTime();
                        ngResource( apiUri ).save(
                            apiVals,

                            //success handler
                            function (data){
                                if(data.code == 200){
                                    //call custom success function
                                    successFn(data);
								}else if(data.code == 403) {
                                    //show error message and do a logout function
									notificationLibrary.addError("Session Expired, please sign in again.");
									localStorage.clear();
									$location.path("/login");
                                } else{
                                    //call custom error function
                                    errorFn(data);
                                }
                            },

                            //error handler
                            function (data){

                                //call custom error function
                                errorFn(data);
							});
                    },
                    savecampaign: function(apiVals, successFn, errorFn) {
                    	apiVals.timestamp = new Date().getTime();
                        ngResource( apiUri ).savecampaign(
                            apiVals,

                            //success handler
                            function (data){
                                if(data.code == 200){
                                    //call custom success function
                                    successFn(data);
								}else if(data.code == 403) {
                                    //show error message and do a logout function
									notificationLibrary.addError("Session Expired, please sign in again.");
									localStorage.clear();
									$location.path("/login");
                                } else{
                                    //call custom error function
                                    errorFn(data);
                                }
                            },

                            //error handler
                            function (data){

                                //call custom error function
                                errorFn(data);
							});
                            }
                    }
				}
			
			//setup instance and return
			var obj = new kmResourcePrototype(uri);
			return obj;
		}
	}
}]);

//Function to get Auth Key and Client Id from API
kmAppService.factory('kmApp.services.getAuthClientId', ['$resource','kmApp.services.appSettings',
function($resource,appSettings) {
	var uri = appSettings.serviceHost + '/getclient/:Email/:Pass';
	return $resource(uri);
}]);

//Function to reset a user's password
kmAppService.factory('kmApp.services.resetUserPassword', ['$resource','kmApp.services.appSettings',
    function($resource,appSettings) {
        var uri = appSettings.serviceHost + '/requestResetPassword/:email';
        return $resource(uri);
    }
]);

//Function to get Personal Data from API
kmAppService.factory('kmApp.services.getPersonalData', ['kmResource',
    function(kmResource){
        return kmResource.factory('getLoginUser/:Email');
	}
]);

//function to link single Offer to single consumer

kmAppService.factory('kmApp.services.linkConsumerOfferFromPortal', ['$resource','kmApp.services.appSettings',
function($resource,appSettings) {
	var uri = appSettings.serviceHost + '/linkConsumerOfferFromPortal/:clientId/:ConsumerIdentity/:PromoId';
	return $resource(uri);
}]);

//Get the Entity Type List
kmAppService.factory('kmApp.services.getEntityTypes', ['$resource', 'kmApp.services.appSettings',
function ($resource, appSettings) {
    var uri = appSettings.serviceHost + '/GetTaggableEntityTypeList';
    return $resource(uri);
} ]);

kmAppService.factory('kmApp.services.GetAvailableTagsList', ['$resource', '$rootScope', 'kmApp.services.appSettings',
    function ($resource, $rootScope, appSettings) {
        var uri = appSettings.serviceHost + '/GetAvailableTagsForEntity/:entity_type_id/:entity_id';
        return $resource(uri);
    }
]);