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

            CargarTablaTipos(data);
        }
    }
}

function CargarTablaTipos(data){

    tbody = document.querySelector('#tblTiposProductos tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++){

        var fila = document.createElement('tr'),
        cellNombre = document.createElement('td'),
        cellOpciones = document.createElement('td');

        var btnEditar = document.createElement('input');
        btnEditar.type = 'button';
        btnEditar.value = 'Editar';
        btnEditar.id = data[i].IdTipoProducto;
        btnEditar.onclick = function () { CargarModalTipos(this.id) };
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#exampleModal');

        var btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.id = data[i].IdTipoProducto;
        btnEliminar.onclick = function () { EliminarTipo(this.id) };

        cellNombre.innerHTML = data[i].NombreTipoProducto;
        cellOpciones.appendChild(btnEditar);
        cellOpciones.appendChild(btnEliminar);

        fila.appendChild(cellNombre);
        fila.appendChild(cellOpciones);

        tbody.appendChild(fila);
    }
}

function limpiarModal(){

    document.getElementById("txtID").value = "";
    document.getElementById("txtNombre").value = "";
}

function CargarModalTipos(idTipo){
    
    limpiarModal();

    var opc = "CARGAR_MOD_TIPOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "tipoProducto.php?opc=" + opc + "&var1=" + idTipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);
            
            document.getElementById("txtID").value = data[0].IdTipoProducto;
            document.getElementById("txtNombre").value = data[0].NombreTipoProducto;
        }
    }
}

function ValidarTipo(){

    var idTipo =  document.getElementById("txtID").value;
    var tipo =  document.getElementById("txtNombre").value;

    if(tipo != ""){

        if(idTipo == ""){
            RegistrarTipo(tipo);
        }else{
            
            ModificarTipo(idTipo, tipo);
        }

    }else{
        alert("Debe llenar el espacio");
    }
}

function ModificarTipo(idTipo, tipo){

    var XHR = new XMLHttpRequest();

    var opc = "MODIFICAR_TIPO";

    XHR.open(
        "GET",
        "tipoProducto.php?opc=" + opc + "&var1=" + idTipo + "&var2=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            console.log(XHR.responseText);
            alert("Tipo de producto modificado correctamente!!!");
            CargarTipos();
            /*if (XHR.responseText == "okEditar") {
                
                alert("Tipo de producto modificado correctamente!!!");
                CargarTipos();
                //return true;

            }else {
                //console.log(XHR.responseText);
                alert("Error al modificar tipo de producto");
                //return false;
            }*/
        }
    }
}

function EliminarTipo(idTipo){

    if (confirm('Seguro que desea elimar este tipo de producto?')) {
      
        var opc = "ELIMINAR_TIPO";
        var XHR = new XMLHttpRequest();

        XHR.open(
            "GET",
            "tipoProducto.php?opc=" + opc + "&var1=" + idTipo,
            true
        );

        XHR.send(null);

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && XHR.status == 200) {

                console.log(XHR.responseText);
                CargarTipos();
                alert("Tipo de Producto elimando!!!");

                /*if (XHR.responseText == "okEliminado") {
                    console.log(XHR.responseText);
                    CargarTipos();
                    alert("Tipo de Producto elimando!!!");
                    
                } else {
                    console.log("Error al eliminar Tipo de Producto: " + XHR.responseText);
                    alert("Error al eliminiar Tipo producto");
                }*/
            }
        }
    }
}

function RegistrarTipo(tipo){


    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO_TIPO";

    XHR.open(
        "GET",
        "tipoProducto.php?opc=" + opc + "&var1=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            /*console.log(XHR.responseText);
            alert("Tipo de producto modificado correctamente!!!");
            CargarTipos();*/

            if (XHR.responseText == "okRegistro") {
                //console.log(XHR.responseText);
                alert("Tipo de Producto agregado correctamente!!!");
                CargarTipos();
            } else {
                console.log(XHR.responseText);
                alert("Error al agregar tipo producto");
                return false;
            }
        }
    }

}