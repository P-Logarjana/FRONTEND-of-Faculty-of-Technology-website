// get the form and input fields
const form = document.querySelector("#registration-form");
const firstName = form.querySelector("#first-name");
const lastName = form.querySelector("#last-name");
const dob = form.querySelector("#dob");
const telephone = form.querySelector("#telephone");
const address = form.querySelector("#address");
const city = form.querySelector("#city");
const zipCode = form.querySelector("#zip-code");
const email = form.querySelector("#email");
const password = form.querySelector("#password");
const confirmPassword = form.querySelector("#confirm-password");

// define regex patterns for validation
const namePattern = /^[A-Za-z ]{8,15}$/;
const telephonePattern = /^\d{10}$/;
const zipCodePattern = /^#[0-9]{5}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

// define functions for validation
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const errorMessage = formControl.querySelector(".error-message");
  errorMessage.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function validateInput(input, pattern, message) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "This field is required");
    return false;
  }
  if (!pattern.test(value)) {
    showError(input, message);
    return false;
  }
  showSuccess(input);
  return true;
}

// define event listener for form submission
form.addEventListener("submit", function (event) {
  // prevent the form from submitting
  event.preventDefault();

  // validate the inputs
  let isValid = true;
  isValid &= validateInput(firstName, namePattern, "First name should be 8 to 15 characters long and contain only letters");
  isValid &= validateInput(lastName, namePattern, "Last name should be 8 to 15 characters long and contain only letters and spaces");
  isValid &= validateInput(dob, /^.+$/, "Date of birth is required");
  isValid &= validateInput(telephone, telephonePattern, "Telephone should be 10 digits long and contain only numbers");
  isValid &= validateInput(address, /^.{8,30}$/, "Address should be 8 to 30 characters long");
  isValid &= validateInput(city, namePattern, "City should be 8 to 15 characters long and contain only letters");
  isValid &= validateInput(zipCode, zipCodePattern, "Zip code should start with '#' and contain 5 digits");
  isValid &= validateInput(email, emailPattern, "Please enter a valid email address");
  isValid &= validateInput(password, passwordPattern, "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    showSuccess(confirmPassword);
  }

  // submit the form if all inputs are valid
  if (isValid) {
    form.submit();
  }
})