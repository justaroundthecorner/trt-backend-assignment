const schemaValidator = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, {
        context: { isPostRequest: req.method === 'POST' },
      });
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return res.status(422).json({ error: message });
      }
    };
  };
  module.exports = schemaValidator;
  