const DEFAULT_GOALS = {
  calories: 2000,
  steps: 10000,
};

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.navigation').classList.toggle('open');
});

function openTabs(evt, tab) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";

  loadProgressBar(tab);
}

function updateProgressBar(tab) {
  const dailyProgress = document.getElementById(`${tab}-goal-input`).value;
  const progressBar = document.querySelector(`.${tab} .progress-bar`);
  const progressText = document.querySelector(`.${tab} .current-progress`);
  let currentProgress = document.getElementById(`${tab}-input`).value;

  // check if the value entered is a valid number
  if (isNaN(currentProgress)) {
    progressText.textContent = "Enter a valid number";
    return;
  }

  // convert the value entered to a number
  currentProgress = Number(currentProgress);

  // check if the value entered is negative
  if (currentProgress < 0) {
    progressText.textContent = "Enter a positive number";
    return;
  }

  const progress = currentProgress / dailyProgress;
  const limitedProgress = Math.min(progress, 1);
  const offset = 285 - limitedProgress * 285;
  progressBar.style.strokeDasharray = "285";
  progressBar.style.strokeDashoffset = offset;

  // check if the goal has been reached
  if (currentProgress >= dailyProgress) {
    progressText.textContent = "Your goal has been reached!";
  } else {
    const toReachGoal = dailyProgress - currentProgress;
    progressText.textContent = `You need ${toReachGoal} ${tab} left.`;
  }
}

function saveGoal(tab) {
  let dailyProgress = document.getElementById(`${tab}-goal-input`).value;

  // check if the value entered is a valid number
  if (isNaN(dailyProgress)) {
    alert("Enter a valid number");
    return;
  }

  // convert the value entered to a number
  dailyProgress = Number(dailyProgress);

  // check if the value entered is negative
  if (dailyProgress < 0) {
    alert("Enter a positive number");
    return;
  }

  // save the daily calorie/step goal
  localStorage.setItem(`${tab}-goal`, dailyProgress);
  alert(`Daily ${tab} goal saved!`);
}

function loadProgressBar(tab = "calories") {
  const dailyProgress =
    localStorage.getItem(`${tab}-goal`) || DEFAULT_GOALS[tab];
  document.getElementById(`${tab}-goal-input`).value = dailyProgress;
  // call the function to set the initial progress bar
  updateProgressBar(tab);
}

// Slideshow of workouts
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("workouts-slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
