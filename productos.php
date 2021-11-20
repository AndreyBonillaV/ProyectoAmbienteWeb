<?php

    switch($_GET["opc"]){

        case "CARGAR_PRODUCTOS":
            $result = CargarProductos();
            echo $result;
        break;

        case "ELIMINAR_PRODUCTO":

            $IdProducto = $_GET["var1"];
            $result = EliminarProducto($IdProducto);

            echo $result;
        break;

        case "CARGAR_MOD_PRODUCTO":

            $IdProducto = $_GET["var1"];
            $result = CargarModalProducto($IdProducto);

            echo $result;
        break;

        case "REGISTRO":

            $nom = $_GET["var1"];
            $descrip = $_GET["var2"];
            $img = $_GET["var3"];
            $precio = $_GET["var4"];
            $cant = $_GET["var5"];
            $tipo = $_GET["var6"];
            $prov = $_GET["var7"];

            $result = RegistroProducto($nom, $descrip, $img, $precio, $cant, $tipo, $prov);

            echo $result;
        break;

        case "EDITAR_PRODUCTO":

            $idProd = $_GET["var1"];
            $nom = $_GET["var2"];
            $descrip = $_GET["var3"];
            $img = $_GET["var4"];
            $precio = $_GET["var5"];
            $cant = $_GET["var6"];
            $tipo = $_GET["var7"];
            $prov = $_GET["var8"];

            $result = EditarProducto($idProd, $nom, $descrip, $img, $precio, $cant, $tipo, $prov);

            echo $result;
        break;

        case "CARGAR_PRODUCTOS_TIPO":
            $idTipo = $_GET["var1"];
            $result = CargarProductosTipo($idTipo);
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

    function EliminarProducto($IdProducto){
        
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

    function RegistroProducto($nom, $descrip, $img, $precio, $cant, $tipo, $prov){

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

    function EditarProducto($idProd, $nom, $descrip, $img, $precio, $cant, $tipo, $prov){

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