class Proveedor{
    constructor(id, nombre, direccion, telefono, correo){
        this.id = id 
        this.nombre = nombre
        this.direccion = direccion
        this.telefono = telefono
        this.correo = correo
    }
}

class Nodo{
    constructor(obj){
        this.obj = obj
        this.izq = null
        this.der = null
    }
}

class Abb{
    constructor(){
        this.raiz = null

    }

    insertar(obj){
        let nuevo = new Nodo(obj)
        if (this.raiz == null){
            this.raiz = nuevo
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo)
        }
    }
    insertar_nodo(raiz_actual,nuevo){ //nuevo es un nodo el cual ya fue creado y tiene el espacio en memoria
        if(raiz_actual != null){ // entra si hay nodo  y esta lleno
            if (nuevo.obj < raiz_actual.obj){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq, nuevo) 
                
            }else if (nuevo.obj > raiz_actual.obj){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der, nuevo)
            }else{
                console.log("No se permiten valores repetidos")
                
            }
            return raiz_actual
        }else{
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
    
    inorden(temp){
        if (temp != null){
            this.inorden(temp.izq)
            console.log(temp.obj)
            this.inorden(temp.der)
        }
    }

    postorden(temp){
        if (temp != null){
            this.postorden(temp.izq)
            this.postorden(temp.der)
            console.log(temp.obj)
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
            nodos += "n" + raiz_actual.obj + "[label = \"" +raiz_actual.obj+"\"]\n"
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
                cadena += 'n' + raiz_actual.obj + '-> n' +raiz_actual.izq.obj+'\n'
            }
            if(raiz_actual.der != null){
                cadena += 'n' + raiz_actual.obj + '-> n' +raiz_actual.der.obj+'\n'
            }
            cadena += this.enlazar(raiz_actual.der)
        }
        return cadena

    }
}

let abb = new Abb()
abb.insertar(25)
abb.insertar(10)
abb.insertar(5)
abb.insertar(20)
abb.insertar(35)
abb.insertar(30)
abb.insertar(40)
abb.preorder(abb.raiz)
console.log()
abb.inorden(abb.raiz)
console.log()
abb.postorden(abb.raiz)

abb.genDot()
