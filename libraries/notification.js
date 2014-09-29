var userMessageLibrary = angular.module('kmApp.libraries.notification', ['ngSanitize']);

userMessageLibrary.service( 'kmApp.libraries.notification.screenNotifyService', ['$timeout',
function($timeout) {

	return {
	    addSuccess: function (messageTxt, persistant) {
			
			//default persistance to false
			persistant = typeof persistant !== 'undefined' ? persistant : false;
			
			//clear any prior notifications
	        var notificationLibraryRef = this;
	        notificationLibraryRef.clearNotification();

			//put notification on page
			var $scope = angular.element('#currentUserNotification').scope();
			$scope.notificationMessage = messageTxt;
			$scope.notificationClass = 'alert-success';
			
			//set message to disappear after a period of time
			var expSecondsInMs = (6 * 1000); //6 seconds
			if( ! persistant ){
			$timeout(
			    function () {
				notificationLibraryRef.clearNotification();
					}, expSecondsInMs);
		    }

			//pop up to top of screen so they see the success message
			scroll(0, 0);
		},

		addError: function(messageTxt) {

            var notificationLibraryRef = this;
            notificationLibraryRef.clearNotification();            
            var $scope = angular.element('#currentUserNotification').scope();           
            $scope.notificationMessage = messageTxt;
			$scope.notificationClass = 'alert-error';
			scroll(0, 0);
		},
		
		clearNotification: function() {
			var $scope = angular.element('#currentUserNotification').scope();
			$scope.notificationMessage = '';
			$scope.notificationClass = '';
		},
		
		addToQueue: function(messageType, messageTxt, context, persistant) {
			
			//default persistance to false and context to redirect
			persistant = typeof persistant !== 'undefined' ? persistant : false;
			context = typeof context !== 'undefined' ? context : 'redirect';
			
			//setup message object and add to queue
			var msgObj = {'text': messageTxt, 'type': messageType, 'context': context, 'persistant': persistant};
			this._queuedNotifications.push(msgObj);
		},
		
		processQueue: function(context) {
			
			if( typeof this._queuedNotifications === 'undefined' ) {
				return;
			}

			var notificationLibraryRef = this;
			$.each(this._queuedNotifications, function(idx,msgObj) {
				
				if( msgObj.context == context ) {
					if( msgObj.type == 'success' ) {
						notificationLibraryRef.addSuccess(msgObj.text, msgObj.persistant);
						notificationLibraryRef._queuedNotifications.splice(idx, 1);
					}
					else if( msgObj.type == 'error' ) {
						notificationLibraryRef.addError(msgObj.text);
						notificationLibraryRef._queuedNotifications.splice(idx, 1);
					}
				}
			});
		},	
		
		_queuedNotifications: []
	}
}]);