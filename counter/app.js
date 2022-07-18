const value = document.getElementById('value')
const buttons = document.querySelectorAll('button')
let count = 0
buttons.forEach(button => {

    button.addEventListener('click', () => {

        if(button.className.includes('decrease')) {
            count--
        }
        if(button.className.includes('reset')) {
            count = 0
        }
        if(button.className.includes('increase')) {
            count++
        }
        value.innerText = count
    })
})