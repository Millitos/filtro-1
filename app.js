//MODULO 1------------------------------------------------------

//1.
var listaClientes = [];

var editando = false;

var idElementoClickeado = "";

//2.inputs,form,btones

//form
const formulario = document.querySelector("#form-clientes");

const inputNit = document.querySelector("#nit");
const inputNombres = document.querySelector("#nombres");
const inputApellidos = document.querySelector("#apellidos");
const inputTelefono = document.querySelector("#telefono");
const inputEmail = document.querySelector("#email");
const inputNacimiento = document.querySelector("#nacimiento");
const inputNacionalidad = document.querySelector("#nacionalidad");

//listeners
formulario.addEventListener('submit',validarFormulario);


//funciones
function validarFormulario(e){
    e.preventDefault();

    //validar
    if(inputNit.value === "" || inputNombres.value === ""|| inputApellidos.value === ""|| inputTelefono.value === ""||
    inputEmail.value === ""|| inputNacimiento.value === "" || inputNacionalidad.value === ""){
        alert("Todos los campos son obligatorios!");
        return;
    }

    //editar cliente
    if(editando){
        editarCliente();
        editando = false;
    //si no, lo agrega
    }else{
        const objCliente = objCreator(Date.now(),inputNit.value,inputNombres.value,
        inputApellidos.value,inputTelefono.value,inputEmail.value,inputNacimiento.value,inputNacionalidad.value,0);

        agregarCliente(objCliente); //pasa el obj creado a la funcion de agg
    }
}

//agg cliente a la lista y llama la funcion que lo muestra en el html
function agregarCliente(objCliente){
    listaClientes.push(objCliente);

    mostrarClientes(listaClientes);

    formulario.reset();
    
    listarClientesSelect();
    //console.log(listaClientes);
    mostrarPuntos(listaClientes);
}

//muestra los elementos en el html dinamicamente
function mostrarClientes(listaClientes){

    limpiarHTML();

    const tbodyClientes = document.querySelector("#tbody-clientes");

    listaClientes.forEach((cliente) =>{
        //desestructuro
        const {id,nit,nombres,apellidos,telefono,email,nacimiento,nacionalidad,puntos} = cliente;

        const trBody = document.createElement("tr");
        trBody.setAttribute("id",id);
        trBody.innerHTML = `<th scope="row">${id}</th>
                            <td>${nit}</td>
                            <td>${nombres}</td>
                            <td>${apellidos}</td>
                            <td>${telefono}</td>
                            <td>${email}</td>
                            <td>${nacimiento}</td>
                            <td>${nacionalidad}</td>`;

        //botones
        //editar
        const editarBoton = document.createElement("button");
        editarBoton.onclick = () => cargarClientes(cliente); //cargarClientes guarda el cliente al cual yo le de click al btn editar
        editarBoton.textContent = "Editar";
        editarBoton.classList.add("btn","btn-secondary");
        trBody.append(editarBoton);

        //eliminar
        const eliminarBoton = document.createElement("button");
        eliminarBoton.onclick = () => eliminarCliente(id);
        eliminarBoton.textContent = "Eliminar";
        eliminarBoton.classList.add("btn","btn-danger");
        trBody.append(eliminarBoton);

        tbodyClientes.appendChild(trBody);

    });

};

//cargarCliente() guarda el elemento segun el cual yo le haya dado click
//cada btn tiene un unico cliente
function cargarClientes(cliente){
    const {id,nit,nombres,apellidos,telefono,email,nacimiento,nacionalidad} = cliente;

    inputNit.value = nit;
    inputNombres.value = nombres;
    inputApellidos.value = apellidos;
    inputTelefono.value = telefono;
    inputEmail.value = email;
    inputNacimiento.value = nacimiento;
    inputNacionalidad.value = nacionalidad;

    //guardo el id para poder editar el elemento de la lista
    idElementoClickeado = id;

    //cambio el text del btn a actulizar
    formulario.querySelector('button[type="submit"]').textContent = "Actualizar";

    editando = true; //cambio la flag para entrar a editar

};

function editarCliente(){
    listaClientes.map(cliente=>{
        if(cliente.id === idElementoClickeado){
            cliente.id = idElementoClickeado;
            cliente.nit = inputNit.value;
            cliente.nombres = inputNombres.value;
            cliente.apellidos = inputApellidos.value;
            cliente.telefono = inputTelefono.value;
            cliente.email = inputEmail.value;
            cliente.nacimiento = inputNacimiento.value;
            cliente.nacionalidad = inputNacionalidad.value;
        }
    });

    limpiarHTML();
    mostrarClientes(listaClientes);

    formulario.reset();

    formulario.querySelector("button[type='submit']").textContent = "Agregar";

    editando = false;

    listarClientesSelect();

    mostrarPuntos(listaClientes);

}

