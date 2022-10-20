const recentUsersContainer = document.getElementById('cards_users_box')
const apiBase = "https://api.github.com/users"
const recentUsersArray = getUsersFoundeds();

function userFind(url) {
    const buttonSearch = document.getElementById('user_search_bttn');
    buttonSearch.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.getElementById('user_search').value;
        if (name !== '') {
            fetch(`${url}/${name}`, { method: 'GET', headers: { 'Content-Type': 'aplication/json' } })
                .then((response) => response.json())
                .then((response) => {
                    if (response.message == 'Not Found') {
                        const alertSpan = document.getElementById('alert_span');
                        alertSpan.innerText = "Usuário não encontrado!";
                        setTimeout(() =>{
                            window.location.reload(true);
                        }, 2000);
                    }
                    else {
                        addRecentUsers(response);
                        addSingleUser(response);
                        setTimeout(() => {
                            window.location.assign("https://kenzie-academy-brasil-developers.github.io/m2-gitSearch-Saniel1990/pages/profile/")                           
                        }, 4000);
                    }
                }).catch((error) => console.log(error))
        }
    })
    renderAnything(recentUsersArray, recentUsersContainer, recentUsersCreator);
}

function renderAnything(array, tagContainer, creatorFunction) {
    tagContainer.innerHTML = '';
    array.forEach(user => {
        const newCard = creatorFunction(user, array);
        tagContainer.appendChild(newCard);
    });
}

function recentUsersCreator(user) {
    const { name, avatar_url} = user
    const tagLi = document.createElement('li');
    const tagLink = document.createElement('a');
    const tagImg = document.createElement('img');
    const tagBttn = document.createElement('button');

    tagLi.classList.add("recent-users-pictures");
    tagLink.classList.add("recent-users-link");

    tagLink.addEventListener('click', (event) => {
        event.preventDefault();
        addSingleUser(user);
        addRecentUsers(user)
        setTimeout(() => {
            window.location.assign('https://kenzie-academy-brasil-developers.github.io/m2-gitSearch-Saniel1990/pages/profile');            
        }, 4000);
    })

    tagImg.src = `${avatar_url}`;
    tagImg.alt = name;
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

function addRecentUsers(user) {
    let selectedUsers = getUsersFoundeds();
    let indexFound = selectedUsers.findIndex(element => element.login === user.login);
    if (indexFound < 0) {
        if (selectedUsers.length >= 3) {
            selectedUsers.splice(2, 2);
            selectedUsers = [user, ...selectedUsers];
        } else {
            selectedUsers = [user, ...selectedUsers];
        }
    } else {
        selectedUsers.splice(indexFound, 1);
        selectedUsers = [user, ...selectedUsers]
    }
    localStorage.setItem("@recentUsers:userFound", JSON.stringify(selectedUsers))
}

function getUsersFoundeds() {
    return JSON.parse(localStorage.getItem("@recentUsers:userFound")) || [];
}

renderAnything(recentUsersArray, recentUsersContainer, recentUsersCreator)
userFind(apiBase);