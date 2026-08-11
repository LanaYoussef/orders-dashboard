<?php

header('Content-Type: application/json');

$user = [
    'id' => 1,
    'first_name' => 'lana',
    'last_name' => 'youssef',
    'email' => 'lanayusf12@gmail.com'
];

echo json_encode($user);