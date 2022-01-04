class Proveedor {
    constructor(id, nombre, direccion, telefono, correo) {
        this.id = id
        this.nombre = nombre
        this.direccion = direccion
        this.telefono = telefono
        this.correo = correo
    }
}

class Nodo {
    constructor(obj) {
        this.obj = obj
        this.izq = null
        this.der = null
    }
}

class Abb {
    constructor() {
        this.raiz = null

    }

    insertar(obj) {
        let nuevo = new Nodo(obj)
        if (this.raiz == null) {
            this.raiz = nuevo
        } else {
            this.raiz = this.insertar_nodo(this.raiz, nuevo)
        }
    }
    insertar_nodo(raiz_actual, nuevo) { //nuevo es un nodo el cual ya fue creado y tiene el espacio en memoria
        if (raiz_actual != null) { // entra si hay nodo  y esta lleno
            if (nuevo.obj.id < raiz_actual.obj.id) {
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq, nuevo)

            } else if (nuevo.obj.id > raiz_actual.obj.id) {
                raiz_actual.der = this.insertar_nodo(raiz_actual.der, nuevo)
            } else {
                console.log("No se permiten valores repetidos")

            }
            return raiz_actual
        } else {
            raiz_actual = nuevo
            return raiz_actual
        }

    }

    preorder(temp) {
        if (temp != null) {
            console.log(temp.obj)
            this.preorder(temp.izq)
            this.preorder(temp.der)
        }
    }

    inorden(temp) {
        if (temp != null) {
            this.inorden(temp.izq)
            console.log(temp.obj.id)
            this.inorden(temp.der)
        }
    }

    postorden(temp) {
        if (temp != null) {
            this.postorden(temp.izq)
            this.postorden(temp.der)
            console.log(temp.obj)
        }
    }

    genDot() {
        let cadena = "digraph abb {\n"
        cadena += this.genNodos(this.raiz)
        cadena += "\n" + this.enlazar(this.raiz)
        cadena += '}'

        console.log(cadena)
        return cadena
    }

    genNodos(raiz_actual) {
        let nodos = ""
        if (raiz_actual != null) {
            nodos += "n" + raiz_actual.obj.id + "[label = \"" + raiz_actual.obj.id + "\"]\n"
            nodos += this.genNodos(raiz_actual.izq)
            nodos += this.genNodos(raiz_actual.der)
        }
        return nodos
    }

    enlazar(raiz_actual) {
        let cadena = ''
        if (raiz_actual != null) {
            cadena += this.enlazar(raiz_actual.izq)
            cadena += this.enlazar(raiz_actual.der)
            if (raiz_actual.izq != null) {
                cadena += 'n' + raiz_actual.obj.id + '-> n' + raiz_actual.izq.obj.id + '\n'
            }
            if (raiz_actual.der != null) {
                cadena += 'n' + raiz_actual.obj.id + '-> n' + raiz_actual.der.obj.id + '\n'
            }

        }
        return cadena

    }
}

/* let abb = new Abb()
let p1 = new Proveedor(1,"","","","")
let p2 = new Proveedor(2,"","","","")
let p3 = new Proveedor(3,"","","","")
let p4 = new Proveedor(4,"","","","")
let p5 = new Proveedor(5,"","","","")
let p6 = new Proveedor(6,"","","","")
let p7 = new Proveedor(7,"","","","")
let p8 = new Proveedor(8,"","","","")
let p9 = new Proveedor(10,"","","","")
abb.insertar(p1)
abb.insertar(p2)
abb.insertar(p3)
abb.insertar(p4)
abb.insertar(p5)
abb.insertar(p6)
abb.insertar(p7)
abb.insertar(p8)
abb.insertar(p9)

abb.preorder(abb.raiz)
console.log()

console.log()
abb.postorden(abb.raiz)
abb.inorden(abb.raiz)
abb.genDot() */

function add_proveedor() {
    let id = document.getElementById('id').value
    let nombre = document.getElementById('nombre').value
    let dir = document.getElementById('direccion').value
    let email = document.getElementById('correo').value
    let cel = document.getElementById('telefono').value
    console.log("aber si es numero", typeof Number(id))

    
    var guardado_temp = JSON.parse(localStorage.getItem('datos2'))
    var abb = new Abb()
    Object.assign(abb, guardado_temp)

    //console.log(abb)
    if (abb.raiz == null) {
        let nuevo_abb = new Abb()
        let proveedor = new Proveedor(Number(id), nombre, dir, cel, email)
        nuevo_abb.insertar(proveedor)


        localStorage.setItem('datos2', JSON.stringify(nuevo_abb))

        /* console.log('lista de IDs abb')
        nuevo_abb.inorden(nuevo_abb.raiz) */
    } else {
        let proveedor = new Proveedor(Number(id), nombre, dir, cel, email)
        abb.insertar(proveedor)

        localStorage.setItem('datos2', JSON.stringify(abb))

        console.log('lista de IDs abb')
        abb.inorden(abb.raiz)
        //abb.genDot()
    }
}

function back() {
    window.open("admin_proveedores.html", "_self")
}



console.log("paso")

function bst() {
    var guardado_temp = JSON.parse(localStorage.getItem('datos2'))
    var abb = new Abb()
    Object.assign(abb, guardado_temp)
    abb.inorden(abb.raiz)
    cadena = abb.genDot()

    var container = document.getElementById("mynetwork");
    var DOTstring = cadena
    var parsedData = vis.parseDOTNetwork(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            widthConstraint: 20,
        },
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    var network = new vis.Network(container, data, options);

}



document.getElementById("fichero_proveedor").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_proveedor").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content);
        console.log(intern)
        for (x of intern.proveedores) {
            var guardado_temp = JSON.parse(localStorage.getItem('datos2'))
            var abb = new Abb()
            Object.assign(abb, guardado_temp)
            if(abb.raiz == null){
                let nuevo_abb = new Abb()
                let proveedor = new Proveedor(x.id, x.nombre, x.direccion, x.telefono, x.correo)
                nuevo_abb.insertar(proveedor)
                localStorage.setItem('datos2', JSON.stringify(nuevo_abb))
            }else{
                let proveedor = new Proveedor(x.id, x.nombre, x.direccion, x.telefono, x.correo)
                abb.insertar(proveedor)
                localStorage.setItem('datos2', JSON.stringify(abb))
            }
        }
        // You can index every object
    };
    fileread.readAsText(file_to_read);
});


