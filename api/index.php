<?php
require 'vendor/autoload.php';

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Uit\Component\HttpException;

$app = new \Slim\App();
$app->add(new RKA\Middleware\IpAddress());
$app->any('/{controller}', function(ServerRequestInterface $request, ResponseInterface $response, $args) {
    $controller = '\\Uit\\Controller\\'.ucfirst($args['controller']).'Controller';
    $action     = 'action'.ucfirst($request->getMethod());

    try {
        $responseBody = (new $controller())->$action($request);
        $response->getBody()->write(json_encode($responseBody));
    } catch (HttpException $e) {
        $response = $response->withStatus($e->getCode());
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
    } catch (Exception $e) {
        $errorId = rand();
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['error' => "Uncaught error #$errorId"]));
        error_log("($errorId) {$e->getMessage()}");
    }

    $response = $response->withHeader('Content-type', 'application/json');
    return $response;
});

$app->run();
