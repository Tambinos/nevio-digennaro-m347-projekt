document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("agreeButton").addEventListener("click", (event) => {
        let i = 100;
        let myInterval = setInterval(function () {
            console.log("2")
            i = i - 1;
            document.getElementById("popup").style.opacity = i + "%";
            document.getElementById("header").style.opacity = -i + 100 + "%";
            if (i === 0){
                document.getElementById("popup").remove();
                clearInterval(myInterval);
            }
        }, 10)
    })
})



