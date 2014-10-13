var poolLibrary = angular.module('kmApp.libraries.pool', []);

poolLibrary.service('kmApp.libraries.pool.poolService', ['$filter', function ($filter) {
    var poolList = [{ name: "Victoria's Secret PLU Codes", poolid: 1, selectCodeType: "Select Code Type", fileInfo: 'filename.cvs', fileData: '' },
					{ name: "Secret PLU Codes", poolid: 2, selectCodeType: "Select Code Type", fileInfo: 'filename.cvs', fileData: '' },
					{ name: "Victoria's Secret PLU ", poolid: 3, selectCodeType: "Select Code Type", fileInfo: 'filename.cvs', fileData: '' },
					{ name: "PLU Codes", poolid: 5, selectCodeType: "Select Code Type", fileInfo: 'filename.cvs', fileData: '' },
    ];

    //console.log(poolList[0]);

    var addPool = function (item) {
        poolList.push(item);
    }
    var getPoolName = function () {
        var poolName = [];
        for (var i = 0; i < poolList.length; i++) {
            poolName.push(poolList[i].name);
        }
        return poolName;
    }
    var getPools = function () {
        return poolList;
    }

    var getPool = function (poolid) {
        var found = $filter('filter')(poolList, { poolid: parseInt(poolid) }, true);
        return found[0];
    }

    var editPool = function (poolid, item) {
        var found = $filter('filter')(poolList, { poolid: parseInt(poolid) }, true);
        poolList[poolList.indexOf(found[0])] = item;
    }

    var removePool = function (item) {
        poolList.splice(poolList.indexOf(item), 1);
        return poolList;
    }

    var copyPool = function (item) {
        item.name = item.name + ' copy';
        item.poolid = item.poolid + 1;
        poolList.push(item);
        return poolList;
    }
    return {
        addPool: addPool,
        getPools: getPools,
        removePool: removePool,
        copyPool: copyPool,
        getPool: getPool,
        editPool: editPool,
        getPoolName: getPoolName
    };
}]);