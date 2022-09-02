<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');
    require_once("connection.php");
    $conn = dbcon();

    $act = $_POST['act'];                      
    $Fname = $_POST['Fname'];
    $Lname = $_POST['Lname'];
    $memEmail= $_POST['memEmail'];
    $memJob = $_POST['memJob'];

//insert row table
if($act == 'add'){
    $sql = "INSERT INTO `members`(`Fname`, `Lname`, `memEmail`, `memJob`) VALUES ('$Fname','$Lname','$memEmail','$memJob')";
    echo updateDB($sql, "เพิ่ม", $conn);
}

//update row delete
if($act == "delete"){
   $id = $_POST['id'];
   $sql = "DELETE FROM `members` WHERE id = '$id'";
   echo updateDB($sql, "ลบ", $conn);
}

if($act == 'edit_mem'){
   $id = $_POST['id'];
//    die(json_encode($id));
   $sql = "UPDATE `members` SET `Fname`= '$Fname' ,`Lname`='$Lname',`memEmail`= '$memEmail',`memJob`= '$memJob' WHERE id = '$id'";
   echo updateDB($sql, "แก้ไข", $conn);
}

if ($act == 'select') {
    $id = $_POST["id"];
    $sql = "SELECT * FROM `members` WHERE id = '$id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    } else {
        $resp['status'] = 0;
        $resp['message'] = $conn->error;
        echo json_encode($resp);
    }
}
?>