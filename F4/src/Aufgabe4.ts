function avgOfNumberArray(numberArray: number[]): number {
    let avg = 0;
    numberArray.forEach(number => {
            avg += number
        }
    )
    return avg/numberArray.length;
}

console.log(avgOfNumberArray([1,3,5,7,8,9]))