class Cliente{
    constructor(id, nombre, correo){
        this.id = id
        this.nombre = nombre
        this.correo = correo
    }
}

class Nodo{
    constructor(obj){
        this.obj = obj
        this.siguiente = null
        this.anterior = null
    }
}

class Lista_Cliente{
    constructor(){
        this.cabeza = null
    }

    insert(obj){
        console.log('agregando')
        let nuevo = new Nodo(obj)
        if (this.cabeza == null){
            this.cabeza = nuevo
        }else{
            let temp = this.cabeza
            while (temp.siguiente != this.cabeza){               
                temp = temp.siguiente
            }
            temp.siguiente = nuevo
            nuevo.anterior = temp
        }
    }
}


