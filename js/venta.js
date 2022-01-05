class Venta {//el objeto que contendra toda la informacion de la tabla
    constructor(id_venta, nombre1, nombre2, total, lista) {
        this.id_venta = id_venta
        this.nombre1 = nombre1
        this.nombre2 = nombre2
        this.total = total
        this.lista = lista
    }
}

class nodo {
    constructor(dato) {
        this.dato = dato;
    }
}


class hash {
    constructor() {
        this.claves = this.iniciar_arreglo(7);//iniciar el tamaño de del arreglo para la tabla hash
        this.claves_usadas = 0; //inicia el uso de claves
        this.size = 7;
    }

    iniciar_arreglo(tamaño) {//recibe el tamaño para iniciar el arreglo
        let claves = [];
        for (var i = 0; i < tamaño, i++;) {
            claves[i] = null;
        }
        return claves;
    }

    calcular_hash(dato) {//metodo de division
        let resultado = 0;
        resultado = dato % this.size;
        return resultado;
    }

    solucion_coliciones(indice) { //metodo de exploracion cuadratica
        let nuevo_indice = 0;
        let i = 0;
        let disponible = false;

        while (disponible == false) {
            nuevo_indice = indice + Math.pow(i, 2);
            //validar que nuevo_indice sea menor al tañano de la tabla
            if (nuevo_indice >= this.size) {
                nuevo_indice = nuevo_indice - this.size;
            }
            //validar que la posicion del nuevo indice este disponible
            if (this.claves[nuevo_indice] == null) {
                disponible = true;
            }
            i++;
        }
        return nuevo_indice;
    }

    insertar(nuevo) {

        let indice = this.calcular_hash(nuevo.id_venta);

        //validaciones 
        if (this.claves[indice] == null) { //posicion disponible
            this.claves[indice] = nuevo;
            this.claves_usadas++;
        } else { // existe una colicion
            indice = this.solucion_coliciones(indice);
            this.claves[indice] = nuevo;
            this.claves_usadas++
        }

        //validacion de tamaño
        let Porcentaje_uso = this.claves_usadas / this.size;
        if (Porcentaje_uso >= 0.5) {
            this.rehash();
        }
    }

    rehash() {
        //****** Encontrar el siguiente numero primo */
        let primo = false;
        let new_size = this.size;
        while (primo == false) {
            new_size++;
            let cont = 0;
            for (var i = new_size; i > 0; i--) {
                if (new_size % i == 0) {
                    cont++;
                }
            }
            //validar cuantas veces se dividio exactamente
            if (cont == 2) {
                primo = true
            }
        }
        //****** crear nuevo arreglo con el tamaño del siguente numero primo */
        let claves_aux = this.claves;

        this.size = new_size;
        this.claves = this.iniciar_arreglo(new_size);
        this.claves_usadas = 0;

        for (var i = 0; i < claves_aux.length; i++) {
            if (claves_aux[i] != null) {
                this.insertar(claves_aux[i]);
            }
        }
    }

    recorrer2(nombre) {
        for (var i = 0; i < this.size; i++) {
            if (this.claves[i] != null && this.claves[i].nombre1 == nombre) {
                console.log("ID" + this.claves[i].id_venta);
                let cadena = "ID de ventea:"+ this.claves[i].id_venta + "\tNombre de cliente: "+this.claves[i].nombre2+"\tTotal de venta: Q."+this.claves[i].total+ this.info_lista(this.claves[i].lista)
                return cadena
            }
        }
    }

    recorrer() {
        for (var i = 0; i < this.size; i++) {
            if (this.claves[i] != null) {
                console.log("-->" + this.claves[i].id_venta);
            } else {
                console.log("------------");
            }
        }
    }

    info_lista(lista) {
        let cadena = ""
        cadena += "\n\nDetalles de la venta:\n"
        for (let x = 0; x < lista.length; x++) {
            cadena += "ID de producto:"+lista[x].id + "\tNombre: " + lista[x].nombre + "   \tPrecio: Q" + lista[x].precio + "  \tCantidad: " + lista[x].cantidad + "\n"
        }
        return cadena
    }
    graficar() {
        //hace los nodos
        let cadena = "digraph tabla {\n"
        for (var i = 0; i < this.size; i++) {
            if (this.claves[i] != null) {
                cadena += i + "[label = \"" + "ID: " + this.claves[i].id_venta + "\\nVendedor " + this.claves[i].nombre1 + "\\nCliente: " + this.claves[i].nombre2 + "\\nTotal: Q." + this.claves[i].total + "\"]\n"
                cadena += this.graficar_lista1(this.claves[i].lista, this.claves[i].id_venta)
            } else {
                cadena += i + "[label =\"\\n vacio \\n \\n \"]\n"
            }
        }

        //grafica las relaciones
        for (var i = 0; i < this.size - 1; i++) {
            //cadena += i + "->\n"
            if (this.claves[i] != null) {
                cadena += i + "->\n"
                cadena += this.graficar_lista2(this.claves[i].lista, this.claves[i].id_venta)
                // cadena += i + "->\n"
            }


        }
        // cadena += i
        cadena += "\n}"
        return cadena
    }

