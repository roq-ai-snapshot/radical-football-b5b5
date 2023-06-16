import * as yup from 'yup';

export const playerValidationSchema = yup.object().shape({
  personal_information: yup.string(),
  preferences: yup.string(),
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
});
