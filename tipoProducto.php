
<?php
    
    include "conexionBD.php";
    include "ModeloTablaTP.php";;
    $conexion = Conectar();

    if(!$conexion)
    echo "<div style='color:red;'>Error en la conexion a la base de datos</div>";
    else{
        echo "<div style ='color:green;'>Conexión exitosa a la base de datos</div>";
    }
    ?>
   <h1>Tipo de Productos</h1>
   <h2>Tabla de elementos</h2> 
   <?php
   $lista = Tabla:: ObtenerTodos($conexion);
   echo "<b>NOMBRE DE PRODUCTO</b><BR>";
   /*obtener un array <asociativo></asociativo>*/
   while($fila = $lista-> fetch_assoc()){
       echo $fila["IdTipoProducto"]." - ".$fila["NombreTipoProducto"].
       " - <a href ='#' onclick ='EliminarRegistroTP(" 
       .$fila["IdTipoProducto"].")'>Eliminar</a>"
       ."<br>";
   }

   $lista->free();
    ?>
<script language="JavaScript" type="text/javascript" src = "crudTipoProducto.js"></script> 
<br><br>
Nombre: <input type ="text" name="nombre" id="nombre" value=""><br><br>

<input type="button"  onclick ="AgregarRegistroTP()" value="Guardar">