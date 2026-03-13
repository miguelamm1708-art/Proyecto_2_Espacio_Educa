// version 1.0.0

var username = "";

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

async function startGame() {
    username = await getUserInput("Como puedo llamarte?");// le pregunta al usuario su nombre.
    console.log("¡Hola " + username + "! Vamos a jugar al Ahorcado.");

    const palabras = ["pajaro", "tortuga", "serpiente", "raton", "perro", "gato"];
    const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    var palabraOculta = Array(palabraSecreta.length).fill("_");
    var intentosRestantes = 6;
    var letrasUsadas = [];


    while (intentosRestantes > 0 && palabraOculta.includes("_")) {
        console.log("\nPalabra: " + palabraOculta.join(" "));
        console.log("Letras usadas: " + (letrasUsadas.length > 0 ? letrasUsadas.join(", ") : "Ninguna"));
        console.log("Intentos restantes: " + intentosRestantes);

        var entrada = await getUserInput("Ingresa una letra:");
        
        var letra = entrada.trim().toLowerCase().charAt(0);

        if (!letra || !/^[a-zñ]$/.test(letra)) {
             console.log("Por favor, ingresa una letra válida.");
             continue;
        }

        if (letrasUsadas.includes(letra)) {
            console.log(" Ya usaste la letra '" + letra + "'. Intenta con otra.");
            continue;
        }

        letrasUsadas.push(letra);

        if  (palabraSecreta.includes(letra)) {
            console.log("\n¡Bien hecho! La letra '" + letra + "' está en la palabra.");
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraOculta[i] = letra;
                }
            }
        } else {
            console.log("\nIncorrecto. La letra '" + letra + "' no está.");
            intentosRestantes--;
        }
        
    }

    if (!palabraOculta.includes("_")) {
        console.log("\n¡FELICIDADES! GANASTE!");
    } else {
        console.log("\n ¡PERDISTE! Te quedaste sin intentos");
    }
    
    console.log("La palabra secreta era: " + palabraSecreta.toUpperCase());

    return rl.close(); 
}

startGame();

//node script.js