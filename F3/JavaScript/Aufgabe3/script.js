let amountOfFlakes = 10;
let spawnRate = 100;
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.snowfall');
    for (let i = 0; i < 6; i++) {
        let div = createDiv();
        div.style.rotate = i * 30 + "deg";
        document.getElementsByClassName("circle")[0].appendChild(div)
    }
    function createCircleTop() {
        const circle = document.createElement("div");
        circle.className = "softRain";
        circle.style.left = `${Math.random() * window.innerWidth}px`;
        container.appendChild(circle);
        circle.addEventListener("animationiteration", () => {
            container.removeChild(circle);
        });
    }

    function createCircleLeft() {
        const circle = document.createElement("div");
        circle.className = "softRain";
        circle.style.bottom = `${Math.random() * window.innerHeight}px`;
        circle.style.left = `${-100}px`;
        container.appendChild(circle);
        circle.addEventListener("animationiteration", () => {
            container.removeChild(circle);
        });
    }

    function whereToCreateSnow() {
        let random = Math.random();
        if (random < 0.66) {
            createCircleTop();
        } else {
            createCircleLeft();
        }
    }

    setInterval(function () {
        if (container.getElementsByClassName("softRain").length < amountOfFlakes) {
            whereToCreateSnow();
        }

    }, spawnRate)

    function createDiv() {
        let pointers = document.createElement("div");
        pointers.className = "hoursIndicator"
        let pointer = document.createElement("div");
        pointer.className = "hourIndicator";
        pointers.appendChild(pointer);
        pointers.appendChild(pointer.cloneNode(true));
        return pointers;
    }

    setInterval(function () {
        for (let i = 0; i < document.getElementsByClassName("hoursIndicator").length; i++) {
            let length = document.getElementsByClassName("circle")[0].getBoundingClientRect();
            document.getElementsByClassName("hoursIndicator")[i].style.width = length.width + "px";
        }
        let date = new Date();
        document.getElementById("stundenZeiger").style.rotate = date.getHours() * 30 + date.getMinutes() * 0.5 + date.getSeconds() * 0.00833333 + "deg";
        document.getElementById("minutenZeiger").style.rotate = date.getMinutes() * 6 + date.getSeconds() * 0.1 + date.getMilliseconds() * 0.0001 + "deg";
        document.getElementById("sekundenZeiger").style.rotate = date.getSeconds() * 6 + date.getMilliseconds() * 0.006 + "deg";
    })
})
