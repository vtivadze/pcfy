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