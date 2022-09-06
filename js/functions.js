function showStepData(element) {
  element.classList.remove('record-groups__item--hidden');
}

function hideStepData(element) {
  element.classList.add('record-groups__item--hidden');
}

function toggleDescription() {
  const stepDescriptionsListItems = stepDescriptionsList.children;
  for (let item of stepDescriptionsListItems) {
    item.classList.toggle('record-steps__item--current');
  }
}

function toggleCustomSelectOptions(currentCustomSelect) {
  const currentHandlerName = currentCustomSelect.dataset.handlerName;
  customSelectElements.forEach((item) => {
    const handlerName = item.dataset.handlerName;
    const customSelectOptionsList = item.querySelector('.custom-select__options-list');
    if (!customSelectOptionsList) {
      return;
    }

    if (currentHandlerName === handlerName) {
      item.classList.toggle('custom-select--opened');
    } else {
      item.classList.remove('custom-select--opened');
    }
  });
}

function getCustomSelectElementHandlerName(customSelectElement) {
  return customSelectElement.dataset.handlerName;
}

async function saveCustomSelectOptionsDataInLocalStorage(customSelectElement) {
  const itemName = getCustomSelectElementHandlerName(customSelectElement);

  if (isSavedCustomSelectOptionsData(itemName)) {
    return;
  }

  let data = null;
  try {
    data = await loadCustomSelectOptions(itemName);
  } catch(error) {
    setCustomSelectError(customSelectElement);
  }

  if (data) {
    saveDataIntoLocalStorage(JSON.stringify(data.data), itemName);
  }
}

async function loadCustomSelectOptions(handler) {
  const url = API_URL + handler;

  let data = null;
  try {
    data = await sendRequest(url);
  } catch(error) {
    throw new Error(error);
  }

  return data;
}

function saveDataIntoLocalStorage(data, itemName) {
  itemName = formateLocalStorageItemName(itemName);
  localStorage.setItem(itemName, data);
}

function isSavedCustomSelectOptionsData(itemName) {
  itemName = formateLocalStorageItemName(itemName);
  return localStorage.getItem(itemName);
}

function getDataFromLocalStorage(itemName) {
  itemName = formateLocalStorageItemName(itemName);
  data = localStorage.getItem(itemName);
  return JSON.parse(data);
}

function formateLocalStorageItemName(itemName) {
  return LOCAL_STORAGE_PREFIX + '_' + itemName;
}

function populateCustomSelectElement(customSelectElement, teamId = null) {
  const itemName = getCustomSelectElementHandlerName(customSelectElement);
  if (itemName === 'positions') {
    teamId = teamId || getDataFromLocalStorage('form-team_id');
    if (teamId === null) {
      return;
    }
  }

  let data = getDataFromLocalStorage(itemName);
  if (teamId !== null) {
    data = data.filter((item) => item.team_id === +teamId);
  }

  populateRealSelectOptions(customSelectElement, data);

  const customSelectOptions = createCustomSelectOptions(data);
  customSelectElement.appendChild(customSelectOptions);
}

function populateRealSelectOptions(customSelectElement, data) {
  const realSelect = customSelectElement.querySelector('.custom-select__real-select');
  data.forEach((item) => {
    const option = document.createElement('option');
    option.innerText = item.name;
    option.setAttribute('value', item.id);
    realSelect.appendChild(option);
  });
  selectElements[realSelect.name] = realSelect;
}

function createCustomSelectOptions(data) {
  const ul = document.createElement('ul');
  ul.classList.add('custom-select__options-list');

  data.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('custom-select__options-list-item');
    li.innerText = item.name;
    li.setAttribute('data-item-id', item.id);
    li.addEventListener('click', handleCustomSelectItemClick);
    ul.appendChild(li);
  });

  return ul;
}

function handleCustomSelectItemClick(event) {
  const element = event.currentTarget;
  const itemName = element.innerText;
  const itemId = element.dataset.itemId;

  const customSelectTitle = element
    .closest('.custom-select')
    .querySelector('.custom-select__title');
  customSelectTitle.innerText = itemName;

  const customSelectRealSelect = element
    .closest('.custom-select')
    .querySelector('.custom-select__real-select');
  customSelectRealSelect.value = itemId;

  if (customSelectRealSelect.name === 'team_id') {
    populatePositionCustomSelect(itemId);
  }

  element.dispatchEvent(new window.Event('change', { bubbles: true }));
}

