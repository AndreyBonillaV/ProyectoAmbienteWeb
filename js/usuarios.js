function Login(){

    var correo = document.getElementById("txtCorreo");
    var password = document.getElementById("txtContra");

    if(correo.value == "" || password.value == ""){
        alert("Debe llenar todos los campos");
    }else{
        if (ValidarCorreo(correo.value)){
            validarUsuario(correo.value, password.value);
        }else{
            alert("Correo electrónico invalido");
            correo.focus();
        }
    }

}

function ValidarCorreo(correo){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(correo.match(mailformat)){
        console.log("Correo Valido");
        return true;

    }else{
        console.log("Correo invalido");
        return false;
    }
}

function validarUsuario(correo, password){

    var XHR = new XMLHttpRequest();

    var opc = "LOGIN";

    XHR.open(
        "GET",
        "usuarios.php?opc=" + opc + "&var1=" + correo + "&var2=" + password,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText != "Error") {
                console.log(XHR.responseText);
                
                var cadena = XHR.responseText.split("_");
                sessionStorage.setItem("idUsuario", cadena[0]);
                sessionStorage.setItem("Cedula", cadena[1]);
                sessionStorage.setItem("IdRol", cadena[2]);

                window.location.href = "index.html";

            } else {
                alert("Correo o Contraseña Incorrectas");
            }
        }
    }
}

function PreparaRegistro(){

    var cedula = document.getElementById("txtCedula");
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    var fecha = document.getElementById("txtFecha");
    var tel = document.getElementById("txtTel");
    var correo = document.getElementById("txtCorreo");
    var password = document.getElementById("txtContra");
    var password2 = document.getElementById("txtContra2");

    if(cedula.value == "" || nombre.value == "" || apellido.value == "" || fecha.value == "" 
    || tel.value == "" || correo.value == "" || password.value == "" || password2.value == ""){
        alert("Debe llenar todos los campos");
    }else{

        if (tel.value.length > 8 || tel.value.length < 8){
            alert("Número de teléfono invalido, debe tener 8 dígitos");
            tel.focus();
        }else {
            if (ValidarCorreo(correo.value)){

                if (password.value != password2.value){
                    alert("Las contraseñas no coinciden");
                    password.focus();
                }else{

                    //REVISAR VALIDACION DE EXISTENCIA DE USUARIO

                    var XHR = new XMLHttpRequest();

                    var opc = "EXISTE";
                
                    XHR.open(
                        "GET",
                        "usuarios.php?opc=" + opc + "&var1=" + cedula + "&var2=" + correo,
                        true
                    );
                
                    XHR.send(null);
                
                    XHR.onreadystatechange = function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                
                            if (XHR.responseText == "NoExiste") {
                                console.log(XHR.responseText);
                                
                                Registro(cedula.value, nombre.value, apellido.value, fecha.value, tel.value, correo.value, password.value);
                                                                
                            } else {
                                console.log(XHR.responseText);
                                alert("Ya existe un usuario con la cédula o correo digitados");
                            }
                        }
                    }
                }
            }else{
                alert("Correo electrónico invalido");
                correo.focus();
            }
        }
    }
}

//REVISAR MÉTODO Y VALIDACION
//Valida la existencia de la cédula o correo en la BD
function ValidarExistencia(cedula, correo){
    var XHR = new XMLHttpRequest();

    var opc = "EXISTE";

    XHR.open(
        "GET",
        "usuarios.php?opc=" + opc + "&var1=" + cedula + "&var2=" + correo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            console.log("SERVER: " + XHR.responseText);

            if (XHR.responseText == "NoExiste") {
                console.log(XHR.responseText);
                return true;
                
            } else {
                console.log(XHR.responseText);
                alert("Ya existe un usuario con la cédula o correo digitados");
                return false;
                
            }
        }
    }
}

//Envia los datos del usuario para ser almecenados en la BD 
function Registro(cedula, nombre, apellido, fecha, tel, correo, password){
    var XHR = new XMLHttpRequest();

    var opc = "REGISTRO";

    XHR.open(
        "GET",
        "usuarios.php?opc=" + opc + "&var1=" + cedula + "&var2=" + nombre + "&var3=" + apellido + 
        "&var4=" + fecha + "&var5=" + tel + "&var6=" + correo + "&var7=" + password,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            if (XHR.responseText == "okRegistro") {
                //console.log(XHR.responseText);
                alert("Usuario agregado correctamente!!!");
                return true;
            } else {
                //console.log(XHR.responseText);
                alert("Error al agregar usuario");
                return false;
            }
        }
    }
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

            var data = JSON.parse(XHR.responseText);

            CargarTablaClientes(data);
            CargarTablaProveedores(data);
            CargarTablaAdmins(data);

        }
    }
}

