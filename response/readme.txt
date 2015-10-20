=======================================================================================================================
版本說明
=======================================================================================================================
Program: JQuery Responsive plugin
Programmer: Jay HSU

Date: 2015/10/19 修改:
- 分析resTable的td資料如果為空值及隱藏
- 修正如果讀不到值的情況，Enlarge及Overflow會以預設設備寬來做容器的尺寸
- ladder加入opacity設定
	
=======================================================================================================================
套用方式及相關文件說明
=======================================================================================================================

在head所有加入下面幾行幾可啟用
jquery.min.js看情形加入，如果該頁面已經有用jQuery則不用加入

* 調整響應式內容
檔案: custom.js

* 調整響應式樣式
檔案: custom.css

NOTE: 若您可以用sass來轉css的人，可以透過_sass下的scss來編輯產生css
如果沒有的人請直接編輯_css下的css檔案

<!--響應式設定-->
<link rel="stylesheet" type="text/css" href="response/_css/default.css" media="all"> <!--無響應式預設樣式-->
<link rel="stylesheet" type="text/css" href="response/_css/custom.css" media="all"> <!--客制設定樣式-->
<script type="text/javascript" src="response/jquery.min.js"></script> <!--jQuery-->
<script type="text/javascript" src="response/response.min.js"></script> <!--response主程式-->
<script type="text/javascript" src="response/custom.js"></script> <!--response客制設定-->
<!--響應式設定-->

