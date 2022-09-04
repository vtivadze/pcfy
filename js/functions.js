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

function toggleCustomSelectOptions(customSelect) {
  customSelect.classList.toggle('custom-select--opened');
}

async function loadCustomSelectOptions(customSelect) {
  const handlerName = customSelect.dataset.handlerName;
  const url = API_URL + handlerName;

  let data = null;
  try {
    data = await sendRequest(url);
  } catch(error) {
    throw new Error(error);
  }

  return data;
}

function setCustomSelectError(customSelect) {
  const parent = customSelect.parentElement;
  parent.classList.add('form-element--error');
}