/*****
 * Tech-Degree Project 3 Form Validation
*****/

/**
 * Declare global variables
 */
//Basic Info
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobTitle = document.getElementById('title');
const jobTitleOther = document.getElementById('other-title');
const jobTitleOtherLabel = document.getElementById('other-title-label');
jobTitleOther.style.display = 'none';
jobTitleOtherLabel.style.display = 'none';

// Shirt Info
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOptions = color.children;
const noColor = document.createElement('option');
noColor.innerHTML = 'Please select a T-Shirt Theme';
color.insertBefore(noColor, color.childNodes[0]);
noColor.selected = true;

// Register for Activities Info
const activities = document.querySelector('.activities');
const activitiesOptions = activities.querySelectorAll('input');
const activitiesCost = document.createElement('h3');
activities.appendChild(activitiesCost);
let totalCost = 0;
activitiesCost.textContent = `Total Cost: $${totalCost}`;


// Payment Info
const ccInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const payment = document.getElementById('payment');
const noPaymentOption = payment.children[0].hidden = true;
const paymentDefault = payment.children[1].selected = true;
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Form & Button DOM Info
const form = document.querySelector('form');
const registerButton = document.querySelector('button');

// Error Elements
const nameErr = document.getElementById('name-error');
const emailErr = document.getElementById('email-error');
const activityErr = document.getElementById('activity-error');
const ccErr = document.getElementById('cc-error');
const zipErr = document.getElementById('zip-error');
const cvvErr = document.getElementById('cvv-error');

// Set Errors to display none
nameErr.style.display = 'none';
emailErr.style.display = 'none';
activityErr.style.display = 'none';
ccErr.style.display = 'none';
zipErr.style.display = 'none';
cvvErr.style.display = 'none';

// Document window loads
window.onload = function() 
{
  // Give focus to name field, immediately when page loads
  nameInput.focus();

  // Until design theme is selected no color options appear
  for (let i = 0; i < colorOptions.length; i++)
  {
    if (i > 0)
    {
      colorOptions[i].hidden = true;
    }
  }  
};

/**
 * VALIDATORS/FUNCTIONS
 */

