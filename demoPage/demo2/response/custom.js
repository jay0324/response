$(function() {
    var resHost = $.JRes_modulePath();

	$.JResponsive({
		defaultMenuObj: "#nav",
        defaultLangMenuObj: "#lang",
        resPageLoader: true,
        //resPageLoaderTigger: 'always',
        additionalBtn: [
            [
                "submenu_btn",
                "#",
                "SUB",
                "pannel",
                [
                    "right",
                    $("#resMenuStyle").html()
                ]
            ],
            [
                "logo_btn",
                resHost,
                "",
                "_self"
            ]
        ],
        pannelStyle: 'style1',
        menuCollapse: '#resPrimery',
        pannelPosition: 'right_under'
	});


    $("#slideshow").JSlideImg({
            paddingAmt: 0,
            childTag: 'a',
            thumb: {
                state: true,
                amount: 4,
                width:50,
                height:50,
                type: 'horizontal',
                position: 'auto'
            },
            slideBtn:{
                state: true,
                width: 60,
                height: 100,
                type: 'horizontal'
            },
            setupResposive: {
                800:{
                    width:30,
                    height:30,
                    position: 'auto',
                    slideBtn:{
                        width: 20,
                        height: 'auto'
                    }
                }
            }
        })

    //slideshow
    $("#slideshow2").JSlideImg({
        paddingAmt: 0,
        thumb: {
                state: true,
                amount: 2,
                width:30,
                height:30,
                type: 'vertical',
                position: 'left:0;'
        },
        slideBtn:{
            state: true,
            width: 50,
            height: 20,
            type: 'vertical'
        },
        setupResposive: {
            800:{
                state: false,
                slideBtn:{
                    width: 'auto',
                    height: 20
                }
            }
        },
        onTrans: function(){
            var curr = this.curr;
            var prev = this.prev;
            var begin = this.begin;
            $(curr).removeClass().addClass('animated rollIn');
            if (!begin) {
                $(prev).removeClass().addClass('animated rollOut');
            }
        }
    })

    $("#slideshow3").JSlideImg({
        paddingAmt: 0,
        thumb: {
            state: true,
            amount: 2,
            width:50,
            height:50,
            type: 'horizontal',
            position: 'bottom:0;left:0;'
        },
        slideBtn:{
            state: true,
            width: 20,
            height: 50,
            type: 'horizontal'
        },
        setupResposive: {
            800:{
                state: false,
                slideBtn:{
                    width: 20,
                    height: 'auto'
                }
            }
        },
        onTrans: function(){
            var curr = this.curr;
            var prev = this.prev;
            var begin = this.begin;
            $(curr).removeClass().addClass('animated flipInY');
            if (!begin) {
                $(prev).removeClass().addClass('animated flipOutY');
            }
        }
    })

    //slider
    $("#myItemSlider").JResContentSlider({
        listAmt: 3,
        setupResposive: {
                    800:{
                        listAmt: 3
                    },
                    600:{
                        listAmt: 2
                    },
                    420:{
                        listAmt: 1
                    }
                }
    })

    //slider2
    $("#myItemSlider2").JResContentSlider({
        listAmt:1,
        from:2,
        btnSetup:{
            nextBtn:{
                state: true,
                width: (($(".resDocLayout").width() / 2) - 200)
            },
            prevBtn:{
                state: true,
                width: (($(".resDocLayout").width() / 2) - 200)
            }
        },
        setupResposive: {       //響應式設定(物件)
            800:{
                listAmt: 1,
                listPaddingAmt: 20,
                autoPlay: false,
                btnSetup:{
                    nextBtn:{
                        state: true,
                        width: (($(window).width() / 2) - 200)
                    },
                    prevBtn:{
                        state: true,
                        width: (($(window).width() / 2) - 200)
                    }
                }
            },
            500:{
                listAmt: 1,
                listPaddingAmt: 20,
                autoPlay: false,
                btnSetup:{
                    nextBtn:{
                        state: true,
                        width: (($(window).width() / 2) - 120)
                    },
                    prevBtn:{
                        state: true,
                        width: (($(window).width() / 2) - 120)
                    }
                }
            }
        }
    })

    //tab group list
    $("#myTabList").JResContentTab({
        fx: 'slide'
    })

    $("#myTabList2").JResContentTab({
        fx: 'show',
        onClick: function(){
            alert('custom setting!');
        }
    })

    //resEnlarge obj
    $(".resEnlargeObj").JResEnlarge({
        popupMode: true,
        paddingAmt: 0
    })

    //delay show
    $("div[class*='resCol']").addClass('resDelay');
    $(".resContainer").each(function(){
        $(this).JResDelayLoader({
            loadObj: ".resDelay",
            onLoad:function(){
                //客製效果
                $(this).addClass('animated bounceInUp');
            }
        })
    })
       
    //testTabGroup
    $("#testTabGroup").JResContentTab({
        init: 0,
                fx: 'show',
                transitTime: 1000,
                createTabs: {           //js寫入Tab
                    tab1:{              //新標籤編號
                        id: "tab1_btn",
                        text: 'test',
                        content: '<img src="_img/1920x600.jpg" />'
                    },
                    tab2:{              //新標籤編號
                        id: "tab2_btn",
                        text: "this is tab2",
                        content: "this is the content for tab 2"
                    }
                }       
    });

    //resMenu2
    $("#nav").JResMenu({
        view: 'horizontal',
        action: 'hover'
    });

    //resMenu1
    $(".menuObj").JResMenu();

    //resOverflow
    $(".overflowObj").JResOverflow();

    //scroll sticker
    $("#row0").JResScrollSticker();

 })