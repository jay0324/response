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
					  					["menu_btn5","#testImg1","tabBt1","tab",["",""]],
					  					["menu_btn6","#testImg2","tabBt2","tab",["",""]]
					  				],
					  	additionalBottomBtn: 
					  				[
					  					["menu_btn_btm2","#","rPBtn","pannel",["right",$("#mainContent").html()]],
					  					["menu_btn_btm5","#testImg1","tabBt1","tab",["",""]]
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
	$("#enlarge600").JResEnlarge({enlargeSize:"auto",scalePx: 50});

 })