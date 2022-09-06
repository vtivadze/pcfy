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

