<?php
require __DIR__ . "/vendor/autoload.php";

use API\Controller\ReceiverController;

// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ($method == 'OPTIONS') {
  header( 'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );
  header( 'Access-Control-Max-Age: 86400' );
  header( 'Cache-Control: public, max-age=86400' );
  header( 'Vary: origin' );
  exit( 0 );
  // return 0;
}

if ($uri[3] == 'receivers') {
  $controller = new ReceiverController();
  $strMethodName = $uri[4] . 'Action';
  $controller->{$strMethodName}();
}

if ($uri[3] == 'document') {
  // load, send, get
}
