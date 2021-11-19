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
        btnEditar.onclick = function () { CargarModal(this.id) };
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

function CargarModalProductos(opc){

    if(opc == 1){

        CargarTipos();
        CargarProveedor();

    }else{

    }
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