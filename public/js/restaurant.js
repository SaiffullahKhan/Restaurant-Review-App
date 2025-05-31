// Part 1B of Lab Front-End Development III

/*
function loadRestaurantData() {
    alert("restaurant data loaded");
}
*/

// Part 2A of Lab Front-End Development III

function loadRestaurantData() {
    var request = new XMLHttpRequest();
    var restaurantArray = [];

    request.open("GET", "/loadRestaurantData", true);

    request.onload = function () {
        restaurantArray = JSON.parse(request.responseText);
        insertDynamicRestaurants(restaurantArray);
    };

    request.send();
}


// Part 2C. of Lab Back-End Development I

function insertDynamicRestaurants(restaurantArray) {
    var dynamicRestaurantList = document.getElementById("dynamicRestaurantDataList");

    dynamicRestaurantList.innerHTML = ""; // Clear existing content

    for (let i = 0; i < restaurantArray.length; i++) {
        var tempRestaurant = restaurantArray[i];
        dynamicRestaurantList.innerHTML += `
            <div class='card col-3' onclick='redirectToReview(${tempRestaurant.id})'>
                <h2 class='restaurant-name'>${tempRestaurant.name}</h2>
                <img class='img-fluid' src='${tempRestaurant.img}' alt='${tempRestaurant.name}'>
                <p class='description'>${tempRestaurant.description}</p>
                <p class='opening-hours'>Opening Hours: ${tempRestaurant.openinghours}</p>
            </div>`;
    }
}

function redirectToReview(_id) {
    window.location.href = `review.html?restaurantId=${_id}`;
}
