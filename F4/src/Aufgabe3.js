"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Person = /** @class */ (function () {
    //code
    function Person() {
        // code
    }
    Person.prototype.greetPerson = function () {
        // code
    };
    return Person;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Wie ist dein name?', function (name) {
    console.log("Hallo, ".concat(name, "!"));
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
//# sourceMappingURL=Aufgabe3.js.map