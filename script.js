const usersDisplay = document.querySelector(".usersDisplay");

function displayUsers(){
    usersDisplay.innerHTML = '';

    for(let i = 0; i<=20; i++){
        usersDisplay.innerHTML+= `<div class="card user-card">
            <div class="card-body">
                <h5 class="card-title">User Name</h5>
                <p class="card-text">Money owed: 2000</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`;
    }


}

displayUsers();