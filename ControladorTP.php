<?php
include "conexionBD.php";
include "ModeloTablaTP.php";

$conexion = Conectar();

if(!$conexion)
echo "<div style='color:red'>Error en la conexion a la base de datos</div>";

header("Content-type: application/json; charset=utf-8");
$input = json_decode(file_get_contents("php://input"), true);

$funcion = $input ['funcion'];
switch ($funcion){
    case 'Eliminar':
       
        echo Tabla::EliminarRegistroTP($conexion, $input['Identificador']);
        
        break;
    case 'Agregar':
        echo Tabla::AgregarRegistroTP($conexion, $input['NombreTipoProducto']);

        break;

        default:
        echo "Función equivocada: ".$funcion;
        break;
}

?>