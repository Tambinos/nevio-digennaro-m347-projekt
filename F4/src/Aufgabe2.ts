class Person {
    //Code
    name: string

    constructor(name: string) {
        this.name = name
    }

    introduceSelf(): string {
        return "Hallo, mein Name ist " + this.name + "."
    }
}

let personA = new Person("Hansli");

console.log(personA.introduceSelf());