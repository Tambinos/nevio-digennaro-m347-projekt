import * as readline from 'readline';
class Person {
    //code

    constructor() {
        // code
    }
    greetPerson() {
        // code
    }
}
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Wie ist dein name?', (name) => {
    console.log(`Hallo, ${name}!`);
    rl.question("War diese Aufgabe lehrreich für dich [j / n]",(answer:string) =>{
        if (answer.toLowerCase() === "j"){
            console.log("Super!")
        }else {
            console.log("Schade! :(")
        }
        rl.close()
    })
})


