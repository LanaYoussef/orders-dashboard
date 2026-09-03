<?php

header('Content-Type: application/json');

$user = [
    'id' => 1,
    'firstName' => 'lana',
    'lastName' => 'youssef',
    'email' => 'lanayusf12@gmail.com'
];

echo json_encode($user);