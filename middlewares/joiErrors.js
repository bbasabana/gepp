import { isCelebrate } from 'celebrate';

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  return res.status(400).json({
    status: 400,
    message: 'Bad Request',
    errors: err.details || undefined,
  });
};

export default joiErrors;