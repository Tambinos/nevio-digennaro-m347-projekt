import Island from "./island.js"

export const islands = [
    new Island({
        name: "Maldives",
        country: "Maldives",
        imageUrl:
            "https://www.planetware.com/photos-large/SEY/best-islands-maldives.jpg",
    }),
    new Island({
        name: "Bora Bora",
        country: "French Polynesia",
        imageUrl:
            "https://www.planetware.com/photos-large/SEY/best-islands-bora-bora.jpg",
    }),
    new Island({
        name: "Seychelles",
        country: "Seychelles",
        imageUrl:
            "https://www.planetware.com/photos-large/SEY/best-islands-seychelles.jpg",
    }),
    new Island({
        name: "Diomede",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Little_Diomede_Island_village.jpeg/1280px-Little_Diomede_Island_village.jpeg",
    }),
];

for (const island of islands) {
    console.info(
        `Explore the island ${island.name} in ${
            island.country ?? "an unknown country"
        }: ${island.imageUrl ?? "no image available :/"}`
    );
    const div = document.createElement("div")
    const pic = document.createElement('img');
    const h6 = document.createElement("h6");
    h6.innerText = "Name: "+ island.name + "\nCountry: " + island.country;
    pic.alt = "image not found";
    pic.src = island.imageUrl;
    pic.style.height = 100 + "px";
    div.appendChild(pic);
    div.appendChild(h6);
    document.body.appendChild(div)
}

