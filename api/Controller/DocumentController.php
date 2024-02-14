<?php
namespace API\Controller;

use API\Model\RecipientModel;
use Longman\TelegramBot;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class DocumentController extends Controller {
  public function loadAction() {
    try {
      if (!$this->isValidDocument($_FILES['file']['name'])) {
        $this->sendOutput(['result' => 'failure'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
      }
      $uploadfile = UPLOAD_DIR . basename($_FILES['file']['name']);    
      $this->deleteExistingDocument();
      $success = move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
      if ($success) {
        $this->sendOutput(['result' => 'success'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
      } else {
        $this->sendOutput(['result' => 'failure'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
      }
    } catch(Exception $e) {
      $this->sendServerError($e);
    }
  }

  private function isValidDocument($document) {
    $ext = pathinfo($document, PATHINFO_EXTENSION);
    if (mb_strtolower($ext) != 'pdf') {
      return false;
    } 
    return true;
  }

  public function viewAction() {
    if ($this->isDocumentExist()) {
      $link = WEB_DIR . $this->getDocumentName();
      $this->sendOutput(['link' => $link], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
    } else {
      $this->sendOutput(['link' => '', 'error' => 'Empty folder'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
    }
  }

  private function isDocumentExist() {
    $dirContent = scandir(UPLOAD_DIR);
    return count($dirContent) != 2;
  }

  private function getDocumentName() {
    $dirContent = scandir(UPLOAD_DIR);
    if ($dirContent == 2) {
      $this->sendServerError();
    }
    return $dirContent[2];
  }

  private function deleteExistingDocument() {
    if ($this->isDocumentExist()) {
      unlink(UPLOAD_DIR . $this->getDocumentName());
    }
  }

  public function sendAction() {
    $this->sendTelegramMessages();
    // $this->sendMail();
    $this->deleteExistingDocument();
    $this->sendOutput(['status' => 'success'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
  }

  private function sendTelegramMessages() {
    $telegram_bot = new TelegramBot\Telegram(TELEGRAM_TOKEN);
    $model = new RecipientModel();
    $recipients = $model->getTelegramRecipients();
    foreach ($recipients as $recipient) {
      $result = TelegramBot\Request::sendDocument([
        'chat_id' => $recipient['contact'],
        'document' => UPLOAD_DIR . $this->getDocumentName()
      ]);
      if (!$result->isOk()) {
        $this->sendServerError($result->getDescription());
      }
    }
  }

  private function sendMail() {
    $model = new RecipientModel();
    $recipients = $model->getEmailRecipients();
    try {
      $mail = new PHPMailer();
      $mail->CharSet = 'UTF-8';
      $mail->isSMTP();
      $mail->SMTPAuth = true;
      $mail->SMTPKeepAlive = true;
      $mail->SMTPDebug = 0;

      $mail->Host = SMTP_HOST;
      $mail->Port = SMTP_PORT;
      $mail->Username = SMTP_USERNAME;
      $mail->Password = SMTP_PASSWORD;

      $mail->setFrom(SMTP_USERNAME, 'PDF Mailer');
      foreach ($recipients as $recipient) {
        $mail->addBcc($recipient['contact'], $recipient['fullname']);
      }

      $mail->Subject = 'PDF Mailer';
      $mail->Body = 'Документ отправлен автоматически из приложения pdf mailer';
      $mail->addAttachment(UPLOAD_DIR . $this->getDocumentName());
      $mail->send();
      $this->sendOutput(['status' => 'success'], ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
    } catch (Exception $e) {
      $this->sendOutput(
        ['status' => 'error', 'error' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"], 
        ['Content-Type: application/json', 'HTTP/1.1 200 OK']
      );
    }
  }
}