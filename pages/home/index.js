/* Desenvolva sua lógica aqui...*/
const apiBase = "https://api.github.com/users"
const recentUsersContainer = document.getElementById('cards_users_box')

const recentUsersArray = getUsersFoundeds();
console.log(recentUsersArray);


function userFind(url) {
    const buttonSearch = document.getElementById('user_search_bttn');
    buttonSearch.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.getElementById('user_search').value;
        if (name !== '') {
            fetch(`${url}/${name}`, { method: 'GET', headers: { 'Content-Type': 'aplication/json' } })
                .then((response) => response.json())
                .then((response) => {
                    if(response.message == 'Not Found'){
                        const alertSpan = document.getElementById('alert_span');
                        alertSpan.innerText = "Usuário não encontrado!"
                        alertSpan.style.color = "var(--color-alert)"
                    }
                    else{
                        addNRevomeUser(response);
                        addSingleUser(response);
                    }
                }).catch((error) => console.log(error))
            window.location.assign("../profile/index.html")
        }
    })
}

function renderAnything(array, tagContainer, creatorFunction) {
    tagContainer.innerHTML = '';
    array.forEach(user => {
        const newCard = creatorFunction(user, array);
        tagContainer.appendChild(newCard);
    });
}

function recentUsersCreator(user) {
    const tagLi = document.createElement('li');
    const tagLink = document.createElement('a');
    const tagImg = document.createElement('img');
    const tagBttn = document.createElement('button');
    
    tagLi.classList.add("recent-users-pictures");
    tagLink.classList.add("recent-users-link");
    
    tagImg.src = `${user.avatar_url}`;
    tagImg.alt = user.name;
    tagBttn.innerText = 'Acessar este perfil'
    
    tagLink.append(tagImg, tagBttn);
    tagLi.appendChild(tagLink);
    return tagLi    
}

function addSingleUser(user) {
    let myOnlyser = getSingleUser();
    if (myOnlyser.length >= 1) {
        myOnlyser.splice(0, 1);
        myOnlyser = [user, ...myOnlyser];
    } else {
        myOnlyser = [user, ...myOnlyser];
    }
    localStorage.setItem("@mySingleUser:SingleUser", JSON.stringify(myOnlyser))
}

function getSingleUser() {
    return JSON.parse(localStorage.getItem("@mySingleUser:SingleUser")) || [];
}

function addNRevomeUser(user) {
    let selectedUsers = getUsersFoundeds();
    if (selectedUsers.length >= 3) {
        selectedUsers.splice(2, 2);
        selectedUsers = [user, ...selectedUsers];
    } else {
        selectedUsers = [user, ...selectedUsers];
    }
    localStorage.setItem("@recentUsers:userFound", JSON.stringify(selectedUsers))
}

function getUsersFoundeds() {
    return JSON.parse(localStorage.getItem("@recentUsers:userFound")) || [];
}

function checkExistence(user) {
    return getUsersFoundeds().findIndex(element => element.login === user.login)
}

renderAnything(recentUsersArray, recentUsersContainer, recentUsersCreator)
userFind(apiBase);