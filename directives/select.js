'use strict';
var dd = angular.module('ngDropdowns', []);

dd.directive('dropdownSelect', ['DropdownService', '$window',
  function (DropdownService, $window) {
      return {
          restrict: 'A',
          scope: {
              dropdownSelect: '=',
              dropdownModel: '=',
              dropdownOnchange: '&'
          },

          controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
              var openPopup = false;

              $scope.labelField = $attrs.dropdownItemLabel || 'text';
              $scope.PlaceholderText = $attrs.dropdownItemPlaceholder;

              DropdownService.register($element);

              this.select = function (selected) {
                  if (selected !== $element.find("#ddText").val()) {
                      //if (selected !== $scope.dropdownModel) {
                      angular.copy(selected, $scope.dropdownModel);
                      if ($scope.labelField == "groupname")
                          $element.find("#ddText").val(selected.groupname);
                      else
                          $element.find("#ddText").val(selected.text);
                  }
                  $scope.dropdownOnchange({
                      selected: selected
                  });
              };

              var $clickEvent = ('ontouchstart' in $window ? 'touchend' : 'click');
              $element.bind($clickEvent, function (event) {
                  event.stopPropagation();
                  DropdownService.toggleActive($element);
                  $scope.isPopupVisible = false;
              });

              $scope.$on('$destroy', function () {
                  DropdownService.unregister($element);
              });

              $scope.togglePopup = function () {
                  $scope.isPopupVisible = true;
                  openPopup = true;;
                  console.log(openPopup);
              }
          }],

          template: [
              '<input id="ddText" type="text" value="{{dropdownModel[labelField]}}"  ng-click="togglePopup()" placeholder="{{PlaceholderText}}">',
              '<ul  ng-show="isPopupVisible">',
                '<li ng-repeat="item in dropdownSelect"',
                ' dropdown-select-item="item"',
                ' dropdown-item-label="labelField">',
                '</li>',
              '</ul>',
          ].join('')
      };
  }
]);

dd.directive('dropdownSelectItem', [
  function () {
      return {
          require: '^dropdownSelect',
          replace: true,
          scope: {
              dropdownItemLabel: '=',
              dropdownSelectItem: '='
          },

          link: function (scope, element, attrs, dropdownSelectCtrl) {
              scope.selectItem = function () {
                  if (scope.dropdownSelectItem.href) {
                      return;
                  }
                  dropdownSelectCtrl.select(scope.dropdownSelectItem);
              };
          },

          template: [
            '<li ng-class="{divider: dropdownSelectItem.divider}">',
              '<a href="" class="dropdown-item"',
              ' ng-if="!dropdownSelectItem.divider"',
              ' ng-href="{{dropdownSelectItem.href}}"',
              ' ng-click="selectItem()">',
                '{{dropdownSelectItem[dropdownItemLabel]}}',
              '</a>',
            '</li>'
          ].join('')
      };
  }
]);

dd.factory('DropdownService', ['$document',
  function ($document) {
      var body = $document.find('body'),
          service = {},
          _dropdowns = [];

      body.bind('click', function () {
          angular.forEach(_dropdowns, function (el) {
              el.removeClass('active');
          });
      });

      service.register = function (ddEl) {
          _dropdowns.push(ddEl);
      };

      service.unregister = function (ddEl) {
          var index;
          index = _dropdowns.indexOf(ddEl);
          if (index > -1) {
              _dropdowns.splice(index, 1);
          }
      };

      service.toggleActive = function (ddEl) {
          angular.forEach(_dropdowns, function (el) {
              if (el !== ddEl) {
                  el.removeClass('active');
              }
          });

          ddEl.toggleClass('active');
      };

      return service;
  }
]);