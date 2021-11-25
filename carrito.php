<?php

switch($_GET["opc"]){

    case "REGISTRO":

        $cedUsuario = $_GET["var1"];
        $total = $_GET["var2"];

        $result = RegistroCompra($cedUsuario, $total);

        echo $result;
    break;

    case "REGISTRO_PRODUCTOS":

        $cant = $_GET["var1"];
        $idVenta = $_GET["var2"];
        $idProducto = $_GET["var3"];

        $result = RegistraProductoCompra($cant, $idVenta, $idProducto);

        echo $result;
    break;

    default:
        echo "0";
}

function RegistroCompra($cedUsuario, $total, ){

    require_once('conexionBD.php');

    $sql_query = "INSERT INTO tbVentas (idUsuario, Total)
    VALUES ('".$cedUsuario."', '".$total."')";

    $result = mysqli_query($conn, $sql_query);

    if(!$result) {
        return mysqli_error($conn); //"ERROR";
    }else {
        //return "okRegistro";
        $sql_query = "SELECT MAX(idVenta) AS idVenta FROM tbVentas";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $productos = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $productos[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($productos);
        }else{
            return "Error";
        }
    }
}

function RegistraProductoCompra($cant, $idVenta, $idProducto){

    require_once('conexionBD.php');

    $sql_query = "INSERT INTO tbProductoVenta (idVenta, idProducto, Cantidad)
    VALUES ('".$idVenta."', '".$idProducto."', '".$cant."')";

    $result = mysqli_query($conn, $sql_query);

    if(!$result) {
        return mysqli_error($conn); //"ERROR";
    }else {
        return "okRegistro";
    }

}

?>