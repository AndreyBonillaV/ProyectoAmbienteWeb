
<?php

    switch($_GET["opc"]){

        case "CARGAR_TIPOS":
            $result = CargarTipos();
            echo $result;
        break;

        case "CARGAR_MOD_TIPOS":
            $IdTipo = $_GET["var1"];
            $result = CargarModTipos($IdTipo);
            echo $result;
        break;

        case "MODIFICAR_TIPO":

            $idTipo = $_GET["var1"];
            $nom = $_GET["var2"];

            $result = ModificarTipo($idTipo, $nom);

            echo $result;
        break;

        case "ELIMINAR_TIPO":

            $IdTipo = $_GET["var1"];
            $result = EliminarTipo($IdTipo);

            echo $result;
        break;

        case "REGISTRO_TIPO":

            $nom = $_GET["var1"];

            $result = RegistroTipo($nom);

            echo $result;
        break;

        default:
            echo "0";
    }

    function CargarTipos(){
        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbTipoProducto";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $tipos = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $tipos[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($tipos);
        }else{
            return "Error";
        }
    }

    function CargarModTipos($IdTipo){
        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbTipoProducto WHERE IdTipoProducto = '".$IdTipo."'";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $tipos = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $tipos[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($tipos);
        }else{
            return "Error";
        }
    }

    function ModificarTipo($idTipo, $nom){

        require_once('conexionBD.php');

        $sql_query = "UPDATE tbTipoProducto SET NombreTipoProducto='".$nom."' WHERE IdTipoProducto = '".$idTipo."'";

        if(mysqli_query($conn, $sql_query)){
            return "okEditar";
        }else{
            return mysqli_error($conn);
        }

    }

    function EliminarTipo($IdTipo){
        
        require_once('conexionBD.php');

        $sql_query = "DELETE FROM tbTipoProducto WHERE IdTipoProducto = $IdTipo";
        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okEliminado";    
        }
    }

    function RegistroTipo($nom){

        require_once('conexionBD.php');

        $sql_query = "INSERT INTO tbTipoProducto (NombreTipoProducto) VALUES ('".$nom."')";

        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okRegistro";    
        }
    }
?>