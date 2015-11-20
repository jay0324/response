$(function() {
	$.JResponsive({
		defaultMenuObj: "#nav",
        defaultLangMenuObj: "#lang",
        resPageLoader: true,
        resPageLoaderTigger: 'always',
        res_mobileBottomNavBtnSetup:{
            state:true,
            primary:false
        },
        additionalBottomBtn:[
            [
                "followup_btn",
                "#",
                "",
                "pannel",
                [
                    "right",
                    $("#followUpObj").html()
                ]
            ]
        ]
	});

    //slideshow custom
    var setH = ($(window).width() <= 800) ? $(window).height() - 150 : $(window).height() -150;
    var imgW,imgH,setL;
    $("#slideshow, #slideshow .slide, #slideshow .img").height(setH);

    $("#slideshow .img:eq(0)").one('load', function() {
        if ($(this).width() < $(window).width()) {
            $("#slideShow .img").width($(window).width());
        }
        imgW = $(this).width();
        imgH = $(this).height();
        setL = (($(window).width() - imgW)/2);

        $("#slideshow .img").css({
            left:setL+"px",
            width: imgW+"px",
            height: imgH+"px"
        })

        $('#slideshow .des').css({
            'bottom': '-80px'
        })

        $("#slideshow").JSlideImg({
            paddingAmt: 0,
            childTag: 'div',
            transitTime:5,
            holdTime:5,
            thumb: {
                state: true,
                amount: 4,
                width:50,
                height:50,
                type: 'horizontal',
                position: 'left:10px;bottom:10px;'
            },
            slideBtn:{
                state: true,
                width: 60,
                height: 100,
                type: 'horizontal'
            },
            onTrans: function(){
                var curr = this.curr;
                var prev = this.prev;
                var begin = this.begin;

                $(curr).css({
                    'opacity':'0'
                }).animate({
                    'opacity':'1'
                },5000,"linear");

                $('.img',curr).css({
                    width:imgW+'px',
                    height:imgH+'px'
                }).animate({
                    width:(imgW*1.1)+'px',
                    height:(imgH*1.1)+'px'
                },5000,"linear");

                if (!begin) {
                    $(prev).css({
                        'opacity':'1'
                    }).animate({
                        'opacity':'0'
                    },5000,"linear");

                    $('.img',prev).css({
                        width:(imgW*1.2)+'px',
                        height:(imgH*1.2)+'px'
                    }).animate({
                        width:(imgW*1.3)+'px',
                        height:(imgH*1.3)+'px'
                    },5000,"linear");
                }

            },
            onHold: function(){
                $('.img',this).animate({
                    width:(imgW*1.2)+'px',
                    height:(imgH*1.2)+'px'
                },5000,"linear");

                $('.des',this).animate({
                    'bottom': '0'
                },1000);
            }
        })

    }).each(function(){
        if(this.complete) $(this).trigger('load');
    });

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
                600:{
                        width:50,
                        height:50,
                        amount: 1,
                        slideBtn:{
                            width: 100,
                            height: 5
                        }
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

    //tab group list
    $("#myTabList").JResContentTab({
        fx: 'slide'
    })
    $("#myTabList2").JResContentTab({
        fx: 'show'
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
            loadObj: ".resDelay"
        })
    })

    //follow Up obj
    $("#followUpObj").JResFollowObj({
        position: 'absolute',
        pos: {
            top: (($(window).height()/2)-200),
            right: 10,
            'z-index': 10
        },
        delay: 100
    });
        


 })