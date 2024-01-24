document.addEventListener("DOMContentLoaded", async function () {
    let visibilityOfDivFold = false;
    const divFold = document.getElementById("divFold")
    setInterval(time, 1000);
    document.getElementById("arrowTop").addEventListener("click", function () {
        visibilityOfDivFold = !visibilityOfDivFold
        removeOrAddDivFold()
    })

    function removeOrAddDivFold() {
        if (visibilityOfDivFold) {
            document.getElementById("divFoldContainer").append(divFold)

        } else {
            document.getElementById("divFoldContainer").removeChild(document.getElementById("divFold"))
        }
    }

    setInterval(async function () {
        let tilesApi = (await fetch("https://raw.githubusercontent.com/it-ninjas/labs/master/static/files/json/dashboard.json")).json()
        tilesApi.then(values => {
            document.getElementById("abwesenheitReason").innerText = values["currentWorkingHours"]["reason"].toString()
            document.getElementById("abwesenheitOrg").innerText = values["currentWorkingHours"]["organization"].toString()
            document.getElementById("abwesenheitDauer").innerText = values["currentWorkingHours"]["time"]["hours"] + ":" + values["currentWorkingHours"]["time"]["minutes"]

            document.getElementById("userDisplayname").innerText = values.user.displayName
            if (values.user["available"]) {
                document.getElementById("crackheadStatusAvailability").innerText = "Anwesend"
            } else {
                document.getElementById("crackheadStatusAvailability").innerText = "Abwesend"

            }
            document.getElementById("crackheadStatusReason").innerText = values.user["reason"]
            document.getElementById("crackheadStatusDate").innerText = values.user["lastSeen"]
            let cardsArray = document.getElementsByClassName("card")
            for (let i = 0; i < cardsArray.length; i++) {
                cardsArray[i].getElementsByClassName("cardContent")[0]
                    .getElementsByClassName("requestLogo")[0].src = "Pictures/" + values["tiles"][i]["icon"]
                cardsArray[i].getElementsByClassName("cardContent")[0]
                    .getElementsByClassName("amount")[0].innerText = values["tiles"][i]["amount"]
                cardsArray[i].getElementsByClassName("cardHeader")[0].getElementsByClassName("cardTitleDiv")[0]
                    .getElementsByClassName("cardTitle")[0].innerText = values["tiles"][i]["title"]
                if (values["tiles"][i]["action"] !== null && values["tiles"][i]["action"] !== undefined) {
                    document.getElementById("absenzenAntrag").addEventListener("click", function () {
                        window.open(values["tiles"][i]["action"]["action"])
                    })
                }
            }
        })

    })
    let chatApi = (await fetch("https://raw.githubusercontent.com/it-ninjas/labs/master/static/files/json/chat.json")).json()
    chatApi.then(values => {
        let allAvailableUsers = values["available"]
        let allNonAvailableUsers = values["unavailable"]
        let i = 0;
        let intervalForActiveMembers = setInterval(async function () {
            document.getElementById("anwesenheitsDiv").append(createContactDiv(allAvailableUsers, i))
            if (i < allNonAvailableUsers.length) {
                document.getElementById("abwesenheitsDiv").append(createContactDiv(allNonAvailableUsers, i))
            }
            i++
            if (i === allAvailableUsers.length) {
                clearInterval(intervalForActiveMembers)
            }
        }, 300)
    })

    function createContactDiv(array, i) {
        let watchImage = document.createElement("img")
        let personImage = document.createElement("img")
        personImage.src = "Pictures/avatar.svg"
        personImage.className = "profileLogo divNavPic"
        personImage.alt = "image not found"
        watchImage.src = "Pictures/clock.svg"
        watchImage.className = "watchLogo divNavPic"
        watchImage.alt = "image not found"
        contactDiv = document.createElement("div")
        contactDiv.className = "contact"
        contactDiv.append(personImage)
        let text = document.createElement("p")
        text.innerText = array[i] + " Arbeitszeit(0)"
        contactDiv.append(text)
        contactDiv.append(watchImage)
        return contactDiv
    }

    let allActiveContacts = Array.from(document.getElementById("anwesenheitsDiv").getElementsByClassName("contact"))
    let allNonActiveContacts = Array.from(document.getElementById("abwesenheitsDiv").getElementsByClassName("contact"))
    setInterval(searchBar)

    function searchBar() {
        const inputSearchField = document.getElementById("searchField").value
        console.log(allActiveContacts)
        for (let i = 0; i < allActiveContacts.length; i++) {
            if (!(allActiveContacts[i].getElementsByTagName("p")[0].innerText.includes(inputSearchField))) {
                document.getElementById("anwesenheitsDiv").removeChild(allActiveContacts[i])
            } else {
                if (!(document.getElementById("anwesenheitsDiv").contains(allActiveContacts[i]))) {
                    document.getElementById("anwesenheitsDiv").append(allActiveContacts[i])
                }
            }
        }
        for (let i = 0; i < allNonActiveContacts.length; i++) {
            if (!(allNonActiveContacts[i].getElementsByTagName("p")[0].innerText.includes(inputSearchField))) {
                document.getElementById("abwesenheitsDiv").removeChild(allNonActiveContacts[i])
            }
        }
    }


    function time() {
        const date = new Date
        let formattedMinutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()
        let formattedHours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours()
        document.getElementById("time").textContent = formattedHours + ":" + formattedMinutes
    }
})



