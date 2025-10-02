const usersDisplay = document.querySelector(".usersDisplay");
const createAccountBtn = document.querySelector("#createAccountBtn");

const accounts = [];

function displayUsers(accountsArr){
    usersDisplay.innerHTML = '';

    accountsArr.forEach(account => {
        usersDisplay.innerHTML+= `<div class="card user-card">
            <div class="card-body">
                <h5 class="card-title">${account.name}</h5>
                <p class="card-text">Money owed: ${account.balance}</p>
                <a href="#" class="btn btn-primary">Add</a>
                <a href="#" class="btn btn-primary">Remove</a>
            </div>
        </div>`;
    });


}


function createAccount(userName, balance){
    
}

createAccountBtn.addEventListener("click", () => {
    displayUsers(accounts);
})

class Account{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
        this.transactions = [];
    }
}

const user1 = new Account("Mister Cash", 2000);
accounts.push(user1);