    graficar_lista1(lista, id) {
        let cadena = ""
        for (let x = 0; x < lista.length; x++) {
            cadena += String(id) + lista[x].id + "[label = \"" + "ID: " + lista[x].id + "\\nNombre: " + lista[x].nombre + "\\nPrecio: Q" + lista[x].precio + "\\nCantidad: " + lista[x].cantidad + "\"]\n"
        }
        return cadena
    }


    graficar_lista2(lista, id) {
        let cadena = ""
        for (let x = 0; x < lista.length - 1; x++) {
            cadena += String(id) + lista[x].id + "->\n"
        }
        cadena += String(id) + lista[lista.length - 1].id + "\n"
        return cadena
    }

}

/* let tabla = new hash();

let v1 = new Venta(10,"","","",'')
let v2 = new Venta(8,"","","",'')
let v3 = new Venta(2,"","","",'')
let v4 = new Venta(9,"","","",'')
let v5 = new Venta(81,"","","",'')
let v6 = new Venta(12,"","","",'')
let v7 = new Venta(90,"","","",'')
let v8 = new Venta(181,"","","",'')
let v9 = new Venta(112,"","","",'')
let v10 = new Venta(190,"","","",'')

tabla.insertar(v1);
tabla.insertar(v2);
tabla.insertar(v3);
tabla.insertar(v4);
tabla.insertar(v5);
tabla.insertar(v6);
tabla.insertar(v7);
tabla.insertar(v8);
tabla.insertar(v9);
tabla.insertar(v10);
tabla.insertar(v10);
tabla.graficar()
 */

/* tabla.insertar(new nodo(10));
tabla.insertar(new nodo(8));
tabla.insertar(new nodo(2));
tabla.insertar(new nodo(9));
tabla.insertar(new nodo(81));
tabla.insertar(new nodo(12));
tabla.insertar(new nodo(90));
tabla.insertar(new nodo(181));
tabla.insertar(new nodo(112));
tabla.insertar(new nodo(190)); */
//tabla.recorrer();


function venta() {
    
    let temp = JSON.parse(localStorage.getItem("ventas"))
    nombre = localStorage.getItem("nombre")
    console.log("hola",nombre)

    let tabla = new hash()
    Object.assign(tabla, temp)
    
    let cadena = tabla.recorrer2(nombre)
    

    document.getElementById("textarea").innerHTML = cadena
}

function add_venta() {
    let id = document.getElementById("id").value
    let nombre1 = document.getElementById("nombre1").value
    let nombre2 = document.getElementById("nombre2").value
    let id2 = document.getElementById("id2").value
    let cantidad = document.getElementById("cantidad").value

    let lista_temp = JSON.parse(localStorage.getItem("datos3"))
    let lista = new Array()
    Object.assign(lista, lista_temp)

}

function calcular(id, n1, n2, id2, cantidad, lista) {
    for (x of lista) {
        if (Number(id2) == x.id) {

        }
    }
}

function back() {
    window.open("admin_empleados.html", "_self")
}
function salir(){
    window.open("index.html", "_self")
}

function vistagrafica() {
    window.open("grafica_venta.html", "_self")
}

function tabla_hash() {
    console.log("grafica xd")
    let temp = JSON.parse(localStorage.getItem("ventas"))
    let tabla = new hash()
    Object.assign(tabla, temp)

    cadena = tabla.graficar()
    tabla.recorrer()
    // console.log(cadena)

    var container = document.getElementById("mynetwork");
    var DOTstring = cadena
    var parsedData = vis.parseDOTNetwork(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            widthConstraint: 200,
        },
        layout: {
            hierarchical: {
                levelSeparation: 300,
                nodeSpacing: 0,
                parentCentralization: false,
                direction: 'LR',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
        /* physics: {
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 500,
                springConstant: 0.01,
                nodeDistance: 500,
                damping: 0.09
            },
            solver: 'hierarchicalRepulsion'
        } */
    };
    var network = new vis.Network(container, data, options);

}

document.getElementById("fichero_venta").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_venta").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content); // parse json 

        let tabla = new hash()

        for (x of intern.ventas) {
            console.log(Number(x.id))
            let total = 0
            let lista = new Array()
            for (z of x.productos) {
                console.log(z.cantidad)
                total += z.precio * z.cantidad
                let producto = new Producto(z.id, z.nombre, z.precio, z.cantidad)
                lista.push(producto)
            }
            let venta_nueva = new Venta(x.id, x.vendedor, x.cliente, total, lista)
            tabla.insertar(venta_nueva)
        }
        localStorage.setItem("ventas", JSON.stringify(tabla))


    };
    fileread.readAsText(file_to_read);
});
