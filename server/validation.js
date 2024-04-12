async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (e) {
    if (e.name === "ValidationError") {
      e.status = 400;
    }
    throw e;
  }
}

module.exports = {
  validate,
};
