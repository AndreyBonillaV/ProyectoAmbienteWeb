<?php

    $servidor="localhost";
    $usuario="root";
    $clave="1234";
    $baseDeDatos="bd_ambiente";

    $conn = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

    if(!$conn){
        echo "Error en la conexion con el servidor";
    }
    /*else{
        echo "Conexion exitosa!!!!";
    }*/
?>