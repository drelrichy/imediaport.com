<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//************************************************//
//**                                            **//
//**                                            **//
//**             cid.ajaxdbcheck                **//
//**                                            **//
//**                                            **//
//************************************************//
 header("Access-Control-Allow-Origin:*");
 require "../config/config_db.php";
 //$con = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
 
 //$servername = "localhost"; //set the servername
//$username = "marketc4_1tv"; //set the server username
//$password = "Wty2C4yTdrSyog/i"; // set the server password (you must put password here if your using live server)
//$dbname = "marketc4_1tv"; // set the table name
//$upload_dir = "uploads/";


//$servername = "localhost"; //set the servername
//$username = "1tv"; //set the server username
//$password = "Wty2C4yTdrSyog/i"; // set the server password (you must put password here if your using live server)
//$dbname = "1tv"; // set the table name
//echo "we dey ooh!";

//$host = "localhost"; /* Host name */
//$user = $username; /* User */
//$password = "root"; /* Password */
//$dbname = "tutorial"; /* Database name */

// Create connection

// = new mysqli($servername, $username, $password, $dbname);
//$con = new mysqli($host, $user, $password, $dbname);


//<]- `id` int(10) NOT NULL, `cNumber` int(4) NOT NULL, `cid` varchar(12) NOT NULL,`cFname` varchar(30) NOT NULL,
//`cInfo` varchar(50) NOT NULL,`streamUrl` varchar(50) NOT NULL,=`streamUrlType` varchar(50) NOT NULL,
//`streamUrlMore` varchar(50) IS NULL, `logoUrl` varchar(50) NOT NULL, `thumbUrl` varchar(50) IS NULL, `cmemo` varchar(250) IS NULL, `country` int(4) NOT NULL, nctype` int(4) NULL,`ckeyword` varchar(50) IS NULL , main windows start -->

//$con = new mysqli($servername, $username, $password, $dbname);
$con = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

	if ($con->connect_errno) {
	  echo "Failed to connect to MySQL: " . $con->connect_error;
	  exit();
	}

// Check connection
//if ($con->connect_error) {die("Connection failed: " . $con->connect_error);}

//$servername = "1tv.ng"; //set the servername
//$username = "marketc4_1tv"; //set the server username
//$password = "Wty2C4yTdrSyog/i"; // set the server password (you must put password here if your using live server)
//$dbname = "marketc4_1tv"; // set the table name
//$upload_dir = "uploads/";



// Read POST data
//echo $_POST[0];
//echo $_POST[1];
//$_POST[2];
$status =0;

if(isset($_GET['channel_id'])){


//echo "ow nbe!";

$response="";
    //$cid = mysqli_real_escape_string($con,$_GET['cid']);

    //$cid=$_GET['cid'];
    //$cid  = trim($cid ," "); $cid  = strtolower($cid);


    if(isset($_REQUEST['channel_id'])){
      $channel_id = mysqli_real_escape_string($con,$_REQUEST['channel_id']);
   
     // echo $cid;
      $query = "select count(*) as cntUser from channellists where channel_id ='".$channel_id."'";
   
      $result = mysqli_query($con,$query);

//echo $row['cntUser'];

      $response = " Channel ID is Available.";
      $status=0;
      if(mysqli_num_rows($result)){
         $row = mysqli_fetch_array($result);
   
         $count = $row['cntUser'];
       
         if($count > 0){
          $status =1;
       
             $response = "Channel ID taken, Not Available.";
         }
      
      }

      $xresponse= json_encode(['status' => $status , 'feedback' => $response, 'data' => $channel_id]); //AJAX Success Response
      echo $xresponse;
      die;
   }
   
$xresponse= json_encode(['status' => $status , 'feedback' => $response, 'data' => $channel_id]); //AJAX Success Response
echo $xresponse;
    die;
 }
?>