=======================================================================================================================
響應式設定相關參數說明
=======================================================================================================================
	jQuery conflict usage: 
	-----------------------------------------
		* noConflict:
		jQuery.noConflict()(function($){
			$.JResponsive();
		})

		* without noConflict:
		$(function() { 
			$.JResponsive();
		})
	-----------------------------------------

	Usage: 
		$(function() { 
			//以預設值直接啟動功能
			$.JResponsive();
			
			//客製化設定
			$.JResponsive({defaultResponse: 響應式啟動或關閉(布林) (預設true),
						   setUILoadWidth: 載入介面尺寸,預設值為800 (注意: 此設定一旦修改,相對應css也要調整才會正常載入設定),
            			   printMediaSetupMode: 將網頁切換為列印模式 (預設:false),
						   modulePath: '模組路徑',
						   mobileSwitch: '響應式開關放置的位置ID或class',
						   viewPortSetup: '響應式viewport其餘參數 (ex: ,user-scalable=1) 開始一定要寫","',
						   res_langVarDefault: '網站預設語系 tw:繁體 cn:簡體 add1:外加語系1 add2:外加語系2 預設:英文',
						   res_langVarEn: '網址列上語系的判斷值',
						   res_langVarTw: '網址列上語系的判斷值',
				   		   res_langArrayTw: ['預翻譯字串:翻譯後字串','預翻譯字串:翻譯後字串',...],
						   res_langVarCn: '網址列上語系的判斷值',
						   res_langArrayCn: ['預翻譯字串:翻譯後字串','預翻譯字串:翻譯後字串',...],
						   res_langVarAdd1: '網址列上語系的判斷值',
						   res_langArrayAdd1: ['預翻譯字串:翻譯後字串','預翻譯字串:翻譯後字串',...],
						   res_langVarAdd2: '網址列上語系的判斷值',
						   res_langArrayAdd2: ['預翻譯字串:翻譯後字串','預翻譯字串:翻譯後字串',...],
						   defaultLangMenuObj: '語言選單的物件ID或class',
						   customLangMenu: '客製語言選單內容',
						   defaultMenuObj: '主選單的物件ID或class',
						   customMenu: '客製主選單選單內容',
						   defaultSubMenuObj: [["其它嵌入的物件的標題","其它嵌入的物件ID或class"],["其它嵌入的物件的標題","其它嵌入的物件ID或class"]...],
						   customSubMenu: '客製嵌入的物件內容',
						   additionalPage: [["頁面ID名稱","視窗開啟方式(left,top,right)","頁面標題","頁面內容","相關頁面ID(會產生下一頁按鈕)"],...]
						   pannelPosition: '預設響應式視窗開啟方式(top,left,right,left_under,right_under)',
						   resPageLoader: true/false (是否使用頁面載入動畫,預設false),
						   resPageLoaderTigger: 'always'/800/600/... (是否在特定螢幕寬以下才使用loader,預設值為800),
						   responsiveSwitch: true/false (是否使用響應式切換開關,預設true),
						   res_langSwitch:true/false (是否使用語言切換開關,預設true)
						   res_tabJumperSetting: {} (設定Tab標籤頁面定位, 預設值 state:true,speed:3000),
            			   res_mobileTopNavBtnSetup: {} (設定上方主選單, 預設值 state:true,type:fixed,primary:true,width:50,height:50,margin:5),
            			   additionalBtn: [["按鈕ID名稱","按鈕連結","按鈕顯示文字","按鈕目標 (一般target視窗目標如:target,new,blank等 或 pannel來啟動響應式視窗/tab來建立Tab標籤定位按鈕)",["pannel值啟動之響應式視窗位置(top,top_small,left,right,left_under,right_under)","pannel值啟動之響應式視窗內容"]],...],
            			   res_mobileBottomNavBtnSetup: {} (設定下方主選單, 預設值 state:false,type:fixed,primary:true,width:50,height:50,margin:5),
            			   additionalBottomBtn: [["按鈕ID名稱","按鈕連結","按鈕顯示文字","按鈕目標 (一般target視窗目標如:target,new,blank等 或 pannel來啟動響應式視窗/tab來建立Tab標籤定位按鈕)",["pannel值啟動之響應式視窗位置(top,top_small,left,right,left_under,right_under)","pannel值啟動之響應式視窗內容"]],...],
            			   scrollTop: 使用ScrollToTop外掛功能 (預設:true)
						  });
			
			//文字跑馬燈效果函式
			$(obj).JResMarquee({
					   objWidth: 內容長度 (預設值"auto",會以文字大小的設定來算長度)
					   fontSize: "文字大小",
					   position: "方向 (-1:由左向右 1:由右向左)",
					   speed: "速度 (數字越小越快)"
					   })
			
			//橫向卷軸效果函式
			$(obj).JResOverflow({
								   flow: 橫向卷軸開關 (true:啟用 false:關閉),
								   paddingAmt: 相對圖文間距(px),
								   setUILoadWidth: 載入介面尺寸,預設值為800 (注意: 此設定一旦修改,相對應css也要調整才會正常載入設定)
								 });
			
			$(obj).addClass("resUnwrap"); //取消橫向卷軸
			
			//圖片放大功能
			$(obj).JResEnlarge({
									enlargeSize: 圖片放大類型 ("100%":符合螢幕 "auto":原尺寸)
									scalePx: 手動縮放調整尺寸(px),
									paddingAmt: 相對圖文間距(px),
									extraSource: "放大後圖片路徑(預設為原圖)",
									setUILoadWidth: 載入介面尺寸,預設值為800 (注意: 此設定一旦修改,相對應css也要調整才會正常載入設定),
									popupMode: 是否使用影視窗(布林) (預設false),
									enablePluginMode: 是否與其他shadowbox共存(布林) (預設false)
								 });
			
			$(obj).addClass("resUnlarger"); //取消圖片放大
			
			//簡易淡出淡入畫面切換效果函式
			$(obj).JSlideImg({
								childTag: "畫面切換物件的tag, 如: img,div,a,...",
								transitTime: 畫面切換秒數,
								holdTime: 畫面停留秒數,
								paddingAmt: 相對縮圖尺寸(px),
								layout: 排版 如: left: 靠齊左 / right:靠其右 / 預設:清除
							});
			
			//將表格Table轉格響應式格式
			$(obj).addClass("resTable");
			
			//取得目前響應式開關參數
			$.JRes_getCookie()
			
			//取得網站根目錄
			$.JRes_modulePath()
			
			//響應式選單按鈕設定值
			$(obj).addClass("resBtn");
			$(obj).attr("toggle","選單ID");
			
			//響應式頁面按鈕設定值
			$(obj).addClass("resPageBtn");
			$(obj).attr("toggle","響應式頁面ID");
			
			//響應式Loader頁面按鈕設定值 (預設以iframe載入)
			$(obj).addClass("resPageLoaderBtn");
			$(obj).attr("title","載入頁面標題區內容"); //選則填寫 (預設值為空值)
			$(obj).attr("tigger","載入情況"); //選擇填寫 (always: 總是使用 / 預設: 只在800寬度下使用)
			$(obj).attr("toggle","載入方式"); //選擇填寫 (ajax: 使用ajax載入 / 預設: 預設以iframe載入)
			$(obj).attr("toggleDom","ajax載入特定物件"); //選擇填寫 (帶入ajax頁面中的ID,tag,或class)

			//Tab標籤頁面定位按鈕設定值
			$(obj).addClass("resTabJumper");
			<a class="resTabJumper" href="#目標ID">連結</a>

			//Tab group建立
			$(obj).JResContentTab({
				init: 預設的顯示標籤 (預設:0),
	            fx: 切換效果 (預設:fade / fade,slide,show),
	            transitTime: 切換效果時間 (預設:300),
	            createTabs: {			//js寫入Tab
	            	tab1:{				//新標籤編號
	            		id: "物件ID",
						text: "Tab按鈕顯示文字",
						content: "Tab內容"
	            	}
	            }		
			});

			//直接建立在本文的結構
			//直接開啟tab，可以在網址上加入標籤，如: 頁面路徑#內容ID
			<div id="物件ID">
                <ul class="tabs">
                    <li><a href="#內容ID1" class="tabsBtn">按鈕顯示文字</a></li>
                    <li><a href="#內容ID2" class="tabsBtn">按鈕顯示文字</a></li>
                </ul>

                <ul class="tabs_content">
                    <li id="內容ID1" class="tabsContent">
                        按鈕顯示內容
                	</li>
                   	<li id="內容ID2" class="tabsContent">
                        按鈕顯示內容
                	</li>
                </ul>
            </div>

            //slider功能
            $(物件ID).JResContentSlider({
            	autoPlay: 啟用自動輪播(布林) (預設:true),
            	touchSwipAmt: 觸控捲動觸發移動量(數字) (預設:100),
            	delayTime: 停留時間(毫秒) (預設:3000),
            	transitionTime: 轉場時間(毫秒) (預設200)
				listAmt: 顯示數量(數字) (預設5),
				listPaddingAmt: 每個項目的間距(數字) (預設2),
				btnSetup:{				//按鈕設定(物件)
	                nextBtn:{			//往後按鈕(物件)
	                    state: 是否顯示(布林)(預設true),
	                    width: 按鈕寬度(數字)(預設20)
	                },
	                prevBtn:{			//往前按鈕(物件)
	                    state: 是否顯示(布林)(預設true),
	                    width: 按鈕寬度(數字)(預設20)
	                }
	            },
				setupResposive: {		//響應式設定(物件)
					800:{				//螢幕尺寸(物件:設定此物件名稱請以尺寸寬度來命名)
						listAmt: 顯示項目(數字:預設5),
						listPaddingAmt: 每個項目的間距(數字) (預設2)
					},
					600:{
						listAmt: 顯示項目(數字:預設4),
						listPaddingAmt: 每個項目的間距(數字) (預設2)
					},
					420:{
						listAmt: 顯示項目(數字:預設2),
						listPaddingAmt: 每個項目的間距(數字) (預設2)
					}
				}
			});
			//html結構
			<div id="myItemSlider2">
                <div class="sliderContainer">
                    <ul>
                        <li><a href=""><img src="圖片" alt="" /></a></li>
                        <li><a href=""><img src="圖片" alt="" /></a></li>
                    </ul>
                </div>
            </div>

            //Ladder設定 (錯位效果)
            $(物件).JResLadderObj({
		        setupMode: 設定模式 (布林)(預設值false),
		        state: 使用 (布林)(預設值true),
		        position: 定位方式(字串)(預設'fixed',其他'absolute'),
		        container: 若定位方式為'absolute'必須提供父層的容器物件ID,
		        path: {			//路徑設定
		                0:{		//路徑名稱或編號
		                    speed: 1,			//卷軸速度
		                    start:{				//點位設定(起點)
		                        ladder: 0,		//點位開始的卷軸位置
		                        x: 400,			//點位x位置
		                        y: 1000,		//點位y位置
		                        z: 2, 			//點位z位置
		                        opacity: 0		//透明度 (浮點 0~1)
		                    },
		                    end: {				//點位設定(終點)
		                        ladder: 600,	//點位終點的卷軸位置
		                        x: 800,			//點位x位置
		                        y: 100,			//點位y位置
		                        z: 2, 			//點位z位置
		                        opacity: 1		//透明度 (浮點 0~1)
		                    } 
		                }
		        }
		    });
		    //定位連結
		    <a href="#" class="resLadderJumper" toggle="物件ID" ladder="選擇物件的路徑名稱或編號">Link1</a>

		    //Follow up設定 (跟屁蟲)
		    $(物件).JResFollowObj({
				position: 定位方式(字串)(預設'fixed',其他'absolute'),
				pos: {			//定位位置 (top:位置(單位PX),left:位置(單位PX),...跟CSS一樣)
		            top: 200,
		            left: 10
		        },
		        delay: 100 		//延遲速度
			});

			
		})