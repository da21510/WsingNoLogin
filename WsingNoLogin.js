// ==UserScript==
// @name         5sing音乐免登录下载
// @namespace    https://www.sanshuifeibing.com
// @version      1.0
// @description  中国原创音乐基地免登陆下载, 直接点击下载即可。
// @author       三水非冰
// @match        http://5sing.kugou.com/*c/*.html
// @grant        GM_xmlhttpRequest
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// 作者博客: https://www.sanshuifeibing.com
// ==/UserScript==

(function () {
    'use strict';
    function down_music(url, name) {
        let that = this
        let oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "blob";
        //oReq.withCredentials = true;//如果跨域
        oReq.onload = function (oEvent) {
            let content = oReq.response;
            let elink = document.createElement('a');
            elink.download = name;
            elink.style.display = 'none';
            let blob = new Blob([content])
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
        };
        oReq.send();
    }


    function get_music() {
        var id = window.location.href.split('/')[4].split(".")[0];
        var type=window.location.href.split('/')[3].split(".")[0];
        try {
            var url = 'http://service.5sing.kugou.com/song/getsongurl?&songid=' + id + '&songtype='+type;
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function (res) {
                    if (res.status == 200) {
                        var text = res.responseText;
                        var ret = jQuery.parseJSON(text)
                        var sq_url = ret.data.squrl;
                        var hq_url = ret.data.hqurl;
                        var lq_url = ret.data.lqurl;
                        var music_url;
                        if(sq_url!=""){
                            music_url=sq_url;
                        }
                        else if(hq_url!=""){
                            music_url=hq_url;
                        }
                        else{
                            music_url=lq_url;
                        }
                        console.log(music_url)
                        var oDivNode = document.getElementById("func_Down");
                        var temp = $('.new_login_bg');
                        oDivNode.addEventListener("click",function(){
                            down_music(music_url,id+".mp3");
                            $('.new_login_bg').remove();
                        });
                       
                    }
                }
            });
        } catch (erro) {
            console.log(erro)
        }
    }
    //主控制程序
    get_music()

})();









