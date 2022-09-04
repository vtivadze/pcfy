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

  customSelectElements.forEach(async(customSelectElement) => {
    const handler = customSelectElement.dataset.handlerName;

    let data = null;
    try {
      data = await loadCustomSelectOptions(handler);
    } catch(error) {
      setCustomSelectError(customSelectElement);
    }

    console.log(data);
    if (data) {
      saveDataIntoLocalStorage(JSON.stringify(data.data), handler);
    }
  });

  for (let item of customSelectElements) {
    item.addEventListener('click', (event) => {
      const customSelect = event.currentTarget;
      toggleCustomSelectOptions(customSelect);
    });
  };

  
});