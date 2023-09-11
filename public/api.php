<?php
require_once '../src/ApiClient.php';

// Load API token from .env file (you can use a library like phpdotenv for this)
$apiToken = 'ba67df6a-a17c-476f-8e95-bcdb75ed3958';  // Replace with actual token from .env

$apiClient = new ApiClient($apiToken);

header('Content-Type: application/json');

// Handle addLead API
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'addLead') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['firstName'], $data['lastName'], $data['phone'], $data['email'])) {
        $response = $apiClient->addLead($data);
        echo $response;
    } else {
        echo json_encode(['status' => false, 'message' => 'Missing required fields']);
    }
    exit;
}

// Handle getStatuses API
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'getStatuses') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['date_from'], $data['date_to'])) {
        $response = $apiClient->getStatuses($data['date_from'], $data['date_to']);
        echo $response;
    } else {
        echo json_encode(['status' => false, 'message' => 'Missing date_from or date_to']);
    }
    exit;
}

