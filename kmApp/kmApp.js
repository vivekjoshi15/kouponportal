var kmApp = angular.module('kmApp', [
    'ngRoute',
    'ngSanitize',
    'angular.filter',
    'kmApp.libraries.notification',
    'kmApp.libraries.waitLoader',
    'kmApp.libraries.toolTip',
    'kmApp.libraries.store',
	'kmApp.modules.offer',
	'kmApp.modules.channel',
    'kmApp.modules.store',
	'kmApp.modules.general',
	'kmApp.modules.account'
]);

kmApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
			
			when('/:clientName/offers', {
                templateUrl: 'modules/offers/views/index.html',
                controller: 'kmApp.modules.offers.offers'
            }).
			when('/:clientName/offers/template', {
                templateUrl: 'modules/offers/views/select.template.html',
                controller: 'kmApp.modules.offers.template'
            }).
			when('/:clientName/offers/details', {
                templateUrl: 'modules/offers/views/details.html',
                controller: 'kmApp.modules.offers.details'
            }).
			when('/:clientName/offers/redemption', {
                templateUrl: 'modules/offers/views/redemption.html',
                controller: 'kmApp.modules.offers.redemption'
            }).
			when('/:clientName/offers/redemption/manual', {
                templateUrl: 'modules/offers/views/redemption.manual.html',
                controller: 'kmApp.modules.offers.redemption'
            }).
			when('/:clientName/offers/channels', {
                templateUrl: 'modules/offers/views/channels.html',
                controller: 'kmApp.modules.offers.channels'
            }).
			when('/:clientName/offers', {
                templateUrl: 'modules/offers/views/index.html',
                controller: 'kmApp.modules.offers.offers'
            }).
			when('/:clientName/channels', {
                templateUrl: 'modules/channels/views/index.html',
                controller: 'kmApp.modules.channels.channels'
            }).
			when('/:clientName/channels/summary', {
                templateUrl: 'modules/channels/views/summary.html',
                controller: 'kmApp.modules.channels.summary'
            }).
			when('/:clientName/channels/design', {
                templateUrl: 'modules/channels/views/design.html',
                controller: 'kmApp.modules.channels.design'
            }).
			when('/:clientName/channels/design/custom', {
                templateUrl: 'modules/channels/views/design.custom.html',
                controller: 'kmApp.modules.channels.design.custom'
            }).
			when('/:clientName/channels/details', {
                templateUrl: 'modules/channels/views/details.html',
                controller: 'kmApp.modules.channels.details'
            }).
			when('/:clientName/channels/details/done', {
                templateUrl: 'modules/channels/views/details.done.html',
                controller: 'kmApp.modules.channels.details.done'
            }).
            when('/:clientName/general', {
                templateUrl: 'modules/general/views/index.html',
                controller: 'kmApp.modules.general.offer'
            }).

            when('/:clientName/general/codepools', {
                templateUrl: 'modules/general/views/codepools.html',
                controller: 'kmApp.modules.general.codepools'
            }).
            when('/:clientName/general/connected', {
                templateUrl: 'modules/general/views/connected.html',
                controller: 'kmApp.modules.general.connected'
            }).
            when('/:clientName/account', {
                templateUrl: 'modules/account/views/account.html',
                controller: 'kmApp.modules.account.user'
            }).
            when('/:clientName/account/plan', {
                templateUrl: 'modules/account/views/plan.html',
                controller: 'kmApp.modules.account.plan'
            }).
            when('/:clientName/general/store', {
                templateUrl: 'modules/general/views/store.html',
                controller: 'kmApp.modules.general.store'
            }).
            when('/:clientName/store/view', {
                templateUrl: 'modules/store/views/storelist.html',
                controller: 'kmApp.modules.store.storelistAction'
            }).
            when('/:clientName/store/id/:storeid/copy/:copy', {
                templateUrl: 'modules/store/views/storeedit.html',
                controller: 'kmApp.modules.store.storeEditAction'
            }).
            when('/:clientName/store/id/:storeid', {
                templateUrl: 'modules/store/views/storeedit.html',
                controller: 'kmApp.modules.store.storeEditAction'
            }).
            when('/:clientName/store/import', {
                templateUrl: 'modules/store/views/storeimport.html',
                controller: 'kmApp.modules.store.storeImportAction'
            }).
		  when('/login', {}).
		  when('/requestReset', {}).


            otherwise({ redirectTo: '/:clientName/general' });

    $locationProvider.html5Mode(false);
}]);

