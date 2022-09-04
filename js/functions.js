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

function toggleCustomSelectOptions(customSelectElement) {
  customSelectElement.classList.toggle('custom-select--opened');
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

function populateCustomSelectElement(customSelectElement) {
  const itemName = getCustomSelectElementHandlerName(customSelectElement);
  if (itemName === 'positions') {
    return;
  }
  
  const data = getDataFromLocalStorage(itemName);
  const customSelectOptions = createCustomSelectOptions(data);
  customSelectElement.appendChild(customSelectOptions);
}

function createCustomSelectOptions(data) {
  const ul = document.createElement('ul');
  ul.classList.add('custom-select__options-list');

  data.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('custom-select__options-list-item');
    li.innerText = item.name;
    li.setAttribute('data-option-id', item.id);
    ul.appendChild(li);
  });

  return ul;
}
