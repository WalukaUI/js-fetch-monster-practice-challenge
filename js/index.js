const inputDiv = document.getElementById('create-monster')
const mainDiv = document.querySelector('#monster-container')

//create inputs//

function createForm() {
    let mainform = document.createElement('form')
    inputDiv.appendChild(mainform)
    mainform.id = 'main-form'
    careateInputs()
}


function careateInputs() {
    const inputForm = document.getElementById('main-form')
    let nameInput = document.createElement('input')
    inputForm.appendChild(nameInput)
    nameInput.id = 'monsterName'
    nameInput.type = 'text'
    nameInput.placeholder = "monsterName..."

    let ageInput = document.createElement('input')
    inputForm.appendChild(ageInput)
    ageInput.id = 'ageInput'
    ageInput.type = 'numbers'
    ageInput.placeholder = 'Age...'

    let discripInput = document.createElement('input')
    inputForm.appendChild(discripInput)
    discripInput.id = 'discription'
    discripInput.placeholder = 'Discription'

    let formBtn = document.createElement('button')
    inputForm.appendChild(formBtn)
    formBtn.id = 'formbtn'
    formBtn.innerHTML = 'submit'
    formBtn.type = 'submit'

    const btnClick = document.getElementById('formbtn')

    btnClick.addEventListener('click', function (x) {
        x.preventDefault()
        createMonster()

    })
}

const back = document.getElementById('back')
const forward = document.getElementById('forward')

// GET fetch....//

function fetchingMonsters(page) {
    let bseURL = 'http://localhost:3000/'
    return fetch(`${bseURL}monsters/?_limit=10&_page=${page}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            document.querySelector('#monster-container').innerHTML = '';
            json.forEach(e => {
                showMonsters(e)

            })
        })

}

function showMonsters(x) {

    let monH1 = document.createElement('h1')
    mainDiv.appendChild(monH1)
    monH1.innerHTML = x.name

    let monH4 = document.createElement('h5')
    mainDiv.appendChild(monH4)
    monH4.innerHTML = `Age: ${Math.round(x.age)}`

    let discripPtag = document.createElement('p')
    mainDiv.appendChild(discripPtag)
    discripPtag.innerHTML = x.description
}

//POST ....
function createMonster() {

    let mName = document.getElementById('monsterName').value
    let mAge = document.getElementById('ageInput').value
    let mdescrip = document.getElementById('discription').value

    let data = { name: mName, age: mAge, description: mdescrip }
    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),

    })
        .then(response => response.json())
        .then(json => console.log(json))
}



document.addEventListener('DOMContentLoaded', function () {
    createForm();
    let pageN = 1
    fetchingMonsters(pageN)


    forward.addEventListener('click', () => {
        pageN += 1
        fetchingMonsters(pageN)
    });
    back.addEventListener('click', () => {
        pageN -= 1
        if (pageN === 0) {
            alert("This is the First Page :)")
        } else {
            fetchingMonsters(pageN)
        }

    });
})
