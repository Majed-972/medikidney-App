import * as yup from 'yup';

const createWeightValidation = (messages = {}) =>
  yup.object().shape({
    weight: yup
      .number()
      .typeError(messages.invalid || 'Weight must be a number')
      .required(messages.required || 'Weight is required')
      .min(20, messages.invalid || 'Weight must be between 20 and 300 kg')
      .max(300, messages.invalid || 'Weight must be between 20 and 300 kg'),
  });

export default createWeightValidation;
