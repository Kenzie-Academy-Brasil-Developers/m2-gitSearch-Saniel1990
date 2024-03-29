const tagUl = document.getElementById('cards_container');
const tagContainer = document.getElementById('user_info');
const changeBttn = document.getElementById('change_user');
let myCurrentUser = getSingleUser();
const myHeader = document.getElementById('nav_container')

changeBttn.addEventListener('click', (event) => {
    event.preventDefault();
    spinnerIn(changeBttn);
    changeBttn.style.width = '8rem';
    changeBttn.style.height = '1.5rem';
    setTimeout(() =>{
        window.location.assign('https://kenzie-academy-brasil-developers.github.io/m2-gitSearch-Saniel1990/')
    },500)
})

function spinnerIn(button) {
    button.innerHTML = '';
    const img = document.createElement('img');
    img.src = '../../assets/spinner.png';
    img.classList.add('loading');
    button.appendChild(img);    
}

function findRepos(url) {
    fetch(`${url}`, { method: 'GET', headers: { 'Content-Type': 'aplication/json' } })
        .then((response) => response.json())
        .then((response) => {
            if (response.length !== 0) {
                renderAnything(response, tagUl, cardCreate)                
            }else{
                myHeader.style.borderBottom = "1px solid var(--opacity-grey-1)"
                tagUl.innerHTML = `
                <div class="not-found-repos">
                    <p class='text-1-2'>Este usuário ainda não tem repositórios.</p>
                </div>`
            }
        }).catch((error) => console.log(error))
}

function getSingleUser() {
    return JSON.parse(localStorage.getItem("@mySingleUser:SingleUser")) || [];
}

function headerCreator(currentUser) {
    const myUser = currentUser[0];
    const {login, avatar_url, name, bio, } =myUser;
    tagContainer.innerHTML = '';
    const tagLink = document.createElement('a')
    const tagImg = document.createElement('img');
    const tagDiv = document.createElement('div');
    const tagTitle = document.createElement('h1');
    const tagSpan = document.createElement('span');

    tagLink.classList.add('img-link');
    tagLink.href = `https://github.com/${login}`;
    tagLink.target = "_blank"

    tagImg.classList.add("profile-picture");
    tagDiv.classList.add('profile-descriptions');
    tagTitle.classList = "title-1 profile-title";
    tagSpan.classList.add("profile-stack");

    tagImg.src = `${avatar_url}`;
    tagImg.alt = login;
    tagTitle.innerText = login;
    if (name == null) {
        tagTitle.innerText = login;
    } else {
        tagTitle.innerText = name;
    }

    if (bio == null) {
        tagSpan.innerText = 'Usuário sem bio.';
    } else {
        tagSpan.innerText = bio;
    }

    tagLink.appendChild(tagImg)
    tagDiv.append(tagTitle, tagSpan)
    tagContainer.append(tagLink, tagDiv)
    findRepos(myUser.repos_url)
}

function renderAnything(array, tagContainer, creatorFunction) {
    tagContainer.innerHTML = '';
    array.forEach(element => {
        const newCard = creatorFunction(element);
        tagContainer.appendChild(newCard);
    });
}

function cardCreate(reposItens) {
    const tagLi = document.createElement('l1');
    tagLi.classList.add('card-item');

    const tagTitle = document.createElement('h2');
    tagTitle.classList = 'title-2-1 card-title';

    const tagParagraph = document.createElement('p');
    tagParagraph.classList = 'text-1-2 card-description';

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('interactive-box');

    const tagButton1 = document.createElement('button');
    tagButton1.classList = "text-2-button button card-button"
    
    const tagButton2 = document.createElement('button');
    tagButton2.classList = "text-2-button button card-button"
    
    tagButton1.innerText = 'Repositório';
    tagButton2.innerText = 'Demo';
    
    if (reposItens.name) {
        tagTitle.innerText = reposItens.name;
    } else {
        tagTitle.innerText = reposItens.login;
    }

    if (reposItens.description !== null) {
        tagParagraph.innerText = reposItens.description;        
    }else{
        tagParagraph.innerText = `Trabalho de ${reposItens.full_name}, em ${reposItens.language}`;
    }

    tagDiv.append(tagButton1, tagButton2);
    tagLi.append(tagTitle, tagParagraph, tagDiv);
    return tagLi;
}

function getUsersFoundeds() {
    return JSON.parse(localStorage.getItem("@recentUsers:userFound")) || [];
}

function checkExistence(user) {
    return getUsersFoundeds().findIndex(element => element.login === user.login)
}

function addNRevomeUser(user) {
    let selectedUsers = getUsersFoundeds();
    if (selectedUsers.length > 3) {
        selectedUsers.splice(selectedUsers.length - 1, 1);
        selectedUsers = [user, ...selectedUsers];
    } else {
        selectedUsers = [user, ...selectedUsers];
    }
    localStorage.setItem("@recentUsers:userFound", JSON.stringify(selectedUsers))
}

headerCreator(myCurrentUser)