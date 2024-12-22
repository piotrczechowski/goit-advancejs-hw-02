// Import required libraries
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let timerInterval = null;
let userSelectedDate = null;

// Initialize flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: "Invalid Date",
        message: "Please choose a date in the future.",
        position: "topRight",
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
});

// Start button click event
startButton.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const remainingTime = userSelectedDate - new Date();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: "Countdown Complete",
        message: "The countdown has ended!",
        position: "topRight",
      });
      resetTimer();
      return;
    }

    updateTimerInterface(convertMs(remainingTime));
  }, 1000);
});

// Update the timer interface
function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Reset the timer
function resetTimer() {
  datetimePicker.disabled = false;
  startButton.disabled = true;
  updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

// Utility: Add leading zero to single-digit numbers
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Utility: Convert milliseconds to time components
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
