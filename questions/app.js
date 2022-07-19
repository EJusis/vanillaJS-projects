const questionBtn = document.querySelectorAll('.question-btn')

questionBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.currentTarget.parentElement.parentElement.classList.toggle('show-text')
    })
})