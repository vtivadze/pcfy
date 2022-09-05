const ERROR_DATA_NOT_LOADED = 'მონაცემები არ ჩამოიტვირთა';

const API_URL = 'https://pcfy.redberryinternship.ge/api/';
const LOCAL_STORAGE_PREFIX = 'PCfy';
const LOCAL_STORAGE_FORM_DATA_PREFIX = 'form-';

const PATTERN_GEORGIAN_ALPHABET = /^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]+$/;
const PATTERN_EMAIL = /^[a-zA-Z0-9]+@redberry.ge$/;
const PATTERN_PHONE_NUMBER = /^\+995\d{9}$/;
const PATTERN_LAPTOP_NAME = /^[a-zA-Z0-9!@#$%^&*()_+=]+$/;
const PATTERN_ONLY_DIGITS = /^\d+$/;
const PATTERN_HARD_DRIVE_TYPE = /^(SSD|HDD)$/;
const PATTERN_DATE = /^\d{2} \/ \d{2} \/ \d{4}$/;