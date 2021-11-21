function cargarTipoProducto(){
    var opc = "CARGAR_ TIPOPRODUCTOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "tipoproductos.php?opc=" + opc,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);
            if(opcion == 1){
                CargarTablaTipoProductos(data);
            }else{
                CargarTablaProductosClientes(data);
            }
            
        }
    }  
}

function CargarTipos(opcion) {

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

            if(opcion == 1){
                for (var i = 0; i < data.length; i++){

                    var opt = document.createElement('option');
                    opt.innerHTML = data[i].NombreTipoProducto;
                    opt.value = data[i].IdTipoProducto;
                    select.appendChild(opt);
                }
            }else{
                
                var opt = document.createElement('option');
                opt.innerHTML = "Todos";
                opt.value = "0";
                select.appendChild(opt);

                for (var i = 0; i < data.length; i++){

                    var opt = document.createElement('option');
                    opt.innerHTML = data[i].NombreTipoProducto;
                    opt.value = data[i].IdTipoProducto;
                    select.appendChild(opt);
                }
            }
        }
    }
}

function CargarTablaTipoProductos(data) {

    tbody = document.querySelector('#tblTipoProductos tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {

        var fila = document.createElement('tr'),
            cellID = document.createElement('td'),
            cellTipo = document.createElement('td');

        var img = document.createElement("img");
        img.src = data[i].RutaImagenProducto;
        img.height = 200;
        img.width = 200;

        var btnEditar = document.createElement('input');
        btnEditar.type = 'button';
        btnEditar.value = 'Editar';
        btnEditar.id = data[i].idProducto;
        btnEditar.onclick = function () { CargarModalTipoProductos(this.id) };
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#exampleModal');

        var btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.id = data[i].idProducto;
        btnEliminar.onclick = function () { EliminarProducto(this.id) };

        cellID.innerHTML = data[i].IdTipoProducto;
        cellTipo.innerHTML = data[i].Tipo;

        cellImg.appendChild(img);
        cellOpciones.appendChild(btnEditar);
        cellOpciones.appendChild(btnEliminar);

        fila.appendChild(cellID);
        fila.appendChild(cellTipo);
        tbody.appendChild(fila);
    }
}

function CargarModalTipoProductos(idProd){

    limpiarModal();

    var opc = "CARGAR_MOD_TIPOPRODUCTO";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "tipoproductos.php?opc=" + opc + "&var1=" + idProd,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            document.getElementById("txtID").value = data[0].IdTipoProducto;
            document.getElementById("selTipo").value = data[0].IdTipoProducto;
        }
    }
}

function EliminarTipoProducto(idProducto){

    if (confirm('Seguro que desea elimar este usuario?')) {
      
        var opc = "ELIMINAR_TIPOPRODUCTO";
        var XHR = new XMLHttpRequest();

        XHR.open(
            "GET",
            "tipoproductos.php?opc=" + opc + "&var1=" + IdTipoProducto,
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

    var idProd = document.getElementById("txtID").value;
    var tipo = document.getElementById("selTipo").value;

    if(tipo == "" ){
        alert("Debe llenar los espacios");
    }else{

        if(idProd == ""){
            RegistrarTipoProducto(idProd, tipo);
        }else{
            EditarTipoProducto(idProd, tipo);
        }
    }
}

function RegistrarTipoProducto(idProd,tipo){

    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO";

    XHR.open(
        "GET",
        "tipoproductos.php?opc=" + opc + "&var1=" + idProd + "&var2=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okRegistro") {
                //console.log(XHR.responseText);
                alert("Tipo de Producto agregado correctamente!!!");
                CargarProductos() 
            } else {
                console.log(XHR.responseText);
                alert("Error al agregar tipo de producto");
                return false;
            }
        }
    }

}

function EditarTipoProducto(idProd, tipo){

    var XHR = new XMLHttpRequest();

    var opc = "EDITAR_TIPOPRODUCTO";

    XHR.open(
        "GET",
        "tipoproductos.php?opc=" + opc + "&var1=" + idProd + "&var2=" +tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okEditar") {
                console.log(XHR.responseText);

                alert("Tipo de producto modificado correctamente!!!");
                CargarProductos();
                return true;

            } else {
                console.log(XHR.responseText);
                alert("Error al modificar tipo de producto");
                return false;
            }
        }
    }
}

function limpiarModal(){

    document.getElementById("txtID").value = "";
    document.getElementById("selTipo").value = 1;

}

function ActualizarTabla(idTipo){

    if(idTipo == 0){
        CargarProductos(2);
    }else{

        var opc = "CARGAR_PRODUCTOS_TIPO";
        var XHR = new XMLHttpRequest();
    
        XHR.open(
            "GET",
            "tipoproductos.php?opc=" + opc + "&var1=" + idTipo,
            true
        );
    
        XHR.send(null);
    
        XHR.onreadystatechange = function () {
            if (XHR.readyState == 4 && XHR.status == 200) {
    
                var data = JSON.parse(XHR.responseText);
                
                CargarTablaProductosClientes(data);
                
            }
        }

    }
}


