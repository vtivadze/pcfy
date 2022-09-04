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

  customSelectElements.forEach(async (customSelectElement) => {
    await saveCustomSelectOptionsDataInLocalStorage(customSelectElement);
    populateCustomSelectElement(customSelectElement);
  });

  for (let item of customSelectElements) {
    item.addEventListener('click', (event) => {
      const customSelect = event.currentTarget;
      toggleCustomSelectOptions(customSelect);
    });
  }
});