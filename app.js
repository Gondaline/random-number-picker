let currentLanguage = "pt"

function setLanguage(lang) {

    currentLanguage = lang
    let title = document.querySelector(".title")
    let amount = document.querySelector(".amount")
    let from = document.querySelector(".from")
    let to = document.querySelector(".to")
    let btnSubmit = document.getElementById("btn-draw")
    let btnReset = document.getElementById("btn-reset")
    let result = document.querySelector('#result .text__result')

    if (lang === "pt") {
        // Português
        title.innerHTML = `<h1>Sorteador<span class="container__text-blue"> de números</span></h1>`
        amount.innerText = `Quantidade de números`
        from.innerText = `Do número`
        to.innerText = `Até o número`
        btnSubmit.innerText = `Sortear`
        btnReset.innerText = `Reiniciar`
        result.innerText = `Números sorteados:`

    } else {
        //Inglês
        title.innerHTML = `<h1>Number<span class="container__text-blue"> Picker</span></h1>`
        amount.innerText = `Amount of numbers`
        from.innerText = `From number`
        to.innerText = `To number`
        btnSubmit.innerText = `Draw`
        btnReset.innerText = `Reset`
        result.innerText = `Drawn numbers:`
    }
}

let drawnNumbers = []

function draw() {
    let totalNumbers = parseInt(document.getElementById("amount").value)
    let min = parseInt(document.getElementById("from").value)
    let max = parseInt(document.getElementById("to").value)
    let result = document.querySelector('#result .text__result')
    let btnSubmit = document.getElementById("btn-draw")

    if (isNaN(totalNumbers) || isNaN(min) || isNaN(max)) {
        return
    }

    if (min > max) {
        if (currentLanguage === "pt") {
            result.innerHTML = `O número inicial deve ser menor que o número final.`
            return
        } else {
            result.innerHTML = `The starting number must be less than the ending number.`
            return
        }
    }

    if (totalNumbers > (max - min + 1)) {
        if (currentLanguage === "pt") {
            result.innerHTML = `A quantidade de números a sortear é maior que o intervalo possível.`
            return
        } else {
            result.innerHTML = `The number of numbers to be drawn is greater than the possible range.`
            return
        }
    }

    if (totalNumbers > 10 || min > 100 || max > 100) {
        if (currentLanguage === "pt") {
            result.innerHTML = `Por favor, insira valores entre 1 e 100 (máximo 10 números sorteados).`
            return
        } else {
            result.innerHTML = `Please enter values ​between 1 and 100 (maximum 10 drawn numbers).`
            return
        }
    }

    while (drawnNumbers.length < totalNumbers) {
        let random = Math.floor(Math.random() * (max - min + 1)) + min

        if (drawnNumbers.includes(random)) {
            continue
        } else {
            drawnNumbers.push(random)

            if (currentLanguage === "pt") {
                result.innerHTML = `🎲 Números sorteados: ${drawnNumbers.join(", ")}`
            } else {
                result.innerHTML = `🎲 Drawn numbers: ${drawnNumbers.join(", ")}`
            }
        }
    }

    if (drawnNumbers.length > 0) {
        toggleResetButton()
        btnSubmit.setAttribute("disabled", "true")
    }

}

function toggleResetButton() {

    let resetBtn = document.getElementById("btn-reset")

    if (resetBtn.disabled) {
        resetBtn.removeAttribute("disabled")
        resetBtn.classList.add("container__button-enabled")
    } else {
        resetBtn.setAttribute("disabled", "true")
        resetBtn.classList.remove("container__button-enabled")
    }
}

function reset() {

    drawnNumbers = []

    let btnSubmit = document.getElementById("btn-draw")
    btnSubmit.removeAttribute("disabled")

    toggleResetButton()

    document.getElementById("amount").value = ""
    document.getElementById("from").value = ""
    document.getElementById("to").value = ""

    if (currentLanguage === "pt") {
        document.querySelector('#result .text__result').innerHTML = "Números sorteados:"
    } else {
        document.querySelector('#result .text__result').innerHTML = "Drawn numbers:"
    }
}
