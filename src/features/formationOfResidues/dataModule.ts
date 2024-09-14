import * as yup from 'yup';

const validationSchema = yup
  .array()
  .of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      category: yup.string().required(),
      barCode: yup.string().required(),
      subject: yup.string().required(),
      article: yup.string().required(),
      size: yup.string().required(),
      availableToOrder: yup.number().required(),
      productsInTransit: yup.number().required(),
      coast: yup.number().required(),
    }),
  )
  .required();

export type FormationOfResiduesData = yup.InferType<typeof validationSchema>;

export const isFormationOfResiduesData = (
  data: unknown,
  errorCb: (msg: string) => void,
): data is FormationOfResiduesData => {
  try {
    validationSchema.validateSync(data, { strict: true });
    return true;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'unknown parsing data error!';
    errorCb(error);
    return false;
  }
};
