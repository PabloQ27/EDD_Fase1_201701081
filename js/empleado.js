class NodoAVL {
    constructor(obj) {
        this.obj = obj
        this.izq = null
        this.der = null
        this.altura = 0
    }
}

class AVL {
    constructor() {
        this.raiz = null
    }

    insertar(obj) {
        let nuevo = new NodoAVL(obj)
        if (this.raiz == null) {
            this.raiz = nuevo
            
        } else {
            this.insertar_nodo(nuevo, this.raiz)

        }
    }

    insertar_nodo(nuevo, raiz_actual) {
        if (raiz_actual != null) { // entra si hay nodo  y esta lleno
            if (nuevo.obj.id < raiz_actual.obj.id) {
                raiz_actual.izq = this.insertar_nodo(nuevo, raiz_actual.izq)

                if ((this.altura(raiz_actual.izq) - this.altura(raiz_actual.der)) == 2) {
                    console.log('hola')
                    if (nuevo.obj.id < raiz_actual.izq.obj.id) {
                        raiz_actual = this.srl(raiz_actual)

                    } else {
                        raiz_actual = this.drl(raiz_actual)
                    }
                }
            } else if (nuevo.obj.id > raiz_actual.obj.id) {
                raiz_actual.der = this.insertar_nodo(nuevo, raiz_actual.der)
                if ((this.altura(raiz_actual.der) - this.altura(raiz_actual.izq)) == 2) {
                    if (nuevo.obj.id > raiz_actual.der.obj.id) {
                        raiz_actual = this.srr(raiz_actual)

                    } else {
                        raiz_actual = this.drr(raiz_actual)
                    }
                }
            } else {
                console.log("No se permiten valores repetidos")

            }

            return raiz_actual
        } else {
            raiz_actual = nuevo
            var r = this.altura(raiz_actual.der)
            var l = this.altura(raiz_actual.izq)
            var m = this.max(r, l)
            raiz_actual.altura = m + 1
            return raiz_actual
        }

    }

    altura(raiz_actual) {
        if (raiz_actual == null) {
            return -1
        } else {
            return raiz_actual.altura
        }
    }

    max(val1, val2) {
        if (val1 > val2) {
            return val1
        } else {
            return val2
        }
    }

    srl(t1) {
        var t2
        t2 = t1.izq
        t1.izq = t2.der
        t2.der = t1
        t1.altura = max(this.altura(t1.izq), this.altura(t1.der)) + 1
        t2.altura = max(this.altura(t2.izq), t1.altura) + 1
        return t2
    }

    drl(raiz_actual) {
        raiz_actual.izq = this.srr(raiz_actual.izq)
        return this.srl(raiz_actual)
    }

    srr(t1) {
        var t2
        t2 = t1.der
        t1.der = t2.izq
        t2.izq = t1
        t1.altura = this.max(this.altura(t1.izq), this.altura(t1.der)) + 1
        t2.altura = this.max(this.altura(t2.der), t1.altura) + 1

        return t2
    }

    drr(raiz_actual) {
        raiz_actual.der = this.srl(raiz_actual.der)
        return this.srr(raiz_actual)
    }

    preorder(temp) {
        if (temp != null) {
            console.log(temp.obj.id)
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
            console.log(temp.obj.id)
        }
    }

