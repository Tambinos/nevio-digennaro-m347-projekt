var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.introduceSelf = function () {
        return "Hallo, mein Name ist " + this.name + ".";
    };
    return Person;
}());
var personA = new Person("Hansli");
console.log(personA.introduceSelf());
//# sourceMappingURL=Aufgabe2.js.map