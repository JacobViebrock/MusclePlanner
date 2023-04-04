// Get the table body and all the days
const tableBody = document.querySelector('tbody');
const days = tableBody.querySelectorAll('.day');
    
// Set the starting date to the first of the current month
const currentDate = new Date();
currentDate.setDate(1);
    
// Display the current month in the header
const monthHeader = document.getElementById('month-header');
const monthName = currentDate.toLocaleString('default', { month: 'long' });
monthHeader.textContent = monthName;
    
// Loop through each day cell and add the date number
days.forEach((day, index) => {
  const date = new Date(currentDate.getTime());
  date.setDate(date.getDate() + index - date.getDay());
  day.textContent = date.getDate();
});
    
// Add a click event listener to each day cell
days.forEach((day) => {
  day.addEventListener('click', (event) => {
    // If there is already a meal or workout, remove it
    if (event.target.querySelector('.meal') !== null || event.target.querySelector('.workout') !== null) {
        if (event.target.querySelector('.meal') !== null) {
            event.target.querySelector('.meal').remove();
        }
        if (event.target.querySelector('.workout') !== null) {
            event.target.querySelector('.workout').remove();
        }
    }
    
    // Otherwise, add a new meal or workout
    else {
        const type = prompt('Enter "meal" or "workout":');
        if (type === 'meal') {
            const meal = document.createElement('div');
            meal.classList.add('meal');
            event.target.appendChild(meal);
            meal.style.display = 'block'; // show the meal box
        }
          else if (type === 'workout') {
            const workout = document.createElement('div');
            workout.classList.add('workout');
            event.target.appendChild(workout);
            workout.style.display = 'block'; // show the workout box
        }
    }
    });
});