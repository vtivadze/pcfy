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

function setCustomSelectError(customSelectElement) {
  const parent = customSelectElement.parentElement;
  parent.classList.add('form-element--error');
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
      const itemValue = item[1];
      if (!itemKey.startsWith(prefix)) {
        continue;
      }
  
      const formElementName = itemKey.substring(prefix.length);
      let element = document.querySelector(`[name="${formElementName}"]`);
      if (element.tagName === 'SELECT') {
        element = selectElements[formElementName];
      }
      if (element) {
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
          }
        }

        label.innerText = itemDisplayValue;
      }
    }
  });


    
}