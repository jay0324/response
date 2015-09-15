<?php
//==================================================
//評估響應是套用程式
//Date: 20150914
//Program: Jay Hsu
//==================================================

//param===========================================================================================
$action = (isset($_GET["action"]) && !empty($_GET["action"]))?$_GET["action"]:"";

//function===========================================================================================
//using file_get_contents get front end html content
function fnGet($url) {
	 	$opts = array(  
			'http'=>array(  
				'method'=>"GET",  
				'timeout'=>60
			)  
		);  
		   
		$context = stream_context_create($opts);  

		$result = file_get_contents($url, false, $context);
		if ($result){
			return $result; 
		}else{
			printf("網頁[".$url."]無法透過此程式解析內容,請聯絡程式人員進行評估!");die();
		}
		
}

//using curl get front end html content
function fnCurl($curl){
	$url = $curl;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

//check front end html content
function fnCheck($url,$pageContent){
	$result = "評估結果如下:<br>";
	$avail_for_responsive = true;
	$search  = array(
					'table'=>'<table',
					'flash'=>'<object',
					'frameset'=>'<frameset'
				);

	preg_match("/<table.*?>(.*?)<\/table>/is", $pageContent, $matches);
	//var_dump($matches[1]);
	if (strstr($matches[1],$search['table'])){
		$result .= "- 此網頁為Table layout不適合直接套用響應式程式<br>";
		$avail_for_responsive = false;
	}
	

	if (strstr($pageContent,$search['flash'])){
		$result .= "- 此網頁含有Flash可能不適合直接套用響應式程式，請將此網頁路徑提供程式人員進行進階評估<br>";
		$avail_for_responsive = false;
	}

	if (strstr($pageContent,$search['frameset'])){
		$result .= "- 此網頁為Frameset layout不適合直接套用響應式程式<br>";
		$avail_for_responsive = false;
	}

	if ($avail_for_responsive){
		$result .= "- 此網頁可以直接套用響應式程式<br>

		<a href='_process/preview.php?url=".$url."' target='new'>響應式介面預覽</a>

		<br>
		<br>
		本預覽只提供響應式介面預覽，非調整後的結果，內容部分會再進行後續調整。

		";
	}

	return $result;
}

//action===========================================================================================
if ($action == "check"){

	if (isset($_POST["page"]) && !empty($_POST["page"])) {
		
		$url = (strstr($_POST["page"],'http://') || strstr($_POST["page"],'https://'))?$_POST['page']:'http://'.$_POST['page'];

		//$pageContent = fnGet($url); //using file_get_contents to get page content

		$pageContent = fnCurl($url); //using curl to get page content

		echo fnCheck($url,strtolower($pageContent));

	}
}

?>