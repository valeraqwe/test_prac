<?php
class ApiClient {
    private $token;
    private mixed $baseUrl;

    public function __construct($token, $baseUrl = 'https://crm.belmar.pro/api/v1/') {
        $this->token = $token;
        $this->baseUrl = $baseUrl;
    }

    private function makeRequest($endpoint, $data) {
        $url = $this->baseUrl . $endpoint;
        $headers = [
            'Content-Type: application/json',
            'token: ' . $this->token
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function addLead($data) {
        $endpoint = 'addlead';
        $response = $this->makeRequest($endpoint, $data);
        return $response;
    }

    public function getStatuses($date_from, $date_to) {
        $endpoint = 'getstatuses';
        $data = [
            'date_from' => $date_from,
            'date_to' => $date_to,
            'page' => 1,
            'limit' => 100
        ];
        $response = $this->makeRequest($endpoint, $data);
        return $response;
    }
}
