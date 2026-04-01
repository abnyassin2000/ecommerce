<?php
// backend/api/orders.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single order with items
            $id = $_GET['id'];
            $order = [];
            
            $query = "SELECT * FROM orders WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $order = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $query = "SELECT * FROM order_items WHERE order_id = :order_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':order_id', $id);
            $stmt->execute();
            $order['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($order);
        } else {
            // Get all orders
            $query = "SELECT * FROM orders ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($orders);
        }
        break;
        
    case 'POST':
        // Create new order
        $data = json_decode(file_get_contents("php://input"));
        
        $db->beginTransaction();
        
        try {
            // Insert order
            $query = "INSERT INTO orders (customer_name, customer_email, customer_phone, address, city, postal_code, total_amount) 
                      VALUES (:name, :email, :phone, :address, :city, :postal_code, :total)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':name', $data->customer_name);
            $stmt->bindParam(':email', $data->customer_email);
            $stmt->bindParam(':phone', $data->customer_phone);
            $stmt->bindParam(':address', $data->address);
            $stmt->bindParam(':city', $data->city);
            $stmt->bindParam(':postal_code', $data->postal_code);
            $stmt->bindParam(':total', $data->total_amount);
            $stmt->execute();
            
            $order_id = $db->lastInsertId();
            
            // Insert order items
            $query = "INSERT INTO order_items (order_id, product_id, product_name, quantity, price) 
                      VALUES (:order_id, :product_id, :product_name, :quantity, :price)";
            $stmt = $db->prepare($query);
            
            foreach ($data->items as $item) {
                $stmt->bindParam(':order_id', $order_id);
                $stmt->bindParam(':product_id', $item->product_id);
                $stmt->bindParam(':product_name', $item->product_name);
                $stmt->bindParam(':quantity', $item->quantity);
                $stmt->bindParam(':price', $item->price);
                $stmt->execute();
            }
            
            $db->commit();
            echo json_encode(["success" => true, "order_id" => $order_id]);
            
        } catch(Exception $e) {
            $db->rollBack();
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
        break;
}
?>