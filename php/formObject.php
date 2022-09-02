<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');
    $obj = [];
    require_once("connection.php");
    $conn = dbcon();
    if($_POST['act'] == 'get'){
        $id = $_POST['id'];
        $sql = "select * from members where id = '$id'";
        echo getDB($sql,$conn);
    }else{
        $sql = "select * from members 
                    order by Fname asc";
        $result = $conn->query($sql);
        $obj["data"] = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($obj);
    }
?>