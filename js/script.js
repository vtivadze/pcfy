const ERROR_DATA_NOT_LOADED = 'მონაცემები არ ჩამოიტვირთა';

const ERROR_MESSAGE_IS_REQUIRED = 'აუცილებელია შესავსებად';
const ERROR_MESSAGE_MIN_LENGTH = 'აუცილებელი სიმბოლოების რაოდენოაბა: ';
const ERROR_MESSAGE_ONLY_GEORGIAN_SYMBOLS = 'მხოლოდ ქართული ასოები';
const ERROR_MESSAGE_EMAIL = 'უნდა მთავრდებოდეს @redberry.ge-ით';
const ERROR_MESSAGE_GEORGIAN_PHONE_NUMBER = 'უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს';
const ERROR_MESSAGE_LAPTOP_NAME = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+=';
const ERROR_MESSAGE_ONLY_DIGITS = 'მხოლოდ ციფრები';
const ERROR_MESSAGE_HARD_DRIVE_TYPE = 'SSD ან HDD';
const ERROR_MESSAGE_DATE_FORMAT = 'ფორმატი: დდ / თთ / წწწწ';
const ERROR_MESSAGE_LAPTOP_STATE = 'აირჩიეთ ახალი ან მეორადი';

const API_URL = 'https://pcfy.redberryinternship.ge/api/';
const LOCAL_STORAGE_PREFIX = 'PCfy';
const LOCAL_STORAGE_FORM_DATA_PREFIX = 'form-';

const PATTERN_GEORGIAN_ALPHABET = /^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]+$/;
const PATTERN_EMAIL = /^[a-zA-Z0-9]+@redberry.ge$/;
const PATTERN_PHONE_NUMBER = /^\+995 ?(\d ?){9}$/;
const PATTERN_LAPTOP_NAME = /^[a-zA-Z0-9!@#$%^&*()_+=]+$/;
const PATTERN_ONLY_DIGITS = /^\d+$/;
const PATTERN_HARD_DRIVE_TYPE = /^(SSD|HDD)$/;
const PATTERN_DATE = /^\d{2} \/ \d{2} \/ \d{4}$/;
const PATTERN_LAPTOP_STATE = /^(new|secondary)$/;

const employeeData = document.getElementById('employee-data');
const laptopData = document.getElementById('laptop-data');
const stepDescriptionsList = document.getElementById('step-descriptions-list');

const backwardButton = document.getElementById('backward-button');
const forwardButton = document.getElementById('forward-button');
const saveButton = document.getElementById('save-button');

const customSelectElements = document.querySelectorAll('.custom-select');
const recordForm = document.querySelector('.record-form');

const customPhotoUpload = document.querySelector('.custom-photo-upload');
const customPhotoUploadImageContainer = document.querySelector('.custom-photo-upload__image-container');
const customPhotoUploadImage = customPhotoUpload.querySelector('.custom-photo-upload__image');
const customPhotoUploadLabel = document.querySelector('.custom-photo-upload__label');
const customPhotoUploadButton = document.querySelector('.custom-photo-upload__button');
const customPhotoUploadInput = document.querySelector('.custom-photo-upload__input');
const customPhotoUploadDescription = document.querySelector('.custom-photo-upload__description');
const customPhotoUploadFileName = customPhotoUploadDescription.querySelector('.custom-photo-upload__file-name');
const customPhotoUploadFileSize = customPhotoUploadDescription.querySelector('.custom-photo-upload__file-size');
const customPhotoUploadMobileLabel = document.querySelector('.custom-photo-upload__mobile-label');

let selectElements = {};

async function sendRequest(url, method = 'GET', body = null) {
  let options = {
    method,
    headers: {
      'Content-Type': 'applications/json'
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await (fetch(url, options));
  if (!response.ok) {
    throw new Error(ERROR_DATA_NOT_LOADED);
  }

  return response.json();
}

const validationRules = {
  employee: {
    name: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      min: {
        param: 2,
        message: ERROR_MESSAGE_MIN_LENGTH + 2,
      },
      pattern: {
        param: PATTERN_GEORGIAN_ALPHABET,
        message: ERROR_MESSAGE_ONLY_GEORGIAN_SYMBOLS
      },
    },
  
    surname: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      min: {
        param: 2,
        message: ERROR_MESSAGE_MIN_LENGTH + 2,
      },
      pattern: {
        param: PATTERN_GEORGIAN_ALPHABET,
        message: ERROR_MESSAGE_ONLY_GEORGIAN_SYMBOLS
      },
    },
  
    team_id: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
    },
  
    position_id: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
    },
  
    email: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_EMAIL,
        message: ERROR_MESSAGE_EMAIL,
      },
    },

    phone_number: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_PHONE_NUMBER,
        message: ERROR_MESSAGE_GEORGIAN_PHONE_NUMBER,
      },
    }
  },
  
  laptop: {
    laptop_image: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
    },

    laptop_name: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_LAPTOP_NAME,
        message: ERROR_MESSAGE_LAPTOP_NAME,
      },
    },

    laptop_brand_id: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
    },

    laptop_cpu: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
    },

    laptop_cpu_cores: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_ONLY_DIGITS,
        message: ERROR_MESSAGE_ONLY_DIGITS,
      },
    },

    laptop_cpu_treads: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_ONLY_DIGITS,
        message: ERROR_MESSAGE_ONLY_DIGITS,
      },
    },

    laptop_ram: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_ONLY_DIGITS,
        message: ERROR_MESSAGE_ONLY_DIGITS,
      },
    },

    laptop_hard_drive_type: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_HARD_DRIVE_TYPE,
        message: ERROR_MESSAGE_HARD_DRIVE_TYPE,
      },
    },

    laptop_pruchase_date: {
      required: {
        param: false,
      },
      pattern: {
        param: PATTERN_DATE,
        message: ERROR_MESSAGE_DATE_FORMAT,
      },
    },

    laptop_price: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_ONLY_DIGITS,
        message: ERROR_MESSAGE_ONLY_DIGITS,
      },
    },

    laptop_state: {
      required: {
        param: true,
        message: ERROR_MESSAGE_IS_REQUIRED,
      },
      pattern: {
        param: PATTERN_LAPTOP_STATE,
        message: ERROR_MESSAGE_LAPTOP_STATE,
      },
    }
  }
};

