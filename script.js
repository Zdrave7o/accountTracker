const usersDisplay = document.querySelector(".usersDisplay");
const createAccountBtn = document.querySelector("#createAccountBtn");
const openAccCreationBtn = document.querySelector("#openAccCreationMenuBtn");

const menuBackground = document.getElementById("menu-background");

const accounts = [];

window.addEventListener("DOMContentLoaded", ()=>{
    const testUser1 = new Account("Shrek Shrekow", 4000.00);
    const testUser2 = new Account("Maniak Malak", 8000.00);

    accounts.push(testUser1);
    accounts.push(testUser2);

    displayUsers(accounts);
})

openAccCreationBtn.addEventListener("click", () => {
    openMenu("create-account-menu");
});

createAccountBtn.addEventListener("click", () => {
    let names = document.getElementById("names").value;
    let balance = Number(document.getElementById("owedMoney").value);

    createAccount(names, balance);
});

function displayUsers(accountsArr){
    usersDisplay.innerHTML = '';
    let index = 0;
    accountsArr.forEach(account => {
        usersDisplay.innerHTML+= `<div class="card user-card" index="${index}">
            <div class="card-body">
                <h5 class="card-title">${account.name}</h5>
                <p class="card-text">Money owed: ${account.owedMoney} BGN</p>
                <a class="btn btn-primary add-btn" index="${index}">Add</a>
                <a class="btn btn-primary remove-btn" index="${index}">Remove</a>
            </div>
        </div>`;

        index++;
    });

    activateButtonAccEventListeners();
}


function createAccount(userName, owedMoney){
    if(!userName.includes(" ")){
        window.alert("You should enter 2 names, First and Last")
        return;
    } else if(userName.trim().length < 1){
        window.alert("You should enter 2 names, First and Last")
        return;
    } else if(owedMoney < 0){
        window.alert("You should enter a positive value");
        return;
    }

    const newAccount = new Account(userName, owedMoney);
    accounts.push(newAccount);

    displayUsers(accounts);
}

function activateButtonAccEventListeners(){
    const addButtons = document.querySelectorAll(".add-btn");
    const removeButtons = document.querySelectorAll(".remove-btn");

    addButtons.forEach(addButton => {
        addButton.addEventListener("click", () => {
            const id = addButton.getAttribute("index");
            updateOwedMoney("add", id);
        })
    });

    removeButtons.forEach(removeButton => {
        removeButton.addEventListener("click", () => {
            const id = removeButton.getAttribute("index");
            updateOwedMoney("subtract", id);
        })
    });
}
createAccountBtn.addEventListener("click", () => {
    displayUsers(accounts);
})

function openMenu(menuClassName){
    menuBackground.classList.remove("d-none");
    menuBackground.classList.add("d-flex");

    const targetMenu = document.querySelector(`.${menuClassName}`);
    console.log(targetMenu);
    

    const allMenus = document.querySelectorAll('.menu');
    allMenus.forEach(menu =>{
        menu.classList.remove("d-block");
        menu.classList.add("d-none");
    })

    targetMenu.classList.remove("d-none");
    targetMenu.classList.add("d-block");
}

function closeMenu(){
    const allMenus = document.querySelectorAll('.menu');

    allMenus.forEach(menu =>{
        menu.classList.remove("d-block");
        menu.classList.add("d-none");
    })

    menuBackground.classList.remove("d-flex");
    menuBackground.classList.add("d-none");
}

class Account{
    constructor(name, owedMoney){
        this.name = name;
        this.owedMoney = owedMoney;
        this.transactions = [];
    }
}

function updateOwedMoney(action, i){
    const currentAcc = accounts[i];

    if(action.trim() === "add"){
        currentAcc.owedMoney+=999;
    } else if(action.trim() === "subtract"){
        currentAcc.owedMoney-=999;
    }

    displayUsers(accounts);
}

