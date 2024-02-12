<?php

namespace API\Model;

const PATH_TO_SQLITE_FILE = 'db/database.db';

class Database {
  protected $pdo;
  public function __construct() {
    try {
      if ($this->pdo == null) {
        $this->pdo = new \PDO("sqlite:" . PATH_TO_SQLITE_FILE);
        $this->pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        $this->createTables();
      }
      return $this->pdo;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  public function createTables() {
    $commands = [
      'CREATE TABLE IF NOT EXISTS receivers (
        receiver_id INTEGER PRIMARY KEY, 
        fullname TEXT NOT NULL,
        contact TEXT NOT NULL
      );'
    ];
    foreach ($commands as $command) {
      $this->pdo->exec($command);
    }
  }
}
