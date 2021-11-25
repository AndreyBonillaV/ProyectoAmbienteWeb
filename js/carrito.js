var Carrito = [];

function AgregarCarrito(idProducto){

    var XHR = new XMLHttpRequest();
    var opc = "CARGAR_MOD_PRODUCTO";

    XHR.open(
        "GET",
        "productos.php?opc=" + opc + "&var1=" + idProducto,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {

        if (XHR.readyState == 4 && XHR.status == 200) {
            if (XHR.responseText != "Error") {

                data = JSON.parse(XHR.responseText);

                var nuevoProducto = []
                nuevoProducto.push(data[0].idProducto, data[0].NombreProducto, data[0].PrecioProducto, data[0].RutaImagenProducto);

                Carrito.push(nuevoProducto);
                sessionStorage.setItem("Carrito", JSON.stringify(Carrito));

                alert("Producto agregado al carrito");

            } else {
                console.log(XHR.responseText);
                alert("Error al agregar producto al carrito");
            }
        }
    }
}

function CargarTablaCarrito(){

    var ArticulosCarrito = JSON.parse(sessionStorage.getItem('Carrito'));

    tbody = document.querySelector('#tblCarrito tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < ArticulosCarrito.length; i++){

        var fila = document.createElement('tr'),
        cellProducto = document.createElement('td'),
        cellPrecio = document.createElement('td'),
        cellCantidad = document.createElement('td'),
        cellOpciones = document.createElement('td');

        var img = document.createElement("img");
        img.src = ArticulosCarrito[i][3];
        img.height = 150;
        img.width = 150;

        var btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.id = ArticulosCarrito[i][0];
        btnEliminar.onclick = function () { EliminarCarrito(this.id) };

        var txtCant = document.createElement('input');
        txtCant.type = 'number';
        txtCant.value = 1;
        txtCant.min = 1;
        txtCant.max = 10;
        txtCant.setAttribute('size', '1');
        txtCant.id = 'txtCant' + ArticulosCarrito[i][0];
        txtCant.onchange = function () { CalcularTotal() };

        cellProducto.innerHTML = "<b>" + ArticulosCarrito[i][1] + "</b><br>";
        cellPrecio.innerHTML = "₡" + ArticulosCarrito[i][2];

        cellProducto.appendChild(img);
        cellCantidad.appendChild(txtCant);
        cellOpciones.appendChild(btnEliminar);

        fila.appendChild(cellProducto);
        fila.appendChild(cellPrecio);
        fila.appendChild(cellCantidad);
        fila.appendChild(cellOpciones);

        tbody.appendChild(fila);
    }

    CalcularTotal();
}

function CalcularTotal(){

    var ArticulosCarrito = JSON.parse(sessionStorage.getItem('Carrito'));
    var total = 0;
    var totalProd = 0;

    for (var i = 0; i < ArticulosCarrito.length; i++){

        var cant = document.getElementById("txtCant" + ArticulosCarrito[i][0]).value;

        totalProd = cant * parseInt(ArticulosCarrito[i][2]);

        total = total + totalProd;

    }

    document.getElementById("lblTotal").innerHTML = total;

}

function PrepararCompra(){

    var ArticulosCarrito = JSON.parse(sessionStorage.getItem('Carrito'));
    var total = 0;
    var totalProd = 0;

    for (var i = 0; i < ArticulosCarrito.length; i++){

        var cant = document.getElementById("txtCant" + ArticulosCarrito[i][0]).value;

        totalProd = cant * parseInt(ArticulosCarrito[i][2]);

        total = total + totalProd;

    }

    RegistrarCompra(total);
    
}

function RegistrarCompra(total){
    
    var cedUsuario = sessionStorage.getItem('idUsuario');
    
    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO";

    XHR.open(
        "GET",
        "carrito.php?opc=" + opc + "&var1=" + cedUsuario + "&var2=" + total,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);
            console.log(data[0].idVenta);

            PreparaProductoCompra(data[0].idVenta);

        }
    }
}

function PreparaProductoCompra(idVenta){

    var ArticulosCarrito = JSON.parse(sessionStorage.getItem('Carrito'));

    for (var i = 0; i < ArticulosCarrito.length; i++){

        var cant = document.getElementById("txtCant" + ArticulosCarrito[i][0]).value;
        
        RegistraProductoCompra(cant, idVenta, ArticulosCarrito[i][0]);
    }

    //sessionStorage.removeItem('Carrito');
}

function RegistraProductoCompra(cant, idVenta, idProducto){

    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO_PRODUCTOS";

    XHR.open(
        "GET",
        "carrito.php?opc=" + opc + "&var1=" + cant + "&var2=" + idVenta + "&var3=" + idProducto,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okRegistro") {

                alert("Compra realizada con exito!!!");

            } else {
                console.log(XHR.responseText);
                alert("Error al comprar productos");
                return false;
            }
        }
    }
}

function EliminarCarrito(idProducto){

    var ArticulosCarrito = JSON.parse(sessionStorage.getItem('Carrito'));
    
    for(var i = 0; i < ArticulosCarrito.length; i++){
        if(ArticulosCarrito[i][0] == idProducto){     
            var producto = ArticulosCarrito[i];
        }
    }

    var index = ArticulosCarrito.indexOf(producto);

    if (index > -1) {
        ArticulosCarrito.splice(index, 1); //elimina el producto
    }

    sessionStorage.setItem("Carrito", JSON.stringify(ArticulosCarrito));

    CargarTablaCarrito();
}