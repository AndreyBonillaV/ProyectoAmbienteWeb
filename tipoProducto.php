<?php

    switch($_GET["opc"]){

        case "CARGAR_TIPOPRODUCTOS":
            $result = cargarTipoProductos();
            echo $result;
        break;

        case "ELIMINAR_TIPOPRODUCTO":

            $IdProducto = $_GET["var1"];
            $result = EliminarTipoProducto($IdProducto);

            echo $result;
        break;

        case "CARGAR_MOD_PRODUCTO":

            $IdProducto = $_GET["var1"];
            $result = CargarModalProducto($IdProducto);

            echo $result;
        break;

        case "REGISTRO_TIPO":

            $nom = $_GET["var1"];          
            $tipo = $_GET["var2"];

            $result = RegistroTipoProducto($tipo);

            echo $result;
        break;

        case "EDITAR_TIPOPRODUCTO":

            $idProd = $_GET["var1"];
            $tipo = $_GET["var2"];

            $result = EditarTipoProducto($idProd, $tipo);

            echo $result;
        break;

        case "CARGAR_PRODUCTOS_TIPO":
            $idTipo = $_GET["var1"];
            $result = cargarProductosTipo($idTipo);
            echo $result;
        break;

        default:
            echo "0";
    }


    function cargarTipoProductos(){
        require_once('conexionBD.php');

        $sql_query = "SELECT p.idTipoProducto, tp.NombreTipoProducto
        FROM tbTipoProducto tp, WHERE p.idTipoProducto = tp.IdTipoProducto";

        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $tipoproductos = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $tipoproductos[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($tipoproductos);
        }else{
            return "Error";
        }
    }

    function EliminarTipoProducto($IdProducto){
        
        require_once('conexionBD.php');

        $sql_query = "DELETE FROM tbProducto WHERE idProducto = $IdProducto";
        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okEliminado";    
        }
    }

    function CargarModalProducto($IdProducto){

        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbProducto WHERE idProducto = '".$IdProducto."'" ;
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $prod = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $prod[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($prod);
        }else{
            return "Error";
        }
    }

    function RegistroTipoProducto($nom, $descrip, $img, $precio, $cant, $tipo, $prov){

        require_once('conexionBD.php');

        $sql_query = "INSERT INTO tbProducto (NombreProducto, DescripProducto, RutaImagenProducto, PrecioProducto, CantidadTotal, IdTipoProducto, idProvedor)
        VALUES ('".$nom."', '".$descrip."',  '".$img."', '".$precio."',  '".$cant."', '".$tipo."', '".$prov."')";

        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okRegistro";    
        }

    }

    function EditarTipoProducto($idProd, $nom, $descrip, $img, $precio, $cant, $tipo, $prov){

        require_once('conexionBD.php');

        $sql_query = "UPDATE tbProducto SET NombreProducto='".$nom."', DescripProducto='".$descrip."', RutaImagenProducto='".$img."', 
        PrecioProducto='".$precio."', CantidadTotal='".$cant."', IdTipoProducto='".$tipo."', idProvedor='".$prov."' WHERE idProducto = $idProd";

        if (mysqli_query($conn, $sql_query)) {
            return "okEditar";
        } else {
            return mysqli_error($conn);
        }

    }

    function CargarProductosTipo($idTipo){
        require_once('conexionBD.php');

        $sql_query = "SELECT p.idProducto, p.NombreProducto, p.DescripProducto, p.RutaImagenProducto, p.idProducto, p.PrecioProducto, p.CantidadTotal, tp.NombreTipoProducto AS Tipo, prov.NombreEmpresa
        FROM tbProducto p, tbtipoproducto tp, tbproveedor prov WHERE p.idTipoProducto = tp.IdTipoProducto AND p.idProvedor = prov.idProvedor AND p.idTipoProducto = '".$idTipo."'";

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