<?php

    switch($_GET["opc"]){

        case "LOGIN":

            $correo = $_GET["var1"];
            $contra = $_GET["var2"];

            $result = Login($correo, $contra);

            echo $result;
        break;

        case "EXISTE":

            $cedula = $_GET["var1"];
            $correo = $_GET["var2"];

            $result = ValidarExistencia($cedula, $correo);

            echo $result;
        break;

        case "REGISTRO":

            $cedula = $_GET["var1"];
            $nombre = $_GET["var2"];
            $apellido = $_GET["var3"];
            $fecha = $_GET["var4"];
            $tel = $_GET["var5"];
            $correo = $_GET["var6"];
            $pass = $_GET["var7"];

            $result = RegistroUsuario($cedula, $nombre, $apellido, $fecha, $tel, $correo, $pass);

            echo $result;
        break;

        case "CARGAR_USUARIOS":
            $result = CargarUsuarios();

            echo $result;
        break;

        case "ELIMINAR_USUARIO":

            $IdUsuario = $_GET["var1"];
            $result = EliminarUsuario($IdUsuario);

            echo $result;
        break;

        case "CARGAR_MOD_USUARIO":

            $IdUsuario = $_GET["var1"];
            $result = CargarModalUsuario($IdUsuario);

            echo $result;
        break;

        case "EDITAR_USUARIO":

            $cedula = $_GET["var1"];
            $nombre = $_GET["var2"];
            $apellido = $_GET["var3"];
            $fecha = $_GET["var4"];
            $tel = $_GET["var5"];
            $correo = $_GET["var6"];
            $pass = $_GET["var7"];
            $rol = $_GET["var8"];

            $result = EditarUsuario($cedula, $nombre, $apellido, $fecha, $tel, $correo, $pass, $rol);

            echo $result;
        break;

        case "CARGAR_ROLES":
            $result = CargarRoles();

            echo $result;
        break;

        default:
            echo "0";    
    }

    function Login($correo, $contra){

        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbUsuario WHERE Correo='".$correo."' AND Contrasena='".$contra."'";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){
            $IdRol = "";
            $Cedula = "";
            while($row = $result->fetch_assoc()) {
                $Cedula = $row["Cedula"];
                $IdRol= $row["IdRol"];
            }
            
            return $Cedula. "_" .$IdRol;

        }else{
            return "Error";
        }

    }

    function ValidarExistencia($cedula, $correo){
        require_once('conexionBD.php');

        $sql_query = "SELECT Cedula AS ced FROM tbUsuario WHERE Cedula='".$cedula."'";
        $resultCed = mysqli_query($conn, $sql_query);

        $sql_query = "SELECT Correo AS correo FROM tbUsuario WHERE Correo='".$correo."'";
        $resultCorreo = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($resultCed) > 0 || mysqli_num_rows($resultCorreo) > 0 ){
            return "Existe";
        }else{
            return "NoExiste";
        }
    }

    function RegistroUsuario($cedula, $nombre, $apellido, $fecha, $tel, $correo, $pass){
        require_once('conexionBD.php');

        $sql_query = "INSERT INTO tbUsuario (Cedula, Nombre, Apellidos, FechaNacimiento, Telefono, Correo, Contrasena, IdRol)
        VALUES ('".$cedula."', '".$nombre."',  '".$apellido."', '".$fecha."',  '".$tel."', '".$correo."', '".$pass."', '2')";

        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okRegistro";    
        }
    }

    function CargarUsuarios(){

        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbUsuario";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $usuarios = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $usuarios[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($usuarios);
        }else{
            return "Error";
        }
    }

    function EliminarUsuario($IdUsuario){
        
        require_once('conexionBD.php');

        $sql_query = "DELETE FROM tbUsuario WHERE IdUsuario = $IdUsuario";
        $result = mysqli_query($conn, $sql_query);

        if(!$result) {
            return mysqli_error($conn); //"ERROR";
        }else {
            return "okEliminado";    
        }
    }

    function CargarModalUsuario($IdUsuario){

        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbUsuario WHERE IdUsuario = '".$IdUsuario."'" ;
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result)>0){ 

            $usuario = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $usuario[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($usuario);
        }else{
            return "Error";
        }
    }

    function EditarUsuario($cedula, $nombre, $apellido, $fecha, $tel, $correo, $pass, $rol){
        require_once('conexionBD.php');

        $sql_query = "UPDATE tbUsuario SET Nombre='".$nombre."', Apellidos='".$apellido."', FechaNacimiento='".$fecha."', 
        Telefono='".$tel."', Correo='".$correo."', IdRol='".$rol."' WHERE Cedula = $cedula";

        if (mysqli_query($conn, $sql_query)) {
            return "okEditar";
        } else {
            return mysqli_error($conn);
        }

    }

    function CargarRoles(){
        require_once('conexionBD.php');

        $sql_query = "SELECT * FROM tbRol";
        $result = mysqli_query($conn, $sql_query);

        if(mysqli_num_rows($result) > 0){ 

            $roles = array();
            while($fila = mysqli_fetch_assoc($result)) {
                $roles[] = $fila;
            }

            header('Content-Type: application/json');
            return json_encode($roles);
        }else{
            return "Error";
        }
    }
?>