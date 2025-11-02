<?php
$canal = isset($_GET['stream']) ? strtolower($_GET['stream']) : null;

if (!$canal) {
  echo "<h2 style='color:white;text-align:center;margin-top:20%'>Canal no especificado</h2>";
  exit;
}

$url = "https://la14hd.com/vivo/canales.php?stream=" . urlencode($canal);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reproductor <?php echo strtoupper($canal); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background-color: black;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    iframe {
      border: none;
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <iframe src="<?php echo $url; ?>" allowfullscreen allow="autoplay; encrypted-media"></iframe>
</body>
</html>
