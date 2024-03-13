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
        return this.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) !== null;
    };
    return User;
}());
var user = new User("Hans", "Hans@gmail.com");
var user2 = new User("Hans", "@.com");
console.log(user2.emailValidation());
