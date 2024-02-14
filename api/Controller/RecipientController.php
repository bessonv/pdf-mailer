<?php
namespace API\Controller;

use API\Model\RecipientModel;

class RecipientController extends Controller {
  public function listAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'GET') {
      $this->sendMethodError();
    }
    $model = new RecipientModel();
    $recipients = $model->getRecipients();
    $this->sendOutput($recipients, ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function addAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'POST') {
      $this->sendMethodError();
    }
    $model = new RecipientModel();
    $data = json_decode(file_get_contents("php://input"), true);
    $data['type'] = $this->validateContact($data['contact']);
    $newRecipient = $model->addRecipient($data);
    $this->sendOutput(['recipient' => $newRecipient], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function validateContact($contact) {
    if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
      return 'email';
    }
    if (strlen($contact) == 9 && is_numeric($contact)) {
      return 'telegram';
    }
    $this->sendValidationError();
  }

  public function changeAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'POST') {
      $this->sendMethodError();
    }

    $model = new RecipientModel();
    $body = json_decode(file_get_contents('php://input'), true);
    $params = $this->getQueryStringParams();
    if (!isset($params['recipient_id'])) {
      $this->sendServerError();
    }
    $body['type'] = $this->validateContact($body['contact']);
    $recipient = $model->changeRecipient($params['recipient_id'], $body);
    $this->sendOutput(['recipient' => $recipient], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  public function deleteAction() {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method != 'GET') {
      $this->sendMethodError();
    }
    $params = $this->getQueryStringParams();
    if (!isset($params['recipient_id'])) {
      $this->sendServerError();
    }
    $model = new RecipientModel();
    $model->deleteRecipient($params['recipient_id']);
    $this->sendOutput(['status' => 'success'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }
}