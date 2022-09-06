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