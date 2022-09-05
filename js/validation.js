const validationRules = {
  employee: {
    name: {
      required,
      min: 2,
      pattern: GEORGINA_ALPHABET,
    },
  
    surname: {
      required,
      min: 2,
      pattern: GEORGINA_ALPHABET,
    },
  
    team_id: {
      required,
    },
  
    position_id: {
      required,
    },
  
    email: {
      required,
      pattern: PATTERN_EMAIL,
    },

    phone_number: {
      required,
      pattern: PATTERN_PHONE_NUMBER,
    }
  },
  
  laptop: {
    laptop_name: {
      required,
      pattern: PATTERN_LAPTOP_NAME,
    },

    laptop_image: {
      required,
    },

    laptop_brand_id: {
      required,
    },

    laptop_cpu: {
      required,
    },

    laptop_cpu_cores: {
      required,
      pattern: PATTERN_ONLY_DIGITS,
    },

    laptop_cpu_treads: {
      required,
      pattern: PATTERN_ONLY_DIGITS,
    },

    laptop_ram: {
      required,
      pattern: PATTERN_ONLY_DIGITS,
    },

    laptop_hard_drive_type: {
      required,
      pattrn: PATTERN_HARD_DRIVE_TYPE,
    },

    laptop_pruchase_date: {
      pattern: PATTERN_DATE,
    },

    laptop_price: {
      required,
      pattern: PATTERN_ONLY_DIGITS,
    }
  }
};

const validate = {
  required(item) {
    if (typeof item !== 'string' || typeof item !== 'number') {
      return false;
    }

    if (item == null) {
      return false;
    }

    item = String(item);

    if (item.length === 0) {
      return false;
    }

    return true;
  },

  pattern(item, pattern) {
    return item.match(pattern);
  },

  min(item, min) {
    return item.length > min;
  }
};