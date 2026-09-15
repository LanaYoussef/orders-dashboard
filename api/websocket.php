<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/repositories/UserRepositoryFactory.php';

use Workerman\Timer;
use Workerman\Worker;

$worker = new Worker('websocket://0.0.0.0:' . $_ENV['WS_PORT']);
$worker->count = 1;

Worker::$daemonize = false;
Worker::$pidFile = '/tmp/websocket.pid';
Worker::$logFile = '/tmp/websocket.log';

$worker->onWorkerStart = function (Worker $worker) {
    $lastHash = null;

    Timer::add(1, function () use ($worker, &$lastHash) {
        $users = UserRepositoryFactory::make()->findAll();
        $hash = md5(json_encode($users));
        if ($hash === $lastHash) {
            return;
        }
        $lastHash = $hash;

        $payload = json_encode(['type' => 'users_changed']);
        foreach ($worker->connections as $connection) {
            $connection->send($payload);
        }
    });
};

Worker::runAll();