<?php
namespace API\Model;
use API\Model\Database;

class ReceiverModel extends Database {
  public function getReceivers() {
    $stmt =  $this->pdo->prepare('SELECT * FROM receivers');
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function addReceiver($receiver) {
    $stmt = $this->pdo->prepare('INSERT INTO receivers (fullname, contact) VALUES (:fullname, :contact)');
    $stmt->execute([
      ':fullname' => $receiver['fullname'],
      ':contact' => $receiver['contact']
    ]);
    $receiver['receiver_id'] = $this->pdo->lastInsertId();
    return $receiver;
  }

  public function changeReceiver($id, $receiver) {
    $stmt = $this->pdo->prepare('UPDATE receivers SET fullname = :fullname, contact = :contact WHERE receiver_id = :receiver_id');
    $stmt->execute([
      ':fullname' => $receiver['fullname'],
      ':contact' => $receiver['contact'],
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