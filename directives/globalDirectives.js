//// --- TinyMCE Directive --- //
//kmApp.directive('kmTinymce', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModel) {
//
//            element.tinymce({
//                // Location of TinyMCE script
//                script_url: 'libraries/3rdParty/tinyMce/tiny_mce.js',
//
//                // General options
//                mode: "textareas",
//                theme: "advanced",
//                plugins: "table,inlinepopups",
//                width: "520",
//                force_p_newlines: false,
//                forced_root_block: '',
//
//                // Theme options
//                theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull",
//                theme_advanced_buttons2: "styleselect,formatselect,|,table,removeformat,code",
//                theme_advanced_buttons3: "",
//                theme_advanced_buttons4: "",
//                theme_advanced_toolbar_location: "top",
//                theme_advanced_toolbar_align: "left",
//                theme_advanced_statusbar_location: "bottom",
//                theme_advanced_resizing: true,
//
//                // Style formats
//                style_formats: [
//                    { title: 'Bold text', inline: 'b' },
//                    { title: 'Red text', inline: 'span', styles: { color: '#ff0000'} },
//                    { title: 'Red header', inline: 'span', styles: { color: '#ff0000', 'font-size': '15pt'} },
//                    { title: 'Example 1', inline: 'span', classes: 'example1' },
//                    { title: 'Example 2', inline: 'span', classes: 'example2' },
//                    { title: 'Table styles' },
//                    { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
//                ],
//                // Update model on button click
//                onchange_callback: function (inst) {
//                    ngModel.$setViewValue(element.val());
//                    return;
//                },
//                // Update model on keypress
//                handle_event_callback: function (e) {
//                    ngModel.$setViewValue(element.val());
//                    return true; // Continue handling
//                },
//                // Update model when calling setContent (such as from the source editor popup)
//                setup: function (ed) {
//                    ed.onSetContent.add(function (ed, o) {
//                        ngModel.$setViewValue(element.val());
//                    });
//                }
//            });
//        }
//    };
//});
//
//
////miniuploader directive
//kmApp.directive('miniImageUploader',
//function () {
//    return {
//        restrict: 'A',
//        templateUrl: '/portal/directives/templates/miniuploader.html',
//        scope: true,
//        link: function ($scope,element, attrs,$rootScope ) {
//
//            //set logic names/ids of relevant image uploader elements
//            //image props
//            $scope.inputName = attrs.miniImageUploader;
//            $scope.filename = null;
//            $scope.thumbnailBase64 = null;
//            $scope.uploadInProgress = false;
//
//            $scope.$on('handleReloadImage', function () { $scope.reloadImage() });
//            $scope.$on('handleRemoveImage', function () { $scope.removeImage() });
//            $scope.reloadImage = function () {
//                $scope.filename = $scope[attrs.model][attrs.miniImageUploader];
//                if ($scope.filename) {
//                    $scope.thumbnailBase64 = $scope.UserData.uploadCDN + '/' + $scope.filename;
//                } else {
//                    $scope.thumbnailBase64 = '';
//                }
//            };
//
//            //load image from api call
//            $scope.$parent.$whenReady(function () {
//                $scope.reloadImage();
//            });
//
//            //delete image
//            $scope.removeImage = function () {
//                $scope.filename = null;
//                $scope.thumbnailBase64 = null;
//                $scope[attrs.model][attrs.miniImageUploader] = $scope.filename;
//                //only way to clear an input of type="file". jQuery's $.val('') does not work for resetting input type='file'. Browser restriction due to security
//                element.find('input.imageinput').replaceWith(element.find('input.imageinput').val('').clone(true));
//            };
//
//            //add image
//            $scope.setImage = function (data) {
//                $scope.uploadInProgress = false;
//                $scope.thumbnailBase64 = data.thumbnail_url;
//                $scope.filename = data.name;
//                $scope[attrs.model.toString()][attrs.miniImageUploader.toString()] = $scope.filename;
//                $scope.$apply();
//
//            };
//
//            //upload image and preview result
//            element.find('input.imageinput').change(function () {
//                var filenameTest = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(element.find('input.imageinput').val());
//                if (filenameTest) {
//                    $scope.uploadInProgress = true;
//                    $scope.$apply();
//                    element.find('div.twitter-bootstrap-upload').wrap('<form id="image-form" action="../upload/uploadhandler.ashx" method="POST" enctype="multipart/form-data" />');
//                    var truejson;
//                    $('form#image-form').ajaxSubmit({
//                        success: function (data) {
//                            //parse ie json
//                            if (jQuery.browser.msie === true) {
//                                var newdata = data.replace('<pre>', '');
//                                var newdata2 = newdata.replace('</pre>', '');
//                                var newdata3 = newdata2.replace('<PRE>', '');
//                                var newdata4 = newdata3.replace('</PRE>', '');
//                                var parsedjson = JSON.parse(newdata4);
//                                truejson = parsedjson[0];
//                            } else {
//                                var parsedjson = JSON.parse(data);
//                                truejson = parsedjson[0];
//                            }
//                            $('form#image-form').find('div.twitter-bootstrap-upload').unwrap();
//                            if (truejson.error == 'file size over 700K') {
//                                alert("Something went wrong! Please try again with an image not exceeding 700kb!");
//                                $scope.uploadInProgress = false;
//                                $scope.$apply();
//                                element.find('input.imageinput').replaceWith(element.find('input.imageinput').val('').clone(true));
//                            }
//                            else if(truejson.error == 'invalid file size'){
//                                alert("Invalid image detected! Please try again with a valid image.");
//                                $scope.uploadInProgress = false;
//                                $scope.$apply();
//                                element.find('input.imageinput').replaceWith(element.find('input.imageinput').val('').clone(true));
//
//                            } else {
//                                $scope.setImage(truejson);
//                            }
//                        },
//                        error: function () {
//                            console.log('failure');
//                        }
//                    });
//                } else {
//                    alert('Please change to the correct image format.');
//                    $scope.filename = null;
//                    $scope.thumbnailBase64 = null;
//                    $scope.uploadInProgress = false;
//                    //only way to clear an input of type="file". jQuery's $.val('') does not work for resetting input type='file'. Browser restriction due to security
//                    element.find('input.imageinput').replaceWith(element.find('input.imageinput').val('').clone(true));
//                }
//
//            });
//        }
//    };
//});


