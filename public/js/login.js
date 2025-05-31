// login.js

function login(event) 
{
    event.preventDefault();

    var user = {};
    user.username = document.getElementById("inputUser").value;
    user.password = document.getElementById("inputPassword").value;
    console.log("Login attempt with:", user);

    var request = new XMLHttpRequest();

    request.open("POST", "/loginUser", true);
    
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        if (request.status === 200) {
            alert("Login successful!");
            window.location.href = "restaurant.html"; // Redirect to the restaurant page
        } else {
            alert("Login failed. Please check your username and password.");
        }
    };

    request.send(JSON.stringify(user));
}
