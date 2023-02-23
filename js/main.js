function guardarProducto(llave, valorAGuardar){
    localStorage.setItem(llave, JSON.stringify(valorAGuardar))
}
function obtenerProducto(llave){
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}
let productos = obtenerProducto("productos") || [];
let mensaje = document.getElementById("mensaje");

// Añadir un producto
const añadirProducto =  document.getElementById("productoAñadir");
const añadirValor =  document.getElementById("valorAñadir");
const añadirExistencia =  document.getElementById("existenciasAñadir");
const añadirImagen =  document.getElementById("imagenAñadir"); 

document.getElementById("botonAñadir").addEventListener("click", function (event){
    event.preventDefault()
    console.log("detecto boton")
    let productoAñadir = añadirProducto.value
    let valorAñadir = añadirValor.value
    let existenciasAñadir = añadirExistencia.value
    let imagenAñadir = añadirImagen.value

    let flag = true;

    if (productoAñadir == "" || valorAñadir == "" || existenciasAñadir == "" || imagenAñadir == ""){
        mensaje.classList.add("llenarCampos")
        setTimeout(() => {mensaje.classList.remove("llenarCampos")}, 2500);
        flag = false;
        console.log("error1")
    }
    else {
        for(let i = 0; i < productos.length ; i++){
            if(productos[i].nombre == productoAñadir){
                mensaje.classList.add("repetidoError");
                setTimeout(() => {mensaje.classList.remove("repetidoError")}, 2500);
                flag = false;
                console.log("error2")
            }
        } 
    }


    if(flag == true){
        productos.push({
            nombre: productoAñadir,
            valor: valorAñadir,
            existencia: existenciasAñadir,
            urlImagen: imagenAñadir
    
        })

        mensaje.classList.add("realizado")
        setTimeout(() => {
            mensaje.classList.remove("repetidoError")
            window.location.reload()
        }, 1500);
        console.log("Producto aadido")
    }
    guardarProducto('productos', productos);
    
})

//Editar

const productoEd = document.getElementById("productoEditar")
const atributoEd = document.getElementById("atributoEditar")
const nuevoAtributoEd = document.getElementById("nuevoAtributo")

document.getElementById("botonEditar").addEventListener("click", function(event){
    event.preventDefault()
    let productoEditar = productoEd.value
    let atributoEditar = atributoEd.value
    let nuevoAtributo = nuevoAtributoEd.value
    let flag = false

    if (productoEditar == "" || atributoEditar == "" || nuevoAtributo == ""){
        mensaje.classList.add("llenarCampos")
        setTimeout(() => {mensaje.classList.remove("llenarCampos")}, 2500);
    }
    else{
        for (let i = 0; i < productos.length; i++){
            if (productos[i].nombre == productoEditar){
                productos[i][atributoEditar] = nuevoAtributo
                flag = true
                console.log("editado")
            }
        }

        if(flag == true){
            mensaje.classList.add("realizado")
        setTimeout(() => {
            mensaje.classList.remove("repetidoError")
            window.location.reload()
        }, 1500);
        console.log("Producto actualizado")
        }else{
            mensaje.classList.add("noExisteError")
            setTimeout(() => {mensaje.classList.remove("noExisteError")}, 2500)
        }
        guardarProducto('productos', productos);
    }
})

//Eliminar

const productoE = document.getElementById("productoEliminar")

document.getElementById("botonEliminar").addEventListener("click", function(event){
    event.preventDefault()
    let productoEliminar = productoE.value
    let flag = false

    for (let i = 0; i < productos.length; i++){
        if (productos[i].nombre == productoEliminar){
            productos.splice(i, 1)
            flag = true
        } 
    }
    if(flag == true){
        mensaje.classList.add("realizado")
    setTimeout(() => {
        mensaje.classList.remove("repetidoError")
        window.location.reload()
    }, 1500);
    console.log("Producto actualizado")
    }else{
        mensaje.classList.add("noExisteError")
        setTimeout(() => {mensaje.classList.remove("noExisteError")}, 2500)
    }
    guardarProducto("productos", productos);
})

//mostrar productos
window.addEventListener("load", () =>{
    const productoEd = document.getElementById("productoEditar")
    const productoEl = document.getElementById("productoEliminar")
    for (let i = 0; i < productos.length; i++){
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`
        productoEl.innerHTML += `<option>${productos[i].nombre}</option>`
    }
    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option> ${element}</option>`
    });
    let mostrarProductos = document.getElementById("mostrarProductos")
    mostrarProductos.innerHTML = ""
    for (let i = 0; i < productos.length; i++){
        mostrarProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">Precio:  ${productos[i].valor}</p> Existencia:${productos[i].existencia}<p></p></div></div>`
    }
})