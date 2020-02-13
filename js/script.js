/**
 * Declare global variables
 */
//Basic Info
const nameInput = document.getElementById('name');
const nameSpan = document.getElementById('name-span');
const emailInput = document.getElementById('mail');
const emailSpan = document.getElementById('mail-span');
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
const payment = document.getElementById('payment');
const noPaymentOption = payment.children[0].hidden = true;
const paymentDefault = payment.children[1].selected = true;
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.style.display = 'none';
bitcoin.style.display = 'none';
const registerButton = document.querySelector('button');


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
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Must be a valid credit card number
function isValidCreditCard(creditCard) 
{
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(creditCard);
}

// Must be a valid zip code
function isValidZip(zip) 
{
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(zip);
}

// Must be a valid CVV
function isValidCVV(cvv) 
{
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(cvv);
}

// Show element & disable button when show is true, hide when false
function showOrHideTip(show, element) 
{
  if (show) 
  {
    element.hidden = false;
    registerButton.disabled = true;
  } 
  else 
  {
    element.hidden = true;
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
  // Create local variables to validate user input
  const text = e.target.value;
  const valid = isValidName(text);
  const showTip = text !== "" && !valid;
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});

// Email Input Section
emailInput.addEventListener('input', (e) =>
{
  // Create local variables to validate user input
  const text = e.target.value;
  const valid = isValidEmail(text);
  const showTip = text !== "" && !valid;
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
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
// form.addEventListener('submit', (e) =>
// {
//    e.preventDefault();

// });