class nodoAVL {
    constructor(obj) {
        this.obj = obj;
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

class AVL {
    constructor() {
        this.raiz = null;
    }

    insertar(obj) {
        let nuevo = new nodoAVL(obj);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            this.raiz = this.insertar_nodo(this.raiz, nuevo);
        }
    }

    insertar_nodo(raiz_actual, nuevo) {
        if (raiz_actual != null) {
            //recorrer hijos
            if (raiz_actual.obj.id > nuevo.obj.id) {
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq, nuevo);
                //validaciones

                if (this.altura(raiz_actual.der) - this.altura(raiz_actual.izq) == -2) {
                   // console.log("entra a rotacion IZQUIERDA");
                    //if(this.altura(raiz_actual.izq.der)-this.altura(raiz_actual.izq.izq))
                    if (nuevo.obj.id < raiz_actual.izq.obj.id) { //-1 ROTACION IZQUIERDA
                      //  console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    } else { //1 ROTACION IZQ-DERECHA
                      //  console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            } else if (raiz_actual.obj.id < nuevo.obj.id) {
                raiz_actual.der = this.insertar_nodo(raiz_actual.der, nuevo);
                //validaciones
                if (this.altura(raiz_actual.der) - this.altura(raiz_actual.izq) == 2) {
                 //   console.log("entra a rotacion DERECHA");
                    if (nuevo.obj.id > raiz_actual.der.obj.id) { // 1 ROTACION DERECHA
                       // console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual = this.r_derecha(raiz_actual);
                    } else {//-1 ROTACION DERECHA IZQUIERDA
                      //  console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            } else {
                console.log("NO SE PUEDE INSERTAR EL DATO PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der), this.altura(raiz_actual.izq)) + 1;
            return raiz_actual;
        } else {
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo) {
        if (nodo != null) {
            return nodo.altura;
        } else {
            return -1;
        }
    }

    altura_maxima(h1, h2) {
        if (h2 >= h1) { //************************ MAYOR O IGUAL */
            return h2;
        } else {
            return h1;
        }

    }
    //ROTACIONES
    //simple izquerda
    r_izquierda(nodo) {
        let aux = nodo.izq;
        nodo.izq = aux.der;
        aux.der = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.der), this.altura(nodo.izq)) + 1;
        aux.altura = this.altura_maxima(nodo.altura.altura, this.altura(nodo.izq)) + 1;
        return aux;
    }
    //simple derecha
    r_derecha(nodo) {
        let aux = nodo.der;
        nodo.der = aux.izq;
        aux.izq = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izq), this.altura(nodo.der)) + 1;
        aux.altura = this.altura_maxima(nodo.altura.altura, this.altura(nodo.der)) + 1;
        return aux;
    }

    //rotacion izq-der
    r_izq_der(nodo) {
        nodo.izq = this.r_derecha(nodo.izq);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    //rotacion der-izq
    r_der_izq(nodo) {
        nodo.der = this.r_izquierda(nodo.der);
        let aux = this.r_derecha(nodo);
        return aux;
    }

    //****************************************************** */

    preorden(raiz_actual) {
        if (raiz_actual != null) {
            console.log(raiz_actual.obj);
            this.preorden(raiz_actual.izq);
            this.preorden(raiz_actual.der);
        }
    }

    inOrden(raiz_actual) {
        if (raiz_actual != null) {
            this.inOrden(raiz_actual.izq);
            console.log(raiz_actual.obj.id);
           // console.log("altura= " + (this.altura(raiz_actual.der) - this.altura(raiz_actual.iz)))
            this.inOrden(raiz_actual.der);
        }
    }

    postOrden(raiz_actual) {
        if (raiz_actual != null) {
            this.postOrden(raiz_actual.izq);
            this.postOrden(raiz_actual.der);
            console.log(raiz_actual.obj.id);
        }
    }

    generarDot() {
        let cadena = "digraph arbol {\n";
        cadena += this.generar_nodos(this.raiz);
        cadena += "\n";
        cadena += this.enlazar(this.raiz);
        cadena += "\n}";

        console.log(cadena);
        return cadena
    }

    generar_nodos(raiz_actual) { //metodo preorden
        let nodos = "";
        if (raiz_actual != null) {
            nodos += "n" + raiz_actual.obj.id + "[label=\"" + raiz_actual.obj.id + "\"]\n";
            nodos += this.generar_nodos(raiz_actual.izq);
            nodos += this.generar_nodos(raiz_actual.der);
        }
        return nodos;
    }

    enlazar(raiz_actual) {
        let cadena = "";
        if (raiz_actual != null) {
            cadena += this.enlazar(raiz_actual.izq);
            cadena += this.enlazar(raiz_actual.der);
            //validaciones
            if (raiz_actual.izq != null) {
                cadena += "n" + raiz_actual.obj.id + "-> n" + raiz_actual.izq.obj.id + "\n";
            }
            if (raiz_actual.der != null) {
                cadena += "n" + raiz_actual.obj.id + "-> n" + raiz_actual.der.obj.id + "\n";
            }


        }
        return cadena;
    }
}



class Empleado {
    constructor(id, nombre, edad, correo, password) {
        this.id = id
        this.nombre = nombre
        this.edad = edad
        this.correo = correo
        this.password = password
        this.listaClientes = null
        this.listaMeses = null
    }

}

/* let empleado1 = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let empleado2 = new Empleado(2,"dsd","dsd","dsd","dsd","dsd")
let empleado3 = new Empleado(3,"dsd","dsd","dsd","dsd","dsd")
let empleado4 = new Empleado(20,"dsd","dsd","dsd","dsd","dsd")
let empleado5 = new Empleado(35,"dsd","dsd","dsd","dsd","dsd")
let empleado6 = new Empleado(30,"dsd","dsd","dsd","dsd","dsd")
let empleado7 = new Empleado(25,"dsd","dsd","dsd","dsd","dsd")
let avl = new AVL()
avl.insertar(empleado1)
avl.insertar(empleado2)
avl.insertar(empleado3)
avl.insertar(empleado4)
avl.insertar(empleado5)
avl.insertar(empleado6)
avl.insertar(empleado7) 
avl.preorder(avl.raiz)
console.log('')
avl.inorden(avl.raiz)
console.log()
avl.postorden(avl.raiz)

avl.generarDot() */



// METODOS PARA HTML form_empleado

function add_empleado() {
    let id = document.getElementById('id').value
    let nombre = document.getElementById('nombre').value
    let edad = document.getElementById('edad').value
    let email = document.getElementById('correo').value
    let pass = document.getElementById('pass').value



    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)




    if (avl.raiz == null) {
        let nuevo_avl = new AVL()
        let empleado = new Empleado(Number(id), nombre, edad, email, pass)
        nuevo_avl.insertar(empleado)
        let avl_temp = CircularJSON.stringify(nuevo_avl)
        localStorage.setItem('datos', JSON.stringify(avl_temp))

        console.log('lista de IDs Avl')
        nuevo_avl.inOrden(nuevo_avl.raiz)
    } else {
        //validar si el empleado no se repite
        let empleado = new Empleado(Number(id), nombre, edad, email, pass)
        avl.insertar(empleado)

        let avl_temp = CircularJSON.stringify(avl)
        localStorage.setItem('datos', JSON.stringify(avl_temp))
        //avl.genDot()
        console.log('lista de IDs Avl else')
        avl.inOrden(avl.raiz)
    }
}

function back() {
    window.open("admin_empleados.html", "_self")
}

//  METODO PARA EL LOGIN
function verificar() {
    let tcombo = document.getElementById('textb').value
    let id = document.getElementById('id').value
    let pass = document.getElementById('pass').value

    if (tcombo == 'admin') {
        if (id == 'Admin' && pass == '1234') {
            window.open("admin_empleados.html", "_self")
        } else {
            alert('Credenciales de administrador incorrectas')
        }
    } else {
        console.log('selecciono el empleado')
        validar_emplado(id, pass)
    }
}

function validar_emplado(id, pass) {
    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)
    if (avl.raiz == null) {
        alert('Sin usuarios')
    } else {
        console.log('revisar')
        recorreIn(avl.raiz, id, pass)
    }
}

function recorreIn(temp, id, pass) {

    if (temp != null) {
        this.recorreIn(temp.izq, id, pass)
        if (temp.obj.id == id && temp.obj.password == pass) {
            console.log('lo encontro xd')
            window.open("empleado_cliente.html", "_self")
            let nId = temp.obj.id
            let nPass = temp.obj.password
            localStorage.setItem('claveID', nId)
            localStorage.setItem('clavePass', nPass)

        }
        this.recorreIn(temp.der, id, pass)
    }

}

function salir() {
    window.open("login.html", "_self")
}




let combo = document.getElementById("combobox")
let elementos = "<option> Seleccione Empleado </option>"

function inordenT(temp) {

    if (temp != null) {
        this.inordenT(temp.izq)
        elementos += "<option id='" + temp.obj.id + "'>" + temp.obj.id + "</option>"
        combo.innerHTML = elementos
        console.log(combo.innerHTML)
        this.inordenT(temp.der)
    }
}

function avlg() {
    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    cadena = avl.generarDot()
    console.log("el avl", cadena)

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

document.getElementById("fichero").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content); // parse json 

        
        for (x of intern.vendedores) {
            var guardado_temp = JSON.parse(localStorage.getItem('datos'))
            var avl = new AVL()
            guardado_temp = CircularJSON.parse(guardado_temp)
            Object.assign(avl, guardado_temp)


            if (avl.raiz == null) {
                let nuevo_avl = new AVL()
                let empleado = new Empleado(x.id, x.nombre, x.edad, x.correo, x.password)
                nuevo_avl.insertar(empleado)

                let avl_temp = CircularJSON.stringify(nuevo_avl)
                localStorage.setItem('datos', JSON.stringify(avl_temp))
            } else {
                let empleado = new Empleado(x.id, x.nombre, x.edad, x.correo, x.password)
                avl.insertar(empleado)

                let avl_temp = CircularJSON.stringify(avl)
                localStorage.setItem('datos', JSON.stringify(avl_temp))
            }

        }
        
    };
    fileread.readAsText(file_to_read);
});


function mostrarAVL() {
    console.log("para txbox")
    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    inordenT(avl.raiz)


}



