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

// Payment Info
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

// Can only contain letters a-z case-inesitive
function isValidName(name) 
{
  return /^[a-z ,.'-]+$/i.test(name);
}

// Must be a valid email address
function isValidEmail(email) 
{
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
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
  noColor.selected = false;

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
  // Create local variables 
  const text = e.target.value;
  const valid = isValidName(text);
  const showTip = text !== "" && !valid;
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});

// Email Input Section
emailInput.addEventListener('input', (e) =>
{
  // Create local variables 
  const text = e.target.value;
  const valid = isValidEmail(text);
  const showTip = text !== "" && !valid;
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});


// Job Role Selection Section
jobTitle.addEventListener('change', (e) =>
{
    if (e.target.value == 'other')
    {
      jobTitleOther.style.display = '';
      jobTitleOtherLabel.style.display = '';
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

// Color Validation
// color.addEventListener('change', (e) =>
// {

// });

// Form Submit Listener
// form.addEventListener('submit', (e) =>
// {
//     e.preventDefault();

// });