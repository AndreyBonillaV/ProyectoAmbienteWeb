<?php

    switch($_GET["opc"]){

        case "CARGAR_PRODUCTOS":
            $result = CargarProductos();
            echo $result;
        break;

        default:
            echo "0";
    }


    function CargarProductos(){
        require_once('conexionBD.php');
        
        $sql_query = "SELECT p.idProducto, p.NombreProducto, p.DescripProducto, p.RutaImagenProducto, p.idProducto, p.PrecioProducto, p.CantidadTotal, tp.NombreTipoProducto AS Tipo, prov.NombreEmpresa
        FROM tbProducto p, tbtipoproducto tp, tbproveedor prov WHERE p.idTipoProducto = tp.IdTipoProducto AND p.idProvedor = prov.idProvedor";

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
?>