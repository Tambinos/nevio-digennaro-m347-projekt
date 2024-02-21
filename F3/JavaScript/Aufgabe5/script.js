document.addEventListener("DOMContentLoaded", function () {
    let numbers;
    document.getElementById("submitNumbers").addEventListener("click", function () {
        numbers = document.getElementById("numbersField").value.split(",").filter(Number)
        console.log(numbers.filter(Number))
        document.getElementById("currentNumbers").innerText = "Current Numbers " + numbers

    })
    document.getElementById("biggestNumberButton").addEventListener("click", function () {
        const biggestNumber = numbers.sort().reverse()[0]
        document.getElementById("biggestNumber").textContent = "Biggest Number: " + biggestNumber;
    });

    document.getElementById("smallestNumberButton").addEventListener("click", function () {
        const smallest = numbers.sort()[0]
        document.getElementById("smallestNumber").textContent = "Smallest Number: " + smallest;
    });

    document.getElementById("sumSNumbersButton").addEventListener("click", function () {
        let sumSNumbers = 0;
        numbers.filter(num => num % 2 === 0).forEach(s => sumSNumbers += parseInt(s));
        document.getElementById("sumSNumbers").textContent = "Sum of Straight Numbers: " + sumSNumbers;
    });

    document.getElementById("sumNSNumbersButton").addEventListener("click", function () {
        let sumNSNumbers = 0;
        numbers.filter(num => num % 2 !== 0).forEach(s => sumNSNumbers = sumNSNumbers + parseInt(s))
        document.getElementById("sumNSNumber").textContent = `Sum of non Straight Numbers: ` + sumNSNumbers;
    });

    document.getElementById("sortAfterSizeButton").addEventListener("click", function () {
        document.getElementById("sortAfterSize").textContent = "Sorted after size: " + numbers.sort().reverse();
    });

    document.getElementById("allButton").addEventListener("click", function () {
        let combined = 0;
        numbers.forEach(s => {
            combined = Number.parseInt(s) + combined;
        })
        document.getElementById("all").textContent = "All Numbers together: " + combined
    });
    document.getElementById("avgNumberButton").addEventListener("click", function () {
        let combined = 0;
        numbers.forEach(s => {
            combined = Number.parseInt(s) + combined;
        })
        document.getElementById("avgNumber").textContent = "AVG Number: " + combined/numbers.length;

    })
})