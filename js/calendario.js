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
            let c2 = new Calendario(10, 3, "julio", "boda")
            let c3 = new Calendario(15, 4, "julio", "boda")
            dias.add2(c2)
            dias.add2(c3)
            dias.add2(obj)  
            this.cabeza = nuevo
            nuevo.der = dias
        } else {
            let temp = this.cabeza
            while (temp != null) {
                //ordena por hora
                if (obj.hora > temp.index && temp.abajo == null) {
                    temp.abajo = nuevo
                    nuevo.arriba = temp
                    break
                } else if (obj.hora < temp.index && temp.arriba == null) {
                    this.cabeza = nuevo
                    nuevo.abajo = temp
                    temp.arriba = nuevo
                    break
                } else if (obj.hora > temp.index && obj.hora < temp.abajo.index) {
                    let tempabajo = temp.abajo
                    temp.abajo = nuevo
                    nuevo.arriba = temp
                    tempabajo.arriba = nuevo
                    nuevo.abajo = tempabajo
                    break
                } else if (obj.hora == temp.index) {
                    
                    temp.der = this.cambio(temp.der,obj)
                    console.log(temp.index, "ya se habia ingresado")

                }
                temp = temp.abajo
            }
        }
    }

    cambio(listavieja,obj){
        console.log("cambio")
        let listaNueva = new Lista2()
        let temp = listavieja.cabeza
        while(temp != null){
            listaNueva.add2(temp.obj)
            console.log(temp.obj.hora)
            temp = temp.sig
        }
        listaNueva.add2(obj) 
        console.log("nueva Lista")
        let temp2 = listaNueva.cabeza
        while(temp2 != null){
            console.log(temp2.obj.hora)
            temp2 = temp2.sig
        }
        return listaNueva
    }

    ver() {
        let temp = this.cabeza
        console.log("\nordenado por hora")
        while (temp != null) {
            console.log("Hora: ", temp.index)
            if (temp.der == null) {
                console.log("vacio xd")
            } else {
                let temp2 = temp.der.cabeza
                while (temp2 != null) {
                    console.log("  Dia: ", temp2.obj.dia)
                    temp2 = temp2.sig
                }
            }
            temp = temp.abajo
        }
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

/* 
let e1 = new Calendario(1,3,"","")
let e2 = new Calendario(1,10,"","")
let e3 = new Calendario(1,15,"","")
let e4 = new Calendario(1,13,"","")
let e5 = new Calendario(1,5,"","")
let e6 = new Calendario(1,2,"","")
let e7 = new Calendario(1,18,"","")
 */

let cal = new Lista1()
let c1 = new Calendario(3, 5, "julio", "boda")
let c2 = new Calendario(10, 2, "julio", "boda")
let c3 = new Calendario(15, 2, "julio", "boda")
let c4 = new Calendario(13, 2, "julio", "boda")
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
