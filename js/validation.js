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
  
  // laptop: {
  //   laptop_name: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattern: {
  //       param: PATTERN_LAPTOP_NAME,
  //       message: ERROR_MESSAGE_LAPTOP_NAME,
  //     },
  //   },

  //   laptop_image: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //   },

  //   laptop_brand_id: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //   },

  //   laptop_cpu: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //   },

  //   laptop_cpu_cores: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattern: {
  //       param: PATTERN_ONLY_DIGITS,
  //       message: ERROR_MESSAGE_ONLY_DIGITS,
  //     },
  //   },

  //   laptop_cpu_treads: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattern: {
  //       param: PATTERN_ONLY_DIGITS,
  //       message: ERROR_MESSAGE_ONLY_DIGITS,
  //     },
  //   },

  //   laptop_ram: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattern: {
  //       param: PATTERN_ONLY_DIGITS,
  //       message: ERROR_MESSAGE_ONLY_DIGITS,
  //     },
  //   },

  //   laptop_hard_drive_type: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattrn: {
  //       param: PATTERN_HARD_DRIVE_TYPE,
  //       message: ERROR_MESSAGE_HARD_DRIVE_TYPE,
  //     },
  //   },

  //   laptop_price: {
  //     required: {
  //       param: true,
  //       message: ERROR_MESSAGE_IS_REQUIRED,
  //     },
  //     pattern: {
  //       param: PATTERN_ONLY_DIGITS,
  //       message: ERROR_MESSAGE_ONLY_DIGITS,
  //     },
  //   }
  // }
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

  pattern(item, pattern, message) {
    const result = pattern.test(item);
    return result ? true : message;
  },

  min(item, min, message) {
    const result = item.length >= min;
    return result ? true : message;
  }
};