// Can only contain letters a-z case-insensitive
function isValidName(name) 
{
  return /^[a-z ,.'-]+$/i.test(name);
}

// Must be a valid email address
function isValidEmail(email) 
{
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(email);
}

// Must be a valid credit card number
function isValidCreditCard(creditCard) 
{
  return /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(creditCard);
}

// Must be a valid zip code
function isValidZip(zip) 
{
  return /^\d{5}([-]|\s*)?(\d{4})?$/.test(zip);
}

// Must be a valid CVV
function isValidCVV(cvv) 
{
  return /^\d{3}/.test(cvv);
}

// Show element & disable button when show is true, hide when false
function showError(show, error) 
{
  if (show) 
  {
    error.style.color = 'red';
    error.style.display = 'inherit';
    registerButton.disabled = true;
  } 
  else 
  {
    error.style.display = 'none';
    registerButton.disabled = false;
  }
}

// Show Colors based on Design Theme
function showColors(theme, index)
{
  // For loop to traverse the array
  for (let i = 0; i < colorOptions.length; i++)
  {
    // Show color options that match theme
    if (colorOptions[i].textContent.includes(theme))
    {
      colorOptions[i].hidden = false;

      // Set element = index to selected 
      if (i == index)
      {
        colorOptions[i].selected = true;
      }
    }
    else
    {
      colorOptions[i].hidden = true;
    }
  }
}

/**
 * EVENT LISTENERS
 */

// Name Input Section
nameInput.addEventListener('input', (e) =>
{
  // Call isValid Name
  const valid = isValidName(e.target.value);
  const showErr = e.target.value !== "" && !valid;
  const errInfo = e.target.nextElementSibling;
  // Call showError
  showError(showErr, errInfo);
});

// Email Input Section
emailInput.addEventListener('input', (e) =>
{
  // Call isValidEmail
  const valid = isValidEmail(e.target.value);
  const showErr = e.target.value !== "" && !valid;
  const errInfo = e.target.nextElementSibling;
  // Call showError
  showError(showErr, errInfo);
});

// Credit Card Input Section
ccInput.addEventListener('input', (e) =>
{
  // Call isValidCreditCard
  const valid = isValidCreditCard(e.target.value);
  const showErr = e.target.value !== "" && !valid;
  const errInfo = e.target.nextElementSibling;
  // call ShowError
  showError(showErr, errInfo);
});

// Zip Input Section
zipInput.addEventListener('input', (e) =>
{
  // Call isValidZip
  const valid = isValidZip(e.target.value);
  const showErr = e.target.value !== "" && !valid;
  const errInfo = e.target.nextElementSibling;
  // Call ShowError
  showError(showErr, errInfo);
});

// CVV Input Section
cvvInput.addEventListener('input', (e) =>
{
  // Call isValidCVV
  const valid = isValidCVV(e.target.value);
  const showErr = e.target.value !== "" && !valid;
  const errInfo = e.target.nextElementSibling;
  // Call ShowError
  showError(showErr, errInfo);
});


// Job Role Selection Section
jobTitle.addEventListener('change', (e) =>
{
  // If target is equal to other display input & label
  if (e.target.value == 'other')
  {
    jobTitleOther.style.display = '';
    jobTitleOtherLabel.style.display = '';
    jobTitleOther.focus();
  }
  else
  {
    jobTitleOther.style.display = 'none';
    jobTitleOtherLabel.style.display = 'none';
  }
});

// Design Section 
design.addEventListener('change', (e) =>
{
  // If target is equal to text call show Colors with appropriate index 
  // to use to set element to selected
  if (e.target.value == 'js puns')
  {
    showColors('Puns', 1);
  }
  else if (e.target.value == 'heart js')
  {
    showColors('I', 4);
  }
  else
  {
    // Reset color options if no theme
    if (e.target.value == 'Select Theme')
    {
      // Until design theme is selected no color options appear
      for (let i = 0; i < colorOptions.length; i++)
      {
        if (i > 0)
        {
          colorOptions[i].hidden = true;
        }
      }
      noColor.selected = true;
    }
  }
});

// Activities Section
activities.addEventListener('change', (e) =>
{
  // Declare local variables for cost and day-and-time
  let cost = parseInt(e.target.dataset.cost);
  let time = e.target.dataset.dayAndTime;

  // If target checked add to total cost
  if (e.target.checked)
  {
    totalCost += cost;
  }
  else 
  {
    if (!e.target.checked)
    {
      totalCost -= cost;
    }
  }

  // For loop to traverse array of elements 
  for (let i = 0; i < activitiesOptions.length; i++)
  {
    // If day-and-time is equal to that of the current element
    // in the array and its not the same element selected
    // and if its checked disable the current element thats NOT the target
    if (time == activitiesOptions[i].dataset.dayAndTime && e.target != activitiesOptions[i])
    {
      if (e.target.checked)
      {
        activitiesOptions[i].disabled = true;
      }
      else
      {
        if (!e.target.checked)
        {
          activitiesOptions[i].disabled = false;
        }
      }
    }
  }
  
  // Display Total 
  activitiesCost.textContent = `Total Cost: $${totalCost}`;
});

// Payment Section
payment.addEventListener('change', (e) =>
{
  // If target is equal to text display payment
  if (e.target.value == 'paypal')
  {
    paypal.style.display = '';
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
  }
  else if (e.target.value == 'bitcoin')
  {
    bitcoin.style.display = '';
    creditCard.style.display = 'none';
    paypal.style.display = 'none';
  }
  else
  {
    creditCard.style.display = '';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  }
});

// Form Submit Listener
form.addEventListener('submit', (e) =>
{
  // Declare local variable for counter
  let activityCounter = 0;
  let errCounter = 0;

  // Validate Name
  if (!isValidName(nameInput.value))
  {
    showError(true, nameInput.nextElementSibling);
    nameInput.focus();
    errCounter++;
  }

   // Validate Email
  if (!isValidEmail(emailInput.value))
  {
    showError(true, emailInput.nextElementSibling);
    emailInput.focus();
    errCounter++;
  }

  // Validate Activity
  // For loop to traverse array of elements 
  for (let i = 0; i < activitiesOptions.length; i++)
  {
    if (!activitiesOptions[i].checked)
    {
      activityCounter++;
    }
  }

  if (activityCounter == 7)
  {
    activityErr.style.color = 'red';
    activityErr.style.display = '';
    registerButton.disabled = true;
    errCounter++;
  }
  else
  {
    activityErr.style.display = 'none';
    registerButton.disabled = false;
  }
  
  // If credit card is the selected payment
  if (creditCard.selected = true)
  {
    // Validate Credit Card
    if (!isValidCreditCard(ccInput.value))
    {
      showError(true, ccInput.nextElementSibling);
      ccInput.focus();
      errCounter++;
    }

    // Validate Zip
    if (!isValidZip(zipInput.value))
    {
      showError(true, zipInput.nextElementSibling);
      zipInput.focus();
      errCounter++;
    }

    // Validate CVV
    if (!isValidCVV(cvvInput.value))
    {
      showError(true, cvvInput.nextElementSibling);
      cvvInput.focus();
      errCounter++;
    }
  }

  // If errors still exist dont process info
  if (errCounter !==0)
  (
    e.preventDefault()
  )

});