function CargarTablaClientes(data){

    tbody = document.querySelector('#tblClientes tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++){

        if(data[i].IdRol == 2){ 

            var fila = document.createElement('tr'),
            cellCedula = document.createElement('td'),
            cellNombre = document.createElement('td'),
            cellTel = document.createElement('td'),
            cellCorreo = document.createElement('td'),
            cellOpciones= document.createElement('td');

            var btnEditar = document.createElement('input');
            btnEditar.type = 'button';
            btnEditar.value = 'Editar';
            btnEditar.id = data[i].IdUsuario;
            btnEditar.onclick = function(){CargarModal(this.id)};
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#exampleModal');

            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.value = 'Eliminar';
            btnEliminar.id = data[i].IdUsuario;
            btnEliminar.onclick = function(){EliminarUsuario(this.id)};

            cellCedula.innerHTML = data[i].Cedula;
            cellNombre.innerHTML = data[i].Nombre + " " + data[i].Apellidos;
            cellTel.innerHTML = data[i].Telefono;
            cellCorreo.innerHTML = data[i].Correo;

            cellOpciones.appendChild(btnEditar);
            cellOpciones.appendChild(btnEliminar);

            fila.appendChild(cellCedula);
            fila.appendChild(cellNombre);
            fila.appendChild(cellTel);
            fila.appendChild(cellCorreo);
            fila.appendChild(cellOpciones);

            tbody.appendChild(fila);
        }
    }
}

function CargarTablaProveedores(data){

    tbody = document.querySelector('#tblProveedores tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++){

        if(data[i].IdRol == 3){ 

            var fila = document.createElement('tr'),
            cellCedula = document.createElement('td'),
            cellNombre = document.createElement('td'),
            cellTel = document.createElement('td'),
            cellCorreo = document.createElement('td'),
            cellOpciones= document.createElement('td');

            var btnEditar = document.createElement('input');
            btnEditar.type = 'button';
            btnEditar.value = 'Editar';
            btnEditar.id = data[i].IdUsuario;
            btnEditar.onclick = function(){CargarModal(this.id)};
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#exampleModal');

            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.value = 'Eliminar';
            btnEliminar.id = data[i].IdUsuario;
            btnEliminar.onclick = function(){EliminarUsuario(this.id)};

            cellCedula.innerHTML = data[i].Cedula;
            cellNombre.innerHTML = data[i].Nombre + " " + data[i].Apellidos;
            cellTel.innerHTML = data[i].Telefono;
            cellCorreo.innerHTML = data[i].Correo;

            cellOpciones.appendChild(btnEditar);
            cellOpciones.appendChild(btnEliminar);

            fila.appendChild(cellCedula);
            fila.appendChild(cellNombre);
            fila.appendChild(cellTel);
            fila.appendChild(cellCorreo);
            fila.appendChild(cellOpciones);

            tbody.appendChild(fila);
        }
    }
}

function CargarTablaAdmins(data){

    tbody = document.querySelector('#tblAdmins tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++){

        if(data[i].IdRol == 1){ 

            var fila = document.createElement('tr'),
            cellCedula = document.createElement('td'),
            cellNombre = document.createElement('td'),
            cellTel = document.createElement('td'),
            cellCorreo = document.createElement('td'),
            cellOpciones= document.createElement('td');

            var btnEditar = document.createElement('input');
            btnEditar.type = 'button';
            btnEditar.value = 'Editar';
            btnEditar.id = data[i].IdUsuario;
            btnEditar.onclick = function(){CargarModal(this.id)};
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#exampleModal');

            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.value = 'Eliminar';
            btnEliminar.id = data[i].IdUsuario;
            btnEliminar.onclick = function(){EliminarUsuario(this.id)};

            cellCedula.innerHTML = data[i].Cedula;
            cellNombre.innerHTML = data[i].Nombre + " " + data[i].Apellidos;
            cellTel.innerHTML = data[i].Telefono;
            cellCorreo.innerHTML = data[i].Correo;

            cellOpciones.appendChild(btnEditar);
            cellOpciones.appendChild(btnEliminar);

            fila.appendChild(cellCedula);
            fila.appendChild(cellNombre);
            fila.appendChild(cellTel);
            fila.appendChild(cellCorreo);
            fila.appendChild(cellOpciones);

            tbody.appendChild(fila);
        }
    }
}

function EliminarUsuario(IdUsuario){

    if (confirm('Seguro que desea elimar este usuario?')) {
      
        var opc = "ELIMINAR_USUARIO";
        var XHR = new XMLHttpRequest();

        XHR.open(
            "GET",
            "usuarios.php?opc=" + opc + "&var1=" + IdUsuario,
            true
        );

        XHR.send(null);

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && XHR.status == 200) {

                if (XHR.responseText == "okEliminado") {
                    console.log(XHR.responseText);
                    alert("Usuario elimando!!!");
                    CargarUsuarios();
                } else {
                    console.log("Error al eliminar usuario: " + XHR.responseText);
                    alert("Error al eliminiar usuario");
                }
            }
        }
    }
}

