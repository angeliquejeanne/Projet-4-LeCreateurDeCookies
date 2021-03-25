// Creation de l'expiration de la date à 1 semaine
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
// modification de la date d'expiration
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

// Creation d'un objet avec ce qu'on a mis dans nos input
const affichage = document.querySelector('.display'); // affichage dans ul
const btn = document.querySelectorAll('button'); 
const input = document.querySelectorAll('input');
const infoText = document.querySelector('.infoText');

btn.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e){
    let newObject = {};
    input.forEach(input => {
        let attributName= input.getAttribute('name');
        let attributValue = attributName !== "cookieExpire" ? input.value : input.valueAsDate;
        newObject[attributName] = attributValue;
    })
    let description = e.target.getAttribute('data-cookie');
    if(description === "create"){
        createCookie(newObject.cookieName, newObject.cookieValue, newObject.cookieExpire);
    } else if (description === "showAll"){
        listeCookies();
    }
}