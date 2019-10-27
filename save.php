<?php
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = $_POST["d"];

$fp = fopen('data.csv', 'a+');
fwrite($fp, $input);
fclose($fp);

echo ("{\"status\":\"OK\"}");

?>