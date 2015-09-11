<?php
//==================================================
//預覽響應是套用程式
//Date: 20150914
//Program: Jay Hsu
//==================================================

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>preview</title>
	<!--響應式設定-->
	<script type="text/javascript" src="response/jquery.min.js"></script>
	<script type="text/javascript" src="response/response.min.js"></script>
	<script type="text/javascript" src="response/custom.js"></script>
	<!--響應式設定-->
	<script>
		$(function(){
			$("#preview").width($(window).width());
			$("#preview").height($(window).height());
		})
	</script>
	<style>
		body{
			margin:0;
			padding:0;
		}
		iframe{
			border:0;
			margin:0;
			padding:0;
		}
	</style>
</head>
<body>
	<iframe id="preview" src="<?php echo $_GET["url"] ?>"></iframe>
</body>
</html>