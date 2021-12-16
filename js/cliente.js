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

function validar(){
    var tb = document.getElementById("textb").value
    let adminH = document.getElementById("admin").value
    let pass = document.getElementById("pass").value
    if(tb == 'admin' /* && adminH == 'Admin' && pass == 1234 */ ){
        console.log('form admin',adminH)
        

        window.open('index.html','_self')
        
    }else if(2==+1){
        console.log('form empleamdo')
    }else{
        alert("Usuario o contraña incorrecto")
    }
}

