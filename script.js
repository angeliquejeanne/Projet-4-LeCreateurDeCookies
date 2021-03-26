const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
// console.log(nextWeek);
let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

//______________________________

const display = document.querySelector('.display');
const button = document.querySelectorAll('button');
const input = document.querySelectorAll('input');
const infoText = document.querySelector('.infoText')
let alreadyDone = false;

button.forEach(button => {
    button.addEventListener('click', buttonAction);
})

function buttonAction(e){
    let newObject = {};

    input.forEach(input => {
        let attibuteName = input.getAttribute('name');
        let attibuteValue = attibuteName !== "cookieExpire" ? input.value : input.valueAsDate;
        newObject[attibuteName] = attibuteValue;
    })
    // console.log(newObject);
    let description = e.target.getAttribute('data-cookie');

    if(description === "create"){
        createCookie(newObject.cookieName, newObject.cookieValue, newObject.cookieExpire);
    } 
    else if (description === "showAll"){
        listCookies();
    }
}


function createCookie(name, value, exp){
    infoText.innerText = "";
    display.innerHTML = "";

    // Si le cookie à un même nom
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {

        cookie = cookie.trim();
        // console.log(cookie);
        let formatCookie = cookie.split('=');
        // console.log(formatCookie);
        if(formatCookie[0] === encodeURIComponent(name)){
            alreadyDone = true;
        }
    })

    if(alreadyDone){
        infoText.innerText = "Un cookie possède déjà ce nom!"
        alreadyDone = false;
        return;
    }

    // Si le cookie n'a pas de nom
    if(name.length === 0) {
        infoText.innerText = `Impossible de définir un cookie sans nom.`
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `Cookie ${name} créé.`;
    display.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}

function listCookies(){
    let cookies = document.cookie.split(';');
    if(cookies.join() === "") {
        infoText.innerText = 'Pas de cookies à afficher';
        return;
    }

    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');

        // console.log(formatCookie);
        let item = document.createElement('li');
        
        infoText.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer.'
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;
        display.appendChild(item);

        // Suppression cookie
        item.addEventListener('click', () => {

            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            item.innerText = `Cookie ${formatCookie[0]} supprimé`;
            setTimeout(() => {
                item.remove();
            }, 1000);
        })
    })
}


