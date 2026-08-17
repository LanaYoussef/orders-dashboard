<?php

header('Content-Type: application/json');

$key = getenv('OPENWEATHER_API_KEY');

if (!$key) {
    http_response_code(500);
    echo json_encode(['error' => 'Missing OPENWEATHER_API_KEY']);
    return;
}

$url = 'https://api.openweathermap.org/data/2.5/weather'
    . '?q=Beirut&units=metric&appid=' . urlencode($key);

$json = shell_exec('curl -sk ' . escapeshellarg($url));
$apiData = json_decode($json, true);

if (!$apiData || !isset($apiData['main']['temp'])) {
    http_response_code(502);
    echo json_encode(['error' => 'Weather fetch failed']);
    return;
}

echo json_encode([
    'city' => $apiData['name'],
    'temp' => $apiData['main']['temp'],
    'humidity' => $apiData['main']['humidity'],
    'wind' => $apiData['wind']['speed'],
]);