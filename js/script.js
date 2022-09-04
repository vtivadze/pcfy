const employeeData = document.getElementById('employee-data');
const laptopData = document.getElementById('laptop-data');
const backwardButton = document.getElementById('backward-button');
const forwardButton = document.getElementById('forward-button');

window.addEventListener('load', () => {
  forwardButton.addEventListener('click', () => {
    employeeData.classList.add('record-groups__item--hidden');
    laptopData.classList.remove('record-groups__item--hidden');
  });

  backwardButton.addEventListener('click', () => {
    laptopData.classList.add('record-groups__item--hidden');
    employeeData.classList.remove('record-groups__item--hidden');
  });
});