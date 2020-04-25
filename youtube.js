(function() {
    'use strict';
    const $ = window.jQuery;
    console.log("start");
    $("#contents .ytd-playlist-video-list-renderer #content.ytd-playlist-video-renderer a.ytd-playlist-video-renderer").each(function (i, item) {
            console.log(getId(item.href))
        }
    );
    const csn = "6Cs_Xo76MYeWyQXDsKz4Aw";
    const session_token = "QUFFLUhqa00wM2JRb3owWjlVRklzMVpHTmNTb1pqVHVSd3xBQ3Jtc0trb29lVTdHWnNNZmprOTNyRFhOU0RfdVlHQXo3UVFFZ0theXFyZFVZOEZBcG5kenZqc1VnQUFWWGRlYTdIY0lVZFNHOW84ZDJITFpyN0xuVU5VUUl2V1ZHZnFTMTZfRDlvZjBXcW1CSm5YbkVBUzRFaWJWdmoydnpNakFvT3NjbE5JNmFQYUpYWXlpTFpfajlGWHVSanptdUNKNkE=";
    const data = {
        "clickTrackingParams": "IhMIioOD4_bC5wIViCdkCh1REw-E",
        "commandMetadata": {
            "webCommandMetadata": {
                "url": "/service_ajax",
                "sendPost": true,
                "apiUrl": "/youtubei/v1/browse/edit_playlist"
            }
        },
        "playlistEditEndpoint": {
            "playlistId": "PLhToONtKITIVY2kN0A2f4gSCDwihaNizb",
            "actions": [{"addedVideoId": "9td6u9rjIdY", "action": "ACTION_ADD_VIDEO"}]
        }
    };



    function doSend(){
        $(document).ready(function () {
            $.ajax({
                method: "POST",
                url: "/service_ajax?name=playlistEditEndpoint",
                data: {
                    sej: data,
                    csn: csn,
                    session_token: session_token
                },
                success: function (result) {
                    console.log("success", result)
                }
            });
        });
    }

    function getId(link){
        const regex = /.*watch\?v=(.*?)&(.*)/;
        const found = link.match(regex);
        return found[1]
    }
})();