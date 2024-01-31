document.addEventListener("DOMContentLoaded", async function () {
    let visibilityOfDivFold = false;
    const divFold = document.getElementById("divFold")
    let addContacts;
    let searchbarFunctionIntervalID;
    time()
    await tiles()
    await chats()
    document.getElementById("arrowTop").addEventListener("click", function () {
        visibilityOfDivFold = !visibilityOfDivFold
        removeOrAddDivFold()
    })

    function removeOrAddDivFold() {
        if (visibilityOfDivFold) {
            document.getElementById("divFoldContainer").append(divFold)
            document.getElementById("arrowTop").style.rotate = "360deg"
        } else {
            document.getElementById("divFoldContainer").removeChild(divFold)
            document.getElementById("arrowTop").style.rotate = "180deg"

        }
    }

    async function tiles() {
        const tilesApi = (await fetch("https://raw.githubusercontent.com/it-ninjas/labs/master/static/files/json/dashboard.json")).json()
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
            const cardsArray = document.getElementsByClassName("card")
            for (let i = 0; i < cardsArray.length; i++) {
                cardsArray[i].getElementsByClassName("cardContent")[0]
                    .getElementsByClassName("requestLogo")[0].src = "Pictures/" + values["tiles"][i]["icon"]
                cardsArray[i].getElementsByClassName("cardContent")[0]
                    .getElementsByClassName("amount")[0].innerText = values["tiles"][i]["amount"]
                cardsArray[i].getElementsByClassName("cardHeader")[0].getElementsByClassName("cardTitleDiv")[0]
                    .getElementsByClassName("cardTitle")[0].innerText = values["tiles"][i]["title"]
                if (values["tiles"][i]["action"] !== null && values["tiles"][i]["action"] !== undefined) {
                    const action = document.createElement("h6")
                    action.style = "padding: 0; margin-top: 10px"
                    action.innerText = values["tiles"][i]["action"]["title"]
                    action.addEventListener("click", function () {
                        window.open(values["tiles"][i]["action"]["action"])
                    })
                    if (cardsArray[i].getElementsByClassName("cardContent")[0].getElementsByTagName("h6").length === 0) {
                        cardsArray[i].getElementsByClassName("cardContent")[0].append(action)
                    }
                }
            }
        })
    }

    function chats() {
        fetch("https://raw.githubusercontent.com/it-ninjas/labs/master/static/files/json/chat.json").then(value => value.json().then(values => {
            let allAvailableUsers = values["available"]
            let allNonAvailableUsers = values["unavailable"]
            document.getElementById("anwesenheitsDiv").innerHTML = "<p id=\"anwesendText\">Anwesend</p>\n"
            document.getElementById("abwesenheitsDiv").innerHTML = "<p id=\"abwesendText\">Abwesend</p>\n"
            let i = 0;
            addContacts = setInterval(function addContactsFunction() {
                if (i < allAvailableUsers.length) {
                    document.getElementById("anwesenheitsDiv").append(createContactDiv(allAvailableUsers, i))
                }
                if (i < allNonAvailableUsers.length) {
                    document.getElementById("abwesenheitsDiv").append(createContactDiv(allNonAvailableUsers, i))
                }
                i++;
                if (i >= allAvailableUsers.length && i >= allNonAvailableUsers.length) {
                    let allActiveContacts = Array.from(document.getElementById("anwesenheitsDiv").getElementsByClassName("contact"))
                    let allNonActiveContacts = Array.from(document.getElementById("abwesenheitsDiv").getElementsByClassName("contact"))
                    searchbarFunctionIntervalID = setInterval(searchbarFunction.bind(null, allActiveContacts, allNonActiveContacts))
                    clearInterval(addContacts)
                }

            }, 300)


        }))
    }


    const searchbarFunction = function searchBar(allActiveContacts, allNonActiveContacts) {
        const inputSearchField = document.getElementById("searchField").value
        for (let i = 0; i < allActiveContacts.length; i++) {
            if (!allActiveContacts[i].getElementsByTagName("p")[0].innerText.includes(inputSearchField)) {
                if (document.getElementById("anwesenheitsDiv").contains(allActiveContacts[i])) {
                    document.getElementById("anwesenheitsDiv").removeChild(allActiveContacts[i])
                }
            } else {
                if (!(document.getElementById("anwesenheitsDiv").contains(allActiveContacts[i]))) {
                    document.getElementById("anwesenheitsDiv").append(allActiveContacts[i])
                }
            }
        }
        for (let i = 0; i < allNonActiveContacts.length; i++) {
            if (!(allNonActiveContacts[i].getElementsByTagName("p")[0].innerText.includes(inputSearchField))) {
                if (document.getElementById("abwesenheitsDiv").contains(allNonActiveContacts[i])) {
                    document.getElementById("abwesenheitsDiv").removeChild(allNonActiveContacts[i])
                }
            } else {
                if (!(document.getElementById("abwesenheitsDiv").contains(allNonActiveContacts[i]))) {
                    document.getElementById("abwesenheitsDiv").append(allNonActiveContacts[i])
                }
            }
        }
    }

    function createContactDiv(array, i) {
        const watchImage = document.createElement("img")
        const personImage = document.createElement("img")
        personImage.src = "Pictures/avatar.svg"
        personImage.className = "profileLogo divNavPic"
        personImage.alt = "image not found"
        watchImage.src = "Pictures/clock.svg"
        watchImage.className = "watchLogo divNavPic"
        watchImage.alt = "image not found"
        contactDiv = document.createElement("div")
        contactDiv.className = "contact"
        contactDiv.append(personImage)
        const text = document.createElement("p")
        text.innerText = array[i]
        contactDiv.append(text)
        contactDiv.append(watchImage)
        return contactDiv
    }

    function time() {
        const date = new Date
        const formattedMinutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()
        const formattedHours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours()
        document.getElementById("time").textContent = formattedHours + ":" + formattedMinutes
    }

    document.getElementById("rightList").getElementsByClassName("picDiv")[0].addEventListener("click", function () {
        const spinKeyframes = [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}];
        const spinTiming = {
            duration: 1000, iterations: 1, easing: 'ease-in-out'
        };
        document.getElementById("rightList").getElementsByClassName("picDiv")[0].getElementsByTagName("img")[0].animate(spinKeyframes, spinTiming)
        tiles()
        time()
        clearInterval(addContacts)
        clearInterval(searchbarFunctionIntervalID)
        chats()
    })
})