    genDot() {
        let cadena = "digraph abb {\n"
        cadena += this.genNodos(this.raiz)
        cadena += "\n" + this.enlazar(this.raiz)
        cadena += '}'

        console.log(cadena)
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
            if (raiz_actual.izq != null) {
                cadena += 'n' + raiz_actual.obj.id + '-> n' + raiz_actual.izq.obj.id + '\n'
            }
            if (raiz_actual.der != null) {
                cadena += 'n' + raiz_actual.obj.id + '-> n' + raiz_actual.der.obj.id + '\n'
            }
            cadena += this.enlazar(raiz_actual.der)
        }
        return cadena

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

/* let empleado1 = new Empleado(25,"dsd","dsd","dsd","dsd","dsd")
let empleado2 = new Empleado(10,"dsd","dsd","dsd","dsd","dsd")
let empleado3 = new Empleado(5,"dsd","dsd","dsd","dsd","dsd")
let empleado4 = new Empleado(20,"dsd","dsd","dsd","dsd","dsd")
let empleado5 = new Empleado(35,"dsd","dsd","dsd","dsd","dsd")
let empleado6 = new Empleado(30,"dsd","dsd","dsd","dsd","dsd")
let empleado7 = new Empleado(40,"dsd","dsd","dsd","dsd","dsd")
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

avl.genDot() */



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

    if(avl.raiz == null){
        let nuevo_avl = new AVL()
        let empleado = new Empleado(id, nombre, edad, email, pass)
        nuevo_avl.insertar(empleado)
        let avl_temp = CircularJSON.stringify(nuevo_avl)
        localStorage.setItem('datos', JSON.stringify(avl_temp))

        console.log('lista de IDs Avl')
        nuevo_avl.inorden(nuevo_avl.raiz)
    }else{
        //validar si el empleado no se repite
        let empleado = new Empleado(id, nombre, edad, email, pass)
        avl.insertar(empleado)

        let avl_temp = CircularJSON.stringify(avl)
        localStorage.setItem('datos', JSON.stringify(avl_temp))
        //avl.genDot()
        console.log('lista de IDs Avl')
        avl.inorden(avl.raiz)
    }
}

function back(){
    window.open("admin_empleados.html", "_self")
}

//  METODO PARA EL LOGIN
function verificar() {
    let tcombo = document.getElementById('textb').value
    let id = document.getElementById('id').value
    let pass = document.getElementById('pass').value

    if (tcombo == 'admin'){
        if(id == 'Admin' && pass == '1234'){
            window.open("admin_empleados.html", "_self")
        }else{
            alert('Credenciales de administrador incorrectas')           
        }
    }else{
        console.log('selecciono el empleado')
        validar_emplado(id,pass)
    }
}

function validar_emplado(id,pass){
    var guardado_temp = JSON.parse(localStorage.getItem('datos')) 
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)
    if(avl.raiz == null){
        alert('Sin usuarios')
    }else{
        console.log('revisar')
        recorreIn(avl.raiz,id,pass)
    }
}

function recorreIn(temp,id,pass){
     
    if (temp != null){     
        this.recorreIn(temp.izq,id,pass)
        if(temp.obj.id == id && temp.obj.password == pass){
            console.log('lo encontro xd')
            window.open("empleado_cliente.html", "_self")
            let nId = temp.obj.id
            let nPass = temp.obj.password
            localStorage.setItem('claveID', nId)
            localStorage.setItem('clavePass',nPass)
            
        }
        this.recorreIn(temp.der,id,pass)       
    }
    
}

function salir(){
    window.open("login.html", "_self")
}




let combo = document.getElementById("combobox")
let elementos = "<option> Seleccione Empleado </option>"

function inordenT(temp){

    if (temp != null) {
        this.inordenT(temp.izq)
        elementos += "<option id='"+temp.obj.id+"'>"+temp.obj.id+"</option>"
        combo.innerHTML = elementos
        console.log(combo.innerHTML)
        this.inordenT(temp.der)
    }
}

document.getElementById("fichero").addEventListener("change", function() {
    var file_to_read = document.getElementById("fichero").files[0];
    var fileread = new FileReader();
    fileread.onload = function(e) {
      var content = e.target.result;
      var intern = JSON.parse(content); // parse json 
      console.log(intern.vendedores[0]["id"]); // You can index every object
    };
    fileread.readAsText(file_to_read);
  });


function mostrarAVL(){
    console.log("para txbox")
    var guardado_temp = JSON.parse(localStorage.getItem('datos')) 
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    inordenT(avl.raiz)
    
    
}



mostrarAVL()