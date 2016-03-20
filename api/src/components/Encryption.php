<?php
/**
 * Created by PhpStorm.
 * User: parris
 * Date: 3/19/16
 * Time: 8:48 PM
 */

namespace Uit\Component;


class Encryption {
    protected $method;
    protected $iv;

    public function __construct() {
        $this->method = 'aes-128-cbc';
        $this->iv     = '123456m812345678';
    }

    public function encrypt($message, $password) {
        return base64_encode(openssl_encrypt($message, $this->method, $password, true, $this->iv));
    }

    public function decrypt($message, $password) {
        return openssl_decrypt(base64_decode($message), $this->method, $password, true, $this->iv);
    }
}
