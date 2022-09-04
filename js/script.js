const employeeData = document.getElementById('employee-data');
const laptopData = document.getElementById('laptop-data');
const backwardButton = document.getElementById('backward-button');

window.addEventListener('load', () => {
  backwardButton.addEventListener('click', () => {
    laptopData.classList.add('record-groups__item--hidden');
    employeeData.classList.remove('record-groups__item--hidden');
  });
})