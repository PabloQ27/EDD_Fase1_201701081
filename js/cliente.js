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
            while (temp.siguiente != null){               
                temp = temp.siguiente
            }
            temp.siguiente = nuevo
            nuevo.anterior = temp
        }
    }

    ver(){
        let temp = this.cabeza
        while (temp != null){
            console.log(temp.obj.id)
            temp = temp.siguiente
        }

    }
}

let listap = new Lista_Cliente()
let p1 = new Cliente(1,"sd","sd")
let p2 = new Cliente(2,"sd","sd")
let p3 = new Cliente(3,"sd","sd")
let p4 = new Cliente(4,"sd","sd")
listap.insert(p1)
listap.insert(p2)
listap.insert(p3)
listap.insert(p4)
listap.ver()



function validar(){
    var tb = document.getElementById("textb").value
    let adminH = document.getElementById("admin").value
    let pass = document.getElementById("pass").value
    if(tb == 'admin' /* && adminH == 'Admin' && pass == 1234 */ ){
        console.log('form admin',adminH)
        

        window.open('admin_empleados.html','_self')
        
    }else if(2==+1){
        console.log('form empleamdo')
    }else{
        alert("Usuario o contraña incorrecto")
    }
}


let lista_cliente = new Lista_Cliente()
function add_cliente(){
    let val = document.getElementById("combobox").value
    console.log(val)

    var guardado_temp = JSON.parse(localStorage.getItem('datos')) 
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)

    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let edad = document.getElementById("correo").value
    let cliente = new Cliente(id,nombre,edad)
    lista_cliente.insert(cliente)
    


    avl.raiz.obj.listaCliente = lista_cliente
    console.log("list d la raiz",avl.raiz.obj.listaCliente)
    let avl_temp = CircularJSON.stringify(avl)
    localStorage.setItem('datos', JSON.stringify(avl_temp))
}


