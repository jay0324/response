$(function() {
    //$.JRes_autoRefresh({state: false}); //停用自動重整

    var resHost = $.JRes_modulePath();

	$.JResponsive({
		defaultMenuObj: "#nav",
        defaultLangMenuObj: "#lang",
        resPageLoader: true,
        resPageLoaderTigger: 'always',
        additionalBtn: [
            {
                id: "submenu_btn",
                link: "#",
                show: "SUB",
                target: "pannel",
                setup: {
                    type: "right",
                    content: $("#resMenuStyle").html()
                },
                width:400
            },
            {
                id: "logo_btn",
                link: resHost,
                show: '<span class="icon-home"></span>',
                target: "_self"
            },
            {
                id: "demo_page_btn",
                page_id: "demo_page1",
                show: "DEMO PAGE",
                target: "page"
            },
            {
                id: "demo_loader",
                link: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14559.8434006705!2d120.66025329999998!3d24.17310575!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1478138160232",
                show: "LOAD PAGE",
                target: "loader",
                setup: {
                    title: "DEMO LOADER"
                }
            },
            {
                id: "Followup_btn",
                link: "#",
                show: "Follow",
                target: "pannel",
                setup: {
                    type: "top",
                    content: $('#myFollowObj').html()
                }
            }
        ],
        menuCollapse: '#resPrimery',
        pannelPosition: 'left',
        pannelAnimateTime: 1000,
        pannelAnimateEasing: "easeOutBounce",
        additionalPage: [
            {
                id: "demo_page1",
                type: "right",
                show: "DEMO 1",
                content: "<p style='color:#fff'>DEMO 1 CONTENT</p>",
                relate_id: "demo_page2"
            },
            {
                id: "demo_page2",
                type: "right",
                show: "DEMO 2",
                content: "<p style='color:#E6DB74'>DEMO 2 CONTENT</p>",
                relate_id: "demo_page3"
            },
            {
                id: "demo_page3",
                type: "right",
                show: "DEMO 3",
                content: "<p style='color:#66D9B1'>DEMO 3 CONTENT</p>",
                relate_id: ""
            }
        ],
        defaultSubMenuObj: [                        //主選單下方添加選單區塊
                    {
                        id: 'sub_menu1',
                        show: "Search",
                        obj: "#logo"
                    }
        ],
        res_langVarTw: '?tw'
	});

    
    $("#wrapper1").JResWrapper({
        activeWidth:800,
        pos: 60
    });
    $("#wrapper3").JResWrapper({
        type: 'right',
        pos: 60,
        end: 2.5
    });
    $("#wrapper4").JResWrapper({
        type: 'right',
        pos: 60,
        end: 0
    });
    $("#wrapper3").JResWrapper({
        type: 'top'
    });
    $("#wrapper4").JResWrapper({
        type: 'bottom'
    });

    $("#demoAccordion").JResAccordion();

    $("#demoAccordion2").JResAccordion({
        type:'vertical'
    });
    

    $("#slideshow").JSlideImg({
            paddingAmt: 0,
            childTag: 'a',
            thumb: {
                state: true,
                amount: 2,
                width:50,
                height:50,
                type: 'horizontal',
                position: 'auto',
                overlap: false,
                overlapPos: 'bottom'
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
                amount: 5,
                type: 'vertical',
                position: 'left:0;',
                displayTitle: 'right'
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
            amount: 15,
            type: 'horizontal',
            position: 'bottom:0;left:0;',
            displayTitle: 'top'
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
            $(curr).removeClass('animated flipOutY').addClass('animated flipInY');
            if (!begin) {
                $(prev).removeClass('animated flipInY').addClass('animated flipOutY');
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

    $("#myItemSlider3").JResContentSlider({
        listAmt: 3,
        type: 'vertical',
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

    $("#myItemSlider4").JResContentSlider({
        listAmt: 2,
        type: 'vertical',
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

    $("#myItemSlider5").JResContentSlider({
        listAmt: 1,
        type: 'vertical',
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

    //tab group list
    $("#myTabList").JResContentTab({
        fx: 'slide',
        resMode: 'collapse'
    })

    $("#myTabList2").JResContentTab({
        fx: 'show',
        onClick: function(){
            alert('custom setting!');
        },
        resMode: 'expend'
    })

    //resEnlarge obj
    $(".resEnlargeObj").JResEnlarge({
        popupMode: true,
        paddingAmt: 0
    })

    //slideshow with resEnlarge obj
    $("#slideshow4").JSlideImg({
        enlargeObj: true,
        paddingAmt: 0,
        thumb: {
            state: true,
            amount: 15,
            type: 'horizontal',
            position: 'bottom:0;left:0;',
            displayTitle: 'top'
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
            $(curr).removeClass('animated flipOutY').addClass('animated flipInY');
            if (!begin) {
                $(prev).removeClass('animated flipInY').addClass('animated flipOutY');
            }
        }
    })

    //slideshow with multi objs
    $("#slideshow5").JSlideImg({
        autoPlay: false,
        childTag: 'div',
        childClass: '.slide',
        multiLayerMode: {
            state: true
        },
        paddingAmt: 0,
        thumb: {
            state: true,
            amount: 15,
            type: 'horizontal',
            position: 'bottom:0;left:0;',
            displayTitle: 'top'
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
            $(curr).removeClass('animated flipOutY').addClass('animated flipInY');
            if (!begin) {
                $(prev).removeClass('animated flipInY').addClass('animated flipOutY');
            }
        }
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
                        content: '<img src="img/1920x600.jpg" />'
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

    //stick menu
    $("#row0").JResScrollSticker();

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

    //followup obj
    $('#myFollowObj').JResFollowObj({
        pos: {
                top: 200,
                right: 0
            }
    })
 })