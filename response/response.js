/*  
    $ Responsive plugin
    Program: Jay HSU
    Date: 2015/08/07
*/
(function($) {
    $.JResponsive = function(options) {
        //-- 設定響應式開拉式內容 --////////////////////////////////////////////////////////////////
        //-- 參數設定:////////////////////////////////////////////////////////////////////////////
        //-- 在這裡您可以選擇要嵌入開拉式區塊的內容，您可以直接由原本網頁內容的物件直接複製，或自行寫網頁內容//
        /////////////////////////////////////////////////////////////////////////////////////////
        //using object to replace variable
        //here is the default value
        var defaults = {
            defaultResponse: "true",
            modulePath: "",
            mobileSwitch: "body",
            viewPortSetup: "",
            res_langVarDefault: "",
            res_langVarEn: "",
            res_langVarTw: "/tw/",
            res_langArrayTw: "",
            res_langVarCn: "/cn/",
            res_langArrayCn: "",
            res_langVarAdd1: "",
            res_langArrayAdd1: "",
            res_langVarAdd2: "",
            res_langArrayAdd2: "",
            defaultLangMenuObj: "",
            customLangMenu: "<ul>" + '<li><a href="#">中文版</a></li>' + '<li><a href="#">ENGLISH</a></li>' + "</ul>",
            defaultMenuObj: "",
            customMenu: "",
            defaultSubMenuObj: "",
            customSubMenu: "",
            additionalPage: "",
            pannelPosition: "left",
            resPageLoader: false,
            resPageLoaderTigger: 800,
            responsiveSwitch: true,
            res_langSwitch: true,
            res_tabJumperSetting: {},
            res_mobileTopNavBtnSetup: {},
            additionalBtn: "",
            res_mobileBottomNavBtnSetup: {},
            additionalBottomBtn: "",
            setUILoadWidth: 800
        };
        options = $.extend(defaults, options);
        //設定響應式介面載入尺寸
        var setUILoadWidth = options.setUILoadWidth;

        //設定響應式主導覽按鈕 (上方)
        var resMobileNavSetup = options.res_mobileTopNavBtnSetup;
        var resMenuState = true; //true使用:false不使用
        var resPrimM = true; //true使用主選單:false不使用
        var resMenuType = 'fixed'; //類型fixed永遠在上面,absolute只在頁面最上方
        var resMobileNavSetupWidth = 50;
        var resMobileNavSetupHeight = 50;
        var resMobileNavSetupMargin = 5;
        for (var data in resMobileNavSetup) {
            switch (data) {
              case "state":
                resMenuState = resMobileNavSetup[data];
              break;
              case "type":
                resMenuType = resMobileNavSetup[data];
              break;
              case "primary":
                resPrimM = resMobileNavSetup[data];
              break;
              case "width":
                resMobileNavSetupWidth = resMobileNavSetup[data];
                break;

              case "height":
                resMobileNavSetupHeight = resMobileNavSetup[data];
                break;

              case "margin":
                resMobileNavSetupMargin = resMobileNavSetup[data];
                break;
            }
        }
        var resMarginTop = resMenuState == true ? "margin-top:"+resMobileNavSetupHeight+"px;" : "";

        //設定響應式主導覽按鈕 (下方)
        var resBottomMobileNavSetup = options.res_mobileBottomNavBtnSetup;
        var resBottomMenuState = false; //true使用:false不使用
        var resBottomPrimM = true; //true使用主選單:false不使用
        var resBottomMenuType = 'fixed'; //類型fixed永遠在上面,absolute只在頁面最上方
        var resBottomMobileNavSetupWidth = 50;
        var resBottomMobileNavSetupHeight = 50;
        var resBottomMobileNavSetupMargin = 5;
        for (var data in resBottomMobileNavSetup) {
            switch (data) {
              case "state":
                resBottomMenuState = resBottomMobileNavSetup[data];
              break;
              case "type":
                resBottomMenuType = resBottomMobileNavSetup[data];
              break;
              case "primary":
                resBottomPrimM = resBottomMobileNavSetup[data];
              break;
              case "width":
                resBottomMobileNavSetupWidth = resBottomMobileNavSetup[data];
                break;

              case "height":
                resBottomMobileNavSetupHeight = resBottomMobileNavSetup[data];
                break;

              case "margin":
                resBottomMobileNavSetupMargin = resBottomMobileNavSetup[data];
                break;
            }
        }
        var resMarginBottom = resBottomMenuState == true ? "margin-bottom:"+(resBottomMobileNavSetupHeight+20)+"px;" : "";

        //響應式預設值 
        //開啟:true 
        //關閉:false
        var defaultResponse = options.defaultResponse;
        var responsiveSwitch = options.responsiveSwitch ? "" : "style='display:none'";
        //響應式開關
        //模組的預設路徑
        var path = $.JRes_modulePath();
        var modulePath = options.modulePath == "" ? path : options.modulePath;
        //選單位置
        var pannelPosition = fnCheckPosition(options.pannelPosition, "position");
        var flipDirection = fnCheckPosition(options.pannelPosition, "direction");
        //擴充響應式頁面
        var additionalPageArray = options.additionalPage;
        var countAddPage = additionalPageArray.length;
        var resPageTitleMargin = Math.round((resMobileNavSetupHeight/2)/3); //resPageTitle間距
        var resPageTitleHeight = resMobileNavSetupHeight - (resPageTitleMargin * 2); //resPageTitle高度
        var additionalPageContent = '<div id="resPageLoader" class="resFlipPage resFlipPageR"><div class="menuList" style="' + resMarginTop + resMarginBottom + '">' + 
                                    '<div style="height:' + resMobileNavSetupHeight + 'px;" class="resPageController">' + 
                                    '<div style="width:' + resMobileNavSetupWidth + 'px;height:' + resMobileNavSetupHeight + 'px;" class="resAddPageBackIcon" onclick="JResPageControl({id:\'#resPageLoader\',action:\'back\'});return false;"></div>' + 
                                    '<div style="height:' + resPageTitleHeight + 'px;margin:' + resPageTitleMargin + 'px 0;" class="resAddPageTitle">Res Loader</div></div>'+
                                    '<div style="height:' + resBottomMobileNavSetupHeight + 'px;" class="resPageControllerBottom"><div style="width:' + resBottomMobileNavSetupWidth + 'px;height:' + resBottomMobileNavSetupHeight + 'px;" id="closeAllresFlipPage" onclick="JResPageControl({id:\'\',action:\'closeAll\'});return false;"></div></div>' +
                                    '<div class="resAddPageContent"><div class="resAddPageContentMain">' + 
                                    '<div id="resPageLoad_loading_icon"></div>' + 
                                    '<div id="resPageLoad_area"></div>' + 
                                    '</div></div></div></div>';
        if (countAddPage > 0) {
            for (var i = 0; i < countAddPage; i++) {
                var addPagePosition = "";
                var addPageflipDirection = "";
                if (additionalPageArray != undefined) {
                    addPagePosition = fnCheckPosition(additionalPageArray[i][1] + "_page", "position");
                    addPageflipDirection = fnCheckPosition(additionalPageArray[i][1] + "_page", "direction");
                } else {
                    addPagePosition = pannelPosition;
                    addPageflipDirection = flipDirection;
                }
                var addPageContent = additionalPageArray[i][3] != undefined ? additionalPageArray[i][3] : "";
                var addPageID = additionalPageArray[i][0] + "_pageContent";
                var relateBtn = "";
                if ($.trim(additionalPageArray[i][4]) != "") {
                    var relateID = additionalPageArray[i][4].indexOf("_pageContent") == -1 ? additionalPageArray[i][4] + "_pageContent" : additionalPageArray[i][4];
                    relateBtn = '<div style="width:' + resMobileNavSetupWidth + 'px;height:' + resMobileNavSetupHeight + 'px;" class="resAddPageNextIcon" onclick="JResPageControl({id:\'#' + relateID + '\',action:\'open\'});return false;"></div>';
                }
                additionalPageContent += '<div id="' + addPageID + '" class="resFlipPage ' + addPagePosition + '"><div class="menuList" style="' + resMarginTop + resMarginBottom + '">' +
                                         '<div style="height:' + resMobileNavSetupHeight + 'px;" class="resPageController">' + 
                                            '<div style="width:' + resMobileNavSetupWidth + 'px;height:' + resMobileNavSetupHeight + 'px;" class="resAddPageBackIcon" onclick="JResPageControl({id:\'#' + addPageID + '\',action:\'back\'});return false;"></div>' + 
                                            '<div style="height:' + resPageTitleHeight + 'px;margin:' + resPageTitleMargin + 'px 0;" class="resAddPageTitle">' + additionalPageArray[i][2] + "</div>" + 
                                            relateBtn + 
                                         '</div>'+
                                         '<div style="height:' + resBottomMobileNavSetupHeight + 'px;" class="resPageControllerBottom"><div style="width:' + resBottomMobileNavSetupWidth + 'px;height:' + resBottomMobileNavSetupHeight + 'px;" id="closeAllresFlipPage" onclick="JResPageControl({id:\'\',action:\'closeAll\'});return false;"></div></div>' +
                                         '<div class="resAddPageContent"><div class="resAddPageContentMain">' + 
                                            addPageContent + 
                                         "<div class='clear'></div></div></div></div></div>";
            }
        }
        //擴充上選單按鈕
        var additionalBtnArray = options.additionalBtn;
        var countAddBtn = additionalBtnArray.length;
        var additionalBtn = "";
        var btnTarget = "";
        var additionalPannelContent = "";
        var mobile_nav_BtnAmt = 0;
        //若主選單按鈕有啟用在上選單
        if (resPrimM) {
            additionalBtn += '<li id="menu_btn" style="width:' + resMobileNavSetupWidth + "px;height:" + resMobileNavSetupHeight + "px;margin-right:" + resMobileNavSetupMargin + 'px"><a href="#"></a></li>';
            mobile_nav_BtnAmt = 1;
        }
        
        if (countAddBtn > 0) {
            for (var i = 0; i < countAddBtn; i++) {
                var btnId = additionalBtnArray[i][0] != undefined ? additionalBtnArray[i][0] : "";
                var btnLink = additionalBtnArray[i][1] != undefined ? additionalBtnArray[i][1] : "#";
                var btnText = additionalBtnArray[i][2] != undefined ? additionalBtnArray[i][2] : "";
                var showBtn = true;
                switch (additionalBtnArray[i][3]) {
                  case "pannel":
                    //開啟響應式視窗
                    var addPanelPosition = "";
                    var addflipDirection = "";
                    if (additionalBtnArray[i][4][0] != undefined) {
                        addPanelPosition = fnCheckPosition(additionalBtnArray[i][4][0], "position");
                        addflipDirection = fnCheckPosition(additionalBtnArray[i][4][0], "direction");
                    } else {
                        addPanelPosition = pannelPosition;
                        addflipDirection = flipDirection;
                    }
                    var addPanelContent = additionalBtnArray[i][4][1] != undefined ? additionalBtnArray[i][4][1] : "";
                    additionalPannelContent += '<div id="' + btnId + '_pannelContent" class="flipContent ' + addPanelPosition + '"><div class="menuList" style="' + resMarginTop + resMarginBottom + '">' + addPanelContent + "<div class='clear'></div></div></div>";
                    btnTarget = " onclick=\"JResMobileTopNav({btnId:'#" + btnId + "',contentId:'#" + btnId + "_pannelContent',position:'" + addflipDirection + "',resetEvt:false});return false;\"";
                    //trim whitespace from pannel content, then check if it is empty return value false to showBtn
                    if ($.trim(addPanelContent) == "") {
                        showBtn = false;
                    }
                    break;

                  case "tab":
                    //移動至頁面區塊按鈕
                    btnTarget = " class='resTabJumper' ";
                    //檢查tab目標連結是否含有路徑
                    var targetURL = btnLink;
                    if (targetURL.split("#")[0] == undefined || targetURL.split("#")[0] == "") {
                        //若無路徑檢查tab目標物件是否存在
                        if ($(targetURL).length == 0){
                            showBtn = false;
                        }
                    }
                    break;

                  case undefined:
                    btnTarget = "";
                    break;

                  default:
                    btnTarget = " target='" + additionalBtnArray[i][3] + "'";
                    break;
                }
                //showBtn value with false than don't show the button
                if (showBtn) {
                    additionalBtn += '<li id="' + btnId + '" style="width:' + resMobileNavSetupWidth + "px;height:" + resMobileNavSetupHeight + "px;margin-right:" + resMobileNavSetupMargin + 'px"><a href="' + btnLink + '" ' + btnTarget + ">" + btnText + "</a></li>";
                }
                mobile_nav_BtnAmt++;
            }
        }
        //擴充下選單按鈕
        var additionalBottomBtnArray = options.additionalBottomBtn;
        var countAddBottomBtn = additionalBottomBtnArray.length;
        var additionalBottomBtn = "";
        var BottombtnTarget = "";
        var additionalBottomPannelContent = "";
        var mobile_nav_BottomBtnAmt = 0;
        //若主選單按鈕有啟用在下選單
        if (resBottomPrimM) {
            additionalBottomBtn += '<li id="menu_btn_bottom" style="width:' + resBottomMobileNavSetupWidth + "px;height:" + resBottomMobileNavSetupHeight + "px;margin-right:" + resBottomMobileNavSetupMargin + 'px"><a href="#"></a></li>';
            mobile_nav_BottomBtnAmt = 1;
        }

        if (countAddBottomBtn > 0) {
            for (var i = 0; i < countAddBottomBtn; i++) {
                var btnId = additionalBottomBtnArray[i][0] != undefined ? additionalBottomBtnArray[i][0] : "";
                var btnLink = additionalBottomBtnArray[i][1] != undefined ? additionalBottomBtnArray[i][1] : "#";
                var btnText = additionalBottomBtnArray[i][2] != undefined ? additionalBottomBtnArray[i][2] : "";
                var showBtn = true;
                switch (additionalBottomBtnArray[i][3]) {
                  case "pannel":
                    //開啟響應式視窗
                    var addPanelPosition = "";
                    var addflipDirection = "";
                    if (additionalBottomBtnArray[i][4][0] != undefined) {
                        addPanelPosition = fnCheckPosition(additionalBottomBtnArray[i][4][0], "position");
                        addflipDirection = fnCheckPosition(additionalBottomBtnArray[i][4][0], "direction");
                    } else {
                        addPanelPosition = pannelPosition;
                        addflipDirection = flipDirection;
                    }
                    var addPanelContent = additionalBottomBtnArray[i][4][1] != undefined ? additionalBottomBtnArray[i][4][1] : "";
                    additionalBottomPannelContent += '<div id="' + btnId + '_pannelContent" class="flipContent ' + addPanelPosition + '"><div class="menuList" style="' + resMarginTop + resMarginBottom + '">' + addPanelContent + "<div class='clear'></div></div></div>";
                    BottombtnTarget = " onclick=\"JResMobileTopNav({btnId:'#" + btnId + "',contentId:'#" + btnId + "_pannelContent',position:'" + addflipDirection + "',resetEvt:false});return false;\"";
                    //trim whitespace from pannel content, then check if it is empty return value false to showBtn
                    if ($.trim(addPanelContent) == "") {
                        showBtn = false;
                    }
                    break;

                  case "tab":
                    //移動至頁面區塊按鈕
                    BottombtnTarget = " class='resTabJumper' ";
                    //檢查tab目標連結是否含有路徑
                    var targetURL = btnLink;
                    if (targetURL.split("#")[0] == undefined || targetURL.split("#")[0] == "") {
                        //若無路徑檢查tab目標物件是否存在
                        if ($(targetURL).length == 0){
                            showBtn = false;
                        }
                    }
                    break;

                  case undefined:
                    BottombtnTarget = "";
                    break;

                  default:
                    BottombtnTarget = " target='" + additionalBottomBtnArray[i][3] + "'";
                    break;
                }
                //showBtn value with false than don't show the button
                if (showBtn) {
                    additionalBottomBtn += '<li id="' + btnId + '" style="width:' + resBottomMobileNavSetupWidth + "px;height:" + resBottomMobileNavSetupHeight + "px;margin-right:" + resBottomMobileNavSetupMargin + 'px"><a href="' + btnLink + '" ' + BottombtnTarget + ">" + btnText + "</a></li>";
                }
                mobile_nav_BottomBtnAmt++;
            }
        }
        //本地使用
        var noServer = true;
        if (window.location.protocol.match(/(http|https)/)) {
            var noServer = false;
        }
        //響應式開關
        var mobileSwitch = options.mobileSwitch;
        //響應式viewport其餘參數
        var viewPortSetup = options.viewPortSetup;
        //語言選單
        //res_langVarDefault: 網站預設語系 tw:繁體 cn:簡體 預設:英文
        //res_langVarTw: 繁中版判斷值
        //res_langVarCn: 簡中版判斷值
        //res_langVarAdd1: 外加語言1判斷值
        //res_langVarAdd2: 外加語言2判斷值
        //res_langArrayTw: 繁中翻譯字串
        //res_langArrayCn: 簡中翻譯字串
        //res_langArrayAdd1: 外加語言1翻譯字串
        //res_langArrayAdd2: 外加語言2翻譯字串
        //defaultLangMenuObj: 原網頁內容的語言選單id或class
        //customLangMenu: 客製化的語言選單內容
        var res_langSwitch = options.res_langSwitch ? "" : "style='display:none'";
        //語言選單開關
        var res_langVarDefault = options.res_langVarDefault.toLowerCase();
        var res_langVarEn = options.res_langVarEn;
        //繁中版
        var res_langVarTw = options.res_langVarTw.toLowerCase();
        var res_langArrayTw = [ "language:語系", "menu:主選單", "mobile:切換手機版", "desktop:切換電腦版" ];
        var res_langArrayTw_extend = options.res_langArrayTw;
        if (res_langArrayTw_extend.length > 0) {
            for (var i = 0; i < res_langArrayTw_extend.length; i++) {
                res_langArrayTw.push(res_langArrayTw_extend[i]);
            }
        }
        //簡中版
        var res_langVarCn = options.res_langVarCn.toLowerCase();
        var res_langArrayCn = [ "language:语系", "menu:主选单", "mobile:切换手机版", "desktop:切换桌面版" ];
        var res_langArrayCn_extend = options.res_langArrayCn;
        if (res_langArrayCn_extend.length > 0) {
            for (var i = 0; i < res_langArrayCn_extend.length; i++) {
                res_langArrayCn.push(res_langArrayCn_extend[i]);
            }
        }
        //外加語言1
        var res_langVarAdd1 = options.res_langVarAdd1.toLowerCase();
        var res_langArrayAdd1 = [ "language:language", "menu:menu", "mobile:mobile", "desktop:desktop" ];
        var res_langArrayAdd1_extend = options.res_langArrayAdd1;
        if (res_langArrayAdd1_extend.length > 0) {
            for (var i = 0; i < res_langArrayAdd1_extend.length; i++) {
                res_langArrayAdd1.push(res_langArrayAdd1_extend[i]);
            }
        }
        //外加語言2
        var res_langVarAdd2 = options.res_langVarAdd2.toLowerCase();
        var res_langArrayAdd2 = [ "language:language", "menu:menu", "mobile:mobile", "desktop:desktop" ];
        var res_langArrayAdd2_extend = options.res_langArrayAdd2;
        if (res_langArrayAdd2_extend.length > 0) {
            for (var i = 0; i < res_langArrayAdd2_extend.length; i++) {
                res_langArrayAdd2.push(res_langArrayAdd2_extend[i]);
            }
        }
        var defaultLangMenuObj = options.defaultLangMenuObj;
        var customLangMenu = options.customLangMenu;
        //主選單
        //defaultMenuObj: 原網頁內容的主選單id或class
        //customMenu: 客製化的主選單內容
        var defaultMenuObj = options.defaultMenuObj;
        var customMenu = options.customMenu;
        //其他選單或內容
        //defaultSubMenuObj: 原網頁內容的id或class
        //customSubMenu: 客製化的內容
        var defaultSubMenuObj = options.defaultSubMenuObj;
        //語言選單
        var customSubMenu = options.customSubMenu;
        //是否要使用頁面載入按鈕
        var resPageLoader = options.resPageLoader;
        var resPageLoaderTigger = options.resPageLoaderTigger;
        //設定標籤定位移動參數
        var resTabSetup = options.res_tabJumperSetting;
        var restabJumperState = true;
        var restabJumperSpeed = 2e3;
        for (var data in resTabSetup) {
            switch (data) {
              case "state":
                restabJumperState = resTabSetup[data];
                break;

              case "speed":
                restabJumperSpeed = resTabSetup[data];
                break;
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////
        //-- 設定拉開內容判斷式 -- //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        //language menu
        var language = $(defaultLangMenuObj).length > 0 ? $(defaultLangMenuObj).prop("tagName") != "UL" ? $(defaultLangMenuObj).html() : "<ul>" + $(defaultLangMenuObj).html() + "</ul>" : customLangMenu;
        //primary menu
        var primaryMenu = $(defaultMenuObj).length > 0 ? $(defaultMenuObj).prop("tagName") != "UL" ? $(defaultMenuObj).html() : "<ul>" + $(defaultMenuObj).html() + "</ul>" : customMenu;
        //submenu
        var subMenu = "";
        var countDefaultSubMenuObj = defaultSubMenuObj.length;
        if (countDefaultSubMenuObj > 0) {
            for (var i = 0; i < countDefaultSubMenuObj; i++) {
                if ($(defaultSubMenuObj[i]).length > 0) {
                    if ($(defaultSubMenuObj[i][1]).length > 0) {
                        subMenu += '<div class="resContent_' + i + '">';
                        subMenu += defaultSubMenuObj[i][0] != "" ? "<h1>" + fnTranslate(defaultSubMenuObj[i][0]) + "</h1>" : "";
                        subMenu += '<div class="resContent">';
                        subMenu += $(defaultSubMenuObj[i][1]).prop("tagName") != "UL" ? $(defaultSubMenuObj[i][1]).html() : "<ul>" + $(defaultSubMenuObj[i][1]).html() + "</ul>";
                        subMenu += "</div></div>";
                    }
                }
            }
        }
        subMenu += customSubMenu;
        //--if response is on -->
        //response cookie
        //if cookie is not set yet, set default response on
        if ($.JRes_getCookie() == "") {
            document.cookie = $.JRes_modulePath() + "_response=" + defaultResponse;
        }
        //加入行動版ICON
        $("head").prepend('<link href="' + modulePath + 'response/_img/app_ico.png" rel="apple-touch-icon">');
        //加入響應式預設樣式
        $("head").append('<link id="response_default" rel="stylesheet" type="text/css" media="all" href="' + modulePath + 'response/_css/default.css"/>');
        $(".resRow").append("<div class='clear'></div>");
        //將每組row之後都加上clear
        //check the response cookie
        if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
            //-- add response meta --
            $("head").prepend('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0' + viewPortSetup + '">');
            $("head").append('<link id="response" rel="stylesheet" type="text/css" media="all" href="' + modulePath + 'response/_css/response.css"/><link id="response_custom" rel="stylesheet" type="text/css" media="screen" href="' + modulePath + 'response/_css/custom.css"/>');
            //var swapBtn = (noServer== false)?'<li id="swap_btn" '+responsiveSwitch+'><a href="#"></a></li>':'';
            var swapBtn = noServer == false ? '<div id="resSwap" ' + responsiveSwitch + "><span>" + fnTranslate("mobile") + '</span> | <a id="swap_btn">' + fnTranslate("desktop") + "</a></div>" : "";
            //-- loader --
            if (resPageLoader) {
                //如果resPageLoaderTigger設定always，則總是使用
                if (resPageLoaderTigger == "always") {
                    $("body").append('<div id="resLoader"></div>');
                    $(window).load(function() {
                        setTimeout("JResLoader({dom:'#resLoader'})", 800);
                    });
                } else {
                    //如果resPageLoaderTigger設定在某一尺寸下才使用
                    if ($(window).width() <= resPageLoaderTigger) {
                        $("body").append('<div id="resLoader"></div>');
                        $(window).load(function() {
                            setTimeout("JResLoader({dom:'#resLoader'})", 800);
                        });
                    }
                }
            }
            //-- 計算導覽按鈕群長度 (上方) --
            var mobile_nav_btn_width = mobile_nav_BtnAmt * (resMobileNavSetupWidth + resMobileNavSetupMargin);
            var mobile_nav = resMenuState == true ? ' style="position:'+resMenuType+';width:' + $(window).width() + "px;height:" + resMobileNavSetupHeight + 'px;" ' : ' resState="notUsed" style="display:none" ';
            var mobile_nav_width = $(window).width() > mobile_nav_btn_width ? ' style="width:' + $(window).width() + 'px;" ' : ' style="width:' + mobile_nav_btn_width + 'px;" ';
            var body_margin_top = (resMenuState == true) ? 'padding-top:' + resMobileNavSetupHeight + 'px;' : ''; //上選單有使用進行padding-top

            //-- 計算導覽按鈕群長度 (下方) --
            var mobile_nav_btn_width_bottom = mobile_nav_BottomBtnAmt * (resBottomMobileNavSetupWidth + resBottomMobileNavSetupMargin);
            var mobile_nav_bottom = resBottomMenuState == true ? ' style="position:'+resBottomMenuType+';width:' + $(window).width() + "px;height:" + resBottomMobileNavSetupHeight + 'px;" ' : ' resState="notUsed" style="display:none" ';
            var mobile_nav_width_bottom = $(window).width() > mobile_nav_btn_width_bottom ? ' style="width:' + $(window).width() + 'px;" ' : ' style="width:' + mobile_nav_btn_width_bottom + 'px;" ';
            var body_margin_bottom = (resBottomMenuState == true) ? 'padding-bottom:' + resBottomMobileNavSetupHeight + 'px;' : ''; //下選單有使用進行padding-bottom

            //螢幕在800以下進行選單物件狀態偵測
            var body_margin = $(window).width() <= setUILoadWidth ? ' style="' + body_margin_top + body_margin_bottom + '" ' : '';

            //-- mobile menu interface --
            $("body").wrapInner('<div id="resMainWrap" '+body_margin+'></div>');
            $("body").append('<div id="mobile_nav" ' + mobile_nav + "><ul " + mobile_nav_width + ">" + additionalBtn + "</ul></div>" + '<div id="mobile_nav_bottom" ' + mobile_nav_bottom + "><ul " + mobile_nav_width_bottom + ">" + additionalBottomBtn + "</ul></div>"  + '<div id="mobile_nav_content" class="flipContent ' + pannelPosition + '"><div class="menuList" style="' + resMarginTop + resMarginBottom + '">' + swapBtn + '<div id="reslang" ' + res_langSwitch + ">" + "<h1>" + fnTranslate("language") + "</h1>" + language + "</div>" + '<div id="resPrimery">' + "<h1>" + fnTranslate("menu") + "</h1>" + primaryMenu + "</div>" + subMenu + "<div class='clear'></div></div></div>" + additionalPannelContent + additionalBottomPannelContent + additionalPageContent);
            //上下區主選單控制
            $("#menu_btn,#menu_btn_bottom").click(function() {
                JResMobileTopNav({
                    btnId: "#menu_btn,#menu_btn_bottom",
                    contentId: "#mobile_nav_content",
                    position: flipDirection,
                    resetEvt: false
                });
                return false;
            });
            //-- content close mask --
            $("body").append('<div id="resContentMask"></div>');
            //-- give content container a mini-height
            $("#resMainWrap").css("min-height", $(window).height() + "px");
        } else {
            //切換為桌面版
            $(mobileSwitch).append('<div id="resSwapDesk" class="swap_btn_desktop_wrap" ' + responsiveSwitch + '><div class="swap_btn_desktop"><span>' + fnTranslate("desktop") + '</span> | <a id="swap_btn" href="#">' + fnTranslate("mobile") + "</a></div></div>");
        }
        //--add print media style sheet --
        $("head").append('<link id="resprint" rel="stylesheet" type="text/css" media="print" href="' + modulePath + 'response/_css/print.css"/>');
        //加入響應式按鈕
        //$(".resBtn").each(function() {
            $('body').on('click','.resBtn',function(){
            //$(this).click(function() {
                var toggle = $(this).attr("toggle");
                var addBtn = options.additionalBtn;
                var countAddBtn = addBtn.length;
                for (var i = 0; i < countAddBtn; i++) {
                    if (toggle == addBtn[i][0]) {
                        var pos = addBtn[i][4][0];
                    }
                }
                JResMobileTopNav({
                    btnId: "#" + toggle,
                    contentId: "#" + toggle + "_pannelContent",
                    position: pos,
                    resetEvt: false
                });
                return false;
            });
        //});
        //加入響應式頁面按鈕
        //$(".resPageBtn").each(function() {
            //$(this).click(function() {
            $('body').on('click','.resPageBtn',function(){
                var toggle = $(this).attr("toggle");
                JResPageControl({
                    id: "#" + toggle + "_pageContent"
                });
                return false;
            });
        //});
        //加入響應式Ajax載入頁面按鈕
        $("#resPageLoad_loading_icon").hide();
        $(document).ajaxStart(function() {
            $("#resPageLoad_loading_icon").show();
        }).ajaxComplete(function() {
            setTimeout("JResLoader({dom:'#resPageLoad_loading_icon'})", 800);
        });
        //resPageLoaderBtn
        //$(".resPageLoaderBtn").each(function() {
            //$(this).click(function() {
            $('body').on('click','.resPageLoaderBtn',function(){
                //判斷loader類型
                //查看是否總是使用響應視窗
                if ($(this).attr("tigger") == "" || $(this).attr("tigger") == undefined) {
                    //預設值在800以內寬度再使用響應視窗
                    if ($(window).width() <= setUILoadWidth) {
                        JResPageControl({
                            id: "#resPageLoader"
                        });
                        var pageTitle = $(this).attr("title") == "" || $(this).attr("title") == undefined ? "" : $(this).attr("title");
                        $("#resPageLoader .resAddPageTitle").text(pageTitle);
                        if ($(this).attr("toggle") == "" || $(this).attr("toggle") == undefined) {
                            //iframe loader
                            $("#resPageLoad_loading_icon").show();
                            // show Loading Div
                            setTimeout("JResLoader({dom:'#resPageLoad_loading_icon'})", 800);
                            var url = $(this).attr("href");
                            var height = $(window).height() - 120;
                            $("#resPageLoad_area").html('<iframe id="resIframeLoader" style="display:block;width:100%;height:' + height + 'px;border:0;" src="' + url + '">');
                        } else {
                            //ajax loader
                            if ($(this).attr("toggle") == "ajax") {
                                var url = $(this).attr("href");
                            } else {
                                if ($(this).attr("toggleDom") == "" || $(this).attr("toggleDom") == undefined) {
                                    var url = $(this).attr("href");
                                } else {
                                    var url = $(this).attr("href") + " " + $(this).attr("toggleDom");
                                }
                            }
                            $("#resPageLoad_area").load(url);
                        }
                        return false;
                    } else {
                        return true;
                    }
                } else if ($(this).attr("tigger") == "always") {
                    JResPageControl({
                        id: "#resPageLoader"
                    });
                    var pageTitle = $(this).attr("title") == "" || $(this).attr("title") == undefined ? "" : $(this).attr("title");
                    $("#resPageLoader .resAddPageTitle").text(pageTitle);
                    if ($(this).attr("toggle") == "" || $(this).attr("toggle") == undefined) {
                        //iframe loader
                        $("#resPageLoad_loading_icon").show();
                        // show Loading Div
                        setTimeout("JResLoader({dom:'#resPageLoad_loading_icon'})", 800);
                        var url = $(this).attr("href");
                        var height = $(window).height() - 120;
                        $("#resPageLoad_area").html('<iframe id="resIframeLoader" style="display:block;width:100%;height:' + height + 'px;border:0;" src="' + url + '">');
                    } else {
                        //ajax loader
                        if ($(this).attr("toggle") == "ajax") {
                            var url = $(this).attr("href");
                        } else {
                            if ($(this).attr("toggleDom") == "" || $(this).attr("toggleDom") == undefined) {
                                var url = $(this).attr("href");
                            } else {
                                var url = $(this).attr("href") + " " + $(this).attr("toggleDom");
                            }
                        }
                        $("#resPageLoad_area").load(url);
                    }
                    return false;
                }
            });
        //});
        //若url有#則使用定位移動函式 (restabJumperState:true使用/false停用, restabJumperSpeed:移動速度)
        if (restabJumperState && window.location.hash) {
            var targetPosID = $(window.location.hash);
            var speed = restabJumperSpeed;
            var paddingAmt = 0;
            //檢查此頁面是否有此區塊物件ID
            if ($(targetPosID).length > 0) {
                if (resMenuState === true && resMenuType === "fixed") {
                    paddingAmt = resMobileNavSetupHeight;
                }
                fnTabJumper(targetPosID, speed, paddingAmt);
            }
        }
        //resTabJumper
        if (restabJumperState) {
            //$(".resTabJumper").each(function() {
            $('body').on('click','.resTabJumper',function(){
                //$(this).click(function() {
                    var targetURL = $(this).attr("href");
                    if (targetURL.split("#")[0] == undefined || targetURL.split("#")[0] == "") {
                        var targetPosID = "#" + targetURL.split("#")[1];
                        var speed = restabJumperSpeed;
                        var paddingAmt = 0;
                        //檢查此頁面是否有此區塊物件ID
                        if ($(targetPosID).length > 0) {
                            if (resMenuState === true && resMenuType === "fixed") {
                                paddingAmt = resMobileNavSetupHeight;
                            }
                            fnTabJumper(targetPosID, speed, paddingAmt);
                        }
                        return false;
                    } else {
                        return true;
                    }
                //});
            });
        }
        //reset cookie
        $("#swap_btn").click(function() {
            fnSwap(document.cookie);
            window.location.reload();
            return false;
        });
        //close all pannel if click resContentMask area
        $("#resContentMask").click(function() {
            JResMobileTopNav({
                resetEvt: true
            });
        });
        $(window).scroll(function() {
            JResMobileTopNav({
                resetEvt: true
            });
        });
        //swap version
        function fnTabJumper(targetPosID, speed, paddingAmt) {
            var paddingAmt = paddingAmt + 10; //多10px
            $("html, body").animate({
                scrollTop: $(targetPosID).offset().top - paddingAmt
            }, speed);
        }
        //check pannel direction (針對響應式頁面及響應式按鈕)
        function fnCheckPosition(chkPos, returnVar) {
            //alert(chkPos);
            switch (chkPos) {
              case "right":
                position = "flipContentR";
                direction = "right";
                break;

              case "top":
                position = "flipContentT";
                direction = "top";
                break;

              case "top_small":
                position = "flipContentTS";
                direction = "top_small";
                break;

              case "left_under":
                position = "flipContentLU";
                direction = "left_under";
                break;

              case "right_under":
                position = "flipContentRU";
                direction = "right_under";
                break;

              case "right_page":
                position = "resFlipPageR";
                direction = "right";
                break;

              case "left_page":
                position = "resFlipPageL";
                direction = "left";
                break;

              case "top_page":
                position = "resFlipPageT";
                direction = "top";
                break;

              default:
                position = "flipContentL";
                direction = "left";
                break;
            }
            switch (returnVar) {
              case "position":
                return position;
                break;

              default:
                return direction;
                break;
            }
        }
        //swap version
        function fnSwap(responseCookie) {
            var getHost = $.JRes_modulePath();
            if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
                document.cookie = getHost + "_response=false";
            } else {
                document.cookie = getHost + "_response=true";
            }
        }
        //translate language
        function fnTranslate(str) {
            var transStr = "";
            var checkString = window.location.href.toLowerCase();
            if (res_langVarTw != "" && checkString.indexOf(res_langVarTw) != -1) {
                transStr = fnReturnTranslate(res_langArrayTw, str);
            } else if (res_langVarCn != "" && checkString.indexOf(res_langVarCn) != -1) {
                transStr = fnReturnTranslate(res_langArrayCn, str);
            } else if (res_langVarAdd1 != "" && checkString.indexOf(res_langVarAdd1) != -1) {
                transStr = fnReturnTranslate(res_langArrayAdd1, str);
            } else if (res_langVarAdd2 != "" && checkString.indexOf(res_langVarAdd2) != -1) {
                transStr = fnReturnTranslate(res_langArrayAdd2, str);
            } else if (res_langVarEn != "" && checkString.indexOf(res_langVarEn) != -1) {
                transStr = str;
            } else {
                //網站預設語系
                switch (res_langVarDefault) {
                  //繁中
                    case "tw":
                    transStr = fnReturnTranslate(res_langArrayTw, str);
                    break;

                  //簡中
                    case "cn":
                    transStr = fnReturnTranslate(res_langArrayCn, str);
                    break;

                  //外加語系1
                    case "add1":
                    transStr = fnReturnTranslate(res_langArrayAdd1, str);
                    break;

                  //外加語系2
                    case "add2":
                    transStr = fnReturnTranslate(res_langArrayAdd2, str);
                    break;

                  //預設值
                    default:
                    transStr = str;
                    break;
                }
            }
            return transStr;
        }
        function fnReturnTranslate(transArray, str) {
            var transStr;
            for (var i = 0; i < transArray.length; i++) {
                if (transArray[i].split(":")[0] == str.toLowerCase()) {
                    transStr = transArray[i].split(":")[1];
                }
            }
            return transStr;
        }
    };
    //JMarquee 文字跑馬燈
    $.fn.JResMarquee = function(options) {
        var defaults = {
            objWidth: "auto",
            fontSize: 30,
            position: -1,
            speed: 30
        };
        options = $.extend(defaults, options);
        if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
            $(this).addClass("resMarquee");
            $(this).wrapInner("<span>");
            var marContainer = "#" + $(this).attr("id");
            var marObj = marContainer + ">span";
            var fontSize = options.fontSize;
            var position = options.position;
            var speed = options.speed;
            var objWidth = options.objWidth;
            var documentW = $(window).width() - 20;
            var resMarqueeContainerW = Math.min($(marContainer).width(), documentW);
            if (objWidth != "auto") {
                resMarqueeW = Number(objWidth);
            } else {
                var resChineseCharW = fontSize + 1;
                var resCharW = fontSize - 1;
                var resChar = $(marObj).text().split("");
                var resNumberChar = resChar.length;
                var resMarqueeW = 0;
                //resNumberChar*resChineseCharW;
                for (var i = 0; i < resNumberChar; i++) {
                    resMarqueeW += Number(checkCharacterWidth(fontSize, resChar[i]));
                }
            }
            $(marObj).width(resMarqueeW);
            if (resMarqueeContainerW < resMarqueeW) {
                JResLoopMarquee({
                    marContainer: marContainer,
                    marObj: marObj,
                    position: position,
                    speed: speed,
                    resMarqueeContainerW: resMarqueeContainerW
                });
            } else {
                $(marObj).width("auto");
            }
        }
        //check character width fontSize:int, chr:string
        function checkCharacterWidth(fontSize, chr) {
            if (chr.search(/[0-9]/g) != -1) {
                //alert("[0-9]");
                return fontSize;
            } else if (chr.search(/[A-Z]/g) != -1) {
                //alert("[A-Z]");
                return fontSize + 3;
            } else if (chr.search(/[a-z]/g) != -1) {
                //alert("[a-z]");
                return fontSize - 2;
            } else if (chr.search(/\s]/g) != -1) {
                //alert("[\s]");
                return fontSize;
            } else if (chr.search(/[,.()?!:;]/g) != -1) {
                //alert("[\W]:"+chr);
                return fontSize - 8;
            } else {
                //alert("other");
                return fontSize + 2;
            }
        }
    };

    //resLoader 控制載入動畫
    JResLoader = function(options) {
        var defaults = {
            dom: '#resLoader',
            state: 'hide',
            speed: 200
        };
        options = $.extend(defaults, options);
        //console.log(options.dom);
        switch(options.state) {
            case 'show':
                $(options.dom).fadeIn(options.speed);
            break;
            default:
                $(options.dom).fadeOut(options.speed);
            break;
        }
    };

    //JMarquee 跑馬燈結束
    //JMarquee looping animation
    JResLoopMarquee = function(options) {
        var defaults = {
            marContainer: "",
            marObj: "",
            position: 1,
            speed: 20,
            resMarqueeContainerW: 0
        };
        options = $.extend(defaults, options);
        var marContainer = options.marContainer;
        var marObj = options.marObj;
        var position = options.position;
        var speed = options.speed;
        var resMarqueeContainerW = options.resMarqueeContainerW;
        $(marContainer).css("text-align", "left");
        var currentPos = Number($(marObj).css("margin-left").replace("px", ""));
        var maxPos = $(marObj).width() * position;
        switch (position) {
          case 1:
            if (currentPos < resMarqueeContainerW) {
                $(marObj).css({
                    "margin-left": currentPos + position + "px"
                });
            } else {
                $(marObj).css("margin-left", maxPos * -1 + "px");
            }
            break;

          default:
            if (currentPos > maxPos) {
                $(marObj).css({
                    "margin-left": currentPos + position + "px"
                });
            } else {
                $(marObj).css("margin-left", resMarqueeContainerW + "px");
            }
            break;
        }
        setTimeout("JResLoopMarquee({marContainer:'" + marContainer + "',marObj:'" + marObj + "',position:" + position + ",speed:" + speed + ",resMarqueeContainerW:" + resMarqueeContainerW + "})", speed);
    };
    //JMarquee looping animation
    //JResOverflow 橫向卷軸功能
    $.fn.JResOverflow = function(options) {
        //make move_overflow tag for image that width is larger than document width
        //if the image width is over the current page width, and wrap it with mobile_overflow   
        var defaults = {
            flow: true,
            paddingAmt: 25,
            setUILoadWidth: 800
        };
        options = $.extend(defaults, options);
        var setUILoadWidth = options.setUILoadWidth;

        if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
            var overflow = options.flow;
            var objTag = $(this).prop("tagName");
            var paddingAmt = options.paddingAmt;
            var documentW = $(window).width() - paddingAmt;
            switch (objTag) {
              case "IMG":
                $(this).each(function() {
                    var objW = 0;
                    var objH = 0;
                    $(this).load(function() {
                        $(this).css({
                            width: "auto",
                            height: "auto"
                        });
                        objW = $(this).width();
                        objH = $(this).height();
                        
                    }).each(function(){
                      if(this.complete) {
                        $(this).trigger('load');
                      }
                    });
                    if (objW > documentW || overflow == true) {
                        if (!$(this).hasClass("resUnwrap")) {
                            $(this).css({
                                width: "auto",
                                height: "auto"
                            });
                            $(this).wrap('<div class="mobile_overflow" style="text-align:center">');
                        }
                    } else {
                        if (objW > documentW) {
                            $(this).css({
                                width: "100%",
                                height: "auto"
                            });
                        }
                    }
                });
                break;

              case "TABLE":
                if (600 > documentW) {
                    $(this).each(function() {
                        if ($(this).width() > documentW || overflow == true) {
                            if (!$(this).hasClass("resUnwrap")) {
                                $(this).width("600px");
                                $(this).wrap('<div class="mobile_overflow">');
                            }
                        }
                    });
                }
                break;

              default:
                $(this).each(function() {
                    if ($(this).width() > documentW || overflow == true) {
                        if (!$(this).hasClass("resUnwrap")) {
                            $(this).wrap('<div class="mobile_overflow">');
                        }
                    } else {
                        $(this).width("100%");
                    }
                });
                break;
            }

            //800以下在把外框加入設備寬
            if ($(window).width() <= setUILoadWidth){
                $(".mobile_overflow").css({"width":Math.round($(window).width()-paddingAmt)+"px"});
            }
        }
    };
    //JSOvflow 橫向卷軸功能
    //JSlideImg 功能
    $.fn.JSlideImg = function(options) {
        var defaults = {
            disObj: this,
            childTag: "img",
            transitTime: 3,
            holdTime: 5,
            paddingAmt: 20,
            layout: "clear"
        };
        options = $.extend(defaults, options);
        if (options.childTag.toLowerCase() == "img") $(options.childTag, this).addClass("resUnlarger");
        //禁止resEnlarge使用
        //設定排版方式
        switch (options.layout.toLowerCase()) {
          case "left":
            $(this).css({
                "float": "left"
            });
            break;

          case "right":
            $(this).css({
                "float": "right"
            });
            break;

          case "center":
            $(this).css({
                clear: "both",
                "margin-right": "auto",
                "margin-left": "auto"
            });
            break;

          default:
            $(this).css({
                clear: "both"
            });
            break;
        }
        $(options.disObj).addClass("resJSlideImg");
        //if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
        var paddingAmt = options.paddingAmt;
        var maxAmt = $(options.childTag.toLowerCase(), this).length - 1;
        var maxJSlideWidth = $(window).width() - paddingAmt;
        var resJSlideWidth, resJSlideHeight;
        var resContainer = $(this);
        //設定物件長寬
        $(options.childTag.toLowerCase() + ":eq(0)", this).load(function() {
            resJSlideWidth = $(this).width();
            resJSlideHeight = $(this).height();
            if (resJSlideWidth >= maxJSlideWidth) {
                resJSlideHeight = resJSlideHeight * (maxJSlideWidth / resJSlideWidth);
                resJSlideWidth = maxJSlideWidth;
            }
            resContainer.width(resJSlideWidth);
            resContainer.height(resJSlideHeight);
            $(options.childTag.toLowerCase(), resContainer).css("width", "100%");
        }).each(function(){
          if(this.complete) {
            $(this).trigger('load');
          }
        });
        if ($("#" + options.disObj.attr("id")).length > 0 && $("#" + options.disObj.attr("id")).css("display") != "none") {
            if (maxAmt == 0) {
                $("#" + options.disObj.attr("id") + ">" + options.childTag.toLowerCase()).animate({
                    opacity: "1"
                }, options.transitTime * 1e3);
            } else {
                JResSlideShow({
                    disObj: options.disObj.attr("id"),
                    childTag: options.childTag.toLowerCase(),
                    curr: 0,
                    maxAmt: maxAmt,
                    transitTime: options.transitTime,
                    holdTime: options.holdTime
                });
            }
        }
    };
    //JSlideImg 功能結束
    //JSlideImg slideshow loop controller
    JResSlideShow = function(options) {
        var defaults = {
            disObj: "",
            childTag: "",
            curr: 0,
            maxAmt: 0,
            transitTime: 0,
            holdTime: 0
        };
        options = $.extend(defaults, options);
        var disObj = options.disObj;
        var childTag = options.childTag;
        var curr = options.curr;
        var maxAmt = options.maxAmt;
        var transitTime = options.transitTime;
        var holdTime = options.holdTime;
        if (curr != 0) {
            var prev = curr - 1;
            $("#" + disObj + ">" + childTag + ":eq(" + prev + ")").animate({
                opacity: "0"
            }, transitTime * 1e3);
        } else {
            $("#" + disObj + ">" + childTag + ":eq(" + maxAmt + ")").animate({
                opacity: "0"
            }, transitTime * 1e3);
        }
        $("#" + disObj + ">" + childTag + ":eq(" + curr + ")").animate({
            opacity: "1"
        }, transitTime * 1e3, function() {
            curr < maxAmt ? curr++ : curr = 0;
            setTimeout("JResSlideShow({disObj:'" + disObj + "',childTag:'" + childTag + "',curr:" + curr + ",maxAmt:" + maxAmt + ",transitTime:" + transitTime + ",holdTime:" + holdTime + "});", holdTime * 1e3);
        });
    };
    //JSlideImg slideshow loop controller
    //取JRes Cookie參數值
    $.JRes_getCookie = function(options) {
        var defaults = {
            search_key: $.JRes_modulePath() + "_response="
        };
        options = $.extend(defaults, options);
        var name = options.search_key;
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = $.trim(ca[i]);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    };
    //取JRes Cookie參數值結束
    //取得模組跟目錄參數路徑
    $.JRes_modulePath = function() {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf("response.js") != -1) {
                return scripts[i].src.replace("response/response.js", "");
            } else if (scripts[i].src.indexOf("response.min.js") != -1) {
                return scripts[i].src.replace("response/response.min.js", "");
            } else if (scripts[i].src.indexOf("response.beautified.js") != -1) {
                return scripts[i].src.replace("response/response.beautified.js", "");
            }
        }
    };
    //JResEnlarge 放大圖功能
    $.fn.JResEnlarge = function(options) {
        //make img with enlarge formate
        var defaults = {
            enlargeSize: "100%",
            scalePx: 20,
            paddingAmt: 20,
            extraSource: "",
            setUILoadWidth: 800
        };
        options = $.extend(defaults, options);
        var setUILoadWidth = options.setUILoadWidth;

        if (($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") && $(window).width() <= setUILoadWidth) {
            var enlargeSize = options.enlargeSize;
            var scalePx = options.scalePx;
            var paddingAmt = options.paddingAmt;
            var documentW = $(window).width() - paddingAmt;
            $(this).each(function() {
                var objW = 0;
                $(this).load(function(){
                    //若圖片尺寸取不到,則以100%的方式取得上層容器的尺寸
                    $(this).css({
                            width: "auto"
                        });
                    objW = $(this).width();
                    //alert(objW);
                    $(this).addClass("resEnlargeImg");
                    if (objW >= documentW) {
                        objW = documentW;
                    }

                    //先檢查class
                    if (!$(this).hasClass("resUnlarger")) {
                        //再檢查是否有設定onclick event
                        if (!$(this).attr("onclick")) {
                            //再檢查是否被a包覆，如果有則不使用此功能
                            switch ($(this).parent("a").prop("tagName")) {
                                case "A":
                                    var doUsed = false;
                                break;
                                default:
                                    var doUsed = true;
                                break;
                            }
                        } else {
                            var doUsed = false;
                        }
            
                        if (doUsed) {
                            $(this).attr("style", "width:" + objW + "px;height:auto;");
                            var thisID = "resEnlarge_" + Math.floor(Math.random() * 100 + 1);
                            $(this).wrap('<div class="resEnlargeWraper"><div id="' + thisID + '" class="resEnlarge" style="width:' + objW + 'px;height:auto;">');
                            $(this).before('<div class="resEnlargeOpenIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'open',scalePx:" + scalePx + '});return false;"></div>');
                            if (enlargeSize == "auto") {
                                var FitIconVal = 'style="display:none"';
                                var OrangIconVal = "";
                            } else {
                                var FitIconVal = "";
                                var OrangIconVal = 'style="display:none"';
                            }
                            var resEnlargeControl = '<div class="resEnlargeCloseIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'close',scalePx:" + scalePx + '});return false;"></div>' + '<div class="resEnlargeFitIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'fit',scalePx:" + scalePx + '});return false;" ' + FitIconVal + "></div>" + '<div class="resEnlargeOraginalIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'oraginal',scalePx:" + scalePx + '});return false;" ' + OrangIconVal + "></div>" + '<div class="resEnlargePlusIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'plus',scalePx:" + scalePx + '});return false;"></div>' + '<div class="resEnlargeDisIcon" onclick="JResEnlargeControl({id:\'' + thisID + "',action:'dis',scalePx:" + scalePx + '});return false;"></div>';
                            var extraSource = options.extraSource != "" ? options.extraSource : $(this).attr("src");
                            var resEnlargeContent = '<div class="resEnlargeContent">' + 
                                                    '<div class="resEnlargeControlBar">' + resEnlargeControl + "</div>" + 
                                                    '<img id="' + thisID + '_enObj" src="' + extraSource + '" style="width:' + enlargeSize + ';height:auto;" />' + "</div>";
                            $(this).after(resEnlargeContent);
                        }
                    }

                    //alert($(this).attr("src")+","+objW+","+documentW);
                }).each(function(){
                  if(this.complete) {
                    $(this).trigger('load');
                  }
                });

            });
        }
    };
    //JResEnlarge 放大圖功能
    //mobile enlarge control
    JResEnlargeControl = function(options) {
        var defaults = {
            id: "",
            action: "",
            scalePx: 20
        };
        options = $.extend(defaults, options);
        var id = options.id;
        var action = options.action;
        var scalePx = options.scalePx;
        switch (action) {
          //打開視窗
            case "open":
            $("#" + id + ">.resEnlargeContent").fadeIn(200);
            if ($("#mobile_nav_bottom").attr("resState") != "notUsed") {
                $("#mobile_nav_bottom").hide();
            }
            
            break;

          //關閉視窗
            case "close":
            $("#" + id + ">.resEnlargeContent").fadeOut(200);
            if ($("#mobile_nav_bottom").attr("resState") != "notUsed") {
                $("#mobile_nav_bottom").show();
            }
            break;

          //符合尺寸
            case "fit":
            if ($("#" + id + " .resEnlargeOraginalIcon").css("display") == "none") {
                $("#" + id + " .resEnlargeFitIcon").hide();
                $("#" + id + " .resEnlargeOraginalIcon").show();
                $("#" + id + ">.resEnlargeContent>img").attr("style", "width:auto !important");
            }
            break;

          //原始大小
            case "oraginal":
            if ($("#" + id + " .resEnlargeFitIcon").css("display") == "none") {
                $("#" + id + " .resEnlargeFitIcon").show();
                $("#" + id + " .resEnlargeOraginalIcon").hide();
                $("#" + id + ">.resEnlargeContent>img").attr("style", "width:100% !important");
            }
            break;

          //放大
            case "plus":
            $("#" + id + ">.resEnlargeContent>img").attr("style", "width:" + ($("#" + id + ">.resEnlargeContent>img").width() + scalePx) + "px !important");
            break;

          //縮小
            case "dis":
            $("#" + id + ">.resEnlargeContent>img").attr("style", "width:" + ($("#" + id + ">.resEnlargeContent>img").width() - scalePx) + "px !important");
            break;
        }
    };
    //mobile enlarge control
    //mobile additional page control
    JResPageControl = function(options) {
        var defaults = {
            id: "",
            action: "open"
        };
        options = $.extend(defaults, options);
        var id = options.id;
        var action = options.action;
        switch (action) {
          //關閉頁面
            case "back":
            $("html").removeClass("resHtmlOverflow");
            if ($(id).hasClass("resFlipPageR")) {
                $(id).animate({
                    right: "-120%"
                }, 300);
            } else if ($(id).hasClass("resFlipPageT")) {
                $(id).animate({
                    top: "-120%"
                }, 300);
            } else {
                $(id).animate({
                    left: "-120%"
                }, 300);
            }
            //關閉時清除url_loader內容
            $("#resPageLoad_area").html("");
            break;

            //關閉全部頁面
            case "closeAll":
                $("html").removeClass("resHtmlOverflow");
                $(".resFlipPage").each(function(){
                    if ($(this).hasClass("resFlipPageR") && ($(this).css("right") == "0px" || $(this).css("right") == "0%")){
                        $(this).animate({
                            right: "-120%"
                        }, 300);
                    }else if ($(this).hasClass("resFlipPageT") && ($(this).css("top") == "0px" || $(this).css("top") == "0%")){
                        $(this).animate({
                            right: "-120%"
                        }, 300);
                    }else{
                        $(this).animate({
                            right: "-120%"
                        }, 300);
                    }
                })
                //關閉時清除url_loader內容
                $("#resPageLoad_area").html("");
            break;

          //打開頁面
            case "open":
            default:
            $("html").addClass("resHtmlOverflow");
            if ($(id).hasClass("resFlipPageR")) {
                $(id).animate({
                    right: "0px"
                }, 300);
            } else if ($(id).hasClass("resFlipPageT")) {
                $(id).animate({
                    top: "0px"
                }, 300);
            } else {
                $(id).animate({
                    left: "0px"
                }, 300);
            }
            break;
        }
    };
    //mobile navigation bar
    JResMobileTopNav = function(options) {
        var defaults = {
            btnId: "",
            contentId: "",
            position: "",
            resetEvt: true
        };
        options = $.extend(defaults, options);
        var btnId = options.btnId;
        var contentId = options.contentId;
        var position = options.position;
        var resetEvt = options.resetEvt;
        //開啟前先檢查其他pannel如果已經開啟則關閉
        $(".flipContentL").each(function() {
            if ($(this).css("left") == "0px" || $(this).css("left") == "0%") {
                $(this).animate({
                    left: "-90%"
                }, 300);
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        $(".flipContentR").each(function() {
            if ($(this).css("right") == "0px" || $(this).css("left") == "0%") {
                $(this).animate({
                    right: "-90%"
                }, 300);
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        $(".flipContentT").each(function() {
            if ($(this).css("top") == "0px" || $(this).css("left") == "0%") {
                $(this).animate({
                    top: "-90%"
                }, 300);
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        $(".flipContentTS").each(function() {
            if ($(this).css("top") == "0px" || $(this).css("left") == "0%") {
                $(this).animate({
                    top: "-110px"
                }, 300);
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        $(".flipContentLU").each(function() {
            if ($(this).css("left") == "0px" || $(this).css("left") == "0%") {
                $("#resContentMask").removeAttr("style").css("left", "0");
                $(this).animate({
                    left: "-90%"
                }, 300);
                $("#resMainWrap").animate({
                    left: "0"
                }, 300, function() {
                    //$(this).removeAttr("style");
                    $(this).css("left","");
                });
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        $(".flipContentRU").each(function() {
            if ($(this).css("right") == "0px" || $(this).css("left") == "0%") {
                $("#resContentMask").removeAttr("style").css("right", "0");
                $(this).animate({
                    right: "-90%"
                }, 300);
                $("#resMainWrap").animate({
                    right: "0"
                }, 300, function() {
                    //$(this).removeAttr("style");
                    $(this).css("right","");
                });
                $("#mobile_nav ul li a div").remove();
                $("#mobile_nav_bottom ul li a div").remove();
                $.JResContentScroll({
                    action: true
                });
            }
        });
        if (resetEvt == false) {
            //開啟視窗
            switch (position) {
              case "right":
                if ($(contentId).css("right") == "0px" || $(contentId).css("right") == "0%") {
                    $(contentId).animate({
                        right: "-90%"
                    }, 300);
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $(contentId).animate({
                        right: "0px"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeRight_btn'></div>");
                }
                break;

              case "top":
                if ($(contentId).css("top") == "0px" || $(contentId).css("top") == "0%") {
                    $(contentId).animate({
                        top: "-90%"
                    }, 300);
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $(contentId).animate({
                        top: "0px"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeTop_btn'></div>");
                }
                break;

              case "top_small":
                if ($(contentId).css("top") == "0px" || $(contentId).css("top") == "0%") {
                    $(contentId).animate({
                        top: "-100px"
                    }, 300);
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $(contentId).animate({
                        top: "0px"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeTop_btn'></div>");
                }
                break;

              case "left_under":
                if ($(contentId).css("left") == "0px" || $(contentId).css("left") == "0%") {
                    $("#resContentMask").removeAttr("style").css("left", "0");
                    $(contentId).animate({
                        left: "-90%"
                    }, 300);
                    $("#resMainWrap").animate({
                        left: "0"
                    }, 300, function() {
                        //$(this).removeAttr("style");
                        $(this).css("left","");
                    });
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $("#resContentMask").removeAttr("style").css("left", "90%");
                    $(contentId).animate({
                        left: "0px"
                    }, 300);
                    $("#resMainWrap").animate({
                        left: "90%"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeLeft_btn'></div>");
                }
                break;

              case "right_under":
                if ($(contentId).css("right") == "0px" || $(contentId).css("right") == "0%") {
                    $("#resContentMask").removeAttr("style").css("right", "0");
                    $(contentId).animate({
                        right: "-90%"
                    }, 300);
                    $("#resMainWrap").animate({
                        right: "0"
                    }, 300, function() {
                        //$(this).removeAttr("style");
                        $(this).css("right","");
                    });
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $("#resContentMask").removeAttr("style").css("right", "90%");
                    $(contentId).animate({
                        right: "0px"
                    }, 300);
                    $("#resMainWrap").animate({
                        right: "90%"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeRight_btn'></div>");
                }
                break;

              default:
                if ($(contentId).css("left") == "0px" || $(contentId).css("left") == "0%") {
                    $(contentId).animate({
                        left: "-90%"
                    }, 300);
                    $.JResContentScroll({
                        action: true
                    });
                    $("a div", btnId).remove();
                } else {
                    $(contentId).animate({
                        left: "0px"
                    }, 300);
                    $.JResContentScroll({
                        action: false
                    });
                    $("a", btnId).append("<div class='closeLeft_btn'></div>");
                }
                break;
            }
        }
    };
    //mobile navigation bar
    //content scrollerbar
    $.JResContentScroll = function(options) {
        var defaults = {
            action: true
        };
        options = $.extend(defaults, options);
        var action = options.action;
        if (action) {
            //$("#resMainWrap").css({"position":"relative"});
            $("html").removeClass("resHtmlOverflow");
            $("#resContentMask").hide();
        } else {
            //$("#resMainWrap").css({"position":"fixed"});
            $("html").addClass("resHtmlOverflow");
            $("#resContentMask").show();
            $("#resMainWrap").css("min-height", $(window).height() + "px");
        }
    };
    //content scrollerbar
    // scrolltotop plugin
    /***********************************************
    *外掛: 向上按鈕*
    * Scroll To Top Control script- c Dynamic Drive DHTML code library (www.dynamicdrive.com)
    * Modified by www.MyBloggerTricks.com
    * Modified by www.scrolltotop.com
    * This notice MUST stay intact for legal use
    * Visit Project Page at http://www.dynamicdrive.com for full source code
    ***********************************************/
    var resScrolltotop = {
        //startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
        //scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
        setting: {
            startline: 100,
            scrollto: 0,
            scrollduration: 1e3,
            fadeduration: [ 500, 100 ]
        },
        controlHTML: "",
        //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
        controlattrs: {
            offsetx: 5,
            offsety: 5
        },
        //offset of control relative to right/ bottom of window corner
        anchorkeyword: "#top",
        //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links
        state: {
            isvisible: false,
            shouldvisible: false
        },
        scrollup: function() {
            if (!this.cssfixedsupport) //if control is positioned using JavaScript
            this.$control.css({
                opacity: 0
            });
            //hide control immediately after clicking it
            var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
            if (typeof dest == "string" && $("#" + dest).length == 1) //check element set by string exists
            dest = $("#" + dest).offset().top; else dest = 0;
            this.$body.animate({
                scrollTop: dest
            }, this.setting.scrollduration);
        },
        keepfixed: function() {
            var $window = $(window);
            var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
            var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
            this.$control.css({
                left: controlx + "px",
                top: controly + "px"
            });
        },
        togglecontrol: function() {
            var scrolltop = $(window).scrollTop();
            if (!this.cssfixedsupport) this.keepfixed();
            this.state.shouldvisible = scrolltop >= this.setting.startline ? true : false;
            if (this.state.shouldvisible && !this.state.isvisible) {
                this.$control.stop().animate({
                    opacity: 1
                }, this.setting.fadeduration[0]);
                this.state.isvisible = true;
            } else if (this.state.shouldvisible == false && this.state.isvisible) {
                this.$control.stop().animate({
                    opacity: 0
                }, this.setting.fadeduration[1]);
                this.state.isvisible = false;
            }
        },
        init: function() {
            $(document).ready(function($) {
                var mainobj = resScrolltotop;
                var iebrws = document.all;
                mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode == "CSS1Compat" && window.XMLHttpRequest;
                //not IE or IE7+ browsers in standards mode
                mainobj.$body = window.opera ? document.compatMode == "CSS1Compat" ? $("html") : $("body") : $("html,body");
                mainobj.$control = $('<div id="topcontrol" ' + mainobj.controlHTML + '></div>').css({
                    position: mainobj.cssfixedsupport ? "fixed" : "absolute",
                    bottom: mainobj.controlattrs.offsety,
                    right: mainobj.controlattrs.offsetx,
                    opacity: 0,
                    cursor: "pointer",
                    "z-index": "999"
                }).attr({
                    title: "Scroll to Top"
                }).click(function() {
                    mainobj.scrollup();
                    return false;
                }).appendTo("body");
                if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != "") //loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({
                    width: mainobj.$control.width()
                });
                //IE6- seems to require an explicit width on a DIV containing text
                mainobj.togglecontrol();
                $('a[href="' + mainobj.anchorkeyword + '"]').click(function() {
                    mainobj.scrollup();
                    return false;
                });
                $(window).bind("scroll resize", function(e) {
                    mainobj.togglecontrol();
                });
            });
        }
    };
    resScrolltotop.init();
    // scrolltotop plugin
    //Jres 螢幕尺寸變換同步功能
    //orientationchange reload
    //if in print mode or desktop mode, reload the page
    var resPrintActive = false;
    //default value set false
    if ($.JRes_getCookie() == "true" || $.JRes_getCookie() == null || $.JRes_getCookie() == "") {
        $(window).resize(function() {
            if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile|Android)/)) {
                if (!resPrintActive) {
                    //if not print event then reload when browser resize
                    //if browser in full screen than do not auto reload
                    if (navigator.userAgent.match(/(Firefox)/)) {
                        //if in firefox
                        if (!window.fullScreen) {
                            window.location.href = window.location.href;
                        }
                    } else {
                        //if in other browsers
                        if (!(Math.abs(screen.width - window.innerWidth) < 10)) {
                            location.reload();
                        }
                    }
                }
            }
        });
        $(window).on("orientationchange", function() {
            if (navigator.userAgent.match(/(Firefox)/)) {
                //if in firefox
                window.location.href = window.location.href;
            } else {
                //if in other browsers
                location.reload();
            }
        });
    }
    //detect print event: if active set resPrintActive with value true
    var beforePrint = function() {
        resPrintActive = true;
    };
    //after print event: once print event detect then reset resPrintActive with value false
    var afterPrint = function() {
        resPrintActive = false;
    };
    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia("print");
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
    //Jres 螢幕尺寸變換同步功能
    //-- check resCol img width --
    $(window).bind("load", function() {
        //處理res排版圖片尺寸
        $('.resRow [class*="resCol"]').each(function() {
            $resColW = $(this).width();
            $("img", this).each(function() {
                $(this).css("width", "auto");
                //偵測尺寸前先還原圖片尺寸
                if (!$(this).hasClass("resEnlargeImg")) {
                    if ($(this).width() >= $resColW) {
                        $(this).css("width", "100%");
                    } else {
                        //如果是以100%比方式出值，則直接以100%來出圖
                        if ($resColW <= 100) {
                            $(this).css("width", "100%");
                        } else {
                            $(this).css("width", "auto");
                        }
                    }
                } else {
                    $(this).parent(".resEnlarge").css("width", "100%");
                    $(this).css("width", "100%");
                }
            });
        });
    });
})(jQuery);