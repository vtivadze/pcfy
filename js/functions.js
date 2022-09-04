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
  localStorage.setItem(LOCAL_STORAGE_PREFIX + '_' + itemName, data);
}
