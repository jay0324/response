$(function() {
    var resHost = $.JRes_modulePath();

	$.JResponsive({
		defaultMenuObj: "#nav",
        defaultLangMenuObj: "#lang",
        resPageLoader: true,
        resPageLoaderTigger: 'always',
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
                '<span class="icon-home"></span>',
                "_self"
            ],
            [
                "demo_page_btn",
                "demo_page1",
                "DEMO PAGE",
                "page"
            ],
            [
                "demo_loader",
                "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14559.8434006705!2d120.66025329999998!3d24.17310575!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1478138160232",
                "LOAD PAGE",
                "loader",
                {
                    title: "DEMO LOADER"
                }
            ]
        ],
        menuCollapse: '#resPrimery',
        pannelPosition: 'left_under',
        pannelAnimateTime: 1000,
        pannelAnimateEasing: "easeOutBounce",
        additionalPage: [
            ["demo_page1","right","DEMO 1","<p style='color:#fff'>DEMO 1 CONTENT</p>","demo_page2"],
            ["demo_page2","right","DEMO 2","<p style='color:#E6DB74'>DEMO 2 CONTENT</p>","demo_page3"],
            ["demo_page3","right","DEMO 3","<p style='color:#66D9B1'>DEMO 3 CONTENT</p>",""]
        ]
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

    //delay show
    /*$("div[class*='resCol']").addClass('resDelay');
    $(".resContainer").each(function(){
        $(this).JResDelayLoader({
            loadObj: ".resDelay",
            onLoad:function(){
                //客製效果
                $(this).addClass('animated bounceInUp');
            }
        })
    })*/
       
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
 })