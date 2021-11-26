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

            CargarTablaProveedor(data);
        }
    }
}

function CargarTablaProveedor(data){

    tbody = document.querySelector('#tblProveedor tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++){

        var fila = document.createElement('tr'),
        cellNombre = document.createElement('td'),
        cellTelefono = document.createElement('td'),
        cellContacto = document.createElement('td'),
        cellOpciones = document.createElement('td');

        var btnEditar = document.createElement('input');
        btnEditar.type = 'button';
        btnEditar.value = 'Editar';
        btnEditar.id = data[i].idProvedor;
        btnEditar.onclick = function () { CargarModProveedor(this.id) };
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#exampleModal');

        var btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.id = data[i].idProvedor;
        btnEliminar.onclick = function () { EliminarProveedor(this.id) };

        cellNombre.innerHTML = data[i].NombreEmpresa;
        cellTelefono.innerHTML = data[i].TelefonoEmpresa;

        cellContacto.innerHTML = "<b>" +  data[i].Nombre + " " + data[i].Apellidos  + "</b><br><br>Teléfono: " + data[i].Telefono + "<br><br>Correo: " + data[i].Correo;

        cellOpciones.appendChild(btnEditar);
        cellOpciones.appendChild(btnEliminar);

        fila.appendChild(cellNombre);
        fila.appendChild(cellTelefono);
        fila.appendChild(cellContacto);
        fila.appendChild(cellOpciones);

        tbody.appendChild(fila);
    }
}

function limpiarModal(){

    document.getElementById("txtID").value = "";
    document.getElementById("txtNombre").value = "";
}

function CargarUsuarios(){

    var tipo = "CARGAR_USUARIOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "usuarios.php?opc=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var usu = JSON.parse(XHR.responseText);

            var select = document.getElementById('selContacto');

            for (var i = 0; i < usu.length; i++){

                if(usu[i].IdRol == 3){
                    var opt = document.createElement('option');
                    opt.innerHTML = usu[i].Nombre + " " + usu[i].Apellidos;
                    opt.value = usu[i].IdUsuario;
                    select.appendChild(opt);
                }
            }
        }
    }
}

function CargarUsuarios2(){

    var tipo = "CARGAR_USUARIOS";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "usuarios.php?opc=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var usu = JSON.parse(XHR.responseText);
            //console.log(usu);
            return usu;
            /*var select = document.getElementById('selContacto');

            for (var i = 0; i < usu.length; i++){

                if(usu[i].IdRol == 3){
                    var opt = document.createElement('option');
                    opt.innerHTML = usu[i].Nombre + " " + usu[i].Apellidos;
                    opt.value = usu[i].IdUsuario;
                    select.appendChild(opt);
                }
            }*/
        }
    }
}

function CargarModProveedor(id){
    
    limpiarModal();

    var opc = "CARGAR_MOD_PROVEEDOR";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "proveedor.php?opc=" + opc + "&var1=" + id,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);
            
            document.getElementById("txtID").value = data[0].idProvedor;
            document.getElementById("txtNombre").value = data[0].NombreEmpresa;
            document.getElementById("txtTel").value = data[0].TelefonoEmpresa;
            document.getElementById("selContacto").value = data[0].IdUsuario;
        }
    }
}

function ValidarProveedor(){

    var idProveedor =  document.getElementById("txtID").value;
    var nombre =  document.getElementById("txtNombre").value;
    var tel =  document.getElementById("txtTel").value;
    var contacto =  document.getElementById("selContacto").value;

    if(nombre != "" || tel == "" || contacto == ""){

        if(tel.length == 8 ){

            if(idProveedor == ""){
                RegistrarProveedor(nombre, tel, contacto);
            }else{
                ModificarProveedor(nombre, tel, contacto);
            }

        }else{
            alert("El núemro de teléfono debe tener 8 dígitos");
        }
    }else{
        alert("Debe llenar todos los espacios");
    }
}

function ModificarProveedor(idProveedor, nombre, tel, contacto){

    var XHR = new XMLHttpRequest();

    var opc = "MODIFICAR_PROVEEDOR";

    XHR.open(
        "GET",
        "proveedor.php?opc=" + opc + "&var1=" + idProveedor + "&var2=" + nombre + "&var3=" + tel + "&var4=" + contacto,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            console.log(XHR.responseText);

            if (XHR.responseText == "okEditar") {
                
                alert("Proveedor modificado correctamente!!!");
                CargarProveedor();
                //return true;

            }else {
                //console.log(XHR.responseText);
                alert("Error al modificar tipo de producto");
                //return false;
            }
        }
    }
}

function EliminarProveedor(id){

    if (confirm('Seguro que desea elimar este proveedor?')) {
      
        var opc = "ELIMINAR_PROVEEDOR";
        var XHR = new XMLHttpRequest();

        XHR.open(
            "GET",
            "proveedor.php?opc=" + opc + "&var1=" + id,
            true
        );

        XHR.send(null);

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && XHR.status == 200) {

                if (XHR.responseText == "okEliminado") {
                    console.log(XHR.responseText);
                    CargarProveedor();
                    alert("Proveedor elimando!!!");
                    
                } else {
                    console.log("Error al eliminar Proveedor: " + XHR.responseText);
                    alert("Error al eliminiar Proveedor");
                }
            }
        }
    }
}

function RegistrarProveedor(nombre, tel, contacto){

    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO_PROVEEDOR";

    XHR.open(
        "GET",
        "proveedor.php?opc=" + opc + "&var1=" + nombre + "&var2=" + tel + "&var3=" + contacto,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okRegistro") {
                //console.log(XHR.responseText);
                alert("Proveedor agregado correctamente!!!");
                CargarProveedor();
            } else {
                console.log(XHR.responseText);
                alert("Error al agregar proveedor");
                //return false;
            }
        }
    }
}