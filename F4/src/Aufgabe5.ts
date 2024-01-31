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
        return this.email.includes("@") && this.email.includes(".com");
    }
}

const user = new User("Hans", "Hans@gmail.com")
console.log(user.emailValidation())