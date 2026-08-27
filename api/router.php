<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/controllers/UserController.php';

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\HttpFoundation\Request;

$routes = new RouteCollection();

$routes->add(
    'users_index',
    new Route('/api/users', ['_controller' => 'index'], methods: ['GET'])
);

$routes->add(
    'users_store',
    new Route('/api/users', ['_controller' => 'store'], methods: ['POST'])
);

$routes->add(
    'users_show',
    new Route('/api/users/{id}', ['_controller' => 'show'], methods: ['GET'])
);

$routes->add(
    'users_update',
    new Route('/api/users/{id}', ['_controller' => 'update'], methods: ['PUT'])
);

$routes->add(
    'users_destroy',
    new Route('/api/users/{id}', ['_controller' => 'destroy'], methods: ['DELETE'])
);

$context = new RequestContext();
$request = Request::createFromGlobals();
$context->fromRequest($request);

$matcher = new UrlMatcher($routes, $context);

try {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parameters = $matcher->match($path);

    $controller = new UserController();
    $method = $parameters['_controller'];
    $id = $parameters['id'] ?? null;

    if ($id !== null) {
        $controller->$method($id);
    } else {
        $controller->$method();
    }
} catch (\Symfony\Component\Routing\Exception\ResourceNotFoundException $e) {
    http_response_code(404);
    echo "Route not found";
} catch (\Symfony\Component\Routing\Exception\MethodNotAllowedException $e) {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} catch (\PDOException $e) {
    http_response_code($e->getCode() === '23505' ? 409 : 500);
    echo json_encode(['error' => $e->getCode() === '23505'
        ? 'Email or phone number already exists'
        : 'Database error']);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}