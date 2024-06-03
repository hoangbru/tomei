export const requireRule = (message: string) => {
  return {
    required: { value: true, message },
  };
};

export const minLengthRule = (value: number, message: string) => {
  return {
    minLength: { value, message },
  };
};

export const maxLengthRule = (value: number, message: string) => {
  return {
    maxLength: { value, message },
  };
};

export const minRule = (value: number, message: string) => {
  return {
    min: { value, message },
  };
};

export const maxRule = (value: number, message: string) => {
  return {
    max: { value, message },
  };
};

export const patternRule = (regex: RegExp, message: string) => {
  return {
    pattern: { value: regex, message },
  };
};
