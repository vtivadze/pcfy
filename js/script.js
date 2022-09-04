window.addEventListener('load', () => {
  forwardButton.addEventListener('click', () => {
    hideStepData(employeeData);
    showStepData(laptopData);
    toggleDescription();
  });

  backwardButton.addEventListener('click', () => {
    hideStepData(laptopData);
    showStepData(employeeData);
    toggleDescription();
  });

  for (let item of customSelectElements) {
    item.addEventListener('click', (event) => {
      const customSelect = event.currentTarget;
      toggleCustomSelectOptions(customSelect);
    });
  };

  
});