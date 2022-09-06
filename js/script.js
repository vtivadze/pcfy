window.addEventListener('load', () => {
  forwardButton.addEventListener('click', () => {
    if (!checkValidation('employee')) {
      return false;
    }

    hideStepData(employeeData);
    showStepData(laptopData);
    toggleDescription();
  });

  backwardButton.addEventListener('click', () => {
    hideStepData(laptopData);
    showStepData(employeeData);
    toggleDescription();
  });

  saveButton.addEventListener('click', () => {
    if (!checkValidation('laptop')) {
      return false;
    }

    console.log('saved');
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

  recordForm.addEventListener('change', (event) => {
    const element = event.target;
    let dataName= element.name;
    let dataValue = element.value;
    
    if (!dataName) {
      const customSelectRealSelect = element
        .closest('.custom-select')
        .querySelector('.custom-select__real-select');
      dataName = customSelectRealSelect.name;
      dataValue = customSelectRealSelect.value;
    }

    if (dataName === 'laptop_image') {
      dataValue = {
        fileName: customPhotoUploadFileName.innerText,
        fileSize: customPhotoUploadFileSize.innerText,
      };
      dataValue = JSON.stringify(dataValue);
    }

    saveDataIntoLocalStorage(dataValue, LOCAL_STORAGE_FORM_DATA_PREFIX + dataName)
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('custom-select')) {
      customSelectElements.forEach((item) => {
        item.classList.remove('custom-select--opened');
      });
    }
  });

  customPhotoUploadButton.addEventListener('click', () => {
    handleCustomPphotoUploadButtonClick();
  });

  customPhotoUploadMobileLabel.addEventListener('click', () => {
    handleCustomPphotoUploadButtonClick();
  });

  populateFormElementInputs();
});

