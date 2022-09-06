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