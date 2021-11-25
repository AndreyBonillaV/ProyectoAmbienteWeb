
<?php

    switch($_GET["opc"]){

        case "CARGAR_TIPOS":
            $result = CargarTipos();
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

            $proveedores = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $tipos[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($tipos);
        }else{
            return "Error";
        }
}

?>