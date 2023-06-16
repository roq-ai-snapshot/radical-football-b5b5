import * as yup from 'yup';

export const trainingSessionValidationSchema = yup.object().shape({
  date: yup.date().required(),
  drills: yup.string().required(),
  performance_metrics: yup.string().required(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
