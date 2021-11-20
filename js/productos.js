function CargarProductos() {

    var opc = "CARGAR_PRODUCTOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "productos.php?opc=" + opc,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            CargarTablaProductos(data);
        }
    }
}

function CargarProveedor() {

    var opc = "CARGAR_PROVEEDORES";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "proveedor.php?opc=" + opc,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            var select = document.getElementById('selProv');

            for (var i = 0; i < data.length; i++){

                var opt = document.createElement('option');
                opt.innerHTML = data[i].NombreEmpresa;
                opt.value = data[i].idProvedor;
                select.appendChild(opt);
            }
        }
    }
}

function CargarTipos() {

    var opc = "CARGAR_TIPOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "tipoProducto.php?opc=" + opc,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            var select = document.getElementById('selTipo');

            for (var i = 0; i < data.length; i++){

                var opt = document.createElement('option');
                opt.innerHTML = data[i].NombreTipoProducto;
                opt.value = data[i].IdTipoProducto;
                select.appendChild(opt);
            }
        }
    }
}

function CargarTablaProductos(data) {

    tbody = document.querySelector('#tblProductos tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {

        var fila = document.createElement('tr'),
            cellNombre = document.createElement('td'),
            cellDescrip = document.createElement('td'),
            cellImg = document.createElement('td'),
            cellPrecio = document.createElement('td'),
            cellPrecio = document.createElement('td'),
            cellCantidad = document.createElement('td'),
            cellTipo = document.createElement('td'),
            cellProveedor = document.createElement('td'),
            cellOpciones = document.createElement('td');

        var img = document.createElement("img");
        img.src = data[i].RutaImagenProducto;
        img.height = 200;
        img.width = 200;

        var btnEditar = document.createElement('input');
        btnEditar.type = 'button';
        btnEditar.value = 'Editar';
        btnEditar.id = data[i].idProducto;
        btnEditar.onclick = function () { CargarModalProductos(this.id) };
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#exampleModal');

        var btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.id = data[i].idProducto;
        btnEliminar.onclick = function () { EliminarProducto(this.id) };

        cellNombre.innerHTML = data[i].NombreProducto;
        cellDescrip.innerHTML = data[i].DescripProducto;
        cellPrecio.innerHTML = "₡" + data[i].PrecioProducto;
        cellCantidad.innerHTML = data[i].CantidadTotal + " Unidades";
        cellTipo.innerHTML = data[i].Tipo;
        cellProveedor.innerHTML = data[i].NombreEmpresa;

        cellImg.appendChild(img);
        cellOpciones.appendChild(btnEditar);
        cellOpciones.appendChild(btnEliminar);

        fila.appendChild(cellNombre);
        fila.appendChild(cellDescrip);
        fila.appendChild(cellImg);
        fila.appendChild(cellPrecio);
        fila.appendChild(cellCantidad);
        fila.appendChild(cellTipo);
        fila.appendChild(cellProveedor);
        fila.appendChild(cellOpciones);

        tbody.appendChild(fila);
    }
}

function CargarModalProductos(idProd){

    limpiarModal();

    var opc = "CARGAR_MOD_PRODUCTO";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "productos.php?opc=" + opc + "&var1=" + idProd,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            document.getElementById("txtID").value = data[0].idProducto;
            document.getElementById("txtNombre").value = data[0].NombreProducto;
            document.getElementById("txtDescrip").value = data[0].DescripProducto;
            document.getElementById("txtImg").value = data[0].RutaImagenProducto;
            document.getElementById("txtPrecio").value = data[0].PrecioProducto;
            document.getElementById("txtCant").value = data[0].CantidadTotal;
            document.getElementById("selTipo").value = data[0].IdTipoProducto;
            document.getElementById("selProv").value = data[0].idProvedor;
        }
    }
}

function EliminarProducto(idProducto){

    if (confirm('Seguro que desea elimar este usuario?')) {
      
        var opc = "ELIMINAR_PRODUCTO";
        var XHR = new XMLHttpRequest();

        XHR.open(
            "GET",
            "productos.php?opc=" + opc + "&var1=" + idProducto,
            true
        );

        XHR.send(null);

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && XHR.status == 200) {

                if (XHR.responseText == "okEliminado") {
                    console.log(XHR.responseText);
                    alert("Producto elimando!!!");
                    CargarProductos();
                } else {
                    console.log("Error al eliminar usuario: " + XHR.responseText);
                    alert("Error al eliminiar producto");
                }
            }
        }
    }
}

function PrepararRegistro(){

    //document.getElementById("txtID").value;
    var nom = document.getElementById("txtNombre").value;
    var descrip = document.getElementById("txtDescrip").value;
    var img = document.getElementById("txtImg").value;
    var precio = document.getElementById("txtPrecio").value;
    var cant = document.getElementById("txtCant").value;
    var tipo = document.getElementById("selTipo").value;
    var prov = document.getElementById("selProv").value;

    if(nom == "" || descrip == "" || img == "" || precio == "" 
    || cant == "" || tipo == "" || prov == ""){
        alert("Debe llenar todos los campos");
    }else{

        RegistrarProducto(nom, descrip, img, precio, cant, tipo, prov);

    }

}

function RegistrarProducto(nom, descrip, img, precio, cant, tipo, prov){

    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO";

    XHR.open(
        "GET",
        "productos.php?opc=" + opc + "&var1=" + nom + "&var2=" + descrip + "&var3=" + img + 
        "&var4=" + precio + "&var5=" + cant + "&var6=" + tipo + "&var7=" + prov,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okRegistro") {
                //console.log(XHR.responseText);
                alert("Producto agregado correctamente!!!");
                CargarProductos() 
            } else {
                console.log(XHR.responseText);
                alert("Error al agregar producto");
                return false;
            }
        }
    }

}

function limpiarModal(){

    document.getElementById("txtID").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescrip").value = "";
    document.getElementById("txtImg").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtCant").value = "";
    document.getElementById("selTipo").value = 1;
    document.getElementById("selProv").value = 1;
}

/*
    var divCont = document.getElementById("container");

    var divRow = document.createElement('div');
    divRow.classList.add("row");

    var divCol = document.createElement('div');
    //divCol.innerHTML = "hola";

    var img = document.createElement("img");
    img.src = data[0].RutaImagenProducto;

    divCol.appendChild(img);
    divRow.appendChild(divCol);
    divCont.appendChild(divRow);

 */