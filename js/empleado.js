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
        }else{
            this.insertar_nodo(this.raiz, nuevo)

        }
    }

    insertar_nodo(raiz_actual, nuevo){
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

let empleado = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let empleado = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let empleado = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let empleado = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let empleado = new Empleado(1,"dsd","dsd","dsd","dsd","dsd")
let avl = new AVL()
avl.insertar(empleado)
/* function ver(){
    console.log("abeer")
    let empleado1 = new Empleado(23,'roberto',44, 'correossss','passsss','liss')
    console.log(empleado1.nombre)
    let nombre = document.getElementById("nombre").value
    console.log(nombre)
    document.getElementById("edad").value = 18
} */
