class Cliente {
    constructor(id, nombre, correo) {
        this.id = id
        this.nombre = nombre
        this.correo = correo
    }
}

class Nodo {
    constructor(obj) {
        this.obj = obj
        this.siguiente = null
        this.anterior = null
    }
}

class Lista_Cliente {
    constructor() {
        this.cabeza = null
    }

    insert(obj) {

        let nuevo = new Nodo(obj)
        if (this.cabeza == null) {
            this.cabeza = nuevo
        } else {
            let temp = this.cabeza
            while (temp.siguiente != null) {
                temp = temp.siguiente
            }
            temp.siguiente = nuevo
            nuevo.anterior = temp
        }
    }

    ver() {
        let temp = this.cabeza
        while (temp != null) {
            console.log(temp.obj.nombre)
            temp = temp.siguiente
        }

    }
}

/* let listap = new Lista_Cliente()
let p1 = new Cliente(1,"sd","sd")
let p2 = new Cliente(2,"sd","sd")
let p3 = new Cliente(3,"sd","sd")
let p4 = new Cliente(4,"sd","sd")
listap.insert(p1)
listap.insert(p2)
listap.insert(p3)
listap.insert(p4)
listap.ver() */







function add_cliente() {

    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)

    idTemp = localStorage.getItem("claveID")
    passTemp = localStorage.getItem("clavePass")

    console.log(idTemp, passTemp)
    avl.inOrden(avl.raiz)
    let id = document.getElementById('id').value
    let nombre = document.getElementById('nombre').value
    let correo = document.getElementById('correo').value
    buscarid(avl.raiz, idTemp, id, nombre, correo, avl)
    

    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)

}


function buscarid(temp, id, id2, nombre, correo, avl) {
    if (temp != null) {
        buscarid(temp.izq, id, id2, nombre, correo, avl)
        if (id == temp.obj.id) {

            let cliente = new Cliente(id2, nombre, correo)
            temp.obj.listaClientes = agregarListaCliente(temp.obj.listaClientes, cliente)
            console.log(temp.obj)

            let avl_temp = CircularJSON.stringify(avl)
            localStorage.setItem('datos', JSON.stringify(avl_temp))

            return 1
        }
        buscarid(temp.der, id, id2, nombre, correo, avl)
    }
}

function agregarListaCliente(lista, cliente) {
    if (lista == null) {
        let nuevalista = new Lista_Cliente()    
        nuevalista.insert(cliente)
        lista = nuevalista
        return lista
    } else {
        lista = cambio(lista, cliente)
        return lista
    }
}

function cambio(listavieja, cliente){
    let temp = listavieja.cabeza
    let listanueva = new Lista_Cliente()
    while(temp != null){
        listanueva.insert(temp.obj)
        temp = temp.siguiente
    }
    listanueva.insert(cliente)
    return listanueva
}


//el id lo da el json al igual que el id2 solo hay que recuperar el avl para la carga masiva la cluea
//sera con doble for