function eliminarCliente(id){
    //reasigna a la lista todos los clientes diferentes al cliente
    //al cual le doy click al btn eliminar, asi lo saca de la lista
    listaClientes = listaClientes.filter( cliente=> cliente.id !== id);

    limpiarHTML();
    mostrarClientes(listaClientes);

    listarClientesSelect();

    mostrarPuntos(listaClientes);
}

//funcion para crear objetos
const objCreator = (id,nit,nombres,apellidos,telefono,email,nacimiento,nacionalidad,puntos)=>({id,nit,nombres,apellidos,telefono,email,nacimiento,nacionalidad,puntos})

//funcion para limpiar el tbody de clientes en el html
function limpiarHTML(){
    const tbodyClientes = document.querySelector("#tbody-clientes");
    tbodyClientes.innerHTML = "";
};

//buscar
const searchInput = document.querySelector("#search-input");
const btnBuscar = document.querySelector("#btnBuscar");

//crea una nueva lista con los clientes que cumplen dicha condicion de busqueda
btnBuscar.addEventListener('click', function(e){
    e.preventDefault();

    let nuevaListaClientes = [];
    listaClientes.forEach((cliente)=>{
        if(cliente.nit === searchInput.value || cliente.nombres === searchInput.value
             || cliente.apellidos === searchInput.value){  
            nuevaListaClientes.push(cliente);
        }
    });
    console.log(nuevaListaClientes);
    limpiarHTML();
    mostrarClientes(nuevaListaClientes);

})

//muestra nuevamente la lista completa cuando borro los caracteres del input buscar
searchInput.addEventListener('input',function(e){
    e.preventDefault()
    if(e.target.value === ""){
        limpiarHTML();
        mostrarClientes(listaClientes);
    }
})


//MODULO 2------------------------------------------------------

var listaJuegos = [];

var idJuegoClikeado = "";

//inputs, form, btones

const formularioGestionVj = document.querySelector("#form-gestion-vj");

const inputNombreVj = document.querySelector("#nombre-vj");
const inputTematicaVj = document.querySelector("#tematica-vj");
const inputValorLicenciaVj = document.querySelector("#valor-licencia-vj");
const inputPuntosVj = document.querySelector("#puntos-vj");

formularioGestionVj.addEventListener('submit',validarFormularioVj);

function validarFormularioVj(e){
    e.preventDefault();

    //validar 
    if(inputNombreVj.value === "" || inputTematicaVj.value === "" 
    || inputValorLicenciaVj.value === "" || inputPuntosVj.value === ""){
        alert("Todos los campos son obligatorios!");
        return;
    }else{
        const objJuego = vjCreator(Date.now(),inputNombreVj.value,inputTematicaVj.value,
        inputValorLicenciaVj.value,inputPuntosVj.value);

        agregarJuego(objJuego);

    }

};

function agregarJuego(objJuego){
    listaJuegos.push(objJuego);

    mostrarJuegos(listaJuegos);

    formularioGestionVj.reset();

    listarJuegosSelect();
}

function mostrarJuegos(listaJuegos){

    limpiarHTMLJuegos();

    const tbodyVj = document.querySelector("#tbody-gestion-vj");

    listaJuegos.forEach((juego)=>{
        //desesctructuro
        const {idVj,nombreVj,tematicaVj,valorLicenciaVj,puntosVj} = juego;

        const trBodyVj = document.createElement("tr");
        trBodyVj.setAttribute("id",idVj);
        trBodyVj.innerHTML =`<th scope="row">${idVj}</th>
                            <td>${nombreVj}</td>
                            <td>${tematicaVj}</td>
                            <td>${valorLicenciaVj}</td>
                            <td>${puntosVj}</td>`;

        //botones
        //eliminar
        const eliminarBotonVj = document.createElement("button");
        eliminarBotonVj.onclick = () => eliminarJuego(idVj);
        eliminarBotonVj.textContent = "Eliminar";
        eliminarBotonVj.classList.add("btn","btn-danger");
        trBodyVj.append(eliminarBotonVj);

        tbodyVj.appendChild(trBodyVj);
    });
}

function eliminarJuego(idVj){
    listaJuegos = listaJuegos.filter(juego => juego.idVj !== idVj);

    limpiarHTMLJuegos();
    mostrarJuegos(listaJuegos);

    listarJuegosSelect();
}

