var channelLibrary = angular.module('kmApp.libraries.channel', []);

channelLibrary.service('kmApp.libraries.channel.channelService', ['$filter', function ($filter) {
    var channelList = [
                       { id: 1, channelid: 'ch1', channel_name: 'VS Android App', channel_desc: 'description', template_type: 'offerviewer', channel_type: { type: 'android' } },
					   { id: 2, channelid: 'ch1', channel_name: 'VS Native iOS App', channel_desc: 'description', template_type: 'custom', channel_type: { type: 'ios' } },
					   { id: 3, channelid: 'ch1', channel_name: 'VS Web', channel_desc: 'description', template_type: 'offerviewer', channel_type: { type: 'web' } }
    ];

    var addChannel = function (item) {
        channelList.push(item);
    }

    var getChannels = function () {
        return channelList;
    }

    var searchChannel = function (stext) {
        return $filter('filter')(channelList, { $: stext }, true);
    }

    var getChannel = function (id) {
        var found = $filter('filter')(channelList, { id: parseInt(id) }, true);
        return found[0];
    }

    var editChannel = function (id, item) {
        var found = $filter('filter')(channelList, { id: parseInt(id) }, true);
        channelList[channelList.indexOf(found[0])] = item;
    }

    var removeChannel = function (id) {
        var found = $filter('filter')(channelList, { id: parseInt(id) }, true);
        channelList.splice(channelList.indexOf(found), 1);
        return channelList;
    }

    var copyChannel = function (item) {
        item.channel_name = item.channel_name + ' copy';
        item.id = item.id + 1;
        channelList.push(item);
        return channelList;
    }

    return {
        addChannel: addChannel,
        getChannels: getChannels,
        removeChannel: removeChannel,
        copyChannel: copyChannel,
        getChannel: getChannel,
        editChannel: editChannel,
        searChchannel: searchChannel
    };
}]);