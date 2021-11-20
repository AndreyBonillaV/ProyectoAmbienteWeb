var Carrito = [];
var ArticulosCarrito = [];

function AgregarCarrito(idProducto){
    var existe = false;

    if(Carrito.length > 0){
        for(var i = 0; i < Carrito.length; i++){
            if(Carrito[i] == idProducto){
                existe = true;
            }
        }
    }

    if(!existe){

        var nuevoProducto = []
        nuevoProducto.push(idProducto);
        Carrito.push(nuevoProducto);
        //console.log(Carrito);
        sessionStorage.setItem("Carrito", JSON.stringify(Carrito));
        alert("Producto agregado al carrito");
        
    }else{
        alert("Ya agregó este producto al carrito, puede aumentar la cantidad visualizando el carrito");
    }
}

function PreparaCarrito(){

    var ListaCarrito = JSON.parse(sessionStorage.getItem('Carrito'));

    for (var i = 0; i < ListaCarrito.length; i++){
        test(ListaCarrito[i][0]);
    }
}

function test(idProd){

    var XHR = new XMLHttpRequest();
    var opc = "CARGAR_MOD_PRODUCTO";

    XHR.open(
        "GET",
        "productos.php?opc=" + opc + "&var1=" + idProd,
        true
    );

    XHR.send(null);

    XHR.onreadystatechange = function() {

        if (XHR.readyState == 4 && XHR.status == 200) {
            //console.log(cont++);
            if (XHR.responseText != "Error") {

                /*console.log("response");
                console.log(JSON.parse(XHR.responseText));

                console.log("--------------------------------");

                ArticulosCarrito.push(JSON.parse(XHR.responseText));
                console.log("carrito");
                console.log(ArticulosCarrito);

                console.log("--------------------------------");*/

                var data = JSON.parse(XHR.responseText);
                console.log(data);

            } else {
                console.log(XHR.responseText);
                alert("Error al cargar carrito");
            }
        }
    }
}