async function EliminarResgistroTP(identificador){
    url = "ControladorTP.php";

    data ={
        Identificador : identificador,
        funcion : "Eliminar"
    };

    const response = await fetch(url, {
        method : 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    response.json().then(data =>{
        if(data==1){
            alert("Dato eliminado con éxito"+data);
        } else{
            alert(data);
        }
    });

}

async function AgregarRegistroTP(){
    var nombre = document.getElementById("nombre").value;

    url = "ControladorTP.php";

    data = {
        Nombre : nombre,

        funcion: "Agregar"
    };

    const response = await fetch(url, {
        method : 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    response.json().then(data =>{
        if(data==1){
            alert("Dato Agregado con éxito"+data);
        } else{
            alert(data);
        }
    });
}