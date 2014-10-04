require.config({
	paths: {
		/* core */
		rANGULAR: 'libraries/core/angular/angular.min',
	    rANGULARRESOURCE: 'libraries/core/angular/angular-resource.min',
		rJQUERY: 'libraries/core/jQuery/jquery.min',
		//rANGULARUI: 'libraries/core/angularui/angular-ui',
		rANGULAR_ONREADY: 'libraries/core/angular/angularOnReady',
	    rANGULAR_SANITIZE: 'libraries/core/angular/angular-sanitize.min',
	    rANGULAR_ROUTE: 'libraries/core/angular/angular-route.min',
		//rANGULAR_GRID: 'libraries/3rdParty/nggrid/ng-grid.min',

	    /* 3rd party */
	    rANGULAR_FILTER: 'libraries/3rdParty/angular-filter.min',
		//rJQUERYUI: 'libraries/3rdParty/jqueryUI/jquery-ui-custom.min',
		//rJQUERYUI_PLUGIN_TIMEPICKER: 'libraries/3rdParty/jqueryUI/jquery-ui-timepicker-addon',
		//rJQUERY_PLUGIN_VALIDATOR: 'libraries/3rdParty/jqueryValidator/jquery.validator.min',
		//rJQUERY_PLUGIN_JTAGS: 'libraries/3rdParty/jqueryjTags/jtags',
		//rJQUERY_PLUGIN_TINYMCE: 'libraries/3rdParty/tinyMce/jquery.tinymce',
		rJQUERY_SELECT2: 'libraries/3rdParty/select2/select2',
		//rLIGHTBOX: 'libraries/3rdParty/lightbox/lightbox',
		//rCHART: 'libraries/3rdParty/chart/highcharts',
		//rCHARTEXP: 'libraries/3rdParty/chart/modules/exporting',
		//rBASE64: 'libraries/3rdParty/jqueryBase64/jquery.base64.min',
		rKMAPP: 'kmApp/kmApp',
		//rSTORELOC: 'libraries/storeLocations',
		//rJQUERYFORM: 'libraries/3rdParty/jqueryForm/jqueryForm',
		//rJSONJS: 'libraries/3rdParty/jsonJs/jsonJs',
		//rJQUERY_TOOLS: 'libraries/3rdParty/jqueryTools/jqueryTools',
		//rMOMENT: 'libraries/3rdParty/moment/moment.min',
		//rKOUPON_MEDIA_FACEBOOK: 'libraries/3rdParty/facebook/facebook',
		//rKOUPON_MEDIA_FACEBOOK_HELPER_GLOBAL: 'libraries/3rdParty/facebook/facebookHelper',
		//rLESS: 'libraries/3rdParty/lessCSS/less.min',
        //rANGULARUI_MAPS: 'libraries/3rdParty/angularUI/ui-map',
        //rANGULARUI_EVENT: 'libraries/3rdParty/angularUI/event',
        //rANGULARUI_MAP_UTILS: 'libraries/3rdParty/angularUI/markerclusterer_packed',
		//rDRAGDROP: 'libraries/3rdParty/dragdrop/lvl-drag-drop',
		//rDRAGDROPUID: 'libraries/3rdParty/dragdrop/lvl-uuid',
		//rCOLORPICKER: 'libraries/3rdParty/colorPicker/bootstrap-colorpicker-module',
		
		/* modules */
		rMODULES_OFFER:   'modules/offers/offers',
		rMODULES_CHANNEL: 'modules/channels/channels',
		rMODULES_GENERAL: 'modules/general/general',
		rMODULES_ACCOUNT: 'modules/account/account',
		rMODULES_STORE: 'modules/store/store',		

		/* libraries */
		rLIBRARIES_NOTIFICATION: 'libraries/notification',
	    rLIBRARIES_WAITLOADER: 'libraries/waitLoader',
	    rLIBRARIES_TOOLTIP: 'libraries/toolTip',
	    rLIBRARIES_STORE: 'libraries/storeLibrary',
		
		/* services */
		rSERVICES_GLOBAL: 'services/globalServices',

		/* directives */
		rDIRECTIVES_GLOBAL: 'directives/globalDirectives',
	    //rCLIENT_DIRECTIVES: 'directives/clientDirectives',
	    rSELECT_DIRECTIVES: 'directives/select',

		/* filters */
		rFILTERS_GLOBAL: 'filters/globalFilters'
	},
	shim: {
		/* phase 1 - jquery dependencies */
		//'rJQUERYUI': ['rJQUERY'],
		//'rJQUERYFORM': ['rJQUERY'],
		//'rBASE64': ['rJQUERY'],
		//'rCHART': ['rJQUERY'],
		//'rJQUERY_PLUGIN_VALIDATOR': ['rJQUERY'],
		//'rJQUERY_PLUGIN_TINYMCE': ['rJQUERY'],
		//'rMOMENT' : ['rJQUERY'],
		//'rJQUERY_TOOLS': ['rJQUERY'],
		//'rLIGHTBOX': ['rJQUERY'],
		'rJQUERY_SELECT2': ['rJQUERY'],

		/* phase 2a - jqueryui dependencies */
		//'rJQUERYUI_PLUGIN_TIMEPICKER': ['rJQUERYUI'],
		//'rANGULAR': ['rJQUERYUI'],
		//'rJQUERY_PLUGIN_JTAGS': ['rJQUERYUI'],

		/* phase 2b - rchart dependencies */
		//'rCHARTEXP': ['rJQUERY','rCHART'],

		/* phase 3 - angular dependencies */
		'rANGULARRESOURCE': ['rANGULAR'],
		//'rANGULARUI': ['rANGULAR'],
		'rANGULAR_ONREADY': ['rANGULAR'],
		'rANGULAR_SANITIZE': ['rANGULAR'],
		'rANGULAR_ROUTE': ['rANGULAR'],
		
		//'rDRAGDROP':['rANGULAR'],
		//'rDRAGDROPUID':['rANGULAR'],
		//'rCOLORPICKER':['rANGULAR'],

		/* phase 4 - kmapp */
		'rKMAPP': ['rANGULARRESOURCE', 'rANGULAR', 'rANGULAR_SANITIZE', 'rANGULAR_ROUTE'],

		/* phase 5 - kmapp dependencies */
		'rMODULES_OFFER':['rKMAPP'],
		'rMODULES_CHANNEL':['rKMAPP'],
		'rMODULES_GENERAL': ['rKMAPP'],
		'rMODULES_ACCOUNT': ['rKMAPP'],
		'rMODULES_STORE': ['rKMAPP'],
		//'rMODULES_DASHBOARD': ['rKMAPP'],
		//'rMODULES_CLIENTS': ['rKMAPP'],
		//'rMODULES_TARGET': ['rKMAPP'],
		//'rMODULES_TAGGROUP': ['rKMAPP'],
        //'rMODULES_MESSAGES': ['rKMAPP'],
        //'rMODULES_STORE': ['rKMAPP'],
		//'rMODULES_PASSBOOK': ['rKMAPP'],
        //'rMODULES_GEOFENCE': ['rKMAPP'],
        //'rMODULES_LIBRARY': ['rKMAPP'],
        //'rMODULES_ADMIN': ['rKMAPP'],
        //'rMODULES_SUPPORT': ['rKMAPP'],
		'rLIBRARIES_NOTIFICATION': ['rKMAPP'],
		'rLIBRARIES_WAITLOADER': ['rKMAPP'],
		'rLIBRARIES_TOOLTIP': ['rKMAPP'],
		'rLIBRARIES_STORE': ['rKMAPP'],
		'rSERVICES_GLOBAL': ['rKMAPP'],
		//'rFACEBOOK_HELPER_LIBRARY': ['rKMAPP'],
		'rDIRECTIVES_GLOBAL': ['rKMAPP'],
	    //'rCLIENT_DIRECTIVES': ['rKMAPP','rMODULES_CLIENTS'],
		'rSELECT_DIRECTIVES': ['rKMAPP'],
		'rFILTERS_GLOBAL': ['rKMAPP'],
		'rANGULAR_FILTER': ['rKMAPP']
        //'rANGULARUI_MAPS': ['rKMAPP'],
        //'rANGULARUI_EVENT': ['rKMAPP'],
        //'rANGULARUI_MAP_UTILS': ['rKMAPP','rANGULARUI_MAPS'],
		/* phase 6 - lessCSS */
		//'rLESS': ['rFILTERS_GLOBAL']
	},
	waitSeconds: 0
});

