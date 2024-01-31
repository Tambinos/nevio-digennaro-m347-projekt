var User = /** @class */ (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
        if (this.emailValidation()) {
            console.log("Valide Email");
        }
        else {
            console.log("Not good email");
            throw new Error();
        }
        this.greet();
    }
    User.prototype.greet = function () {
        console.log("Hallo " + this.name + "Das ihre email: " + this.email);
    };
    User.prototype.emailValidation = function () {
        return this.email.includes("@") && this.email.includes(".com");
    };
    return User;
}());
var user = new User("Hans", "Hans@gmail.com");
console.log(user.emailValidation());
//# sourceMappingURL=Aufgabe5.js.map