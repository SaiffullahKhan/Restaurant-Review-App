document.addEventListener('DOMContentLoaded', () => {
    // Load restaurants into the dropdown
    fetch('/getRestaurants')
        .then(response => response.json())
        .then(data => {
            const restaurantSelect = document.getElementById('restaurantName');
            data.forEach(restaurant => {
                const option = document.createElement('option');
                option.value = restaurant._id;
                option.textContent = restaurant.name;
                restaurantSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching restaurants:', error));

    // Handle form submission
    document.querySelector('.submit-button').addEventListener('click', () => {
        const restaurantId = document.getElementById('restaurantName').value;
        const reviewContent = document.getElementById('reviewContent').value;
        const reviewRating = document.getElementById('reviewRating').value;
        const datePosted = new Date().toISOString();

        const reviewData = {
            restaurantId,
            username: 'current_user', // Replace with the actual username if available
            review: reviewContent,
            rating: reviewRating,
            datePosted
        };

        fetch('/submitReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Review submitted successfully!');
                document.getElementById('reviewForm').reset();
            } else {
                alert('Error submitting review.');
            }
        })
        .catch(error => console.error('Error submitting review:', error));
    });
});
