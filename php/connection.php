<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');
    $ipaddr = "localhost";
	$dbuser = "s64309030006";
	$dbpass = "123456";
	$database = "P643_64309030006";

    date_default_timezone_set("Asia/Bangkok");
	if (!isset($_SESSION)) {
	  session_start();
	}
    function dbcon(){
		$conn = new mysqli($GLOBALS['ipaddr'], $GLOBALS['dbuser'], $GLOBALS['dbpass'], $GLOBALS['database']);
		$conn->query("set names utf8");
		if ($conn->connect_error) 
		{
			die("Connection failed: " . $conn->connect_error);
		}
		
		return $conn;
	}

    function updateDB($sql,$msg,$conn){
        if($conn->query($sql) === TRUE){
            $resp['status'] = 1;
            $resp['message'] = $msg."Succeed";
        }else{
            $resp['status'] = 0;
            $resp['message'] = $msg."Failed";
        }
        return json_encode($resp);
    }

    function getDB($sql,$conn)  {
        $result = $conn->query($sql);
        if($result->num_rows > 0){
            $msg['status'] = 1;
            $msg['message'] = "พบข้อมูล ".$result->num_rows." รายการ";
            $msg['num_rows'] = $result->num_rows;
            $msg['data'] = $result->fetch_all(MYSQLI_ASSOC);
        }else{
            $msg['status'] = 0;
            $msg['message'] = "ไม่พบข้อมูล";
            $msg['num_rows'] = 0;
        }
        return json_encode($msg);
    }
    
    
?>
