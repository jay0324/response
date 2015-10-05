$(function() {
	$.JResponsive({
		defaultMenuObj: "#nav",
		res_langVarAdd1: "/vn/",
		res_langArrayAdd1: ["language:ngôn ngữ","menu:thực đơn"],
		additionalBtn: 
		[
			["menu_btn3","#","tPBtn","pannel",["top",$("#mainContent").html()]],
			["menu_btn2","#","rPBtn","pannel",["left_under",$("#mainContent").html()]],
			["menu_btn4","#","rPBtn","pannel",["right_under",$("#mainContent").html()]],
			["menu_btn7","#","tsPBtn","pannel",["top_small",$("#searchBk").html()]],
			["menu_btn5","#testImg1","tabBt1","tab"],
			["menu_btn6","#testImg2","tabBt2","tab"],
			["menu_tabs1","#myTab","tabg","tab"]
		],
		additionalBottomBtn: 
		[
			["menu_btn_btm2","#","rPBtn","pannel",["right",$("#mainContent").html()]],
			["menu_btn_btm5","#testImg1","tabBt1","tab"]
		],
		additionalPage: 
		[
			["addPage_1","right","page1",$("#mainContent").html(),"addPage_2"],
			["addPage_2","right","page2","this is page2",""],
			["addPage_3","right","page3",$("#mainContent").html(),""]
		],
		resPageLoader:true
	});
	
	//橫向卷軸效果函式
	$("#testImg1").JResOverflow({flow:true});
	$("#testImg2").JResOverflow({flow:true});
	$("#testTable1").JResOverflow({flow:true});
	$("#testTable2").JResOverflow({flow:true});
	$("#pObj").JResOverflow({flow:true});
	$("#inLineResTable").JResOverflow({flow:true});
				   
	//跑馬燈效果函式
	$("#resMarqueeTest").JResMarquee({objWidth: 480,position: -1});
	$('#resMarqueeTest2').JResMarquee({objWidth: 500,position: 1});
	
	//動畫
	$("#demoSlide").JSlideImg();
	$("#demoSlide2").JSlideImg();
	
	//放大圖片
	$("#enlarge300").JResEnlarge();
	$("#enlarge300_inCol").JResEnlarge();
	$("#enlarge600").JResEnlarge({enlargeSize:"auto",scalePx: 50, popupMode: true});

	//啟用Tab (直接寫在本文)
	$("#myTab").JResContentTab();

	//啟用Tab (js寫入本文)
	$("#myTab2").JResContentTab({
		fx: 'slide',
		init:1,
		createTabs: {
			tabs1: {
				id: "tabs1",
				text: "tabs1",
				content: "tabs1 content"
			},
			tabs2: {
				id: "tabs2",
				text: "tabs2",
				content: "tabs2 content"
			}
		}
	});

	//啟用ImageSlider
	$("#myItemSlider").JResContentSlider({
		autoPlay:false,
		listAmt: 7,
		btnSetup:{
                nextBtn:{
                    state: true,
                    width: 40
                },
                prevBtn:{
                    state: true,
                    width: 40
                }
            },
		setupResposive: {
			800:{
				listAmt: 5
			},
			600:{
				listAmt: 4,
				listPaddingAmt:10
			},
			420:{
				listAmt: 2
			}
		}
	});

	$("#myItemSlider2").JResContentSlider({
		listAmt: 2,
		setupResposive: {
			800:{
				listAmt: 5
			},
			600:{
				listAmt: 4
			},
			420:{
				listAmt: 2
			}
		}
	});

	//錯位效果
	$("#ladderObj1").JResLadderObj({
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 0,
                        x: 50,
                        y: 50,
                        z: 0
                    },
                    end: {
                        ladder: 600,
                        x: 250,
                        y: 250,
                        z: 1
                    } 
                },
                1:{
                   speed: 1,
                    start:{
                        ladder: 800,
                        x: 250,
                        y: 250,
                        z: 1
                    },
                    end: {
                        ladder: 1800,
                        x: 800,
                        y: 500,
                        z: 0
                    }
                },
                2:{
                   speed: 1,
                    start:{
                        ladder: 2000,
                        x: 800,
                        y: 500,
                        z: 0
                    },
                    end: {
                        ladder: 2800,
                        x: 1200,
                        y: 100,
                        z: 0
                    }
                }
        }
	});

	$("#ladderObj2").JResLadderObj({
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 0,
                        x: 1000,
                        y: 600,
                        z: 0
                    },
                    end: {
                        ladder: 1000,
                        x: 800,
                        y: 400,
                        z: 0
                    } 
                },
                1:{
                   speed: 1,
                    start:{
                        ladder: 1000,
                        x: 800,
                        y: 400,
                        z: 0
                    },
                    end: {
                        ladder: 2000,
                        x: 100,
                        y: 100,
                        z: 0
                    }
                }
        }
	});



	//跟屁蟲
	$("#JResFollowObj").JResFollowObj({
		position: 'absolute',
		pos: {
            top: 200,
            left: 10
        },
        delay: 100
	});

 })