//logout controller
kmApp.controller('kmApp.controller.logout', ['$location', '$rootScope',
'kmApp.libraries.notification.screenNotifyService',
	function ($location, $rootScope) {

	    //logout (manual)
	    $rootScope.LogOut = function () {
	        localStorage.clear();
	        $location.path("//login");
	    };
	}
]);

kmApp.controller('kmApp.controller.loginAction', ['$scope', '$location', '$rootScope', '$timeout',
    'kmApp.libraries.waitLoader', 'kmApp.libraries.notification.screenNotifyService',
function ($scope, $location, $rootScope, $timeout, waitLoader, userNotificationLibrary) {

    $scope.validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,50}$/;
    $rootScope.isValidToken = true;

    $scope.setCredentials = function (params) {
        //Jquey its used here because AngularJs have a bug
        //Form model not updating on non-keyboard changes to input fields
        //https://github.com/angular/angular.js/issues/1460

        var email = $scope.loginform.email1;
        var pw = $scope.loginform.pass1;
        //store in localStorage for later processing
        var credentials = {
            email: email,
            pw: pw
        };
        localStorage.setItem("Session.Login", JSON.stringify(credentials));

        // Do a manual reload in case we need a form submission simulation.
        if (params && params.reload) {
            window.location.reload();
        }
    };

    $scope.isLoginForm = function () {
        return ($location.path() == '/login');
    }
    $scope.isRequestResetPassword = function () {
        return ($location.path() == '/requestReset');
    }
    $scope.isResetPassword = function () {
        return ($location.path() == '/resetPassword');
    }
    $scope.isSignUp = function () {
        return ($location.path() == '/signUp');
    }
    var validateToken = function (token, callbackFN, type) {
        if (token) {
            var params = {};
            params.token = token;
            if (type) params.token_type = type;

            tokenValidationSvc.get(params, function (data) {
                if (data.code == 200) {
                    callbackFN(true);
                } else {
                    callbackFN(false);
                }
            });
        };
    };

    if (($location.search().p)) {
        var accessToken = $location.search().p;

        $scope.$prepareForReady();
        if ($scope.isSignUp()) {
            validateToken(accessToken, function (data) {
                console.log(data);
                if (data) {
                    $rootScope.isValidToken = true;
                } else {
                    $rootScope.isValidToken = false;
                };
            }, 'signup');

            $rootScope.isConditionsAcepted = false;
        }
        if ($scope.isResetPassword()) {
            validateToken(accessToken, function (data) {
                if (data) {
                    $rootScope.isValidToken = true;
                } else {
                    $rootScope.isValidToken = false;
                };
            });
        }

        $scope.clearError = function () {
            userNotificationLibrary.clearNotification();
        }

        $scope.setPassword = function () {
            var newpass = $scope.resetPass.pass1;
            var chkpass = $scope.resetPass.pass2;

            if (!$scope.validPassword.test(newpass)) {
                userNotificationLibrary.addError("Password must contain Upper and Lower cases alpha characters, number and 6 to 50 characters long.");
                return;
            }

            if (newpass && chkpass && (chkpass == newpass)) {
                resetPasswordSvc.save({ 'token': accessToken, 'password': newpass }, function (data) {
                    console.log(data);
                    userNotificationLibrary.addSuccess("Password changed successfully! Redirecting to login...");
                    $timeout(function () {
                        window.location.href = "/portal/"
                    }, 2000);
                });
            }
            else {
                userNotificationLibrary.addError("The passwords do not match");
            }
        }
    } else {
        $scope.status = "no token found";
    }
}]);


