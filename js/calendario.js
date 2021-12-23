class NodoMes {
    constructor(mes) {
        this.mes = mes
        this.sig = null
        this.ant = null
        this.matriz = null
    }
}

class Lista_Mes {
    constructor() {
        this.cabeza = null
    }

    add(obj) {
        console.log('agregando')
        let nuevo = new NodoMes(obj)
        if (this.cabeza == null) {
            this.cabeza = nuevo
        } else {
            let temp = this.cabeza
            while (temp.sig != null) {
                temp = temp.sig
            }
            temp.sig = nuevo
            nuevo.ant = temp
        }
    }

    ver() {
        let temp = this.cabeza
        while (temp != null) {
            console.log(temp.mes)
            temp = temp.sig
        }
    }
}



class Calendario {
    constructor(hora, dia, mes, evento) {
        this.hora = hora
        this.dia = dia
        this.mes = mes
        this.evento = evento
    }
}

class Nodo1 { //para cabeceras
    constructor(index) {
        this.index = index
        this.der = null
        this.arriba = null
        this.abajo = null
    }
}

class Lista1 {
    constructor() {
        this.cabeza = null

    }

    add(index, obj) {
        let nuevo = new Nodo1(index)
        if (this.cabeza == null) {
            let dias = new Lista2()
            dias.add2(obj)
            this.cabeza = nuevo
            nuevo.der = dias
        } else {
            let temp = this.cabeza
            while (temp != null) {
                //ordena por hora
                if (obj.hora > temp.index && temp.abajo == null) {
                    let dias = new Lista2()
                    dias.add2(obj)
                    temp.abajo = nuevo
                    nuevo.arriba = temp
                    nuevo.der = dias
                    break
                } else if (obj.hora < temp.index && temp.arriba == null) {
                    this.cabeza = nuevo
                    let dias = new Lista2()
                    dias.add2(obj)
                    nuevo.abajo = temp
                    temp.arriba = nuevo
                    nuevo.der = dias
                    break
                } else if (obj.hora > temp.index && obj.hora < temp.abajo.index) {
                    let tempabajo = temp.abajo
                    let dias = new Lista2()
                    dias.add2(obj)
                    temp.abajo = nuevo
                    nuevo.arriba = temp
                    tempabajo.arriba = nuevo
                    nuevo.abajo = tempabajo
                    nuevo.der = dias
                    break
                } else if (obj.hora == temp.index) {

                    temp.der = this.cambio(temp.der, obj)
                    console.log(temp.index, "ya se habia ingresado")

                }
                temp = temp.abajo
            }
        }
    }

    cambio(listavieja, obj) {
        console.log("cambio")
        let listaNueva = new Lista2()
        let temp = listavieja.cabeza
        while (temp != null) {
            listaNueva.add2(temp.obj)
            console.log(temp.obj.hora)
            temp = temp.sig
        }
        listaNueva.add2(obj)
        console.log("nueva Lista")
        let temp2 = listaNueva.cabeza
        while (temp2 != null) {
            console.log(temp2.obj.hora)
            temp2 = temp2.sig
        }
        return listaNueva
    }

    ver() {
        let temp = this.cabeza
        let cadena = ""
        console.log("\nordenado por hora")
        while (temp != null) {
            console.log("Hora: ", temp.index)
            cadena += "Hora: "+temp.index+"\n"
            if (temp.der == null) {
                console.log("vacio xd")
            } else {
                let temp2 = temp.der.cabeza
                while (temp2 != null) {
                    console.log("  Dia: ", temp2.obj.dia, " - evento: ", temp2.obj.evento)
                    cadena += "   Dia: "+ temp2.obj.dia+ " - evento: "+ temp2.obj.evento +"\n"
                    temp2 = temp2.sig
                }
            }
            temp = temp.abajo
        }
        return cadena
    }
}




class Nodo2 {//Nodos internos
    constructor(obj) {
        this.obj = obj
        this.ant = null
        this.sig = null
    }
}

class Lista2 {
    constructor() {
        this.cabeza = null
    }

    add2(obj) {
        let nuevo = new Nodo2(obj)
        if (this.cabeza == null) {
            this.cabeza = nuevo
        } else {
            let temp = this.cabeza
            while (temp != null) {
                if (obj.dia > temp.obj.dia && temp.sig == null) {
                    temp.sig = nuevo
                    nuevo.ant = temp
                    break
                } else if (obj.dia < temp.obj.dia && temp.ant == null) {
                    this.cabeza = nuevo
                    nuevo.sig = temp
                    temp.ant = nuevo
                    break
                } else if (obj.dia > temp.obj.dia && obj.dia < temp.sig.obj.dia) {
                    let tempsig = temp.sig
                    temp.sig = nuevo
                    nuevo.ant = temp
                    tempsig.ant = nuevo
                    nuevo.sig = tempsig
                    break
                } else if (obj.dia == temp.obj.dia) {
                    console.log(temp.obj.dia, "ya tiene envento")
                }
                temp = temp.sig
            }
        }
    }

    ver2() {
        let temp = this.cabeza
        while (temp != null) {
            console.log(temp.obj.dia)
            temp = temp.sig
        }
    }
}

