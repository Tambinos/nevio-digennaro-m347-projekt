document.addEventListener("DOMContentLoaded", function () {
    class Student {
        constructor(name, grades) {
            this.name = name
            this.grades = grades
        }
    }

    let student = [
        new Student("Richard", [6, 6, 6, 6, 6, 6]),
        new Student("Emily", [5, 5, 5, 5, 5, 5]),
        new Student("John", [4, 4, 4, 4, 4, 4]),
        new Student("Sarah", [3, 3, 3, 3, 3, 3]),
        new Student("Alex", [2, 2, 2, 2, 2, 2]),
        new Student("Michael", [1, 1, 1, 1, 1, 1]),
    ]

    function gradeDescription(grade) {
        if (grade === 6) {
            return "Sehr gut: "
        }
        if (grade < 6 && grade >= 5) {
            return "Gut: "
        }
        if (grade < 5 && grade >= 4) {
            return "Befriedigend: "
        }
        if (grade < 4 && grade >= 3) {
            return "Ausreichend: "
        }
        if (grade < 3 && grade >= 2) {
            return "Mangelhaft: "
        }
        return "Mid: ";
    }

    function getAVG(grades) {
        let sum = 0;
        grades.forEach(g => sum += parseInt(g))
        return sum / grades.length;
    }

    function getPerformance() {
        let performanceArray = []
        student.sort((a, b) => getAVG(b.grades) - getAVG(a.grades))
        for (let i = 0; i < student.length; i++) {
            performanceArray.push("Name: " + student[i].name + " Average Grade: " + getAVG(student[i].grades) + " Grade description: " + gradeDescription(getAVG(student[i].grades)) + "\n")
        }
        return performanceArray
    }

    function getWorstStudent() {
        return getPerformance()[getPerformance(student).length - 1]
    }

    function getBestStudent() {
        return getPerformance()[0]
    }

    function getNamesSortedByPerformance() {
        student.sort((a, b) => getAVG(b.grades) - getAVG(a.grades))
        return student.map(s => s.name);
    }

    document.getElementById("submitUser").addEventListener("click", newStudent => {
        let name = document.getElementById("name").value
        let grades = document.getElementById("grades").value.split(",").filter(Number)
        student.forEach(s => {
            if (s.name === name) {
                throw new Error();
            }
        })
        for (let i = 0; i < grades.length; i++) {
            if (grades[i] > 6 || grades[i] < 1) {
                throw new Error();
            }
            grades[i] = parseFloat(grades[i]).toFixed(1);
            student.push(new Student(name, grades))
        }
    })

    document.getElementById("getPerformance").addEventListener("click", function () {
        const button = document.getElementById("getPerformance");
        document.getElementById("divPerformance").innerText = getPerformance()
        document.getElementById("divPerformance").appendChild(button);
    })
    document.getElementById("getBest").addEventListener("click", function () {
        const button = document.getElementById("getBest");
        document.getElementById("bestStudentDiv").innerText = getBestStudent()
        document.getElementById("bestStudentDiv").appendChild(button);
    })
    document.getElementById("getWorst").addEventListener("click", function () {
        const button = document.getElementById("getWorst");
        document.getElementById("worstStudentDiv").innerText = getWorstStudent()
        document.getElementById("worstStudentDiv").appendChild(button);
    })
    document.getElementById("namesSortedByPerformance").addEventListener("click", function () {
        const button = document.getElementById("namesSortedByPerformance");
        document.getElementById("namesSortedByPerformanceDiv").innerText = getNamesSortedByPerformance()
        document.getElementById("namesSortedByPerformanceDiv").appendChild(button);
    })
})
