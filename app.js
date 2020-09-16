/* 
 *Global variables
 */

var myArray = []
var numbers = []
var form = document.querySelector('#form')
var tries = 0


/* 
 *Events
 */
var reiniciar = document.querySelector('#again')
reiniciar.addEventListener('click', (e) => {
    e.preventDefault()
    var content = document.querySelector('#content')
    var winner = document.querySelector('.winner')
    removeChilds(content)
    removeValues()
    var endgame = document.createElement('div')


    if (!winner) {
        endgame.classList = "alert alert-danger small"
        endgame.textContent = `Los numeros eran ${numbers[0]} ${numbers[1]} ${numbers[2]} y ${numbers[3]} en ese orden. Intentos: ${tries}`
        content.appendChild(endgame)
        setTimeout(() => {
            content.removeChild(endgame)
        }, 4000)
    }
    tries = 0
    numbers = arrayGenerator()

})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    tries++
    if (validate()) {
        match()
    }


})

/* 
 * Functions
 */
var random = () => {
    return Math.floor(Math.random() * (11 - 0) + 0)
}

var numberExists = (num) => {
    var flag = false
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] === num) flag = true

    }
    return flag
}

var arrayGenerator = () => {

    numbers = []
    for (var i = 0; i < 4; i++) {
        var num = random()
        while (numberExists(num) === true) {
            num = random()
        }

        numbers.push(num)
    }


    return numbers
}
numbers = arrayGenerator()

var match = () => {
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
    console.log(myArray)

    results(good, regular, wrong)
}

var results = (good, regular, wrong) => {

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

    if (good == 4) {
        goodEl.textContent = `Felicitaciones, ganaste! Intentos: ${tries}`
        goodEl.classList.add('winner')

    }
}

var removeChilds = (content) => {
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

var removeValues = () => {
    form[0].value = ""
    form[1].value = ""
    form[2].value = ""
    form[3].value = ""
}

var validate = () => {
    var regex = /[0-9]+/

    var num1 = document.querySelector("input[name=num1]")
    var num2 = document.querySelector("input[name=num2]")
    var num3 = document.querySelector("input[name=num3]")
    var num4 = document.querySelector("input[name=num4]")

    num1.classList.remove('is-invalid')
    num2.classList.remove('is-invalid')
    num3.classList.remove('is-invalid')
    num4.classList.remove('is-invalid')
    var bool = true


    if (!num1.value.match(regex)) {
        num1.classList.add('is-invalid')
        bool = false
    }

    if (!num2.value.match(regex)) {
        num2.classList.add('is-invalid')
        bool = false
    }

    if (!num3.value.match(regex)) {
        num3.classList.add('is-invalid')
        bool = false
    }

    if (!num4.value.match(regex)) {
        num4.classList.add('is-invalid')
        bool = false
    }



    return bool
}