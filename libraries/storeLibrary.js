var storeLibrary = angular.module('kmApp.libraries.store', []);

storeLibrary.service('kmApp.libraries.store.storeService', ['$filter', function ($filter) {
    var storeList = [
							{ storeid: 1, merchantid: 1701, name: 'Town Center San Antonio ', groupname: 'West Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'USA', county: 'Option1', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 2, merchantid: 2642, name: 'Town Center San Antonio 2 ', groupname: 'East Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'USA', county: 'Option1', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 3, merchantid: 3453, name: 'Town San Antonio ', groupname: 'North Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'USA', county: 'Option1', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 4, merchantid: 4464, name: 'Town Center San  ', groupname: 'West Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'USA', county: 'Option1', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 5, merchantid: 5235, name: 'Town Center San 2', groupname: 'East Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'Canada', county: 'Option1', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 6, merchantid: 6436, name: 'Town  San Antonio ', groupname: 'North Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'Canada', county: 'Option2', latitude: 121.2432, longitude: -424.24234 },
							{ storeid: 7, merchantid: 7236, name: 'Center San Antonio', groupname: 'South Store', address: '108 Callery Pera', city: 'Jacksonville', state: 'TX', zip: 32444, country: 'Canada', county: 'Option2', latitude: 121.2432, longitude: -424.24234 }
    ];

    //console.log(storeList[0]);

    var addStore = function (item) {
        storeList.push(item);
    }
    var getStoreName=function(){
		var storeName=[];
	        for(var i=0;i<storeList.length;i++){
			 storeName.push(storeList[i].name);
	       }
		 return storeName;	
	}
    var getStores = function () {
        return storeList;
    }

    var getStore = function (storeid) {
        var found = $filter('filter')(storeList, { storeid: parseInt(storeid) }, true);
        return found[0];
    }

    var editStore = function (storeid, item) {
        var found = $filter('filter')(storeList, { storeid: parseInt(storeid) }, true);
        storeList[storeList.indexOf(found[0])] = item;
    }

    var removeStore = function (item) {
        storeList.splice(storeList.indexOf(item), 1);
        return storeList;
    }

    var copyStore = function (item) {
        item.name = item.name + ' copy';
        item.storeid = item.storeid + 1;
        storeList.push(item);
        return storeList;
    }

    return {
        addStore: addStore,
        getStores: getStores,
        removeStore: removeStore,
        copyStore: copyStore,
        getStore: getStore,
        editStore: editStore,
		getStoreName:getStoreName
    };

}
]);