<?php
    $numero = $_POST['numero'];
    sleep(5);
    echo json_encode(preg_match("/[0-9]+/",$numero));
?>