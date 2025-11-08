const usersDisplay = document.querySelector(".usersDisplay");
const createAccountBtn = document.querySelector("#create-account-btn");
const openAccCreationBtn = document.querySelector("#open-acc-creatio-menu-btn");
const searchInput=document.getElementById("search-input");

const menuBackground = document.getElementById("menu-background");

const updateValueBtn = document.getElementById("updateValue");

const accounts = [];

let creationIndex = 0;

window.addEventListener("DOMContentLoaded", ()=>{
    const testUser1 = new Account("Георги Георгиев", 4000.00);
    const testUser2 = new Account("Фики Стораро", 8000.00);
    const testUser3 = new Account("Тони Стораро", 8000.00);

    accounts.push(testUser1);
    accounts.push(testUser2);
    accounts.push(testUser3);

    displayUsers(accounts);
})

openAccCreationBtn.addEventListener("click", () => {
    openMenu("create-account-menu");
});

createAccountBtn.addEventListener("click", () => {
    let names = document.getElementById("names").value;
    let balance = Number(document.getElementById("owedMoney").value);

    document.getElementById("names").value = "";
    document.getElementById("owedMoney").value = "";
    createAccount(names, balance);
    closeMenu();
});

function displayUsers(accountsArr){
    usersDisplay.innerHTML = '';
    let index = 0;
    accountsArr.forEach(account => {
        usersDisplay.innerHTML+= `<div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card user-card" index="${index}">
            <div class="card-body">
                <h5 class="card-title">${account.name}</h5>
                <p class="card-text">Money owed: ${account.owedMoney.toFixed(2)} BGN</p>
                <a class="btn btn-primary add-btn" index="${index}">+</a>
                <a class="btn btn-primary remove-btn" index="${index}">-</a>
                <a class="btn btn-primary transactions-button" index="${index}">View Transactions</a>
                <a class="btn btn-primary delete-account-button" index="${index}">Delete Acc</a>
            </div>
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

function deleteAccount(i){
    accounts.splice(i, 1);
    displayUsers(accounts);
}

function activateButtonAccEventListeners(){
    const addButtons = document.querySelectorAll(".add-btn");
    const removeButtons = document.querySelectorAll(".remove-btn");
    const transactionsButtons = document.querySelectorAll(".transactions-button")
    const deleteAccButtons = document.querySelectorAll(".delete-account-button");

    addButtons.forEach(addButton => {
        addButton.addEventListener("click", () => {
            openMenu("update-value-menu");

            const currentAccIndex = addButton.getAttribute("index");

            updateValueBtn.onclick = () => {
                updateOwedMoney("add", currentAccIndex);
            }
        })
    });

    removeButtons.forEach(removeButton => {
        removeButton.addEventListener("click", () => {
            openMenu("update-value-menu");

            const currentAccIndex = removeButton.getAttribute("index");

            updateValueBtn.onclick = () => {
                updateOwedMoney("subtract", currentAccIndex);
            }
            
        })
    });

    transactionsButtons.forEach(transactionButton =>{
       transactionButton.addEventListener("click", () => {
            const currentAccIndex = transactionButton.getAttribute("index");
            const transactionsDisplay = document.getElementById("transactionsDisplay");
            const userNameDisplay = document.getElementById("transactionsMenuUserName");


            openMenu("account-transactions-menu");
            viewTransactions(userNameDisplay, transactionsDisplay, currentAccIndex);
       }) 
    });

    deleteAccButtons.forEach(accButton => {
        accButton.addEventListener("click", () => {
            const currentAccIndex = accButton.getAttribute("index");
            deleteAccount(currentAccIndex);
            
        });
    });

    searchInput.addEventListener("input", searchAcc);
}

createAccountBtn.addEventListener("click", () => {
    displayUsers(accounts);
})

function openMenu(menuClassName){
    menuBackground.classList.remove("d-none");
    menuBackground.classList.add("d-flex");

    const targetMenu = document.querySelector(`.${menuClassName}`);
    

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
    const value = Number(document.getElementById("value").value);
    const currentAcc = accounts[i];
    
    if(value <= 0){
        window.alert("The number should be positive!");
        return;
    } else if(isNaN(value)){
        window.alert("The input should be a number!");
        return;
    }

    action.trim() === "add"? currentAcc.owedMoney+=value:currentAcc.owedMoney-=value;

    if(action === "add"){
        currentAcc.transactions.push(+value);
    } else{
        currentAcc.transactions.push(-value);
    }

    document.getElementById("value").value = 0;
    displayUsers(accounts);
    closeMenu();
}

function viewTransactions(userNameDisplay, transactionsDisplay, i){
    const currentAcc = accounts[i];
    const currentArr = currentAcc.transactions;
    let transactionIndex = 0;
    userNameDisplay.innerHTML = currentAcc.name;
    transactionsDisplay.innerHTML = "";
    currentArr.forEach(transaction => {
        transactionsDisplay.innerHTML+= `<div class="card col-lg-6 col-sm-8 mx-auto mt-1">
            <div class="card-body">
                <h4 class="class-title">Transaction ammount: $${transaction.toFixed(2)}</div>
                <button class="btn btn-danger col-10 mx-auto mb-1" id=removeTransaction account-index="${i}" transaction-index="${transactionIndex}">Remove transaction</button>
            </div>
        </div>`;
        transactionIndex++;
    });

    const removeTransactionButtons = document.querySelectorAll("#removeTransaction");

    removeTransactionButtons.forEach(removeTransactionButton =>{
        removeTransactionButton.addEventListener("click", () => {

        const currentTransactionIndex =  Number(removeTransactionButton.getAttribute("transaction-index"));
        const currentAccIndex = Number(removeTransactionButton.getAttribute("account-index"));

        removeTransaction(currentAccIndex, currentTransactionIndex);
        
    })
    })

}

function removeTransaction(currentAccIndex, transactionIndex){
    const balance = accounts[currentAccIndex].transactions[transactionIndex];
    accounts[currentAccIndex].owedMoney += -balance;
    accounts[currentAccIndex].transactions.splice(transactionIndex, 1);

    const transactionsDisplay = document.getElementById("transactionsDisplay");
    const userNameDisplay = document.getElementById("transactionsMenuUserName");

    viewTransactions(userNameDisplay, transactionsDisplay, currentAccIndex);
    displayUsers(accounts);
    
}

const searchAcc = () => {
    const query = searchInput.value;

    const found = accounts.filter(account => account.name.toLowerCase().includes(query.toLowerCase()));
    const searchResults = [...found];
    
    if(searchResults.length > 0){
        usersDisplay.innerHTML = "";
        searchResults.forEach(result => {
            const currentAccIndex = accounts.indexOf(result);
            console.log(currentAccIndex);
            
            usersDisplay.innerHTML+= `<div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card user-card" index="${currentAccIndex}">
            <div class="card-body">
                <h5 class="card-title">${result.name}</h5>
                <p class="card-text">Money owed: ${result.owedMoney.toFixed(2)} BGN</p>
                <a class="btn btn-primary add-btn" index="${currentAccIndex}">+</a>
                <a class="btn btn-primary remove-btn" index="${currentAccIndex}">-</a>
                <a class="btn btn-primary transactions-button" index="${currentAccIndex}">View Transactions</a>
                <a class="btn btn-primary delete-account-button" index="${currentAccIndex}">Delete Acc</a>
            </div>
            </div>
            </div>`;
            
            activateButtonAccEventListeners();
        })
    } else{

        displayUsers(accounts);

    }
}



