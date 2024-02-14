<?php
namespace API\Controller;

class Controller {
  public function __call($name, $arguments) {
    $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
  }

  protected function getQueryStringParams() {
    $query = [];
    parse_str($_SERVER['QUERY_STRING'], $query);
    return $query;
  }

  protected function sendOutput($data, $httpHeaders=array()) {
    header_remove('Set-Cookie');
    if (is_array($httpHeaders) && count($httpHeaders)) {
      foreach ($httpHeaders as $httpHeader) {
        header($httpHeader);
      }
    }
    echo json_encode($data);
    exit;
  }

  protected function sendMethodError() {
    $this->sendOutput(
      ['error' => 'Method not supported'],
      ['Content-Type: application/json', 'HTTP/1.1 422 Unprocessable Entity']
    );
  }

  protected function sendValidationError() {
    $this->sendOutput(
      ['error' => 'Contact validation error'],
      ['Content-Type: application/json', 'HTTP/1.1 422 Unprocessable Entity']
    );
  }

  protected function sendServerError($message = '') {
    $this->sendOutput(
      ['error' => 'Server Error', 'message' => $message],
      ['HTTP/1.1 500 Internal Server Error']
    );
  }
}