//main bootstrap
kmApp.controller('kmApp.controller.rootLayout', ['$scope', '$rootScope', '$route', '$routeParams', '$location', '$window',
'kmApp.libraries.notification.screenNotifyService',
'kmApp.libraries.waitLoader','$sce',
function ($scope, $rootScope, $route, $routeParams, $location, $window,
	userNotificationLibrary,
	waitLoader, $sce) {

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $rootScope.expSecondsInMs = (30 * 60 * 1000); //30 mins

    $rootScope.onExternalPage = function () {

        var externalPages = ['/signUp', '/resetPassword', '/requestReset'];
        var isExternal = (externalPages.indexOf($location.$$path) != -1);

        return isExternal;
    };

    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $rootScope.isLoggedIn = function () {
        return (localStorage.getItem("Session.UserData") !== null);
    };

    //whitelabel theme handler
    var uriPieces = $location.host().split('.');
    var queryPieces = window.location.search.replace('?', '').split('&');
    var queryTheme = 'KouponMedia';
    for (var i = 0; i < queryPieces.length; i++) {
        var query = queryPieces[i].split('=');
        if (query[0] === 't') {
            queryTheme = query[1];
        }
    }
    $rootScope.clientData = {
        siteName: uriPieces[0].toLowerCase(),
        releaseVersion: "3.6.0",
        queryArray: queryPieces,
        theme: queryTheme
    };

    //dynamic menu class style
    $rootScope.menuClass = function (activatedLocation) {

        var isLocCampaign = function () {

            if ($location.path().indexOf("campaign/create") != -1 ||
                $location.path().indexOf("campaign/edit") != -1) {
                return true;
            }
            return false;
        };

        var renewPath = function () {
            var url = $location.path().split("/");
            url.splice(1, 1);
            return "#" + url.join("/");
        };
        var therenewpath = renewPath();
        if (therenewpath.indexOf("#" + activatedLocation) !== -1) {
            return "active";
        }

        if (isLocCampaign() && activatedLocation == "/createEdit") {
            return "active";
        }

        if ((activatedLocation == "/kmAdmin") && (renewPath() == "/kmAdmin" || renewPath() == "/addClient")) {
            return "active";
        }

        return "";
    };

    //provide root layout the ability to clear notifications easily
    $rootScope.clearNotification = function () {
        userNotificationLibrary.clearNotification();
    };

    $rootScope.isLoggedIn = function () {
        return !(localStorage.getItem("Session.UserData") === null);
    }

    $rootScope.isWireOn = function () {
        return $rootScope.UserData.isMichaels;
    };

    $rootScope.isCumberland = function () {
        return $rootScope.UserData.isCumberland
    };

    $rootScope.isIE8 = function () {
        var browserInfo = $rootScope.getBrowserInfo();
        var browserName = browserInfo[0];
        var browserVersion = browserInfo[1];
        if (browserName === 'MSIE' && browserVersion === '8.0') {
            return true;
        }
        return false;
    };

    $rootScope.isFeatureOn = function (feature) {
        return $.inArray(feature, $rootScope.UserData.featureList) > -1;
    }

    $rootScope.getBrowserInfo = function () {
        var N = navigator.appName, ua = navigator.userAgent, tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M;
    };

    if ($rootScope.isLoggedIn()) {
        $rootScope.channelMenuItems = JSON.parse(localStorage.getItem("Session.channelMenuItems"));
        $rootScope.UserData = JSON.parse(localStorage.getItem("Session.UserData"));
    }

    $scope.getCredentials = function () {
        return JSON.parse(localStorage.getItem("Session.Login"));
    };

    //------- Login Functionality ---------//
    $scope.processLogin = function (email, pw) {
        $scope.isLoggin = true;

        //remove this line when login with webservice 

        if (email == 'admin@kou.pn' && pw == 'admin') {
            var date = new Date();
            $rootScope.UserData = {
                clientId: 01
                   , clientName: 'james'
                   , authKey: 'fgdfhgtfgjhytgj6756456'
                   , roleId: 1
                   , email: email
                   , loginId: 1
                   , uploadCDN: 'https://c815555.ssl.cf2.rackcdn.com'
                   , isMichaels: false
                   , isCumberland: false
                   , lastActivity: date.getTime()
                   , channelData: ''
                   , featureList: ''
                   , webOfferType: ''
                   , wireon: ''
            };

            localStorage.setItem("Session.UserData", JSON.stringify($rootScope.UserData));
            waitLoader.endLoader('#login_box');
            $scope.isLoggin = false;

            $location.path('/'+$rootScope.UserData.clientName+'/general');
        }
        else {
            userNotificationLibrary.addError('Login unsuccessful!');
            waitLoader.endLoader('#login_box');
            $scope.isLoggin = false;
        }
        /*authClientSvc.get(
		{
		    Email: email,
		    Pass: $.base64.encode(pw)
		},

        //success callback
		function (data) {
		    if (data.client_name === undefined) {
		        userNotificationLibrary.addError('Login unsuccessful!');
		        waitLoader.endLoader('#login_box');
		        $scope.isLoggin = false;
		        $location.path('/login');
		    }
		    else {
		        var date = new Date();
		        $rootScope.UserData = {
		            clientId: data.clientid
		            , clientName: data.client_name
		            , authKey: data.client_auth_key
		            , roleId: data.loginRoleId
		            , email: email
		            , loginId: data.loginId
		            , uploadCDN: 'https://c815555.ssl.cf2.rackcdn.com'
		            , isMichaels: data.is_michaels
                    , isCumberland: data.is_cumberland
		            , lastActivity: date.getTime()
		            , channelData: data.channelData
		            , featureList: data.featureData
	                , webOfferType: data.web_offer_type
                    , wireon: JSON.parse(data.wireon)
		        };
		        $rootScope.channelMenuItems = data.channelMenuItems;

		        localStorage.setItem("Session.UserData", JSON.stringify($rootScope.UserData));
		        localStorage.setItem("Session.channelMenuItems", JSON.stringify($rootScope.channelMenuItems));

		        waitLoader.endLoader('#login_box');
		        $scope.isLoggin = false;
		        $location.path('/' + $rootScope.UserData.clientName + '/dashboard');
		    }
		},
        //error callback
		function () {
		    userNotificationLibrary.addError('There was a communication error!');
		});*/
    };

    $scope.isLogging = function () {
        return $scope.isLoggin;
    }

    //@AWTODO - refactor to service/library
    // router listener
    $rootScope.$on('$routeChangeStart', function (event, next) {

        //  if user is submitting login info, process...
        var credentials = $scope.getCredentials();
        if (credentials !== null) {
            if (credentials.email !== undefined && credentials.pw !== undefined) {

                waitLoader.addLoader('#login_box');
                $scope.processLogin(credentials.email, credentials.pw);
                localStorage.removeItem("Session.Login");
                event.preventDefault();
                return;
            }
        }

        //    if they are logged in
        //     AND their expiration is past
        var date = new Date();
        if ($rootScope.isLoggedIn() && ((date.getTime() - $scope.UserData.lastActivity) > $scope.expSecondsInMs)) {

            event.preventDefault();
            if ($rootScope.Logout != undefined) {
                $rootScope.LogOut();
            }
            return;
        }

        //      if they are NOT logged in
        //      AND they are not on an external page
        //     AND they are not on login page
        //     		-then redirect them to login
        if (!$rootScope.isLoggedIn() && !$rootScope.onExternalPage() && next.templateUrl != '/login.html') {

            event.preventDefault();
            $location.path("/login");
            return;
        }
    });

    ////@AWTODO - refactor to service/library
    ////router listener
    $scope.$on('$routeChangeSuccess', function () {
        //    //cool stuff - can do whatever we want to do dynamically here

        //    //load modules

        //    //load css
        //    //less.refresh(true);
        //    //etc

        //if user is already logged in...
        if ($rootScope.isLoggedIn()) {

            //update lastActivity
            var date = new Date();
            $rootScope.UserData.lastActivity = date.getTime();

        }

        //    //clear existing notifications
        //    userNotificationLibrary.clearNotification();

        //    //process redirect notifications
        //    userNotificationLibrary.processQueue('redirect');

        //    //push new location to google analytics
        //    $window._gaq.push(['_trackPageview', $location.path()]);

        //    $rootScope.$on('$viewContentLoaded', function () {
        //        $(".ui-tooltip-content").parents('div').remove();
        //        $('[rel="tooltip"]').tooltip();
        //    });

        //    jQuery('#mainPage').css('display', 'block');
        //    jQuery('#loadingPage').css('display', 'none');
    });

    // Self Service - Reset password
    $scope.regexpEmail = "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/";
    $scope.showResetPasswordForm = false;
    $scope.toggleResetPasswordForm = function () {
        $scope.showResetPasswordForm = !$scope.showResetPasswordForm;
    };

    $scope.resetPassword = function () {
        var email = $("#resetPasswordForm [name=resetPasswordEmail]").val();
        waitLoader.addLoader('#forgot_password_box');
        resetUserPasswordSvc.get({ email: email },
            //success callback
            function (data) {
                waitLoader.endLoader('#forgot_password_box');
                if (data.code == 200 && data.message !== undefined) {
                    userNotificationLibrary.addSuccess(data.message);
                    $scope.toggleResetPasswordForm();
                } else if (data.code != 200) {
                    userNotificationLibrary.addError(data.message);
                }
            },
            //error callback
            function () {
                userNotificationLibrary.addError('There was a communication error!');
            }
        );
    };
}]);