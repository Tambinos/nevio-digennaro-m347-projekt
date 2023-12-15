
let amountOfFlakes = 100;
let spawnRate = 100;
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.snowfall');

    function createCircle() {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.style.left = `${Math.random() * window.innerWidth}px`;
        container.appendChild(circle);

        circle.addEventListener("animationiteration", () => {
            container.removeChild(circle);
        });
    }

    setInterval(function () {
        if (container.getElementsByClassName("circle").length < amountOfFlakes) {
            createCircle();
            console.log("Created")
        }
        console.log("Created")

    }, spawnRate)
    setInterval(function () {
        let date = new Date();
        document.getElementById("stundenZeiger").style.rotate = date.getHours()*30+date.getMinutes()*0.5+date.getSeconds()*0.00833333+"deg";
        document.getElementById("minutenZeiger").style.rotate = date.getMinutes()*6+date.getSeconds()*0.1+"deg";
        document.getElementById("sekundenZeiger").style.rotate = date.getSeconds()*6+"deg";

    })
})
