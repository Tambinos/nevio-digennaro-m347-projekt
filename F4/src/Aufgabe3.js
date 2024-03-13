"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greetPerson = function () {
        console.log('Hallo ' + this.name + '!');
    };
    return Person;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Wie ist dein name?', function (name) {
    var person = new Person(name);
    person.greetPerson();
    rl.question("War diese Aufgabe lehrreich für dich [j / n]", function (answer) {
        if (answer.toLowerCase() === "j") {
            console.log("Super!");
        }
        else {
            console.log("Schade! :(");
        }
        rl.close();
    });
});
