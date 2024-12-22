// // Import iziToast library and styles
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// Get references to form and inputs
const form = document.querySelector(".form");
const delayInput = form.querySelector("input[name='delay']");
const stateInputs = form.querySelectorAll("input[name='state']");

// Add event listener to form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get delay value
  const delay = parseInt(delayInput.value, 10);

  // Get selected state (fulfilled/rejected)
  const state = Array.from(stateInputs).find((input) => input.checked)?.value;

  if (!state || isNaN(delay)) {
    iziToast.error({
      title: "Error",
      message: "Please fill out all fields correctly!",
      position: "topRight",
    });
    return;
  }

  // Create the promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Handle promise resolution and rejection
  promise
    .then((delay) => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Failure",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});
