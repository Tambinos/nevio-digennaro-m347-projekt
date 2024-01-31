class Person {
    //Code
    name: string

    constructor(name: string) {
        this.name = name
    }

    introduceSelf() {
        console.log("Hallo, mein Name ist " + this.name + ".")
    }
}

class Friend extends Person {
    time: number;

    constructor(name: string, time: number) {
        super(name);
        this.time = time;
    }

    timeKnown() {
        console.log("Wir sind Freunde seit " + this.time + " Jahren");
    }
}

let peter = new Friend("Peter", 5);
peter.introduceSelf();
peter.timeKnown();