//funcion para crear obj video juegos
const vjCreator = (idVj,nombreVj,tematicaVj,valorLicenciaVj,puntosVj) =>({idVj,nombreVj,tematicaVj,valorLicenciaVj,puntosVj});

//funcion para limpiar tbody de gestion vj
function limpiarHTMLJuegos(){
    const tbodyVj = document.querySelector("#tbody-gestion-vj");
    tbodyVj.innerHTML = "";
}


//modulo 3---------------------------------------------------------------------

//guarda los puntos del juego
var puntosJuego ="";

//lleno dinamicamente el select clientes
function listarClientesSelect(){

    limpiarOptionsSelectClientes();
    listaClientes.forEach((cliente)=>{
        const option = document.createElement("option");
        option.value = cliente.nombres+ " "+cliente.apellidos;
        option.textContent = cliente.nombres+" "+cliente.apellidos;
        document.querySelector("#nombreCliente").appendChild(option);
    })
}

//lleno dinamicamente el select de juegos
function listarJuegosSelect(){
    limpiarOptionsSelectJuegos();
    listaJuegos.forEach((juego)=>{
        const option = document.createElement("option");
        option.value = juego.nombreVj;
        option.textContent = juego.nombreVj;
        document.querySelector("#nombreJuego").appendChild(option);
    })
}


function limpiarOptionsSelectClientes(){
    const selectNombres = document.querySelector("#nombreCliente");
    selectNombres.innerHTML = "";
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Clientes";
    selectNombres.appendChild(option);
}


function limpiarOptionsSelectJuegos(){
    const selectJuegos = document.querySelector("#nombreJuego");
    selectJuegos.innerHTML ="";
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "VideoJuegos";
    selectJuegos.appendChild(option);
}



const formularioCompraVj = document.querySelector("#form-compra-vj");
const nombreJuego = document.querySelector("#nombreJuego");
const containerCards = document.querySelector("#cardsContainer");

//evento que llena el input del valor cada vez que selecciono un option
nombreJuego.addEventListener('input',function(e){
    console.log(e.target.value);

    if(e.target.value !== ""){
        listaJuegos.forEach((juego)=>{
            if(juego.nombreVj === e.target.value){
                const inputValor = document.querySelector("#valorVj");
                inputValor.value = parseFloat(juego.valorLicenciaVj) +
                juego.valorLicenciaVj*0.16 + (0.04*juego.valorLicenciaVj);
                
                puntosJuego = juego.puntosVj; //asigno los puntos del juego clickeado a una var 
                console.log(puntosJuego);
            }
        })
    }
});

formularioCompraVj.addEventListener('submit',function(e){
    e.preventDefault();
    
    const optionCliente = document.querySelector("#nombreCliente").value;
    const optionJuego = document.querySelector("#nombreJuego").value;
    const valorJuego = document.querySelector("#valorVj").value;
    //console.log(optionCliente);
    const card = document.createElement("div");
    card.classList.add('card','text-bg-info','mb-3');
    card.style = 'max-width:18rem';
    card.style = 'margin:5px';

    card.innerHTML = `<div class="card-header">
                                    <h5 class="card-title">${optionJuego}</h5>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li>${optionCliente}</li>
                                        <li>${valorJuego}</li>
                                    </ul>
                                </div>`;

    containerCards.appendChild(card);

    formularioCompraVj.reset();

    asignarPuntos(optionCliente);

})

//asigna los puntos al cliente respectivamente
function asignarPuntos(optionCliente){
    listaClientes.forEach((cliente)=>{
        if(cliente.nombres+" "+cliente.apellidos === optionCliente){
            cliente.puntos += parseFloat(puntosJuego);
        }
    })

    mostrarPuntos(listaClientes);
}


//MODULO 4 - FIDELIZACIÓN ---------------------------------------------------------------------
function mostrarPuntos(listaClientes){

    limpiarTablaFidelizacion();

    const tbodyFidelizacion = document.querySelector("#tbody-fidelizacion");

    listaClientes.forEach((cliente)=>{
        const {id,nombres,apellidos,puntos} = cliente;

        const trFidelizacion = document.createElement("tr");
        trFidelizacion.setAttribute("id",id);
        trFidelizacion.innerHTML = `<th scope="row">${id}</th>
                                    <td>${nombres}</td>
                                    <td>${apellidos}</td>
                                    <td>${puntos}</td>`;
        tbodyFidelizacion.appendChild(trFidelizacion);
    });


}

function limpiarTablaFidelizacion(){
    const tbodyFidelizacion = document.querySelector("#tbody-fidelizacion");
    tbodyFidelizacion.innerHTML ="";
}