<?php
// backend/api/products.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    // backend/api/products.php - Add this endpoint
case 'POST':
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "INSERT INTO products (name, description, price, image_url, category, stock) 
              VALUES (:name, :description, :price, :image_url, :category, :stock)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':price', $data->price);
    $stmt->bindParam(':image_url', $data->image_url);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':stock', $data->stock);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $db->lastInsertId()]);
    } else {
        echo json_encode(["success" => false]);
    }
    break;
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single product
            $id = $_GET['id'];
            $query = "SELECT * FROM products WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($product);
        } else {
            // Get all products
            $query = "SELECT * FROM products ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        // Add new product (admin only in production)
        $data = json_decode(file_get_contents("php://input"));
        
        $query = "INSERT INTO products (name, description, price, image_url, category, stock) 
                  VALUES (:name, :description, :price, :image_url, :category, :stock)";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':description', $data->description);
        $stmt->bindParam(':price', $data->price);
        $stmt->bindParam(':image_url', $data->image_url);
        $stmt->bindParam(':category', $data->category);
        $stmt->bindParam(':stock', $data->stock);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $db->lastInsertId()]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to add product"]);
        }
        break;
        
    case 'PUT':
        // Update product
        $data = json_decode(file_get_contents("php://input"));
        $id = $_GET['id'];
        
        $query = "UPDATE products SET name=:name, description=:description, price=:price, 
                  image_url=:image_url, category=:category, stock=:stock WHERE id=:id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':description', $data->description);
        $stmt->bindParam(':price', $data->price);
        $stmt->bindParam(':image_url', $data->image_url);
        $stmt->bindParam(':category', $data->category);
        $stmt->bindParam(':stock', $data->stock);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'];
        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
}
?>