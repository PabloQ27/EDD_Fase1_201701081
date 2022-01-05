
class nodo {//objeto que recibira la informacion para cada nodo
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion = 0;
        this.adyasentes = new lista_adyasentes();
    }
}

class lista_adyasentes {
    constructor() {//lista que contrand los nodos
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id, p) {//llevar la ponderacion que habra entre cada nodo
        let nuevo = new nodo(id);
        nuevo.ponderacion = p;
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            } else {
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;
            }
        }
    }
}

class grafo {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id, nombre) {//se insertara la informacion para los nodos
        let nuevo = new nodo(id, nombre);

        if (this.primero == null) {//si el grafo esta vacio
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            if (this.primero == this.ultimo) {
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            } else {
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;
            }
        }
    }

    buscar(id) {
        let aux = this.primero;
        while (aux != null) {
            if (aux.id == id) {
                return aux;
            } else {
                aux = aux.siguiente;
            }
        }
        return null;
    }

    agregar_adyacente(id, id_adyacente, ponderacion) {
        let principal = this.buscar(id);

        if (principal != null) {
            principal.adyasentes.insertar(id_adyacente, ponderacion);
        } else {
            console.log("no existe el nodo origen")
        }
    }

    mostrar() {
        let aux = this.primero;
        while (aux != null) {
            console.log("-> " + aux.id);
            let aux2 = aux.adyasentes.primero;
            while (aux2 != null) {
                console.log("   -" + aux2.id);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    graficar() {
        let cadena = "digraph grafo {\n"
        let aux = this.primero;
        while (aux != null) {
            cadena += "n" + aux.id + "[label= \"" + aux.nombre + "\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while (aux != null) {
            let aux2 = aux.adyasentes.primero;
            while (aux2 != null) {
                cadena += "n" + aux.id + " -> n" + aux2.id + " [label=\"" + aux2.ponderacion + "km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"

        return cadena
    }
}

/* let grafo_prueba = new grafo();
grafo_prueba.insertar(4);
grafo_prueba.insertar(6);
grafo_prueba.insertar(9);
grafo_prueba.insertar(11);
grafo_prueba.insertar(7);
grafo_prueba.insertar(10);


grafo_prueba.agregar_adyacente(4,6,5);
grafo_prueba.agregar_adyacente(6,4,5);

grafo_prueba.agregar_adyacente(6,9,2);
grafo_prueba.agregar_adyacente(9,6,2);

grafo_prueba.agregar_adyacente(7,9,4);
grafo_prueba.agregar_adyacente(9,7,4);

grafo_prueba.agregar_adyacente(4,10,4);
grafo_prueba.agregar_adyacente(10,4,4);

grafo_prueba.agregar_adyacente(9,11,9);
grafo_prueba.agregar_adyacente(11,9,9);

grafo_prueba.agregar_adyacente(10,11,1);
grafo_prueba.agregar_adyacente(11,10,1);

grafo_prueba.agregar_adyacente(7,10,8);
grafo_prueba.agregar_adyacente(10,7,8);

grafo_prueba.agregar_adyacente(6,11,6);
grafo_prueba.agregar_adyacente(11,6,6);

grafo_prueba.graficar(); */

function back() {
    window.open("admin_empleados.html", "_self")
}


function vistagrafo() {
    window.open("grafica_ruta.html", "_self")
}

function grafo1() {
    console.log("grafica xd")
    let cadena = localStorage.getItem("grafo")
   // console.log(cadena)
    document.getElementById("textarea").innerHTML = cadena

    var container = document.getElementById("mynetwork");
    var DOTstring = cadena
    var parsedData = vis.parseDOTNetwork(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            widthConstraint: 110,
        },
        
        layout: {
            hierarchical: {
                enabled: false,
                levelSeparation: 200,
                nodeSpacing: 1000,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
            
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
              // centralGravity: 0.0,
                springLength: 300,
               // springConstant: 0.01,
                nodeDistance: 70,
                damping: 1
            },
            solver: 'hierarchicalRepulsion'
        }
    };
    var network = new vis.Network(container, parsedData,options);
}

document.getElementById("fichero_rutas").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_rutas").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content); // parse json 

        let ruta = new grafo()

        for (x of intern.rutas) {
            console.log("->", x.id, x.nombre)
            ruta.insertar(x.id, x.nombre)
            for (z of x.adyacentes) {
                console.log(z.id, z.nombre)
                ruta.insertar(z.id, z.nombre)
            }
        }

        for (x of intern.rutas) {
            console.log("->", x.id)

            for (z of x.adyacentes) {
                console.log(z.id)
                ruta.agregar_adyacente(x.id, z.id, z.distancia)
                // ruta.agregar_adyacente(z.id, x.id, z.distancia)
            }
        }

        ruta.graficar()
        cadena = ruta.graficar()
        console.log(cadena)
        localStorage.setItem("grafo", ruta.graficar())

    };
    fileread.readAsText(file_to_read);
});