kmApp.directive('loader', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function ($scope, element, attrs) {

            //hide and replace w/ loader
            element.hide();
            var template = '<div class="progress-loader"><img src="kmApp/images/ajax-load.gif"/></div>';
            var loaderDiv = $(template).insertBefore(element);
            var callback = attrs.rdy;
            //when ready, switch back to main content
            $scope.$whenReady(function () {
                loaderDiv.remove();
                element.show();

                if (callback)
                    $scope.$eval(callback);
            });

        }
    };
});
//
//kmApp.directive('viewAvailableChannel', [function () {
//    return {
//        restrict: 'E',
//        templateUrl: '/portal/directives/templates/availableChannels.html',
//        scope: false,
//        replace: true
//    }
//} ]);
//
//kmApp.directive('buildCodeFrom', function () {
//    return function (scope, element, attrs) {
//        element.bind("keyup", function () {
//            var initval = attrs.initv;
//            if (initval.length == 0) {
//                var ans = '';
//                var dat = element.val();
//                var datlen = dat.length;
//                for (var k = 0; k < datlen; k++) {
//                    if (ans.length < 8) {
//                        if ((dat.charAt(k) >= 'A' && dat.charAt(k) <= 'Z') || (dat.charAt(k) >= 'a' && dat.charAt(k) <= 'z') || (dat.charAt(k) >= '0' && dat.charAt(k) <= '9')) {
//                            ans += dat.charAt(k);
//                        }
//                    }
//                }
//                $('#' + attrs.target).val(ans.toUpperCase());
//            }
//        });
//    }
//});
//
//// Directive to intercept 'enter' key on AnuglarJS forms.
//kmApp.directive('ngFormEnter', function () {
//    return function (scope, element, attrs) {
//        element.bind("keydown", function (event) {
//            if (event.which === 13) {
//                scope.$apply(function () {
//                    scope.$eval(attrs.ngFormEnter);
//                });
//
//                event.preventDefault();
//            }
//        });
//    };
//});
//generaltable directive is used for very large table, it allows calling module to do the server site paging and filtering.
kmApp.directive('generaltable', ['$sce', function ($sce){
    return {
        restrict: 'A',
        replace: false,
        scope: {
            tabledata: '=',
            deletetargetlist: '&',
            edittargetlist: '&',
            copytargetlist: '&',
            inserttargetlist: '&',
            selecttargetlist: '&',
            getnextpage: '&',
            getprevpage: '&',
            getselectpage: '&',
            searchtext: '=',
            pagesize: '=',
            overrideedit: '=',
            overridecopy: '=',
            pagenumbers: '=',
            currentpage: '=',
            groupeditmode: '='
        },
        templateUrl: 'directives/templates/generaltable.html',
        link: function ($scope, $element, $attrs) {
            $scope.sortcolumn = 0;
            $scope.reverse = 1;
            $scope.hascopy = 1;
            $scope.hasdelete = 1;
            $scope.hasinsert = 1;
            $scope.hasedit = 1;
            $scope.groupeditmode = false;
            $scope.sorttype = 's';

            $scope.$watch('overrideedit', function (newValue, oldValue) {
                if (newValue == '1') {
                    $scope.hasedit = 0;
                }
                if (newValue == '0') {
                    $scope.hasedit = 1;
                }
            });

            $scope.$watch('overridecopy', function (newValue, oldValue) {
                if (newValue == '1') {
                    $scope.hascopy = 0;
                }
                if (newValue == '0') {
                    $scope.hascopy = 1;
                }
            });
            $scope.$watch('groupeditmode', function (newValue, oldValue) {
                if ($scope.groupeditmode == true) {
                    $('.hoverrow').css('cursor', 'pointer');
                }
                if ($scope.groupeditmode == false) {
                    $('.hoverrow').css('cursor', 'default');
                }
            });
            $scope.getCell = function(item,type){
                if(type== "img")
                {
                    var img = "https://c815555.ssl.cf2.rackcdn.com/" + item;
                    return $sce.trustAsHtml("<a href='" + img +"' rel='lightbox'> <img  src='"+ img+ "' height='80' rel='lightbox' /> </a>");
                }
                return $sce.trustAsHtml("<span>"+ item +"</span>");

            };
			 $scope.$watch("tabledata.rowval | tableColumnSort: (reverse * (sortcolumn+1)):sorttype", function(newVal) {
				  $scope.filtered = newVal;
				}, true);
	
            $scope.selectHeaderIndex = function (ind) {
                $scope.sortcolumn = ind;
                $scope.sorttype = $scope.tabledata.header[ind].type;
                $scope.reverse = (-1 * $scope.reverse);
                var indx = 0;
				
                $('.sortindicator').each(function () {
                    $(this).removeClass('arrow-up').removeClass('arrow-down');
                    if (indx == ind) {
                        if ($scope.reverse == 1) {
                            $(this).addClass('arrow-down');
                        }
                        else {
                            $(this).addClass('arrow-up');
                        }
                    }
                    indx = indx + 1;
                });
            }
            $scope.getnextpageNums = function () {
                var len = $scope.pagenumbers.length;
                var lastPage = $scope.pagenumbers[len - 1];
                var totalPage = $scope.numberOfPages();
                if ($scope.pagesize + lastPage < totalPage) {
                    endPage = $scope.pagesize + lastPage;
                }
                else {
                    endPage = totalPage;
                }
                $scope.pagenumbers = [];
                for (var i = lastPage + 1; i <= endPage; i++) {
                    $scope.pagenumbers.push(i);
                }
                $scope.currentpage = $scope.pagenumbers[0];
                $scope.getselectpage({ num: $scope.currentpage });
            };
            $scope.getprevpageNums = function () {
                var startPage = 1;
                if ($scope.pagesize < $scope.pagenumbers[0]) {
                    startPage = $scope.pagenumbers[0] - $scope.pagesize;
                }
                $scope.pagenumbers = [];
                for (var i = startPage; i < startPage + $scope.pagesize; i++) {
                    $scope.pagenumbers.push(i);
                }
                $scope.getselectpage({ num: startPage });
            };
            $scope.isLastPageSegment = function () {

                var totalPages = $scope.numberOfPages();
                var lastPageNum = $scope.pagenumbers[$scope.pagenumbers.length - 1];

                if (totalPages > lastPageNum) {
                    return false;
                }
                else {
                    return true;
                }
            };
            $scope.isFirstPageSegment = function () {
                if ($scope.pagesize > $scope.pagenumbers[0]) {
                    return true;
                }
                else { return false; }
            };
			$scope.tableInfo=function(){
			   return 	$scope.currentpage +' of '+ $scope.numberOfPages() ;
			}
            $scope.isFirstPage = function () {
                if (($scope.currentpage % $scope.pagesize) == 1) {
                    return true;
                }
                return false;
            }
            $scope.isLastPage = function () {
                if ($scope.currentpage >= $scope.tabledata.totalcount / $scope.pagesize) {
                    return true;
                }
                if (($scope.currentpage % $scope.pagesize) == 0) {
                    return true;
                }
                return false;
            }
            $scope.numberOfPages = function () {
                if ($scope.tabledata === undefined)
                    return 0;

                if ($scope.tabledata.rowval === undefined)
                    return 0;

                return Math.ceil($scope.tabledata.totalcount / $scope.pagesize);
            }
            $scope.noIDFilter = function (m) {
                if (m.name == 'ID' || m.name == "Id" || m.name == 'county' || m.name == "County" || m.name == 'Country' || m.name == 'country')
                    return false;
                return true;
            }
            $scope.hideCountyFilter = function (m) {
                if (m.name == 'county' || m.name == "County" || m.name == 'Country' || m.name == 'country') {
                    $("." + m.name).hide();
                    return true;
                }
                return false;
            }
            $scope.setIDnodisplay = function (I) {
                if (I == 0) {
                    return 'tablenoiddisplay';
                }
            }
            if ($attrs['copytargetlist'] == undefined) {
                $scope.hascopy = 0;
            }
            if ($attrs['deletetargetlist'] == undefined) {
                $scope.hasdelete = 0;
            }
            if ($attrs['edittargetlist'] == undefined) {
                $scope.hasedit = 0;
            }
            if ($attrs['inserttargetlist'] == undefined) {
                $scope.hasinsert = 0;
            }
            if ($scope.overrideedit == '1') {
                $scope.hasedit = 0;
            }

        }
    }
}]);


