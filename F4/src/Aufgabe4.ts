function avgOfNumberArray(numberArray: number[]): number {
    let sum = 0;
    numberArray.forEach(number => {
            sum += number
        }
    )
    return sum/numberArray.length;
}

console.log(avgOfNumberArray([1,3,5,7,8,9]))