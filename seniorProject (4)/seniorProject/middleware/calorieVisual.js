const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.current-progress');
let dailyCalories = localStorage.getItem('calories-goal') || 2000;
let consumedCalories = ''; // change this to the user's consumed calories for the day

function updateProgressBar() {
    consumedCalories = document.getElementById('calories-input').value;

    // check if the value entered is a valid number
    if (isNaN(consumedCalories)) {
    progressText.textContent = "Enter a valid number";
    return;
    }

    // convert the value entered to a number
    consumedCalories = Number(consumedCalories);

    // check if the value entered is negative
    if (consumedCalories < 0) {
    progressText.textContent = "Enter a positive number";
    return;
    }

    const progress = consumedCalories / dailyCalories;
    const limitedProgress = Math.min(progress, 1); 
    const offset = 285 - limitedProgress * 285;
    progressBar.style.strokeDasharray = '285';
    progressBar.style.strokeDashoffset = offset;

    // check if the goal has been reached
    if (consumedCalories >= dailyCalories) {
    progressText.textContent = "Your goal has been reached!";
    
    } else {
    const caloriesLeft = dailyCalories - consumedCalories;
    progressText.textContent = "You need " + caloriesLeft + " calories left.";
    }
}

function saveGoal() {
  const caloriesGoalInput = document.getElementById('calories-goal-input');
  dailyCalories = caloriesGoalInput.value;

  // check if the value entered is a valid number
  if (isNaN(dailyCalories)) {
    alert("Enter a valid number");
    return;
  }

  // convert the value entered to a number
  dailyCalories = Number(dailyCalories);

  // check if the value entered is negative
  if (dailyCalories < 0) {
    alert("Enter a positive number");
    return;
  }

  // save the daily calorie goal 
  localStorage.setItem('calories-goal', dailyCalories);
  alert("Daily calorie goal saved!");
}

// call the function to set the initial progress bar
updateProgressBar();