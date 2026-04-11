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

async function iniciarJuego() {

    let inicio = "";
    inicio = (await getUserInput ("\n¿Quieres jugar al ahorcado?. si o no")).trim().toLowerCase();

    while (inicio !== "si" && inicio !== "no") {
        inicio = (await getUserInput ("\nPor favor ingresa si o no")).trim().toLowerCase();
    }

    if (inicio === "no"){
        console.log("\nOk, estare aqui cuando quieras jugar.");
        return rl.close();
    }

    let nombreUsuario = "";
    nombreUsuario = await getUserInput("¿Como puedo llamarte?");
    console.log("¡Hola " + nombreUsuario + "! Vamos a jugar al Ahorcado.");
    
    while (inicio === "si" ) {
        
        const palabras = ["pajaro", "tortuga", "serpiente", "raton", "perro", "gato"];
        const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
        let palabraOculta = Array(palabraSecreta.length).fill("_");
        let intentosRestantes = palabraSecreta.length;
        let letrasUsadas = [];
        
        while (intentosRestantes > 0 && palabraOculta.includes("_")) {
            console.log("\nPalabra: " + palabraOculta.join(" "));
            console.log("Letras usadas: " + (letrasUsadas.length > 0 ? letrasUsadas.join(", ") : "Ninguna"));
            console.log("Intentos restantes: " + intentosRestantes);

            let entrada = await getUserInput("Ingresa una letra:");
            
            function aciertoDerrota() {
                let letra = entrada.trim().toLowerCase().charAt(0);

                if (!letra || !/^[a-zñ]$/.test(letra)) {
                    console.log("\nPor favor, ingresa una letra válida.");
                }

                if (letrasUsadas.includes(letra)) {
                    console.log("\nYa usaste la letra '" + letra + "'. Intenta con otra.");
                }

                letrasUsadas.push(letra);

                if  (palabraSecreta.includes(letra)) {
                    console.log("\n¡Bien hecho! La letra '" + letra + "' está en la palabra.");
                    for (let i = 0; i < palabraSecreta.length; i++) {
                        if (palabraSecreta[i] === letra) {
                            palabraOculta[i] = letra;
                        }
                    }
                } else {
                    console.log("\nIncorrecto. La letra '" + letra.toUpperCase() + "' no está.");
                    intentosRestantes--;
                }
            }
            aciertoDerrota();
            
            if (intentosRestantes === 1) {
                console.log("Atento, solo te queda un intento. Si fallas, se acabo.");
            }
        }

        function ganarPerder() {

            if ( palabraOculta.join("") === palabraSecreta ) {
                console.log("\n¡FELICIDADES! GANASTE!");
                console.log("La palabra secreta es: " + palabraSecreta.toUpperCase());
            } else {
                console.log("\nTe lo adverti, ¡PERDISTE! Te quedaste sin intentos");
                console.log("La palabra secreta era: " + palabraSecreta.toUpperCase());
            }
        }
        ganarPerder();

        inicio = (await getUserInput ("\n¿Quieres volver a jugar al ahorcado?. si o no")).trim().toLowerCase();
        
        while (inicio !== "si" && inicio !== "no") {
            inicio = (await getUserInput ("\nPor favor ingresa si o no")).trim().toLowerCase();
        }

        if (inicio === "no"){
            console.log("\nOk, " + nombreUsuario + " estare aqui cuando quieras jugar.");
            return rl.close();
        }
    }
}
iniciarJuego();