<?php
// backend/api/upload_image.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $upload_dir = '../uploads/products/';
    
    // Create directory if it doesn't exist
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        $file_name = time() . '_' . basename($file['name']);
        $target_file = $upload_dir . $file_name;
        
        // Check if image file is valid
        $check = getimagesize($file['tmp_name']);
        if ($check !== false) {
            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                $image_url = 'http://localhost/ecommerce-app/backend/uploads/products/' . $file_name;
                echo json_encode([
                    'success' => true,
                    'image_url' => $image_url,
                    'file_name' => $file_name
                ]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to upload file']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'File is not an image']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No file uploaded']);
    }
}
?>