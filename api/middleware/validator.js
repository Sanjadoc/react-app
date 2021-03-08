const db = require("../services/db");
/* eslint-disable */

module.exports = (validatorSchema) => {
  return async (req, res, next) => {
    const errors = [];
    for ([fieldName, rules] of Object.entries(validatorSchema)) {
      for (rule of rules) {
        const [mainRule, ...params] = rule.split(":");
        switch (mainRule) {
          case "required":
            if (!req.body[fieldName]) {
              errors.push({ [fieldName]: `Field ${fieldName} is required!`,});
            }
            break;
          case "min":
            const min = parseInt(params[0]);
            if (req.body[fieldName].length < min) {
              errors.push({ [fieldName]: `Field ${fieldName} is too short, min: ${min}`,});
            }
            break;
          case "max":
            const max = parseInt(params[0]);
            if (req.body[fieldName].length > max) {
              errors.push({ [fieldName]: `Field ${fieldName} is too long, max: ${max}`,});
            }
            break;
          case "email":
            const regExpEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!regExpEmail.test(req.body[fieldName])) {
              errors.push({ [fieldName]: `Field ${fieldName} is not email`, });
            }
            break;
          case "unique":
            if (req.body[fieldName]) {
              const field = await db.select("*").from(params[0]).where(params[1], req.body[fieldName]).first();
              if (field) {
                if (!(params.includes("update") && req.params.id === field[params[3]])) {
                  errors.push({[fieldName]: `Field ${fieldName} is already exist`,});
                }
              }
            }
            break;
          case "selectOne":
            if (req.body[fieldName]) {
              if (!params.includes(req.body[fieldName])) {
                errors.push({[fieldName]: `Field ${fieldName} can only have such values: ${params.join(", ",)}`,});
              }
            }
            break;
          default:
        }
      }
    }

    if (!errors.length) {
      return next();
    }

    return res.status(422).send(errors);
  };
};
