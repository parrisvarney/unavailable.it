<?php

$dbh = new PDO('mysql:host=mysql', 'root', 'uit-not-so-secret');

$dbh->exec("DROP DATABASE IF EXISTS `uit`")
or die(print_r($dbh->errorInfo(), true));

$dbh->exec("CREATE DATABASE `uit`;
                CREATE USER 'uit'@'localhost' IDENTIFIED BY 'uit-not-so-secret';
                GRANT ALL ON `uit`.* TO 'uit'@'localhost';
                FLUSH PRIVILEGES;")
or die(print_r($dbh->errorInfo(), true));

$dbh->exec("
  CREATE TABLE uit.message
  ( message_id int unsigned auto_increment
  , message    text not null
  , ip_hash    char(32)
  , date       timestamp default current_timestamp
  , primary key (message_id)
  , unique (ip_hash)
  )
")
or die(print_r($dbh->errorInfo(), true));

$dbh->exec("
  CREATE TABLE uit.account
  ( account_id int unsigned auto_increment
  , email      varchar(128) not null
  , password   varchar(255) not null
  , rate_limit varchar(32) default 'YmdHi' comment 'Will block new messages until date(rate_limit) value changes'
  , created    timestamp default current_timestamp
  , primary key (account_id)
  )
")
or die(print_r($dbh->errorInfo(), true));

$dbh->exec("
  INSERT INTO uit.account
  SET email    = 'anon'
  ,   password = 'unusable password'
")
or die(print_r($dbh->errorInfo(), true));
