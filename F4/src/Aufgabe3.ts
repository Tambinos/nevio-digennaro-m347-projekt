import * as readline from 'readline';
class Person {
    name: string;
    constructor(name:string) {
        this.name = name;
    }
    greetPerson() {
        console.log('Hallo ' + this.name + '!');
    }
}
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Wie ist dein name?', (name) => {
    let person = new Person(name);
    person.greetPerson();
    rl.question("War diese Aufgabe lehrreich für dich [j / n]",(answer:string) =>{
        if (answer.toLowerCase() === "j"){
            console.log("Super!")
        }else {
            console.log("Schade! :(")
        }
        rl.close()
    })
})


