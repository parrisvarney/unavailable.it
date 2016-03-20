<?php

namespace Uit\Controller;
use Psr\Http\Message\ServerRequestInterface;
use Uit\Component\Db;
use Uit\Component\Encryption;
use Uit\Component\HttpException;

class MessageController implements RestControllerInterface {

    protected $db;
    protected $encryption;

    public function __construct() {
        $this->db = new Db();
        $this->encryption = new Encryption();
    }

    public function actionGET(ServerRequestInterface $request) {
        $get     = $request->getQueryParams();
        $message = $this->db->getMessage($get['messageId']);

        if ($message) {
            $this->db->deleteMessage($message->message_id);
            $message->message = $this->encryption->decrypt($message->message, $get['password']);
        } else {
            throw new HttpException(400, 'Sorry, no message exists at this URL.');
        }

        return $message;
    }

    public function actionPOST(ServerRequestInterface $request) {
        $post     = $request->getParsedBody();
        $password = bin2hex(random_bytes(16));
        $account  = $this->db->getAccount($post['email'], $post['password']);
        $ipHash   = md5($request->getAttribute('ip_address') . date($account->rate_limit));
        $message  = $this->encryption->encrypt($post['message'], $password);

        if ($message = $this->db->postMessage($message, $ipHash)) {
            return [
                'message'  => $message,
                'password' => $password,
            ];
        }

        throw new HttpException(401, "You have reached your rate limit. ({$account->rate_limit})");
    }

    public function actionPUT(ServerRequestInterface $request) {
        throw new HttpException(501, "No PUT action available at this time.");
    }

    public function actionDELETE(ServerRequestInterface $request) {
        $get      = $request->getQueryParams();
        $message  = $this->db->getMessage($get['messageId']);
        $password = $get['password'];

        if ($message && $this->encryption->decrypt($message->message, $password)) {
            return $this->db->deleteMessage($get['messageId']);
        }

        throw new HttpException(400, 'Sorry, could not delete the requested message');
    }

    public function actionOPTIONS(ServerRequestInterface $request) {
        return true;
    }
}
