<?php

    switch($_GET["opc"]){

        case "CARGAR_PROVEEDORES":
            $result = CargarProveedores();
            echo $result;
        break;

        default:
            echo "0";
    }


    function CargarProveedores(){
        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbProveedor";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $proveedores = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $proveedores[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($proveedores);
        }else{
            return "Error";
        }
    }
?>