<?php

    switch($_GET["opc"]){

        case "CARGAR_PROVEEDORES":
            $result = CargarProveedores();
            echo $result;
        break;

        case "CARGAR_MOD_PROVEEDOR":
            $Id = $_GET["var1"];
            $result = CargarModProveedor($Id);
            echo $result;
        break;

        case "MODIFICAR_PROVEEDOR":

            $id = $_GET["var1"];
            $nom = $_GET["var2"];
            $tel = $_GET["var3"];
            $contacto = $_GET["var4"];

            $result = ModificarProveedor($id, $nom, $tel, $contacto);

            echo $result;
        break;

        case "ELIMINAR_PROVEEDOR":

            $Id = $_GET["var1"];
            $result = EliminarProveedor($Id);

            echo $result;
        break;

        case "REGISTRO_PROVEEDOR":
            $nom = $_GET["var1"];
            $tel = $_GET["var2"];
            $contacto = $_GET["var3"];

            $result = RegistroProveedor($nom, $tel, $contacto);

            echo $result;
        break;

        default:
    }

    function CargarProveedores(){
        require_once('conexionBD.php');

        $sql_query = "SELECT p.idProvedor, p.NombreEmpresa, p.TelefonoEmpresa, p.IdUsuario, u.Nombre, u.Apellidos, u.Telefono, u.Correo FROM tbProveedor p , tbUsuario u WHERE u.IdUsuario = p.idUsuario";
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

    function CargarModProveedor($Id){
        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbProveedor WHERE idProvedor = '".$Id."'";
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

    function ModificarProveedor($id, $nom, $tel, $contacto){

        require_once('conexionBD.php');

        $sql_query = "UPDATE tbProveedor SET NombreEmpresa='".$nom."', TelefonoEmpresa='".$tel."', IdUsuario='".$contacto."' WHERE idProvedor = '".$id."'";

        if(mysqli_query($conn, $sql_query)){
            return "okEditar";
        }else{
            return mysqli_error($conn);
        }

    }

    function EliminarProveedor($Id){
        
        require_once('conexionBD.php');

        $sql_query = "DELETE FROM tbProveedor WHERE idProvedor = $Id";
        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okEliminado";    
        }
    }

    function RegistroProveedor($nom, $tel, $contacto){

        require_once('conexionBD.php');

        $sql_query = "INSERT INTO tbProveedor (NombreEmpresa, TelefonoEmpresa, IdUsuario) VALUES ('".$nom."', '".$tel."', '".$contacto."')";

        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okRegistro";    
        }
    }
?>