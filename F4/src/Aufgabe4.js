function avgOfNumberArray(numberArray) {
    var sum = 0;
    numberArray.forEach(function (number) {
        sum += number;
    });
    return sum / numberArray.length;
}
console.log(avgOfNumberArray([1, 3, 5, 7, 8, 9]));
