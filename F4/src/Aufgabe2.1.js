var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.introduceSelf = function () {
        console.log("Hallo, mein Name ist " + this.name + ".");
    };
    return Person;
}());
var Friend = /** @class */ (function (_super) {
    __extends(Friend, _super);
    function Friend(name, time) {
        var _this = _super.call(this, name) || this;
        _this.time = time;
        return _this;
    }
    Friend.prototype.timeKnown = function () {
        console.log("Wir sind Freunde seit " + this.time + " Jahren");
    };
    return Friend;
}(Person));
var peter = new Friend("Peter", 5);
peter.introduceSelf();
peter.timeKnown();
//# sourceMappingURL=Aufgabe2.1.js.map