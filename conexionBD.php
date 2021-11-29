<?php

    $servidor="localhost";
    $usuario="root";
    $clave="admin";
    $baseDeDatos="bd_ambiente";

    $conn = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

    if(!$conn){
        echo "Error en la conexion con el servidor";
    }
    /*else{
        echo "Conexion exitosa!!!!";
    }*/

    function Conectar(){
        
        $mysqli = new mysqli("localhost","root","admin", "bd_ambiente");

        if($mysqli -> connect_errno){
            return false;

        } 
        return $mysqli;
    }
?>