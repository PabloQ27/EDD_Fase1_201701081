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

function cambio(listavieja, cliente) {
    let temp = listavieja.cabeza
    let listanueva = new Lista_Cliente()
    while (temp != null) {
        listanueva.insert(temp.obj)
        temp = temp.siguiente
    }
    listanueva.insert(cliente)
    return listanueva
}

function buscarid2() {

    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)

    idTemp = localStorage.getItem("claveID")
    enorden(avl.raiz, idTemp)

}

function enorden(temp, id) {
    if (temp != null) {
        enorden(temp.izq, id)
        if (temp.obj.id == id) {
            genDot(temp.obj.listaClientes, temp.obj.listaClientes)

        }
        enorden(temp.der, id)
    }
}

function genDot(temp, temp2) {
    let cadena = "digraph lista{"
    temp = temp.cabeza
    let i = 1
    let j = 1
    while (temp != null) {
        j = i + 1
        cadena += "Columna" + String(i) + "[label = \"" + temp.obj.nombre + "\"]\n"
        i++
        temp = temp.siguiente
    }
    console.log(cadena)
    temp2 = temp2.cabeza
    i = 1
    while (temp2 != null) {
        if (temp2.siguiente === null) {
            break
        }
        j = i + 1
        cadena += "Columna" + String(i) + "->Columna" + String(j) + ";\n"
        temp2 = temp2.siguiente
        i++
    }
    cadena += "}"
    console.log(cadena)

    var container = document.getElementById("mynetwork");
    var DOTstring = cadena
    var parsedData = vis.parseDOTNetwork(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            widthConstraint: 100,//ancho del nodo
        },
        layout: {
            hierarchical: {
                levelSeparation: 150,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'LR',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    var network = new vis.Network(container, data, options);
}

document.getElementById("fichero_cliente").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_cliente").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content);
        console.log(intern.vendedores)

        for (x of intern.vendedores) {
            var guardado_temp = JSON.parse(localStorage.getItem('datos'))
            var avl = new AVL()
            guardado_temp = CircularJSON.parse(guardado_temp)
            Object.assign(avl, guardado_temp)

            console.log("id del empleado: ", x.id)

            for (z of x.clientes) {
                buscarid(avl.raiz, x.id, z.id, z.nombre, z.correo, avl)

                console.log("id de client: ", z.id)
                //guardar avl
            }
        }

        var guardado_temp = JSON.parse(localStorage.getItem('datos'))
        var avl = new AVL()
        guardado_temp = CircularJSON.parse(guardado_temp)
        Object.assign(avl, guardado_temp)
        console.log("avl despues de guardar clientes")
        console.log(avl)

    };
    fileread.readAsText(file_to_read);
});

//el id lo da el json, que el id2 solo hay que recuperar el avl para la carga masiva la cluea
//sera con doble for