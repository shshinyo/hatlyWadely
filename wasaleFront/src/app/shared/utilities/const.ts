export const Const = {
  PhoneNumber: {
    Pattern: /^(?=(?:\+|0{2})?(?:(?:[(\-).\/ \t\f]*\d){7,10})?[\-.\/ \t\f]?\d{2,3}(?:[\-\s]?[ext]{1,3}[\-.\/ \t\f]?\d{1,4})?$)((?:\+|0{2})\d{0,3})?[\-.\/ \t\f]?(\(0\d[ ]?\d{0,4}\)|\(\d{0,4}\)|\d{0,4})(?:[\-.\/ \t\f]{0,2}\d){3,8}(?:[\-\s]?(?:x|ext)[\-\t\f ]?(\d{1,4}))?$/,
    MinLength: 5,
    MaxLength: 24,
  },
  Password: {
    MinLength: 8,
    MaxLength: 100,
  },
  Name: {
    TitleMaxLength: 4,
    MinLength: 3,
    MaxLength: 32,
  },
};

export const Paths = {
  shop: "/shop",
};
