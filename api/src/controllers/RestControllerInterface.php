<?php

namespace Uit\Controller;
use Psr\Http\Message\ServerRequestInterface;

interface RestControllerInterface {
    public function actionGet(ServerRequestInterface $request);
    public function actionPost(ServerRequestInterface $request);
    public function actionPut(ServerRequestInterface $request);
    public function actionDelete(ServerRequestInterface $request);
}
