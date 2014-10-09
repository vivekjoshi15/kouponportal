var generalModule = angular.module('kmApp.modules.general', ['angular.filter', 'kmApp.libraries.notification', 'ui.select']);

generalModule.controller('kmApp.modules.general.offer', function ($scope, $location, $rootScope) {

    $scope.TextMessagesOption = ['Per Week', 'Per Month','Per Day'];
    $scope.TextMessagesSelectVal;

    $scope.NotificationsOption = ['Per Week','Per Month','Per Day'];
    $scope.NotificationsSelectVal;

    $scope.emailMessagesOption = ['Per Week','Per Month','Per Day'];
    $scope.emailSelectVal;

});

generalModule.controller('kmApp.modules.general.codepools',
 						['$scope',
						 'kmApp.libraries.pool.poolService',
						 'kmApp.libraries.notification.screenNotifyService',
                         function ($scope,poolService,userNotificationLibrary) {
    $scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };

    $scope.poolList= poolService.getPools();
	$scope.fileInfo;
	
		   
    $scope.csvJSON=function (csv){	 
		  var lines=csv.split("\n");	 
		  var result = [];	 
		  var headers=lines[0].split(",");		 
		  for(var i=1;i<lines.length-1;i++){		 
			  var obj = {};
			  var currentline=lines[i].split(","); 
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
			  result.push(obj); 
			  console.log(obj);
		  }
		  return result;
	}
	$scope.upload=function(file) {	
				//if(file.type.match(/text\/csv/)){

			    if(file.name.match(/csv/)){
					$scope.model.fileInfo=file;	
					oFReader = new FileReader();
					oFReader.onloadend = function() {	
						$scope.poolUploadFile = $scope.csvJSON(this.result);		
						console.log($scope.poolListUpload);
					
					};
					oFReader.readAsText(file);
				} else {
					userNotificationLibrary.addError("This file does not seem to be a CSV.");			
				}
				$scope.$apply();
			}
	$scope.uploadPool =function(){
		
		if($scope.IsEdit){
			poolService.editPool($scope.model.poolid,$scope.model);
		}
		else{
		  $scope.model.poolid=Math.floor((Math.random() * 1000) + 1);
		  $scope.model.file_name=$scope.fileInfo;
		  $scope.model.fileData=$scope.poolUploadFile;
		  poolService.addPool($scope.model);      
		  userNotificationLibrary.addSuccess('Upload list Successfully');
		  
		  $scope.model='';  //clear model
		  $scope.fileInfo=''; //clear fileinfo	
				
		  $scope.$apply();
		}
		$scope.newpool = false;
	}
	
	$scope.edit = function (item) {
		$scope.editIndex = $scope.poolList.indexOf(item);
		$scope.model = item;
		$scope.newpool = true;
		$scope.IsEdit = true;
	};
	$scope.remove = function (item) {
		poolService.removePool(item);
	   // $scope.poolList.splice($scope.poolList.indexOf(item), 1);
	 }
	$scope.removefileInfo=function(){
	  $scope.model.fileInfo='';
	 }

	$scope.codeList = ['Code type', 'Code type1', 'Code type 2', 'Code type 3'];
	$scope.selectedCodeList = ['Code type', 'Code type1'];
}]);

generalModule.controller('kmApp.modules.general.connected', function ($scope, $http, $timeout) {
	$scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };
    $scope.model = {
        'provider': [{
            text: 'Twillio',
            someprop: 'Twillio'
                   },
                    {
                        text: 'Twillio 2',
                        someprop: 'Twillio 2'
                    },
                    {
                        text: 'Twillio 3',
                        someprop: 'Twillio 3'
                    },
        ],
        'accesstoken': '324234asdff',
        'shortcode': '32443',
        'keyword': '234234'
    };
	$scope.provider=[{ text: 'Twillio', someprop: 'Twillio'},
                     {text: 'Twillio 2', someprop: 'Twillio 2'},
                     {text: 'Twillio 3',someprop: 'Twillio 3'},
                    ];
	
    $scope.selectprovider = ['Twillio','asdas']; // init selected item
    $scope.selectProviderList = ['Twillio','Twillio 2','Twillio 3'];

});

generalModule.controller('kmApp.modules.general.store', function ($scope) {

    $scope.storeGroup = [{ name: 'Albany Stores East', value: 12 },
                        { name: 'Coast Stores North', value: 06 },
                        { name: 'tores Southern Stores', value: 07 }];

    $scope.GeofenceGroup = [{ name: 'Albany Stores East', value: 12 },
                          { name: 'Coast Stores North', value: 06 },
                          { name: 'tores Southern Stores', value: 07 }];

    $scope.BeaconGroup = [{ name: 'Albany Stores East', value: 12 },
                        { name: 'Coast Stores North', value: 06 },
                        { name: 'tores Southern Stores', value: 07 }];

});