//Lista1 es la matriz para calendario
/* let cal = new Lista1()//H  dia
let c1 = new Calendario(1, 1, "julio", "boda")
let c2 = new Calendario(3, 1, "agosto", "boda")
let c3 = new Calendario(2, 2, "semptiembre", "boda")
let c4 = new Calendario(1, 2, "julio", "boda")
let c5 = new Calendario(3, 23, "julio", "boda")
let c6 = new Calendario(3, 2, "julio", "boda")
let c7 = new Calendario(3, 2, "julio", "boda")
cal.add(c1.hora, c1)
cal.add(c2.hora, c2)
cal.add(c3.hora, c3)
cal.add(c4.hora, c4)
cal.add(c5.hora, c5)
cal.add(c6.hora, c6)
cal.add(c7.hora, c7)
cal.ver()
 */
function add_calendario() {
    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    idTemp = localStorage.getItem("claveID")

    let dia = document.getElementById("dia").value
    let hora = document.getElementById("hora").value
    let mes = document.getElementById("mes").value
    let descrip = document.getElementById("evento").value

    buscaridMes(avl.raiz, idTemp, Number(dia), Number(hora), Number(mes), descrip, avl)

    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)

}

function buscaridMes(temp, idTemp, dia, hora, mes, descrip, avl) {
    if (temp != null) {
        buscaridMes(temp.izq, idTemp, dia, hora, mes, descrip, avl)
        if (idTemp == temp.obj.id) {
            console.log("de buscarmes***", temp.obj.listaMeses)
            temp.obj.listaMeses = buscarmes(temp.obj.listaMeses, dia, hora, mes, descrip, avl)

            let avl_temp = CircularJSON.stringify(avl)
            localStorage.setItem('datos', JSON.stringify(avl_temp))

            return 1
        }
        buscaridMes(temp.der, idTemp, dia, hora, mes, descrip, avl)
    }
}

function buscarmes(lista, dia, hora, mes, descrip, avl) {
    if (lista == null) {
        let nuevaLista = new Lista_Mes()
        nuevaLista.add(mes)

        let eventos = new Lista1()
        let event = new Calendario(hora, dia, mes, descrip)
        eventos.add(hora, event)
        nuevaLista.cabeza.matriz = eventos
        eventos.ver()
        nuevaLista.ver

        return nuevaLista

    } else {
        let Meses = new Lista_Mes()
        Object.assign(Meses, lista)
        let event = new Calendario(hora, dia, mes, descrip)
        let temp = Meses.cabeza
        while (temp != null) {
            if (mes == temp.mes) {
                console.log("el mes ya esta")
                let list = new Lista1()
                Object.assign(list, temp.matriz)

                list.add(hora, event)
                temp.matriz = list

                console.log("la matriz")
                list.ver()
                Meses.ver()
                return Meses
            }
            temp = temp.sig
        }
        if (temp == null) {
            Meses.add(mes)
            temp = Meses.cabeza
            while (temp.sig != null) {
                temp = temp.sig
            }
            let eventos = new Lista1()
            eventos.add(hora, event)
            temp.matriz = eventos
            eventos.ver()
            Meses.ver()
            return Meses
        }
    }
}

function buscarEvento() {
    var guardado_temp = JSON.parse(localStorage.getItem('datos'))
    var avl = new AVL()
    guardado_temp = CircularJSON.parse(guardado_temp)
    Object.assign(avl, guardado_temp)
    console.log(avl)

    idTemp = localStorage.getItem("claveID")
    enorden(avl.raiz, idTemp)

}

function enorden(temp, id) {
    if (temp != null) {
        enorden(temp.izq, id)
        if (temp.obj.id == id) {
            //            genDot(temp.obj.listaClientes, temp.obj.listaClientes)
            console.log("la lista", temp.obj.listaMeses)
            //generarDot(temp.obj.listaMeses)
            mandardatos(temp.obj.listaMeses)

        }
        enorden(temp.der, id)
    }
}

function mandardatos(lista) {
    let cadena = ""
    let Meses = new Lista_Mes()
    Object.assign(Meses, lista)
    let temp = lista.cabeza
    while(temp != null){
        let list = new Lista1()
        console.log(temp.mes)
        Object.assign(list, temp.matriz)
        cadena += list.ver()
        temp = temp.sig
    }
    console.log(cadena)

    document.getElementById("textarea").innerHTML = cadena


}

function generarDot(temp) {
    let cadena = ""
    cadena += "node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;\n"
    let aux_y = temp.cabeza;
    while (aux_y != null) {
        cadena += "node[label = " + aux_y.mes + " fillcolor=\" azure1\" pos = \"-1,-" + aux_y.mes + "!\"]y" + aux_y.mes + ";\n"
        aux_y = aux_y.sig;
    }
    console.log(cadena)
}

document.getElementById("fichero_evento").addEventListener("change", function () {
    var file_to_read = document.getElementById("fichero_evento").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;
        var intern = JSON.parse(content);
        console.log(intern.vendedores)

        for (x of intern.vendedores) {

            var guardado_temp = JSON.parse(localStorage.getItem('datos'))
            var avl = new AVL()
            guardado_temp = CircularJSON.parse(guardado_temp)
            Object.assign(avl, guardado_temp)


            console.log("id del empleado: ", x.id)

            for (z of x.eventos) {
                console.log(z.mes, z.dia, z.hora, z.desc)

                buscaridMes(avl.raiz, x.id, z.dia, z.hora, z.mes, z.desc, avl)


            }
        }

        var guardado_temp = JSON.parse(localStorage.getItem('datos'))
        var avl = new AVL()
        guardado_temp = CircularJSON.parse(guardado_temp)
        Object.assign(avl, guardado_temp)
        console.log("avl despues de guardar clientes")
        console.log(avl)

    };
    fileread.readAsText(file_to_read);
});
