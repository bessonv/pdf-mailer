<?php
namespace API\Model;
use API\Model\Database;

class ReceiverModel extends Database {
  public function getReceivers() {
    $stmt = $this->pdo->prepare('SELECT * FROM receivers');
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function getEmailReceivers() {
    $stmt = $this->pdo->prepare('SELECT * FROM receivers WHERE type = :type');
    $stmt->execute(['type' => 'email']);
    return $stmt->fetchAll();
  }

  public function getTelegramReceivers() {
    $stmt = $this->pdo->prepare('SELECT * FROM receivers WHERE type = :type');
    $stmt->execute(['type' => 'telegram']);
    return $stmt->fetchAll();
  }

  public function addReceiver($receiver) {
    $stmt = $this->pdo->prepare('INSERT INTO receivers (fullname, contact, type) VALUES (:fullname, :contact, :type)');
    $stmt->execute([
      ':fullname' => $receiver['fullname'],
      ':contact' => $receiver['contact'],
      ':type' => $receiver['type']
    ]);
    $receiver['receiver_id'] = $this->pdo->lastInsertId();
    return $receiver;
  }

  public function changeReceiver($id, $receiver) {
    $stmt = $this->pdo->prepare('UPDATE receivers SET fullname = :fullname, contact = :contact, type = :type WHERE receiver_id = :receiver_id');
    $stmt->execute([
      ':fullname' => $receiver['fullname'],
      ':contact' => $receiver['contact'],
      ':type' => $receiver['type'],
      ':receiver_id' => $id
    ]);
    $stmt->fetch();
    $receiver['receiver_id'] = $id;
    return $receiver;
  }

  public function deleteReceiver($id) {
    $stmt = $this->pdo->prepare('DELETE FROM receivers WHERE receiver_id = :receiver_id');
    $stmt->execute([
      ':receiver_id' => $id
    ]);
  }
}