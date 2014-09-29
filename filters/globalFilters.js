//filters
kmApp.filter('capitalize', [

function () {
    return function (input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
} ]);
kmApp.filter('links', ['$rootScope', function ($rootScope) {
    return function (input, param) {
        if (param === 'js') {
            return '/' + $rootScope.UserData.clientName + '/' + input;
        } else {
            return '#/' + $rootScope.UserData.clientName + '/' + input;
        }
    };
} ]);


kmApp.filter('formatDate', ['dateFilter', function (dateFilter) {
    return function (dateString) {
        var dates1 = new Date(dateString);
        return dateFilter(dates1, 'MM/dd/yyyy');
    };
} ]);


kmApp.filter('dataTable', ['filterFilter', 'orderByFilter', function (fFilter, fOrderBy) {

    return function (input, excludeFilters) {

        if (input._data === null) {
            return;
        }

        var filteredData = input._data;
        var localInput = input;

        //**** Helper Methods Begin ****/
        //filter (text - general)
        var filterText = function (out) {
            if (localInput._tableSearch !== undefined && localInput._tableSearch !== '') {
                var searchTerm = localInput._tableSearch;

                var upcTest = new RegExp("^[0-9]{12}");
                if (upcTest.test(searchTerm)) {
                    //grab the first 11
                    upcTest = new RegExp("^[0-9]{11}");
                    searchTerm = upcTest.exec(searchTerm)[0];
                }
                out = fFilter(out, searchTerm);
            }
            return out;
        };

        //custom conditions
        var filterConditions = function (out) {

            if (localInput._conditions !== undefined && localInput._conditions !== []) {

                out = fFilter(out, function (dataIn) {

                    var allConditionsPass = true;

                    //loop through conditions
                    $.each(localInput._conditions, function (conditionName, valueString) {
                        var valueArray = valueString.split('|');

                        //ensure we have at least 1 condition value or we fail
                        var conditionFailed = true;
                        $.each(valueArray, function (idx, val) {
                            if (val === dataIn[conditionName]) {
                                conditionFailed = false;
                            }

                        });

                        if (conditionFailed) {
                            allConditionsPass = false;
                            return false;
                        }
                    });

                    return (allConditionsPass) ? dataIn : null;
                });
            }

            return out;
        };

        //sort
        var sortData = function (out) {
            if (localInput._tableSort !== undefined && localInput._tableSort != {}) {
                var sortCol = localInput._tableSort.col;
                var sortReverse = localInput._tableSort.rev;
                out = fOrderBy(out, sortCol, sortReverse);
            }
            return out;
        };

        //pagination
        var paginateData = function (out) {
            if (localInput._tablePage !== undefined &&
                localInput._tablePage !== '' && localInput._tablePageLimit !== undefined &&
                localInput._tablePageLimit !== '') {

                //slice
                var startRecord = (((localInput._tablePage - 1) * localInput._tablePageLimit));
                var endRecord = ((localInput._tablePage * localInput._tablePageLimit));
                out = out.slice(startRecord, (endRecord));
            }
            return out;
        };

        //**** Helper Methods End ****/
        excludeFilters = typeof excludeFilters !== 'undefined' ? excludeFilters : [];

        if (excludeFilters.indexOf('text') === -1) {
            filteredData = filterText(filteredData);
        }
        if (excludeFilters.indexOf('condition') === -1) {
            filteredData = filterConditions(filteredData);
        }
        if (excludeFilters.indexOf('sort') === -1) {
            filteredData = sortData(filteredData);
        }
        if (excludeFilters.indexOf('paginate') === -1) {
            filteredData = paginateData(filteredData);
        }

        $('[rel="tooltip"]').tooltip();

        return filteredData;
    };
} ]);


kmApp.filter('removeNullBarcodeName', function () {
    return function (val) {
        var element = [];
        if (val == null) {
            return element;
        }
        var len = val.length;

        for (var k = 0; k < len; k++) {
            if (val[k].barcode_generator_id != 1 && val[k].barcode_generator_id != 3) {
                element.push(val[k]);
            }
        }
        return element;
    };
});
kmApp.filter('BarcodeDataDisp', function () {
    return function (val) {
        if (val == null) return;

        if (val.client_barcode_group_parameter.length > 0 && val.client_barcode_group_parameter.indexOf('PoolName') > -1) {
            var element = val.client_barcode_group_parameter + '  (' + val.barcode_generator_type_name + ')';
            return element;  
        }
        var element = val.upctypeid + '-' + val.upctype + '  (' + val.barcode_generator_type_name + '): ' + val.barcode_generator_name;
        return element;
    };
});

kmApp.filter('startdatetimefilter', function () {
    return function (val) {
        if (val == 'Triggered') {
            return 'Acquisition Start Time';
        }
        return 'Start Date/Time';
    };
});

kmApp.filter('enddatetimefilter', function () {
    return function (val) {
        if (val == 'Triggered') {
            return 'Acquisition End Time';
        }
        return 'Expiration Date/Time';
    };
});

kmApp.filter('countNonEmpty', function () {
    return function (val){
        var len = val.length;
        var count = len;
        for(var k=0;k<len;k++){
            if(val[k].paramValue ==""){
                count--;
            }
        }
        return count;
    };
});
kmApp.filter('tableColumnSort', function () {
    return function (arrInput, ind, stype) {
        if (arrInput === undefined)
            return null;

        var reverse = 1;
        var indx = ind;
        if (ind < 0) {
            reverse = -1;
            indx = -1 * ind;
        }
        indx = indx - 1;
        var arr = arrInput.sort(function (a, b) {
            var aval = a[indx];
            var bval = b[indx];
            if (stype == 'f') {
                aval = parseFloat(a[indx]);
                bval = parseFloat(b[indx]);
            }
            else if (stype == 'n') {
                aval = parseInt(a[indx], 10);
                bval = parseInt(b[indx], 10);
            }

            if (aval < bval) {
                return reverse;
            }
            else {
                return -1 * reverse;
            }
        });
        return arr;
    }
});
kmApp.filter('tableStartFrom', function () {
    return function (input, start) {
        if (input == null)
            return null;

        start = +start; //parse to int
        return input.slice(start);
    }
});

kmApp.filter('getById', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
});