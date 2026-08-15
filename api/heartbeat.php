<?php
header('Content-Type: application/json');

$alive = random_int (1,100)<= 75;
echo json_encode([
  "is_alive" => $alive
]); 
