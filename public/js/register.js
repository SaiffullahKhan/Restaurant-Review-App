// Part 1B. of Lab Back-End Development II

function register() 
{
    //create a user object and parse username and password from the form in
    var user = {}; 

    user.username = document.getElementById("inputUser").value; // Retrieve value from HTML input text
    user.password = document.getElementById("inputPassword").value; // Retrieve value from HTML input text
    console.log(user);

    //initialize a new XMLHttpRequest object
    var request = new XMLHttpRequest();

    //set the request method 'POST' and request URL '/registerUser'
    request.open("POST", "/registerUser", true);

    //set request header type as json
    request.setRequestHeader("Content-Type", "application/json");

    //callback function when data is returned from the web server
    request.onload = function () 
    {
        if (request.status == 200) { 
            alert("You have successfully registered an account!"); // Show success alert
            window.location.href = "restaurant.html"; // Redirect to restaurant.html
        } else {
            alert("Registration failed. Please try again.");
        }
    }

    //send request
    request.send(JSON.stringify(user));
}
