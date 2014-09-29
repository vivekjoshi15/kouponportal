
kmApp.directive('selectTabs', function ($document, $compile) {
	
    return {
        restrict: 'A',
		scope: {
            dataselectlist: '=',
            itemselected: '=',
			itemplaceholder:'@',
			itemval:'@'
        },  
        link: function (scope, elem, attr, ctrl) {
			var template='<input type="text" value="{{itemselected[0].'+attr.itemval+'}}"  ng-click="togglePopup()" placeholder="{{itemplaceholder}}">' +
                          '<ul ng-show="isPopupVisible">' +
                            '<li ng-repeat="item in dataselectlist | filter:dataselectlist.'+attr.itemval+'" ng-click="setTab(item)">{{item.'+attr.itemval+'}} </li>' +
                          '</ul>';
			elem.append($compile(template)(scope));
			
            var openPopup = false;

            scope.setTab = function (item) {
                scope.itemselected = [item];
                scope.isPopupVisible = false;
            };
            scope.togglePopup = function () {
                scope.isPopupVisible = true;
                openPopup = true;;
                console.log(openPopup);
            }
            $document.bind('click', function () {
                if (!openPopup) {
                    scope.isPopupVisible = false;
                    scope.$apply();
                }
                else {
                    openPopup = false;
                }
            });
        }

    };
});
