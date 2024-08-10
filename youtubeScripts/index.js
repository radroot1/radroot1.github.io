// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist?list=*
// @grant        none

// ==/UserScript==

(function () {
    'use strict';

    var key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
    var sApiId = "RDXcUeV1NUjTkAh-/A7DQoQMJgfiGhsWNL";
    var playlistId = "example:PLhToONtKITIVY2kN0A2f4gSCDwihaNizb";
    //todo get key cookie

    console.log('start')

    document.body.addEventListener("keydown", function (e) {
        console.log('pressed', {e})
        if (e.shiftKey && e.which == 32) {
            var r = confirm("Press a button!");
            console.log({e});
            if (r === true) {
                doRequestPlaylist(key, playlistId, [formAddAllAction("WL")]);
                clearPlaylist("WL");
            }
        }
    });

    function testHash() {
        console.log({
            test: _formSAPISIDHASH(sApiId, "https://www.youtube.com", "1587823910"),
            should: "SAPISIDHASH 1587823910_6d525124193ab9b396f099a49d3f1b50ec85dd38"
        });
    }

    function clearPlaylist(from) {
        var actions = [];
        var videoItems = document.querySelectorAll("#pl-load-more-destination tr.pl-video");

        videoItems.forEach(function (item) {
            var id = item.getAttribute("data-video-id");
            actions.push(formClearAction(id));
        });

        doRequestPlaylist(key, from, actions);
    }

    function formClearAction(videoId) {
        return {
            "action": "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
            "removedVideoId": videoId
        };
    }

    function formAddAction(videoId) {
        return {
            "action": "ACTION_ADD_VIDEO",
            "removedVideoId": videoId
        };
    }

    function formAddAllAction(from) {
        return {
            "action": "ACTION_ADD_PLAYLIST",
            "addedFullListId": from
        };
    }

    function getIdFromLink(link) {
        const regex = /.*watch\?v=(.*?)&(.*)/;
        const found = link.match(regex);
        return found ? found[1] : null;
    }

    function doRequestPlaylist(key, to, actions) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/youtubei/v1/browse/edit_playlist?key=" + key, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", formSAPISIDHASH());
        xhr.setRequestHeader("x-origin", "https://www.youtube.com");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("success", xhr.responseText);
            }
        };

        var data = JSON.stringify({
            "context": {
                "client": {
                    "hl": "en",
                    "gl": "US",
                    "visitorData": "CgtPQ3JGTHNpZ2J5YyjWx5D1BQ%3D%3D",
                    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36,gzip(gfe)",
                    "clientName": "WEB",
                    "clientVersion": "2.20200424.06.00",
                    "osName": "Windows",
                    "osVersion": "10.0",
                    "browserName": "Chrome",
                    "browserVersion": "81.0.4044.122",
                    "screenWidthPoints": 1085,
                    "screenHeightPoints": 1322,
                    "screenPixelDensity": 2,
                    "utcOffsetMinutes": 240,
                    "userInterfaceTheme": "USER_INTERFACE_THEME_DARK"
                }
            },
            "actions": actions,
            "playlistId": to
        });

        xhr.send(data);
    }

    function formSAPISIDHASH() {
        return _formSAPISIDHASH(sApiId, "https://www.youtube.com", Math.floor(new Date().getTime() / 1E3));
    }

    function _formSAPISIDHASH(sapisid, origin, date) {
        return "SAPISIDHASH " + date + "_" + SHA1(date + " " + sapisid + " " + origin);
    }

    function SHA1(msg) {
        function rotate_left(n, s) {
            var t4 = (n << s) | (n >>> (32 - s));
            return t4;
        };

        function lsb_hex(val) {
            var str = '';
            var i;
            var vh;
            var vl;
            for (i = 0; i <= 6; i += 2) {
                vh = (val >>> (i * 4 + 4)) & 0x0f;
                vl = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        };

        function cvt_hex(val) {
            var str = '';
            var i;
            var v;
            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, '\n');
            var utftext = '';
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;
        msg = Utf8Encode(msg);
        var msg_len = msg.length;
        var word_array = new Array();
        for (i = 0; i < msg_len - 3; i += 4) {
            j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
                msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
            word_array.push(j);
        }
        switch (msg_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
                break;
        }
        word_array.push(i);
        while ((word_array.length % 16) != 14) word_array.push(0);
        word_array.push(msg_len >>> 29);
        word_array.push((msg_len << 3) & 0x0ffffffff);
        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }
        var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

        return temp.toLowerCase();
    }

})();