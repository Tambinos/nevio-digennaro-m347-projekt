class User {
    name: string
    email: string

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email
        if (this.emailValidation()) {
            console.log("Valide Email")
        } else {
            console.log("Not good email")
            throw new Error();
        }
        this.greet()

    }

    greet() {
        console.log("Hallo " + this.name + "Das ihre email: " + this.email)
    }

    emailValidation(): boolean {
        return this.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) !== null;
    }
}

const user = new User("Hans", "Hans@gmail.com")
const user2 = new User("Hans", "@.com")
console.log(user2.emailValidation())