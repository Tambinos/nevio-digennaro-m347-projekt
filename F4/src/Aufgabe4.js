function avgOfNumberArray(numberArray) {
    var avg = 0;
    numberArray.forEach(function (number) {
        avg += number;
    });
    return avg / numberArray.length;
}
console.log(avgOfNumberArray([1, 3, 5, 7, 8, 9]));
//# sourceMappingURL=Aufgabe4.js.map