const validate = {
  required(item, isRequired, message) {
    if (!isRequired) {
      return true;
    }

    if (typeof item !== 'string' && typeof item !== 'number') {
      return message;
    }

    if (item == null) {
      return message;
    }

    item = String(item);

    if (item.length === 0) {
      return message;
    }

    return true;
  },

  pattern(item, pattern, message, isRequired) {
    if (!isRequired && !item) {
      return true;
    }

    const result = pattern.test(item);
    return result ? true : message;
  },

  min(item, min, message, isRequired) {
    if (!isRequired && !item) {
      return true;
    }

    const result = item.length >= min;
    return result ? true : message;
  }
};

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
        customPhotoUploadImage.classList.add('custom-photo-upload__image--hidden');
      } else if (element.type === 'radio') {
        const radioButton = document.getElementById(itemValue);
        radioButton.checked = true;
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
    const isRequired = validationRules[validationTarget][itemName].required.param;
 
    const element = document.querySelector(`[name="${itemName}"]`);
    let value = element.value;

    if (element.type === 'radio') {
      value = null;
      const radios = document.getElementsByName(itemName);
      radios.forEach((item) => {
        if (item.checked) {
          value = item.value;
        }
      });
    }


    for (let i = 0; i < itemRules.length; i++) {
      const rule = itemRules[i];
      const ruleName = rule[0];
      const ruleOptions = rule[1];

      const param = ruleOptions.param;
      const message = ruleOptions.message;
      let validationResult = validate[ruleName](value, param, message, isRequired);

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

  customPhotoUploadFileName.innerText = fileName;
  customPhotoUploadFileSize.innerText = fileSize + ' mb';
  customPhotoUploadDescription.classList.remove('custom-photo-upload__description--hidden');

  customPhotoUploadLabel.style.display = 'none';
  document.querySelector('.record-groups__laptop > .flex-container:first-child')
    .classList.add('flex-container__item--transformed');

  customPhotoUploadImageContainer.closest('.form-element').classList.remove('form-element--error');
}

function handleCustomPphotoUploadButtonClick() {
  customPhotoUploadInput.click();
  customPhotoUploadInput.addEventListener('change', () => {
    const file = customPhotoUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const fileSize = +(file.size / 1000000).toFixed(2);

    const image = customPhotoUploadImageContainer.querySelector('img');
    customPhotoUploadImage.src = URL.createObjectURL(file);
    customPhotoUploadImage.classList.remove('custom-photo-upload__image--hidden');

    transformLaptopImageContainer(fileName, fileSize);
  });
}

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

