const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', function() {
    const query = searchInput.value;
    alert('Searching for: ' + query); // You can replace this with actual search logic
});

// Optionally, allow the user to press "Enter" to trigger search
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

const accountName = document.getElementById("account_name");
const accountIcon = document.getElementById("account_icon");

accountName.addEventListener('click', () => {
    if (accountName.className === "name_signin") {
        window.location.href = 'http://127.0.0.1:5501/login.html'; // Redirect to login page
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("username")) {
        accountIcon.className = "icon";
        accountName.className = "name";
        accountName.innerHTML = localStorage.getItem("username");
        accountIcon.innerHTML = localStorage.getItem("username")[0];
      } else {
        return;
      }
})

function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}

const userinfo = document.querySelector("#userinfo");

userinfo.addEventListener("click", () => {
    const navbar = document.getElementById("navbar")

    if (accountIcon.className === "icon" && accountName.className === "name") {
        if (navbar.className === "navbar_signin") {
            navbar.className = "navbar";
        } else {
            navbar.className = "navbar_signin";
        }
    }
})