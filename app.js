var random = () => {
    return Math.floor(Math.random() * (11 - 0) + 0)
}

var numbers = []


var numberExists = (num) => {
    var flag = false
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] === num) flag = true

    }
    return flag
}

var arrayGenerator = () => {
    for (var i = 0; i < 4; i++) {
        var num = random()
        while (numberExists(num) === true) {
            num = random()
        }

        numbers.push(num)
    }

    return numbers
}




var myArray = []

var form = document.querySelector('#form')
arrayGenerator()
console.log(numbers)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    var myArray = []

    myArray.push(Number(form[0].value))
    myArray.push(Number(form[1].value))
    myArray.push(Number(form[2].value))
    myArray.push(Number(form[3].value))

    var good = 0
    var regular = 0
    var wrong = 0

    for (var i = 0; i < 4; i++) {
        if (numberExists(myArray[i]) && myArray[i] == numbers[i]) {
            good++
        } else if (numberExists(myArray[i])) {
            regular++
        } else {
            wrong++
        }
    }
    console.log(good, regular, wrong, myArray)
    results(good, regular, wrong)

})

function removeChilds(content) {
    var good = document.querySelector('.alert-primary')
    var regular = document.querySelector('.alert-warning')
    var wrong = document.querySelector('.alert-danger')
    if (good) {
        content.removeChild(good)
    }
    if (regular) {
        content.removeChild(regular)
    }
    if (wrong) {
        content.removeChild(wrong)
    }


}

function results(good, regular, wrong) {

    var content = document.querySelector('#content')

    removeChilds(content)

    var goodEl = document.createElement('div')
    var regularEl = document.createElement('div')
    var wrongEl = document.createElement("div")


    if (good > 0) {
        goodEl.classList = "alert alert-primary small"
        goodEl.textContent = `${good} respuestas bien`
        content.appendChild(goodEl)
    }
    if (regular > 0) {
        regularEl.classList = "alert alert-warning small"
        regularEl.textContent = `${regular} respuestas bien pero mal posicionadas`
        content.appendChild(regularEl)
    }
    if (wrong > 0) {
        wrongEl.classList = "alert alert-danger small"
        wrongEl.textContent = `${wrong} respuestas mal`
        content.appendChild(wrongEl)
    }


}