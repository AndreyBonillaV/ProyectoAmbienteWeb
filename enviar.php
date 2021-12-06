<?php
//Asignar valores a las variables mediante POST
$target = "sgsistemascr@gmail.com";
$nombre = $_POST['nombre'];
$correo = $_POST["correo"];
$asunto = $_POST["asunto"];
$mensaje = $_POST["mensaje"];

//cookies
setcookie("gnombre",$nombre,time() + 60*60*24*30);
setcookie("gcorreo",$nombre,time() + 60*60*24*30);

//Formato mensaje
$msg = "Nombre: ". $nombre."\n"."Correo: ". $correo. "\n". " Asunto: ". $asunto. "\n". "Mensaje: ".$mensaje;
$msg2 = "Hemos recibido tu mensaje. Nos estaremos contactando contigo pronto";
mail($target, "Mensaje", $msg);
mail($correo, "Mensaje enviado correctamente",$msg2);
header("location.contactenos.php");