function CargarModal(IdUsuario){

    var opc = "CARGAR_MOD_USUARIO";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "usuarios.php?opc=" + opc + "&var1=" + IdUsuario,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var data = JSON.parse(XHR.responseText);

            document.getElementById("txtID").value = data[0].IdUsuario;
            document.getElementById("txtCedula").value = data[0].Cedula;
            document.getElementById("txtNombre").value = data[0].Nombre;
            document.getElementById("txtApellido").value = data[0].Apellidos;
            document.getElementById("txtFecha").value = data[0].FechaNacimiento;
            document.getElementById("txtTel").value = data[0].Telefono;
            document.getElementById("txtCorreo").value = data[0].Correo;
            document.getElementById("txtContra").value = data[0].Contrasena;
            document.getElementById("txtContra2").value = data[0].Contrasena;
            document.getElementById('selRoles').value = data[0].IdRol;

        }
    }
}

function EditarUsuario(){

    //var IdUsuario = document.getElementById("txtID").value;
    var cedula = document.getElementById("txtCedula");
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    var fecha = document.getElementById("txtFecha");
    var tel = document.getElementById("txtTel");
    var correo = document.getElementById("txtCorreo");
    var password = document.getElementById("txtContra");
    var password2 = document.getElementById("txtContra2");
    var rol = document.getElementById('selRoles');

    if(cedula.value == "" || nombre.value == "" || apellido.value == "" || fecha.value == "" 
    || tel.value == "" || correo.value == "" || password.value == "" || password2.value == "" || rol.value == ""){
        alert("Debe llenar todos los campos");
    }else{

        if (tel.value.length > 8 || tel.value.length < 8){
            alert("Número de teléfono invalido, debe tener 8 dígitos");
            tel.focus();
        }else {
            if (ValidarCorreo(correo.value)){

                if (password.value != password2.value){
                    alert("Las contraseñas no coinciden");
                    password.focus();
                }else{

                    var XHR = new XMLHttpRequest();

                    var opc = "EDITAR_USUARIO";
                
                    XHR.open(
                        "GET",
                        "usuarios.php?opc=" + opc + "&var1=" + cedula.value + "&var2=" + nombre.value + "&var3=" + apellido.value + 
                        "&var4=" + fecha.value + "&var5=" + tel.value + "&var6=" + correo.value + "&var7=" + password.value + "&var8=" + rol.value,
                        true
                    );
                
                    XHR.send(null);
                
                    XHR.onreadystatechange = function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                
                            if (XHR.responseText == "okEditar") {
                                console.log(XHR.responseText);

                                alert("Usuario modificado correctamente!!!");
                                CargarUsuarios();
                                return true;

                            } else {
                                console.log(XHR.responseText);
                                alert("Error al modificar usuario");
                                return false;
                            }
                        }
                    }
                }
            }else{
                alert("Correo electrónico invalido");
                correo.focus();
            }
        }
    }
}

function ValidarRolUsuario(){

    var IdRol = sessionStorage.getItem("IdRol");
    console.log(IdRol);

    if(IdRol == 1){
        document.getElementById("AdminMenu").style.display  = "block";
        document.getElementById("ProvMenu").style.display  = "block";

        document.getElementById("btnCerrar").style.display  = "block";
        document.getElementById("btnIniciar").style.display  = "none";
        document.getElementById("btnRegistro").style.display  = "none";

    }else if(IdRol == 2){

        document.getElementById("btnCerrar").style.display  = "block";
        document.getElementById("btnIniciar").style.display  = "none";
        document.getElementById("btnRegistro").style.display  = "none";

    }else if (IdRol == 3){
        document.getElementById("ProvMenu").style.display  = "block";

        document.getElementById("btnCerrar").style.display  = "block";
        document.getElementById("btnIniciar").style.display  = "none";
        document.getElementById("btnRegistro").style.display  = "none";
    }


}

function CerrarSesion(){

    //var IdRol = sessionStorage.getItem("IdRol");

    document.getElementById("AdminMenu").style.display  = "none";
    document.getElementById("ProvMenu").style.display  = "none";
    document.getElementById("btnCerrar").style.display  = "none";
    
    document.getElementById("btnIniciar").style.display  = "block";
    document.getElementById("btnRegistro").style.display  = "block";

    sessionStorage.clear();
}

function CargarRoles(){

    var tipo = "CARGAR_ROLES";
    var XHR = new XMLHttpRequest();

    XHR.open(
        "GET",
        "usuarios.php?opc=" + tipo,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {

            var roles = JSON.parse(XHR.responseText);

            //console.log(roles);
            //console.log(roles.length);

            var select = document.getElementById('selRoles');

            for (var i = 0; i < roles.length; i++){

                var opt = document.createElement('option');
                opt.innerHTML = roles[i].NombreRol;
                opt.value = roles[i].IdRol;
                select.appendChild(opt);
            }

        }
    }
}