kmApp.directive('ngSearchenter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngSearchenter);
                });

                event.preventDefault();
            }
        });
    };
});

//kmApp.directive('tagSelect', function () {
//    //    var searchData = [
//    //        { text: "BG Color", children: [
//    //            { id: "blue", text: "Blue", group: "BG Color" },
//    //            { id: "red", text: "Red", group: "BG Color" },
//    //            { id: "white", text: "White", group: "BG Color" }
//    //        ]
//    //        },
//    //        { text: "Amenities", children: [
//    //            { id: "gas", text: "Gas", group: "Amenities" },
//    //            { id: "beer", text: "Beer/Wine", group: "Amenities" },
//    //            { id: "cats", text: "Cats", group: "Amenities" },
//    //            { id: "atm", text: "ATM", group: "Amenities" }
//    //        ]
//    //        }
//    //    ];
//
//    return {
//        restrict: 'AE',
//        replace: false,
//        templateUrl: '/portal/directives/templates/tagSelect.html',
//        link: function ($scope, $element, $attrs) {
//            //$scope.searchtext = '';
//
//            $scope.$watch('availableTags', function (value) {
//                if (value !== undefined) {
//                    $element.select2({
//                        multiple: true,
//                        placeholder: "Add a Tag",
//                        width: $attrs['width'],
//                        containerCssClass: $attrs['tagClass'],
//                        data: value,
//                        createSearchChoice: function (term) {
//                            var trm = term.replace(/,/g, '').replace(/:/g, '')
//                            return { id: trm, text: trm, unstructured: true };
//                        },
//                        formatSelection: function (object, container) {
//                            if (object.unstructured) {
//                                return object.text;
//                            }
//                            else {
//                                //grab the parent object's text.
//                                return object.group + ':' + object.text;
//                            }
//                        },
//                        escapeMarkup: function (m) { return m; }
//
//                    });
//                    var tagData = $scope.selectedTags;
//                    if (tagData && tagData.length > 0) {
//                        $element.select2('data', tagData);
//                    }
//                    else {
//                        $element.select2('val', []);
//                    }
//                    $element.off('change');
//                    $element.on('change', function (e) {
//                        //If an option has been added
//                        if (e.added) {
//                            if (e.added.unstructured) {
//                                if ($scope.validateUnstructedTags(e.added) == true) {
//                                    $scope.selectedTags.push(e.added);
//                                }
//                                else {
//                                    var tagData = $scope.selectedTags;
//                                    if (tagData && tagData.length > 0) {
//                                        $element.select2('data', tagData);
//                                    }
//                                }
//                            }
//                            else {
//                                $scope.selectedTags.push(e.added);
//                            }
//                        }
//                        else {
//                            var i = 0;
//                            for (i = 0; i < $scope.selectedTags.length; i++) {
//                                if ($scope.selectedTags[i].id === e.removed.id) {
//                                    $scope.selectedTags.splice(i, 1);
//                                    i--;
//                                }
//                            }
//                        }
//                    });
//                }
//            });
//
//            $scope.validateUnstructedTags = function (eobj) {
//                var len = $scope.selectedTags.length;
//                for (var k = 0; k < len; k++) {
//                    if ($scope.selectedTags[k].text.toUpperCase() == eobj.text.toUpperCase()) {
//                        alert("the tag exists already.");
//                        return false;
//                    }
//                }
//                return true;
//            }
//
//            //            $scope.$watch('overrideedit', function (newValue, oldValue) {
//            //                if (newValue == '1') {
//            //                    $scope.hasedit = 0;
//            //                }
//            //                if (newValue == '0') {
//            //                    $scope.hasedit = 1;
//            //                }
//            //            });
//
//
//        }
//    }
//});
//
//kmApp.directive('taggroupmanager', function () {
//    return {
//        restrict: 'A',
//        scope: { tagsedits: '=' },
//        template: '<div class="taggroupinput">' +
//                  '<input type="text" placeholder="Add a tag..." ng-model="new_tag_name" class="taggroupdisp"></input> ' +
//                  '<a class="btn" ng-click="add2taggroup()">Add</a>' +
//                  '</div>' +
//                  '<div class="tags tagscontainer">' +
//                  '<div ng-repeat="(idx, tag) in tagsedits" class="taggroupdisp" >{{tag.tag_name}}<span class="removemark" ng-click=remove(idx)>X</span></div>' +
//                  '</div>',
//        link: function ($scope, $element) {
//            var input = angular.element($element.children()[1]);
//
//            // This adds the new tag to the tags array
//            $scope.add2taggroup = function () {
//                if ($scope.new_tag_name == undefined || $scope.new_tag_name == null || $scope.new_tag_name == '') {
//                    alert('new tag name cannot bet empty!');
//                    $scope.new_tag_name = "";
//                    return;
//                }
//                if ($scope.validateTagGroupNameExists($scope.new_tag_name) == true) {
//                    alert('new tag name exists already!');
//                    $scope.new_tag_name = "";
//                    return;
//                }
//
//                var gv = {
//                    tag_id: 0,
//                    tag_name: $scope.new_tag_name,
//                    tag_group_id: 0,
//                    tag_action: 1
//                }
//                $scope.tagsedits.push(gv);
//                $scope.new_tag_name = "";
//            };
//
//            // This is the ng-click handler to remove an item
//            $scope.remove = function (idx) {
//                $scope.tagsedits.splice(idx, 1);
//            };
//            $scope.validateTagGroupNameExists = function (newtagname) {
//                var len = $scope.tagsedits.length;
//                for (var k = 0; k < len; k++) {
//                    var estr = $scope.tagsedits[k].tag_name;
//                    if (estr.toUpperCase() == newtagname.toUpperCase()) {
//                        return true;
//                    }
//                }
//                return false;
//            }
//            input.bind('keypress', function (event) {
//                if (event.keyCode == 13) {
//                    $scope.$apply($scope.add2taggroup);
//                }
//            });
//        }
//    };
//});
////clienttable does client site paging, no need to retrieve new page from server site.
////it is used in smaller tables, has better performance than generaltable directive
//kmApp.directive('clienttable', function () {
//    return {
//        restrict: 'A',
//        replace: false,
//        scope: {
//            tabledata: '=',
//            deletetargetlist: '&',
//            edittargetlist: '&',
//            copytargetlist: '&',
//            inserttargetlist: '&',
//            selecttargetlist: '&',
//            getnextpage: '&',
//            getprevpage: '&',
//            getselectpage: '&',
//            searchtext: '=',
//            pagesize: '=',
//            overrideedit: '=',
//            overridecopy: '=',
//            pagenumbers: '=',
//            currentpage: '=',
//            groupeditmode: '=',
//            totalcount: '='
//        },
//        templateUrl: '/portal/directives/templates/clienttable.html',
//        link: function ($scope, $element, $attrs) {
//            $scope.sortcolumn = 0;
//            $scope.reverse = 1;
//            $scope.hascopy = 1;
//            $scope.hasdelete = 1;
//            $scope.hasinsert = 1;
//            $scope.hasedit = 1;
//            $scope.groupeditmode = false;
//            $scope.sorttype = 's';
//
//            $scope.$watch('overrideedit', function (newValue, oldValue) {
//                if (newValue == '1') {
//                    $scope.hasedit = 0;
//                }
//                if (newValue == '0') {
//                    $scope.hasedit = 1;
//                }
//            });
//
//            $scope.$watch('overridecopy', function (newValue, oldValue) {
//                if (newValue == '1') {
//                    $scope.hascopy = 0;
//                }
//                if (newValue == '0') {
//                    $scope.hascopy = 1;
//                }
//            });
//            $scope.$watch('groupeditmode', function (newValue, oldValue) {
//                if ($scope.groupeditmode == true) {
//                    $('.hoverrow').css('cursor', 'pointer');
//                }
//                if ($scope.groupeditmode == false) {
//                    $('.hoverrow').css('cursor', 'default');
//                }
//            });
//            $scope.getCell = function (item, type) {
//                if (type == "img") {
//                    var img = "https://c815555.ssl.cf2.rackcdn.com/" + item;
//                    return "<a href='" + img + "' rel='lightbox'> <img  src='" + img + "' height='80' rel='lightbox' /> </a>";
//                }
//                //console.log(item, ' ', type);
//                return "<span>" + item + "</span>";
//            };
//            $scope.selectHeaderIndex = function (ind) {
//                $scope.sortcolumn = ind;
//                $scope.sorttype = $scope.tabledata.header[ind].type;
//
//                $scope.reverse = -1 * $scope.reverse;
//                var indx = 0;
//                $('.sortindicator').each(function () {
//                    $(this).removeClass('arrow-up').removeClass('arrow-down');
//                    if (indx == ind) {
//                        if ($scope.reverse == 1) {
//                            $(this).addClass('arrow-down');
//                        }
//                        else {
//                            $(this).addClass('arrow-up');
//                        }
//                    }
//                    indx = indx + 1;
//                });
//
//            }
//            $scope.getnextpageNums = function () {
//                var len = $scope.pagenumbers.length;
//                var lastPage = $scope.pagenumbers[len - 1];
//                var totalPage = $scope.numberOfPages();
//                if ($scope.pagesize + lastPage < totalPage) {
//                    endPage = $scope.pagesize + lastPage;
//                }
//                else {
//                    endPage = totalPage;
//                }
//                $scope.pagenumbers = [];
//                for (var i = lastPage + 1; i <= endPage; i++) {
//                    $scope.pagenumbers.push(i);
//                }
//                $scope.currentpage = $scope.pagenumbers[0];
//                $scope.getselectpage({ num: $scope.currentpage });
//            };
//
//            $scope.getprevpageNums = function () {
//                var startPage = 1;
//                if ($scope.pagesize < $scope.pagenumbers[0]) {
//                    startPage = $scope.pagenumbers[0] - $scope.pagesize;
//                }
//                $scope.pagenumbers = [];
//                for (var i = startPage; i < startPage + $scope.pagesize; i++) {
//                    $scope.pagenumbers.push(i);
//                }
//                $scope.getselectpage({ num: startPage });
//            };
//            $scope.isLastPageSegment = function () {
//
//                var totalPages = $scope.numberOfPages();
//                var lastPageNum = $scope.pagenumbers[$scope.pagenumbers.length - 1];
//
//                if (totalPages > lastPageNum) {
//                    return false;
//                }
//                else {
//                    return true;
//                }
//            };
//            $scope.isFirstPageSegment = function () {
//                if ($scope.pagesize > $scope.pagenumbers[0]) {
//                    return true;
//                }
//                else { return false; }
//            };
//
//            $scope.numberOfPages = function () {
//                if ($scope.tabledata === undefined)
//                    return 0;
//
//                if ($scope.tabledata.rowval === undefined)
//                    return 0;
//
//                return Math.ceil($scope.totalcount / $scope.pagesize);
//            }
//            $scope.isFirstPage = function () {
//                if (($scope.currentpage % $scope.pagesize) == 1) {
//                    return true;
//                }
//                return false;
//            }
//            $scope.isLastPage = function () {
//                if ($scope.currentpage >= $scope.totalcount / $scope.pagesize) {
//                    return true;
//                }
//                if (($scope.currentpage % $scope.pagesize) == 0) {
//                    return true;
//                }
//                return false;
//            }
//            $scope.noIDFilter = function (m) {
//                if (m.name == 'ID' || m.name == "Id" || m.name == 'county' || m.name == "County" || m.name == 'Country' || m.name == 'country')
//                    return false;
//                return true;
//            }
//            $scope.hideCountyFilter = function (m) {
//                if (m.name == 'county' || m.name == "County" || m.name == 'Country' || m.name == 'country') {
//                    $("." + m.name).hide();
//                    return true;
//                }
//                return false;
//            }
//            $scope.setIDnodisplay = function (I) {
//                if (I == 0) {
//                    return 'tablenoiddisplay';
//                }
//            }
//            if ($attrs['copytargetlist'] == undefined) {
//                $scope.hascopy = 0;
//            }
//            if ($attrs['deletetargetlist'] == undefined) {
//                $scope.hasdelete = 0;
//            }
//            if ($attrs['edittargetlist'] == undefined) {
//                $scope.hasedit = 0;
//            }
//            if ($attrs['inserttargetlist'] == undefined) {
//                $scope.hasinsert = 0;
//            }
//            if ($scope.overrideedit == '1') {
//                $scope.hasedit = 0;
//            }
//
//        }
//    }
//});
//
//
//kmApp.directive('infiniteScroll', [
//  '$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
//      return {
//          link: function (scope, elem, attrs) {
//              var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
//              $window = angular.element($window);
//              scrollDistance = 0;
//              if (attrs.infiniteScrollDistance != null) {
//                  scope.$watch(attrs.infiniteScrollDistance, function (value) {
//                      return scrollDistance = parseInt(value, 10);
//                  });
//              }
//              scrollEnabled = true;
//              checkWhenEnabled = false;
//              if (attrs.infiniteScrollDisabled != null) {
//                  scope.$watch(attrs.infiniteScrollDisabled, function (value) {
//                      scrollEnabled = !value;
//                      if (scrollEnabled && checkWhenEnabled) {
//                          checkWhenEnabled = false;
//                          return handler();
//                      }
//                  });
//              }
//              handler = function () {
//                  var elementBottom, remaining, shouldScroll, scrollTop;
//                  scrollTop = elem.scrollTop();
//                  elementBottom = $(elem).find("ul").height() - elem.height();
//                  remaining = elementBottom - scrollTop;
//                  shouldScroll = remaining <= scrollDistance;
//                  if (shouldScroll && scrollEnabled) {
//                      if ($rootScope.$$phase) {
//                          return scope.$eval(attrs.infiniteScroll);
//                      } else {
//                          return scope.$apply(attrs.infiniteScroll);
//                      }
//                  } else if (shouldScroll) {
//                      return checkWhenEnabled = true;
//                  }
//              };
//              elem.on('scroll', handler);
//              scope.$on('$destroy', function () {
//                  return elem.off('scroll', handler);
//              });
//              return $timeout((function () {
//                  if (attrs.infiniteScrollImmediateCheck) {
//                      if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
//                          return handler();
//                      }
//                  } else {
//                      return handler();
//                  }
//              }), 0);
//          }
//      };
//  }
//]);
