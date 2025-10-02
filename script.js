const usersDisplay = document.querySelector(".usersDisplay");
const createAccountBtn = document.querySelector("#createAccountBtn");
const openAccCreationBtn = document.querySelector("#openAccCreationMenuBtn");

const accounts = [];

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

    accountsArr.forEach(account => {
        usersDisplay.innerHTML+= `<div class="card user-card">
            <div class="card-body">
                <h5 class="card-title">${account.name}</h5>
                <p class="card-text">Money owed: ${account.owedMoney} BGN</p>
                <a href="#" class="btn btn-primary">Add</a>
                <a href="#" class="btn btn-primary">Remove</a>
            </div>
        </div>`;
    });


}


function createAccount(userName, owedMoney){
    if(!userName.includes(" ")){
        window.alert("You should enter 2 names, First and Last")
        return;
    } else if(userName.trim().length < 1){
        window.alert("You should enter 2 names, First and Last")
        return;
    }

    if(owedMoney < 0){
        window.alert("You should enter a positive value");
        return;
    }

    const newAccount = new Account(userName, owedMoney);
    accounts.push(newAccount);

    displayUsers(accounts);
}

createAccountBtn.addEventListener("click", () => {
    displayUsers(accounts);
})

function openMenu(menuClassName){
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

class Account{
    constructor(name, owedMoney){
        this.name = name;
        this.owedMoney = owedMoney;
        this.transactions = [];
    }
}

