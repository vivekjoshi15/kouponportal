var channelLibrary = angular.module('kmApp.libraries.channel', []);

channelLibrary.service('kmApp.libraries.channel.channelService', ['$filter', function ($filter) {
    var channelList = [
                       {channelid:1,channel_name:'VS Android App',icon:'android-icon',channel_desc:'description',channel_type:{type:'Type 1'}},
					   {channelid:2,channel_name:'VS Native iOS App',icon:'iphone-icon',channel_desc:'description',channel_type:{type:'Type 2'}},
					   {channelid:3,channel_name:'VS Web',icon:'web-icon',channel_desc:'description',channel_type:{type:'Type 3'}}
    ];

    //console.log(storeList[0]);

    var addChannel = function (item) {
        channelList.push(item);
    }

    var getChannels = function () {
        return channelList;
    }
    var searchChannel = function (stext) {
        return $filter('filter')(channelList,{$:stext}, true);
    }
    var getChannel = function (channelid) {
        var found = $filter('filter')(channelList, { channelid: parseInt(channelid) }, true);
        return found[0];
    }

    var editChannel = function (channelid, item) {
        var found = $filter('filter')(channelList, { channelid: parseInt(channelid) }, true);
        channelList[channelList.indexOf(found[0])] = item;
    }

    var removeChannel = function (item) {
		 var found = $filter('filter')(channelList, { channel_name: item[0] }, true);
          channelList.splice(channelList.indexOf(found), 1);
        return channelList;
    }

    var copyChannel = function (item) {
        item.name = item.name + ' copy';
        item.channelid = item.channelid + 1;
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
		searChchannel:searchChannel
    };

}
]);