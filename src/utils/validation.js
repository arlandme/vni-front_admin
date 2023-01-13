import joi from 'joi';

export function loginValidator(data) {
  const rule = joi.object({
    username: joi.string().min(1).max(24).required(),
    password: joi.string().min(1).max(24).required(),
  }).messages({
    'string.empty': `Your {#label} is required`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function registerValidator(data) {
  const rule = joi.object({
    username: joi.string().max(24).required(),
    email: joi.string().max(255).email({ tlds: { allow: false } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
  }).messages({
    'string.empty': `Your {#label} is required`,
    'string.pattern.base': 'Your {#label} length must be greater than 6 characters. Password cannot contain a special character.',
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalUserValidator(data) {
  const rule = joi.object({
    ...data,
    username: joi.string().min(1).max(24).required(),
    email: joi.string().email({ tlds: { allow: false } }),
    firstName: joi.string().max(24),
    lastName: joi.string().max(24),
    avatar: joi.string(),
  }).messages({
    'string.empty': `Your {#label} is required`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalProductValidator(data) {
  const rule = joi.object({
    ...data,
    thumbnail: joi.string().required(),
    content: joi.string().required(),
    order: joi.number().required(),
    name: joi.string().max(100).required(),
    path: joi.string().max(100).required(),
  }).messages({
    'string.empty': `Your {#label} is required`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalServiceValidator(data) {
  const rule = joi.object({
    ...data,
    thumbnail: joi.string().required(),
    content: joi.string().required(),
    order: joi.number().required(),
    title: joi.string().max(100).required(),
    path: joi.string().max(100).required(),
    summary: joi.string().required(),
  }).messages({
    'string.empty': `Your {#label} is required`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalSlideValidator(data) {
  const rule = joi.object({
    ...data,
    title: joi.string().required(),
    order: joi.number().required(),
    backgroundImage: joi.string().required(),
    redirectTo: joi.string().max(100).required(),
    contentLink: joi.string().max(100).required(),
  }).messages({
    'string.empty': `Your {#label} is required`,
  });

  return rule.validate(data, { abortEarly: false });
}
