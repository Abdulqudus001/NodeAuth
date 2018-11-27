// Check if passwords match on type
let passwordField = document.getElementById('password');
let c_passwordField = document.getElementById('c_password');
c_passwordField.addEventListener('input',() => {
  if (passwordField.value !== c_passwordField.value && c_passwordField.value.length > 0) {
    c_passwordField.style.border = '1px solid red';
    c_passwordField.style.background = 'rgba(120,60,60,0.5)'
  } else {
    c_passwordField.style.border = '';
    c_passwordField.style.background = ''
  }
});

let userName = document.getElementById('userName');
let button = document.getElementById('signup');

window.addEventListener('input',() => {
  if (userName.value.length < 1 || passwordField.value.length < 1 || c_passwordField.value.length < 1)  {
    button.disabled = true;
    button.style.background = '#04AA51';
    button.style.boxShadow = '-1.2px 1.2px 1px rgba(255, 255, 255, 0.5)';
  } else {
    button.disabled = false;
    button.style.background = '';
    button.style.boxShadow = '';
  }
});