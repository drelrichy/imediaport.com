<?php

//$con = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);
    //require "../config/config_db.php";
    $url= $_SERVER['REQUEST_URI'];  
    $host= $_SERVER['HTTP_HOST'];

if( $host=="localhost") {
	$dbservername = "localhost"; //set the servername
	$dbusername = "1tv"; //set the server username
	$dbpassword = "Wty2C4yTdrSyog/i"; // set the server password (you must put password here if your using live server)
	$dbname = "1tv"; // set the table name
    $upload_dir = "uploads/";
} else {
    $dbservername = "localhost"; //set the servername
	$dbusername = "1tv"; //set the server username
	$dbpassword = "Wty2C4yTdrSyog/i"; // set the server password (you must put password here if your using live server)
	$dbname = "1tv"; // set the table name
    $upload_dir = "uploads/";


};


//$con = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);

    ?>