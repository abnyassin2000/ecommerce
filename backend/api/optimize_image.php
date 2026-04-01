<?php
// backend/api/optimize_image.php
function optimizeImage($source_path, $destination_path, $quality = 80) {
    $info = getimagesize($source_path);
    
    if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source_path);
        imagejpeg($image, $destination_path, $quality);
    } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source_path);
        imagepng($image, $destination_path, 9);
    }
    
    imagedestroy($image);
    return true;
}

// Usage in upload script
if (move_uploaded_file($file['tmp_name'], $target_file)) {
    // Create optimized version
    $optimized_file = $upload_dir . 'opt_' . $file_name;
    optimizeImage($target_file, $optimized_file);
    
    // Replace with optimized version
    unlink($target_file);
    rename($optimized_file, $target_file);
}
?>