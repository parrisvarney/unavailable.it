<?php

namespace Uit\Component;


class HttpException extends \Exception {

    protected $statuses = [
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        420 => 'Enhance Your Calm',
        429 => 'Too Many Requests',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
    ];

    public function __construct($code = 500, $message = null) {
        parent::__construct($message ?: $this->statuses[$code], $code);
    }
}
