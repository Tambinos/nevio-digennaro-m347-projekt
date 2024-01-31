"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.introduceSelf = function () {
        return "Hallo, mein Name ist " + this.name + ".";
    };
    return Person;
}());
exports.Person = Person;
var personA = new Person("Hansli");
console.log(personA.introduceSelf());
