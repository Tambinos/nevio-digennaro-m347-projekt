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
        new Student("Alex", [2, 2, 2, 2, 2, 2])
    ]

    function getWorstStudent() {
        return getPerformance(student)[getPerformance(student).length - 1]
    }

    function getNamesSortedByPerformance() {
        let nameArray = new Array(getPerformance(student).length)
        let array2d = new Array(getPerformance(student).length);
        for (let i = 0; i < getPerformance(student).length; i++) {
            array2d[i] = getPerformance(student)[i].split(" ")
            nameArray[i] = array2d[i][0]
        }
        return nameArray;
    }

    document.getElementById("getPerformance").addEventListener("click", function () {
        const button = document.getElementById("getPerformance");
        document.getElementById("labelPerformance").innerText = getPerformance()
        document.getElementById("labelPerformance").appendChild(button);
    })
    document.getElementById("getBest").addEventListener("click", function () {
        const button = document.getElementById("getBest");
        document.getElementById("bestStudentLabel").innerText = getBestStudent()
        document.getElementById("bestStudentLabel").appendChild(button);
    })
    document.getElementById("getWorst").addEventListener("click", function () {
        const button = document.getElementById("getWorst");
        document.getElementById("worstStudentLabel").innerText = getWorstStudent()
        document.getElementById("worstStudentLabel").appendChild(button);
    })
    document.getElementById("namesSortedByPerformance").addEventListener("click", function () {
        const button = document.getElementById("namesSortedByPerformance");
        document.getElementById("namesSortedByPerformanceLabel").innerText = getNamesSortedByPerformance()
        document.getElementById("namesSortedByPerformanceLabel").appendChild(button);
    })

    function getPerformance() {
        let performanceArray = new Array(student.length);
        let gradeArray = new Array(student.length)
        for (let i = 0; i < student.length; i++) {
            gradeArray[i] = getAVG(student[i].grades)
        }
        gradeArray.sort().reverse()
        for (let i = 0; i < gradeArray.length; i++) {
            student.forEach(s => {
                if (getAVG(s.grades) === gradeArray[i]) {
                    performanceArray[i] = s.name + " " + gradeDescription(gradeArray[i]) + gradeArray[i]
                }
            })
        }
        return performanceArray
    }

    function getBestStudent() {
        return getPerformance()[0]
    }

    function getAVG(grades) {
        let sum = 0;
        grades.forEach(g => sum += parseInt(g))
        return sum / grades.length;
    }

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

    document.getElementById("submitUser").addEventListener("click", function newStudent() {
        let name = document.getElementById("name").value
        let grades = document.getElementById("grades").value.split(",").filter(Number)
        console.log(grades)
        student.forEach(s => {
            if (s.name === name) {
                throw new Error();
            }
        })
        for (let i = 0; i < grades.length; i++) {
            if (grades[i] > 6 || grades[i] < 1) {
                throw new Error();
            }
            grades[i] =  parseFloat(grades[i]).toFixed(1);
        }
        redefineArray();

        function redefineArray() {
            const newStudent = new Array(student.length + 1)
            for (let i = 0; i < student.length; i++) {
                newStudent[i] = student[i]
            }
            newStudent[student.length] = new Student(name, grades)
            student = newStudent;
        }

        console.log(student)
    })

})
