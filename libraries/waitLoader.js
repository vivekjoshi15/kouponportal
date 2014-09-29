var waitLoaderLibrary = angular.module('kmApp.libraries.waitLoader', []);

waitLoaderLibrary.service('kmApp.libraries.waitLoader', [
    function () {
        var promises = {};
        return {
            addLoader:function (element, fullscreen) {
                
                if (!promises[element]) {
                    promises[element] = 1;
                } else {
                    promises[element] = promises[element] + 1;
                }
                
                if (promises[element] == 1) {
                    //reference element  with Jquery
                    element = $(element);
                    element.hide();
                    $('#spinner').remove();
                    // this is the template for the spinner loader
                    
                    var template = '<div id="spinner"  class="progress-loader' + (fullscreen ? '-fullscreen' : '') + '"><img src="kmApp/images/ajax-load.gif"/></div>';

                    //use this for prevent the double spinner insertion (issue "Double Jquery Excecution")
                    if ($('#spinner') !== undefined && $('#spinner').length === 0) {
                        
                        //insert the template on before the selected element
                        var loaderDiv = element.before(template);
                    }
                }
                
            },
            endLoader: function(element) {
                //reference element  with Jquery
                
                promises[element] = promises[element] - 1;

                if (promises[element] <= 0) {
                    promises[element] = 0;

                    element = $(element);
                    //Removing spinner an show the hidden content
                    $('#spinner').remove();
                    element.show();
                }
        }
        };
    }]);
