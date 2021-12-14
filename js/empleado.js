   class Nodo{
    constructor(obj){
        this.obj = obj
        this.izq = null
        this.der = null
        this.altura = 0
    }
}

class AVL{
    constructor(){
        this.raiz = null
    }

    insertar(obj){
        let nuevo = new Nodo(obj)
        if (this.raiz == null){
            this.raiz = nuevo
            console.log("Agrego raiz",this.raiz.obj.id)
        }else{
            this.insertar_nodo(nuevo, this.raiz)

        }
    }

    insertar_nodo(nuevo, raiz_actual){
        if(raiz_actual != null){ // entra si hay nodo  y esta lleno
            if (nuevo.obj.id < raiz_actual.obj.id){
                raiz_actual.izq = this.insertar_nodo(nuevo, raiz_actual.izq) 
                
                if((this.altura(raiz_actual.izq)-this.altura(raiz_actual.der)) == 2){
                    console.log('hola')
                    if(nuevo.obj.id < raiz_actual.izq.obj.id){
                        raiz_actual = this.srl(raiz_actual)
                        
                    }else{
                        raiz_actual = this.drl(raiz_actual)
                    }
                }
            }else if (nuevo.obj.id > raiz_actual.obj.id){
                raiz_actual.der = this.insertar_nodo(nuevo, raiz_actual.der)
                if ((this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)) == 2){
                    if (nuevo.obj.id > raiz_actual.der.obj.id){
                        raiz_actual = this.srr(raiz_actual)
                        
                    }else{
                        raiz_actual = this.drr(raiz_actual)
                    }
                }
            }else{
                console.log("No se permiten valores repetidos")
                
            }    
            
            return raiz_actual
        }else{          
            raiz_actual = nuevo
            var r = this.altura(raiz_actual.der)
            var l = this.altura(raiz_actual.izq)
            var m = this.max(r,l)
            raiz_actual.altura = m + 1 
            return raiz_actual
        }

    }

    altura(raiz_actual){
        if(raiz_actual == null){
            return -1
        }else{
            return raiz_actual.altura
        }
    }

    max(val1,val2){
        if (val1 > val2){
            return val1
        }else{
            return val2
        }
    }

    srl(t1){
        var t2
        t2 = t1.izq
        t1.izq = t2.der
        t2.der = t1
        t1.altura = max(this.altura(t1.izq),this.altura(t1.der)) + 1
        t2.altura = max(this.altura(t2.izq), t1.altura) + 1
        return t2
    }

    drl(raiz_actual){
        raiz_actual.izq = this.srr(raiz_actual.izq)
        return this.srl(raiz_actual)
    }

    srr(t1){
        var t2
        t2 = t1.der
        t1.der = t2.izq
        t2.izq = t1
        t1.altura = this.max(this.altura(t1.izq), this.altura(t1.der)) + 1
        t2.altura = this.max(this.altura(t2.der), t1.altura) + 1

        return t2
    }

    drr(raiz_actual){
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
    
    inorden(temp){
        if (temp != null){
            this.inorden(temp.izq)
            console.log(temp.obj.id)
            this.inorden(temp.der)
        }
    }

    postorden(temp){
        if (temp != null){
            this.postorden(temp.izq)
            this.postorden(temp.der)
            console.log(temp.obj.id)
        }
    }

    genDot(){
        let cadena = "digraph abb {\n"
        cadena += this.genNodos(this.raiz)
        cadena += "\n"+this.enlazar(this.raiz)
        cadena += '}'

        console.log(cadena)
    }

    genNodos(raiz_actual){
        let nodos = ""
        if(raiz_actual != null){
            nodos += "n" + raiz_actual.obj.id + "[label = \"" +raiz_actual.obj.id+"\"]\n"
            nodos += this.genNodos(raiz_actual.izq)
            nodos += this.genNodos(raiz_actual.der)
        }
        return nodos
    }

    enlazar(raiz_actual){
        let cadena = ''
        if (raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izq)
            if(raiz_actual.izq != null){
                cadena += 'n' + raiz_actual.obj.id + '-> n' +raiz_actual.izq.obj.id+'\n'
            }
            if(raiz_actual.der != null){
                cadena += 'n' + raiz_actual.obj.id + '-> n' +raiz_actual.der.obj.id+'\n'
            }
            cadena += this.enlazar(raiz_actual.der)
        }
        return cadena

    }
}



class Empleado{
    constructor(id, nombre, edad, correo, password, listaClientes){
        this.id = id
        this.nombre = nombre
        this.edad = edad
        this.correo = correo
        this.password = password
        this.listaClientes = listaClientes
        // pendiente agregar la lista para el calendario
    }
    
}

let empleado1 = new Empleado(25,"dsd","dsd","dsd","dsd","dsd")
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

avl.genDot()


/* function ver(){
    console.log("abeer")
    let empleado1 = new Empleado(23,'roberto',44, 'correossss','passsss','liss')
    console.log(empleado1.nombre)
    let nombre = document.getElementById("nombre").value
    console.log(nombre)
    document.getElementById("edad").value = 18
} */

function pempledo(){
    console.log('vista para el elmpleado')
}