require([
/* core and 3rd party */
	'rJQUERY',
	//'rJQUERYUI',
	//'rJQUERYUI_PLUGIN_TIMEPICKER',
	//'rJQUERY_PLUGIN_VALIDATOR',
	//'rJQUERY_PLUGIN_JTAGS',
	//'rJQUERY_PLUGIN_TINYMCE',
    'rJQUERY_SELECT2',
	//'rLIGHTBOX',
	//'rCHART',
	//'rCHARTEXP',
	'rANGULAR',
	'rANGULARRESOURCE',
	'rANGULAR_ROUTE',
	'rANGULAR_SANITIZE',
	'rKMAPP',
    'rANGULAR_FILTER',
	//'rBASE64',
	//'rSTORELOC',
	//'rJQUERYFORM',
	//'rJSONJS',
	//'rJQUERY_TOOLS',
	'rANGULAR_ONREADY',
    //'rANGULAR_GRID',
	//'rMOMENT',
	//'rKOUPON_MEDIA_FACEBOOK',
    //'rKOUPON_MEDIA_FACEBOOK_HELPER_GLOBAL',
	//'rLESS',
    //'rANGULARUI_MAPS',
    //'rANGULARUI_EVENT',
    //'rANGULARUI_MAP_UTILS',
	//'rDRAGDROP',
	//'rDRAGDROPUID',
	//'rCOLORPICKER',	
	
	/* global angular services */
	'rSERVICES_GLOBAL',

	/* global angular directives */
	'rDIRECTIVES_GLOBAL',
    //'rCLIENT_DIRECTIVES',
     'rSELECT_DIRECTIVES',

	/* global angular filters */
	'rFILTERS_GLOBAL',

	/* global angular libraries */
	'rLIBRARIES_NOTIFICATION',
	//'rFACEBOOK_HELPER_LIBRARY',
    'rLIBRARIES_WAITLOADER',
	'rLIBRARIES_TOOLTIP',
    'rLIBRARIES_STORE',
    
/* angular modules */
    'rMODULES_OFFER',
    'rMODULES_CHANNEL',
	'rMODULES_GENERAL',
	'rMODULES_ACCOUNT',
	'rMODULES_STORE'],
	//'rMODULES_CLIENTS',
    //'rMODULES_MESSAGES',
    //'rMODULES_STORE',
	//'rMODULES_PASSBOOK',
    //'rMODULES_GEOFENCE',
    //'rMODULES_LIBRARY',
    //'rMODULES_ADMIN',
  	//'rMODULES_TARGET',
    //'rMODULES_SUPPORT',
	//'rMODULES_TAGGROUP'],

//init (loaded) func
	function () {
		//bootstrap angularjs
	    angular.element(document).ready(function () {
			angular.bootstrap(document, ['kmApp']);

			//occurs when angular is fully loaded

	    });
	}
);
