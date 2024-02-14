<?php
require __DIR__ . "/vendor/autoload.php";
require __DIR__ . "/config.php";

use API\Controller\ReceiverController;
use API\Controller\DocumentController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ($uri[3] == 'receivers') {
  $controller = new ReceiverController();
  $strMethodName = $uri[4] . 'Action';
  $controller->{$strMethodName}();
}

if ($uri[3] == 'document') {
  $controller = new DocumentController();
  $strMethodName = $uri[4] . 'Action';
  $controller->{$strMethodName}();
}