<?php
namespace Uit\Component;

class Db {
    protected $dbh;

    public function __construct() {
        $database = Config::getDb('database');
        $username = Config::getDb('username');
        $password = Config::getDb('password');

        $this->dbh = new \PDO("mysql:host=mysql;dbname=$database", $username, $password);
    }

    public function getMessage($messageId) {
        $query = $this->dbh->prepare('select * from message where message_id = :message_id');
        $query->execute(['message_id' => $messageId]);

        return $query->fetchObject();
    }

    public function getAccount($email, $password) {
        $query = $this->dbh->prepare('select * from account where email = :email and password = :password');
        $query->execute(['email' => $email, 'password' => $password]);

        if ($account = $query->fetchObject()) {
            return $account;
        } else {
            $query = $this->dbh->prepare("select * from account where email = 'anon' and password = 'unusable password'");
            $query->execute();

            return $query->fetchObject();
        }
    }

    public function postMessage($message, $ipHash) {
        $query = $this->dbh->prepare('
            insert into message
            set message  = :message
            ,   ip_hash  = :ip_hash
        ');

        $query->execute([
            'message'  => $message,
            'ip_hash'  => $ipHash
        ]);

        return $this->getMessage($this->dbh->lastInsertId());
    }

    public function deleteMessage($messageId) {
        $query = $this->dbh->prepare('delete from message where message_id = :message_id');
        return $query->execute(['message_id' => $messageId]);
    }
}
