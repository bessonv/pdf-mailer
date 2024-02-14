<?php
namespace API\Model;
use API\Model\Database;

class RecipientModel extends Database {
  public function getRecipients() {
    $stmt = $this->pdo->prepare('SELECT * FROM recipients');
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function getEmailRecipients() {
    $stmt = $this->pdo->prepare('SELECT * FROM recipients WHERE type = :type');
    $stmt->execute(['type' => 'email']);
    return $stmt->fetchAll();
  }

  public function getTelegramRecipients() {
    $stmt = $this->pdo->prepare('SELECT * FROM recipients WHERE type = :type');
    $stmt->execute(['type' => 'telegram']);
    return $stmt->fetchAll();
  }

  public function addRecipient($recipient) {
    $stmt = $this->pdo->prepare('INSERT INTO recipients (fullname, contact, type) VALUES (:fullname, :contact, :type)');
    $stmt->execute([
      ':fullname' => $recipient['fullname'],
      ':contact' => $recipient['contact'],
      ':type' => $recipient['type']
    ]);
    $recipient['recipient_id'] = $this->pdo->lastInsertId();
    return $recipient;
  }

  public function changeRecipient($id, $recipient) {
    $stmt = $this->pdo->prepare('UPDATE recipients SET fullname = :fullname, contact = :contact, type = :type WHERE recipient_id = :recipient_id');
    $stmt->execute([
      ':fullname' => $recipient['fullname'],
      ':contact' => $recipient['contact'],
      ':type' => $recipient['type'],
      ':recipient_id' => $id
    ]);
    $stmt->fetch();
    $recipient['recipient_id'] = $id;
    return $recipient;
  }

  public function deleteRecipient($id) {
    $stmt = $this->pdo->prepare('DELETE FROM recipients WHERE recipient_id = :recipient_id');
    $stmt->execute([
      ':recipient_id' => $id
    ]);
  }
}