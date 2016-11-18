$(function() {

	// var $customMenu = '<ul>'+
	// 		'<li><a href="#">English</a></li>'+
	// 		'<li><a href="#">中文</a></li>'+
	// 		'<li><a href="#">檢體</a></li>'+
	// 	'</ul>';

	$.JResponsive({
		defaultMenuObj: "#menuObjID",
		defaultLangMenuObj: "#lang",
		res_langSwitch: false,
		defaultSubMenuObj: [
			["language","#lang"],
			["language","#lang"]
		],
		menuCollapse: "#resPrimery,.resContent,.menuList",
		additionalBtn: [
	            	[
	            		"cus_btn",
	            		"#",
	            		'<i class="fa fa-address-book" aria-hidden="true"></i>',
	            		"pannel",
		            	[
		            		"top",
		            		$("#menuObjID").html()
		            	]
	        		],
	    ]
		
	});
	

 })