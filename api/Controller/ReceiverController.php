<?php
namespace API\Controller;

use API\Model\ReceiverModel;

class ReceiverController extends Controller {
  public function listAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'GET') {
      $this->sendMethodError();
    }
    $model = new ReceiverModel();
    $receivers = $model->getReceivers();
    $this->sendOutput($receivers, ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function addAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'POST') {
      $this->sendMethodError();
    }
    $model = new ReceiverModel();
    // parse mail/telegram
    $data = json_decode(file_get_contents("php://input"), true);
    $newReceiver = $model->addReceiver($data);
    $this->sendOutput(['receiver' => $newReceiver], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function changeAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'PUT') {
      $this->sendMethodError();
    }

    $model = new ReceiverModel();
    $body = json_decode(file_get_contents('php://input'), true);
    $params = $this->getQueryStringParams();
    if (!isset($params['receiver_id'])) {
      $this->sendServerError();
    }
    // parse mail/telegram
    $receiver = $model->changeReceiver($params['receiver_id'], $body);
    $this->sendOutput(['receiver' => $receiver], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function deleteAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'DELETE') {
      $this->sendMethodError();
    }
    $params = $this->getQueryStringParams();
    if (!isset($params['receiver_id'])) {
      $this->sendServerError();
    }
    $model = new ReceiverModel();
    $model->deleteReceiver($params['receiver_id']);
    $this->sendOutput(['status' => 'success'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }
}