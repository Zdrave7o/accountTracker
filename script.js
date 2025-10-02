const usersDisplay = document.querySelector(".usersDisplay");
const createUserBtn = document.querySelector("#createUserBtn");

function displayUsers(){
    usersDisplay.innerHTML = '';

    for(let i = 1; i<=7; i++){
        usersDisplay.innerHTML+= `<div class="card user-card">
            <div class="card-body">
                <h5 class="card-title">User Name</h5>
                <p class="card-text">Money owed: 2000</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`;
    }


}


function createUser(){
    usersDisplay.innerHTML+= `<div class="card user-card">
            <div class="card-body">
                <h5 class="card-title">User Name</h5>
                <p class="card-text">Money owed: 2000</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`;
}

createUserBtn.addEventListener("click", () => {
    createUser();
})
