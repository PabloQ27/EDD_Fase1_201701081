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
}

/* let abb = new Abb()
abb.insertar(25)
abb.insertar(10)
abb.insertar(5)
abb.insertar(20)
abb.insertar(35)
abb.insertar(30)
abb.insertar(40)
abb.preorder(abb.raiz) */
