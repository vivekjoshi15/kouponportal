var generalLibrary = angular.module('kmApp.libraries.general', []);

generalLibrary.service('kmApp.libraries.general.generalService', ['$filter', function ($filter) {
    var GeneralOffersResponse = {
        "AllowUserCreateCategories": true,
        "OfferCategories": [{
            "Id": 1,
            "AccountId": 46,
            "Name": "North Stores"
        }, {
            "Id": 2,
            "AccountId": 46,
            "Name": "East Coast Stores"
        }],
        "PushMessageLimit": null,
        "PushmessageLimitPeriod": 0, //0 = day, 1 = week,2 =month
        "TextMessageLimit": 100,
        "TextmessageLimitPeriod": 2,
        "EmailMessageLimit": null,
        "EmailmessageLimitPeriod": 1,
        "LocationRadius": 0.5
    };

    var ConnectedServicesResponse = {
        "ConnectedServices": [{
            "id": 1,
            "account_id": 46,
            "service_type": "SMS", //Not really needed, since this is pulled from the provider
            "provider_id": 11, //This is the provider that should be selected
            "credential1": "2198123",  //Corresponds to the value from the attribute_map credential 1
            "credential2": "ALKJDO*I#*@LSLDF",
            "credential3": "122939105456",
            "credential4": "",
            "credential5": "",
            "credential6": "",
            "credential7": "",
            "credential8": "",
            "sent_from": "",
            "extra_params": ""
        }]
    };

    var ProvidersResponse = {
        "Providers": [{
            "id": 11,
            "service_type": "SMS",
            "name": "Twilio",
            "attribute_mapping": "{ \"credential1\":{\"label\":\"Account Id\",\"visible\":true,\"required\":true},\"credential3\":{\"label\":\"Access Token\",\"visible\":true,\"required\":true},\"sent_from\":{\"label\":\"Sent From\",\"visible\":true,\"required\":true}}"
        }, {
            "id": 12,
            "service_type": "SMS",
            "name": "iLoop",
            "attribute_mapping": "{ \"credential1\":{\"label\":\"Account Id\",\"visible\":true,\"required\":true},\"credential3\":{\"label\":\"Access Token\",\"visible\":true,\"required\":true},\"sent_from\":{\"label\":\"Sent From\",\"visible\":true,\"required\":true}}"
        }]
    };

    var StoreGroupResponse = {
        "Stores": [{ "name": "Albany Stores East", "value": 12 },
                            { "name": "Coast Stores North", "value": 06 },
                            { "name": "tores Southern Stores", "value": 07 }]
    };

    var GeofenceGroupResponse = {
        "Geofences": [{ "name": "Geofence 1", "value": 12 },
                          { "name": "Geofence 2", "value": 06 },
                          { "name": "Geofence 3", "value": 07 }]
    };

    var BeaconGroupResponse = {
        "Beacons": [{ "name": "Beacon 1", "value": 12 },
                        { "name": "Beacon 2", "value": 06 },
                        { "name": "Beacon 3", "value": 07 }]
    };

    var getGeneralOffersResponse = function () {
        return GeneralOffersResponse;
    }

    var updateGeneralOffersResponse = function (item) {
        GeneralOffersResponse = item;
    }

    var getConnectedServicesResponse = function () {
        return ConnectedServicesResponse;
    }

    var updateConnectedServicesResponse = function (item) {
        ConnectedServicesResponse[0] = item;
    }

    var getProvidersResponse = function () {
        return ProvidersResponse;
    }

    var getStoreGroupResponse = function () {
        return StoreGroupResponse;
    }

    var getGeofenceGroupResponse = function () {
        return GeofenceGroupResponse;
    }

    var geBeaconGroupResponse = function () {
        return BeaconGroupResponse;
    }

    return {
        getGeneralOffersResponse: getGeneralOffersResponse,
        updateGeneralOffersResponse: updateGeneralOffersResponse,
        getConnectedServicesResponse: getConnectedServicesResponse,
        updateConnectedServicesResponse: updateConnectedServicesResponse,
        getProvidersResponse: getProvidersResponse,
        getStoreGroupResponse: getStoreGroupResponse,
        getGeofenceGroupResponse: getGeofenceGroupResponse,
        geBeaconGroupResponse: geBeaconGroupResponse
    };
}
]);