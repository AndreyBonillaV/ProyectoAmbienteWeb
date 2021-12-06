<!DOCTYPE html>
<html lang="es-es">

<head>
    <meta charset="utf-8">
    <title>SG SISTEMAS | Computadoras, Laptops, partes y accesorios.</title>
    <meta name="description" content="SG SISTEMAS especialistas en computadoras, laptops y accesorios. Las mejores marcas para juegos en computadora y alto rendimiento.">
    <meta name="keywords" content="SGSISTEMAS,PC,Laptop,Portátil,Gamers,Juegos PC,Asus,Gigabyte,Asrock,MSI,Nvidia,Geforce,HyperX,Razer">
    <meta name="robots" content="index,follow"> <!-- indica que la pagina debe ser rastreada -->
    <meta name="viewport" content="width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0"> <!-- parametros para pagina web responsive -->
    <meta name="author" content="SGSISTEMAS">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes"> <!-- web parezca un app para iPhone o iPad -->
    <link rel="shortcut icon" type="image/x-icon" href="img/logo.png"> <!-- favicon -->
    <link rel="stylesheet" type="text/css" href="css/contacto.css">

  <!-- BOOTSTRAP 5.1-->

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>

  <!-- js propio -->
  <script language="JavaScript" type="text/javascript" src="js/usuarios.js"></script>
  <script type=module src=js/headerfooter.js></script>
</head>

<body>

  <!-- *********** INICIO MENÚ *********** -->
  <my-header></my-header>
  <!-- *********** FIN MENÚ *********** -->

    <h2 id="main_header">Contacto</h2>
    <form action="enviar.php" method="post">
        <input type="text" name="nombre" placeholder="Tu Nombre" required>
        <input type="email" name="correo" placeholder="Tu Correo" required>
        <input type="text" name="asunto" placeholder="Tu Asunto"required>
        <textarea name="mensaje" placeholder="Tu mensaje" required></textarea>
        <button>Enviar</button>
    </form>


  <!-- *********** FIN FOOTER *********** -->
  <my-footer></my-footer>
  <!-- *********** FIN FOOTER *********** -->

</body>

</html>