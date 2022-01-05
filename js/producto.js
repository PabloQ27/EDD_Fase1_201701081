class Producto {//objeto el cual contendra la informacion para cada nodo de las paginas
    constructor(id, nombre, precio, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}

class nodoB {
    constructor(dato) {
        this.dato = dato;
        //apuntadores de lista - tipo nodoB
        this.siguiente = null;
        this.anterior = null;
        //apuntadores de arbol - tipo pagina
        this.izq = null;
        this.der = null;
    }
}

class lista_nodoB {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertar(nuevo) {//recibe el obj que se insertara en el arbol
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        } else {
            if (this.primero == this.ultimo) { // solo hay un dato en la lista
                if (nuevo.dato.id < this.primero.dato.id) {
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                } else if (nuevo.dato.id > this.ultimo.dato.id) {
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                } else { // el dato es igual al primero
                    console.log("Ya existe un dato con ese valor en la lista");
                    return false;
                }
            } else { //hay mas de un dato
                if (nuevo.dato.id < this.primero.dato.id) {
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                } else if (nuevo.dato.id > this.ultimo.dato.id) {
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                } else {
                    let aux = this.primero;
                    while (aux != null) {
                        if (nuevo.dato.id < aux.dato.id) {
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            // cambiar los punteros de las paginas
                            aux.izq = nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            //******************************* 
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        } else if (nuevo.dato.id == aux.dato.id) {
                            console.log("Ya existe un dato con ese valor en la lista");
                            return false;
                        } else {
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
    ver() {
        console.log("ver de la lista")
    }
}


class pagina {
    constructor() {
        this.raiz = false;
        this.claves_max = 4;
        this.claves_min = 2;
        this.size = 0;
        this.claves = new lista_nodoB();
    }

    insertar_EnPagina(nodo) {
        
        if (this.claves.insertar(nodo)) {
            this.size = this.claves.size;
            if (this.size < 5) {
                return this;
            } else if (this.size == 5) { //dividir pagina
                return this.dividir_pagina(this);
            }
        }
        return null;
    }

    dividir_pagina(pag) {
        let temp = pag.claves.primero;
        for (var i = 0; i < 2; i++) { //ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente;
        }

        //pasar valores de la pagina a nodos independientes
        let primero = pag.claves.primero;
        let segundo = pag.claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        //** crear nuevas paginas */
        let pag_izquierda = new pagina();
        pag_izquierda.insertar_EnPagina(primero);
        pag_izquierda.insertar_EnPagina(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insertar_EnPagina(tercero);
        pag_dercha.insertar_EnPagina(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }

    es_hoja(pag) {
        if (pag.claves.primero.izq == null) {
            return true;
        } else {
            return false;
        }
    }

    ver() {
        console.log("ver de la pagina")
    }
}
/************************************************************ */

/************************** Arbol B ***************************/
class Arbol_B {
    constructor() {
        this.raiz = null;
        this.orden = 5;
        this.altura = 0;
    }

    insertar_nodo(dato) {
        let nuevo = new nodoB(dato);

        if (this.raiz == null) {
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insertar_EnPagina(nuevo);
            //console.log("se inserto el valor "+this.raiz.claves.primero.dato);
        } else {
            if (this.altura == 0) {
                
                let respuesta = this.raiz.insertar_EnPagina(nuevo);
                if (respuesta instanceof pagina) {// la raiz no se dividio
                    this.raiz = respuesta;
                } else {
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }
            } else { // ya existe mas de una pagina, hay que recorrer el arbol para insertar el nuevo
                if (this.raiz == null) {
                    console.log("la raiz es null ")
                    return;
                }
                let respuesta = this.insertar_recorrer(nuevo, this.raiz);
                if (respuesta instanceof nodoB) { // la raiz se dividio
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                } else if (respuesta instanceof pagina) {
                    this.raiz = respuesta;
                }
            }
        }
    }

    insertar_recorrer(nuevo, pagina_actual) {
        if (pagina_actual.es_hoja(pagina_actual)) {
            let respuesta = pagina_actual.insertar_EnPagina(nuevo);
            return respuesta;
        } else {
            if (nuevo.dato.id < pagina_actual.claves.primero.dato.id) { // va a la izquierda
                let respuesta = this.insertar_recorrer(nuevo, pagina_actual.claves.primero.izq);
                if (respuesta instanceof nodoB) { // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                } else if (respuesta instanceof pagina) {
                    pagina_actual.claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            } else if (nuevo.dato.id > pagina_actual.claves.ultimo.dato.id) { // va a la derecha porque es mayor al ultimo
                let respuesta = this.insertar_recorrer(nuevo, pagina_actual.claves.ultimo.der);
                if (respuesta instanceof nodoB) { // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                } else if (respuesta instanceof pagina) {
                    pagina_actual.claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            } else { // va en los apuntadores de los nodos de en medio
                let aux = pagina_actual.claves.primero;

                while (aux != null) {
                    if (nuevo.dato.id < aux.dato.id) {
                        let respuesta = this.insertar_recorrer(nuevo, aux.izq);
                        if (respuesta instanceof nodoB) { // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                            return pagina_actual.insertar_EnPagina(respuesta);
                        } else if (respuesta instanceof pagina) {
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    } else if (nuevo.dato.id == aux.dato.id) {
                        return pagina_actual;
                    } else {
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    graficar() {
        let cadena = "digraph arbolB{\n";
        cadena += "rankr=TB;\n";

        //metodos para graficar el arbol
        cadena += this.graficar_nodos(this.raiz);
        cadena += this.graficar_enlaces(this.raiz);
        cadena += "}\n"

        return cadena;
    }

    graficar_nodos(raiz_actual) {
        let cadena = "";

        if (raiz_actual.es_hoja(raiz_actual)) { //si es un hhoja solo grafica el nodo
            cadena += "node[label= \""
            let contador = 0;
            let aux = raiz_actual.claves.primero;
            while (aux != null) {
                contador++;
                cadena += "|" + "ID: "+aux.dato.id + " Nombre: "+aux.dato.nombre + " Prec: Q."+aux.dato.precio + " Cant: "+aux.dato.cantidad + "|\n ";
                aux = aux.siguiente;
            }
            cadena += "\"]" + raiz_actual.claves.primero.dato.id + ";\n";
            return cadena;
        } else {
            cadena += "node[label= \""
            let contador = 0;
            let aux = raiz_actual.claves.primero;
            while (aux != null) {
                contador++;
                cadena += "|" + "ID: "+aux.dato.id + " Nombre: "+aux.dato.nombre + " Prec: Q."+aux.dato.precio + " Cant: "+aux.dato.cantidad + "|\n";
                aux = aux.siguiente;
            }
            cadena += "\"]" + raiz_actual.claves.primero.dato.id + ";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.claves.primero;
            while (aux != null) {
                cadena += this.graficar_nodos(aux.izq);
                aux = aux.siguiente;
            }
            cadena += this.graficar_nodos(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }

    graficar_enlaces(raiz_actual) {
        let cadena = "";
        if (raiz_actual.es_hoja(raiz_actual)) {
            return "" + raiz_actual.claves.primero.dato.id + ";\n";
        } else {
            //cadena += ""+raiz_actual.claves.primero.dato+";\n";

            let aux = raiz_actual.claves.primero;
            let contador = 0;
            let raiz_actual_txt = raiz_actual.claves.primero.dato.id;
            while (aux != null) {
                cadena += "\n" + raiz_actual_txt + "->" + this.graficar_enlaces(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena += "\n" + raiz_actual_txt + "->" + this.graficar_enlaces(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }

    graficar2(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        cadena+= this.graficar_nodos2(this.raiz);
        cadena+=  this.graficar_enlaces2(this.raiz);
        cadena+="}\n"
        return cadena;
    }

    graficar_nodos2(raiz_actual){
        let cadena="";

        if(raiz_actual.es_hoja(raiz_actual)){ //si es un hhoja solo grafica el nodo
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+"ID: "+aux.dato.id + " \\n Nombre: "+aux.dato.nombre + " \\nPrec: Q."+aux.dato.precio + " \\nCant: "+aux.dato.cantidad +"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.dato.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+"ID: "+aux.dato.id + " \\nNombre: "+aux.dato.nombre + " \\nPrec: Q."+aux.dato.precio + " \\nCant: "+aux.dato.cantidad +"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.dato.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.claves.primero;
            while(aux != null){
                cadena+= this.graficar_nodos2(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos2(raiz_actual.claves.ultimo.der);
            return cadena;
        }   
    }

    graficar_enlaces2(raiz_actual){
        let cadena="";
        if(raiz_actual.es_hoja(raiz_actual)){
            return ""+raiz_actual.claves.primero.dato.id+";\n";
        }else{
            //cadena += ""+raiz_actual.claves.primero.dato+";\n";

            let aux = raiz_actual.claves.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.claves.primero.dato.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces2(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces2(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }
}

class NodoS {
    constructor(obj) {
        this.obj = obj
        this.siguiente = null
    }
}

class Lista {
    constructor() {
        this.cabeza = null
    }
    add(obj) {
        let nuevo = new NodoS(obj)
        if (this.cabeza == null) {
            this.cabeza = nuevo
        } else {
            let temp = this.cabeza
            while (temp.siguiente != null) {
                temp = temp.siguiente
            }
            temp.siguiente = nuevo
        }
    }
    ver() {
        console.log("lista de productos")
        let temp = this.cabeza
        while (temp != null) {
            console.log("id: ", temp.obj.id)

            temp = temp.siguiente
        }
    }
}

/* let lista = new Lista()
let producto = new Producto(1,"")
let producto2 = new Producto(12,"")
let producto4 = new Producto(13,"")
let producto5 = new Producto(14,"")
lista.add(producto)
lista.add(producto2)
lista.add(producto5)
lista.add(producto4)
lista.ver() */

//let arbol = new Arbol_B()

/* let p1 = new Producto(5, 'produc1', 150.75, 75)
let p2 = new Producto(1,  'produc1', 150.75, 75)
let p3 = new Producto(7,  'produc1', 150.75, 75)
let p4 = new Producto(3, 'produc1', 150.75, 75)
let p5 = new Producto(13, 'produc1', 150.75, 75)
let p6 = new Producto(8, 'produc1', 150.75, 75)
let p7 = new Producto(35, 'produc1', 150.75, 75)
let p8 = new Producto(14, 'produc1', 150.75, 75)
let p9 = new Producto(10, 'produc1', 150.75, 75)
let p10 = new Producto(9, 'produc1', 150.75, 75)
let p11 = new Producto(12, 'produc1', 150.75, 75)
let p12 = new Producto(17, 'produc1', 150.75, 75)
let p13 = new Producto(22, 'produc1', 150.75, 75)
let p14 = new Producto(25, 'produc1', 150.75, 75)
let p15 = new Producto(100, 'produc1', 150.75, 75)
let p16 = new Producto(150, 'produc1', 150.75, 75)
let p17 = new Producto(220, 'produc1', 150.75, 75)
let p18 = new Producto(325, 'produc1', 150.75, 75)

arbol.insertar_nodo(p1);
arbol.insertar_nodo(p2);
arbol.insertar_nodo(p3);
arbol.insertar_nodo(p4);
arbol.insertar_nodo(p5);
arbol.insertar_nodo(p6);
arbol.insertar_nodo(p7);
arbol.insertar_nodo(p8);
arbol.insertar_nodo(p9);
arbol.insertar_nodo(p10);
arbol.insertar_nodo(p11);
arbol.insertar_nodo(p12);
arbol.insertar_nodo(p13);
arbol.insertar_nodo(p14);
arbol.insertar_nodo(p15);
arbol.insertar_nodo(p16);
arbol.insertar_nodo(p17);
arbol.insertar_nodo(p18); 

console.log(arbol.graficar()) */

function add_producto() {
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    let cantidad = document.getElementById("cantidad").value
    let nuevoproducto = new Producto(Number(id), nombre, precio, cantidad)

    let lista_temp = JSON.parse(localStorage.getItem("datos3"))
    let lista = new Array()
    Object.assign(lista, lista_temp)

    lista.push(nuevoproducto)
    localStorage.setItem("datos3", JSON.stringify(lista))

    for (x of lista) {
        
        console.log(x.id)
    }

}

function back() {
    window.open("admin_empleados.html", "_self")
}


function arbol_b() {
    let arbol = new Arbol_B()

    let lista_temp = JSON.parse(localStorage.getItem("productos"))
    let lista = new Array()
    Object.assign(lista, lista_temp)

    for (x in lista) {
        //console.log(lista[x])
        arbol.insertar_nodo(lista[x])
    }

    cadena = arbol.graficar()
    cadena2 = arbol.graficar2()
    document.getElementById("textarea").innerHTML = cadena2

    var container = document.getElementById("mynetwork");
    var DOTstring = cadena
    var parsedData = vis.parseDOTNetwork(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            widthConstraint: 450,
        },
        layout: {
            hierarchical: {
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
                centralGravity: 0.0,
                springLength: 500,
                springConstant: 0.01,
                nodeDistance: 500,
                damping: 0.09
            },
            solver: 'hierarchicalRepulsion'
        }
    };
    var network = new vis.Network(container, data, options);
}

function vistagrafica() {
    window.open("grafica_producto.html", "_self")
}


document.getElementById("fichero_producto").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_producto").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content); // parse json 

        let lista_temp = JSON.parse(localStorage.getItem("productos"))
        let lista = new Array()
        Object.assign(lista, lista_temp)

        for (x of intern.productos) {
            let nuevoproducto = new Producto(Number(x.id), x.nombre, Number(x.precio), Number(x.cantidad))
            lista.push(nuevoproducto)
        }
        localStorage.setItem("productos", JSON.stringify(lista))
        console.log("listado de productos")
        for (x in lista) {
            
            console.log(lista[x].id)
        }
        

    };
    fileread.readAsText(file_to_read);
});
