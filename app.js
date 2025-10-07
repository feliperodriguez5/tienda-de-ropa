//let nombre = "Rafael";  //String - el espacio cuenta como caracter
//let soltero = true; //Boolean true o false
//const DNI = 12345678; //Number



//console.log(nombre);
//console.log(soltero);
//console.log(DNI);


//nombre = "Jesus"

//console.log(nombre);


//let num1 = 5;
//let num2 = 10;

//console.log(num1 + num2);
//console.log(num1 * num2);

//console.log(num1 + nombre); //concatena y se convierte en string



//let nombreUser = prompt("Ingrese su nombre: "); //abre una ventana para ingresar datos
// console.log( parseInt(nombreUser) ); //convierte a numero el string


//alert("Hola soy " + nombreUser); //abre una ventana de alerta

// let deseaContinuar = confirm("Desea continuar?"); //abre una ventana de confirmacion, devuelve true o false
// console.log(deseaContinuar);

//----------------------------


//if (true) {
//console.log("Es verdadero");

//}


//let edadIngresada = parseInt(prompt("Ingrese su edad: "));

//if (edadIngresada >= 25) {
//    console.log("Puede pasar al VIP");
//} else if (edadIngresada >= 18) {
//    console.log("Puede pasar, pero al VIP");
//} else {
//    console.log("No puede pasar");
//}

// ---- Switch

//switch (edadIngresada) {
//    case 15:
//        console.log("Tenes 15");
//        break;
//    case 18:
//        console.log("Tenes 18");
//        break;
//    case 25:
//        console.log("Tenes 25");
//        break;
//    default:
//        console.log("No tenes una edad especial");
//}

//---- CICLOS -----

//for (let i = 1; i <= 5; i++) {
//    console.log("Hola Mundo: " + i);
//}


// let contador = 1;

//while (contador < 3) {
//    console.log("Hola Mundo WHILE: ");
//    contador++; //contador = contador + 1;
//}

// do {
//     console.log("hola");
//     contador++;
// } while (contador < 3);

function saludar() {
    console.log("Bienvenido a mi tienda"); 
} //defino la funcion

saludar();  //invocar a la funcion


let total = 0;
let seleccion = 0;
do {
    seleccion = prompt("Ingrese un producto: \n1- Camisa $1000 \n2- Pantalon $2000 \n3- Zapatos $3000 \n4- Salir"
    );

    switch (seleccion) {
        case "1":
            total = total + 1000;
            console.log("Total a pagar: $" + total);

            break;
        case "2":
            total = total + 2000;
            console.log("Total a pagar: $" + total);
            break;
        case "3":
            total = total + 3000;
            console.log("Total a pagar: $" + total);
            break;
        case "4":
            alert("Total a pagar: $" + total);
            break;
        default:
            alert("Opción inválida");
            break;
    }

} while (seleccion !== "4");

do {
    seleccion = prompt("Ingrese un producto: \n1- Gorra $1000 \n2- Pañuelo $2000 \n3- Bufanda $3000 \n4- Salir"
    );

    switch (seleccion) {
        case "1":
            total = total + 1000;
            console.log("Total a pagar: $" + total);

            break;
        case "2":
            total = total + 2000;
            console.log("Total a pagar: $" + total);
            break;
        case "3":
            total = total + 3000;
            console.log("Total a pagar: $" + total);
            break;
        case "4":
            alert("Total a pagar: $" + total);
            break;
        default:
            alert("Opción inválida");
            break;
    }

} while (seleccion !== "4");