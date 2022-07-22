// ****** SELECT ITEMS **********
const alertMessage = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')



// edit option
let editElement
let editFlag = false
let editID = ''

// ****** EVENT LISTENERS **********

//  submit form
form.addEventListener('submit', addItem)

//
clearBtn.addEventListener('click', clearItems)

// load items
window.addEventListener('DOMContentLoaded', setUpItems)

// ****** FUNCTIONS **********


function addItem (e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()
    if (value && !editFlag) {
        // creating element
        const element = document.createElement('article')
        // adding a class to id
        element.classList.add('grocery-item')
        // create and add ID attribute to element
        element.setAttribute('data-id', id)
        // html template
        element.innerHTML = `
        <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                Edit
              </button>
              <button type="button" class="delete-btn">
                Delete
              </button>
            </div>
        `
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)
        //append child
        list.appendChild(element)
        //display alert
        displayAlert('item added to the list', 'success')
        // add visibility css class
        container.classList.add('show-container')
        // add to local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        editElement.innerHTML = value
        displayAlert('value edited', 'success')

        // edit local storage
        editLocalStorage(editID, value)

        setBackToDefault()
    } else {
       displayAlert('Empty input field', 'danger')
    }

}


    // display Alert
function displayAlert(text, action) {
    alertMessage.textContent = text
    alertMessage.classList.add(`alert-${action}`)

    // remove alert
    setTimeout(() => {
        alertMessage.textContent = ''
        alertMessage.classList.remove(`alert-${action}`)
    }, 800)

}

// clear list
function clearItems () {
    const items = document.querySelectorAll('.grocery-item')
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('List cleared', 'success')
    setBackToDefault()
    localStorage.removeItem('list')
}

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if(!list.children.length) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'success')
    setBackToDefault()

    // remove from local storage
    removeFromLocalStorage(id)
}

// edit function
function editItem(e) {
    // target element
    const element = e.currentTarget.parentElement.parentElement
    // target element's header
    editElement = e.currentTarget.parentElement.previousElementSibling
    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = 'edit'
}



// Set back to default
function setBackToDefault() {
    grocery.value = ''
    editFlag = false
    editID = ''
    submitBtn.textContent = 'submit'
}
// ****** LOCAL STORAGE ********
function addToLocalStorage(id, value){
    const grocery = {id, value}
    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))

}

function removeFromLocalStorage(id) {
    let items = getLocalStorage()
    items = items.filter(item => {
        return item.id !== id
    })
    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value) {
    let items = getLocalStorage()
    items = items.map(item => {
        if (item.id === id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))

}

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}


// ****** SETUP ITEMS **********

function setUpItems() {
    let items = getLocalStorage()
    if (items) {
        items.forEach(item => {
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value) {
    const element = document.createElement('article')
    // adding a class to id
    element.classList.add('grocery-item')
    // create and add ID attribute to element
    element.setAttribute('data-id', id)
    // html template
    element.innerHTML = `
        <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                Edit
              </button>
              <button type="button" class="delete-btn">
                Delete
              </button>
            </div>
        `
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    //append child
    list.appendChild(element)
}