function emptyCustomSelectElement(customSelect) {
  const optionsList = customSelect.querySelector('.custom-select__options-list');
  if (optionsList) {
    while(optionsList.firstChild) {
      optionsList.firstChild.remove();
    };
  }

  const customSelectRealSelect = customSelect.querySelector('.custom-select__real-select');
  while(customSelectRealSelect.lastChild.innerText !== '') {
    customSelectRealSelect.lastChild.remove();
  }
}

function populatePositionCustomSelect(itemId) {
  const customSelect = document.querySelector('[data-handler-name="positions"]');
  emptyCustomSelectElement(customSelect);
  populateCustomSelectElement(customSelect, itemId);
  customSelect.querySelector('.custom-select__title').innerText = 'პოზიცია';
}

function populateFormElementInputs() {
  Promise.resolve().then(() => {
    const entries = Object.entries(localStorage);
    const prefix = LOCAL_STORAGE_PREFIX + '_' + LOCAL_STORAGE_FORM_DATA_PREFIX;
    
    for (let i = 0; i < entries.length; i++) {
      const item = entries[i];
      const itemKey = item[0];
      let itemValue = item[1];
      if (!itemKey.startsWith(prefix)) {
        continue;
      }
  
      const formElementName = itemKey.substring(prefix.length);
      let element = document.querySelector(`[name="${formElementName}"]`);

      if (element.tagName === 'SELECT') {
        element = selectElements[formElementName];
      }

      if (formElementName === 'laptop_image') {
        itemValue = JSON.parse(itemValue);
        transformLaptopImageContainer(itemValue.fileName, itemValue.fileSize);
        customPhotoUploadImage.classList.add('custom-photo-upload__image--hidden')
      } else if (element) {
        element.value = itemValue;
      }

      if (element.tagName === 'SELECT') {
        const label = document
          .querySelector(`[name="${formElementName}"]`)
          .parentElement
          .querySelector('label');

        let itemDisplayValue = null;
        for (let item of element.children) {
          const itemAttributeValue = item.getAttribute('value');
          if (itemAttributeValue === itemValue) {
            itemDisplayValue = item.innerText;
            break;
          }
        }

        label.innerText = itemDisplayValue ? itemDisplayValue : label.dataset.defaultTitle;
      }
    }
  });
}

function checkValidation(validationTarget) {
  let isValid = true;
  let errorMessage;

  const rules = Object.entries(validationRules[validationTarget]);

  rules.forEach((item) => {
    const itemName = item[0];
    const itemRules = Object.entries(item[1]);
 
    const element = document.querySelector(`[name="${itemName}"]`);
    const value = element.value

    for (let i = 0; i < itemRules.length; i++) {
      const rule = itemRules[i];
      const ruleName = rule[0];
      const ruleOptions = rule[1];

      const param = ruleOptions.param;
      const message = ruleOptions.message;
      let validationResult = validate[ruleName](value, param, message);

      if (typeof validationResult === 'string') {
        errorMessage = validationResult;
        validationResult = false;
      }

      if (isValid && !validationResult) {
        isValid = false;
      }

      if (!validationResult) {
        setCustomSelectError(element, errorMessage);
        break;
      } else {
        removeErrorFromElement(element);
      }
    }
  });

  return isValid;
}

function setCustomSelectError(customSelectElement, errorMessage = null) {
  const formElement = customSelectElement.closest('.form-element');
  formElement.classList.add('form-element--error');
  if (errorMessage) {
    const formElementErrorMessage = formElement.querySelector('.form-element__error-message');
    if (formElementErrorMessage) {
      formElementErrorMessage.innerText = errorMessage;
    }
  }
}

function removeErrorFromElement(element) {
  const formElement = element.closest('.form-element');
  if (formElement.classList.contains('form-element--error')) {
    formElement.classList.remove('form-element--error');
  
    const formElementErrorMessage = formElement.querySelector('.form-element__error-message');
    if (formElementErrorMessage) {
      formElementErrorMessage.innerText = '';
    } 
  }
}

function transformLaptopImageContainer(fileName, fileSize) {
  customPhotoUploadImageContainer.classList.add('custom-photo-upload__image-container--uploaded');

  customPhotoUploadButton.classList.add('custom-photo-upload__button--uploaded');
  customPhotoUploadButton.innerText = 'თავიდან ატვირთე';

  customPhotoUploadFileName.innerText = fileName + ',';
  customPhotoUploadFileSize.innerText = fileSize + ' mb';
  customPhotoUploadDescription.classList.remove('custom-photo-upload__description--hidden');

  customPhotoUploadLabel.style.display = 'none';
  document.querySelector('.record-groups__laptop > .flex-container:first-child').style.rowGap='174px';
}
