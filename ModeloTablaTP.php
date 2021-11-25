<?php

class Tabla
{
    //Leer datos
    public static function ObtenerTodos($mysqli){
        $consulta = "SELECT IdTipoProducto,NombreTipoProducto FROM tbtipoproducto";

        if($resultado = $mysqli-> query($consulta))
        return $resultado;
        else
        return false;
    }

    public static function EliminarRegistroTP($mysqli, $identificador){

        $sql = "delete from tbtipoproducto where IdTipoProducto = $identificador";
        return $mysqli ->query($sql);
    }

    public static function AgregarRegistroTP($mysqli, $nombre){
        $sql = "insert into tbtipoproducto (NombreTipoProducto) values ('$nombre)";
        return $mysqli->query($sql);
    }
}

?>