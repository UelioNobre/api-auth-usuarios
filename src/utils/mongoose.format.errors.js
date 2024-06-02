function showErrorMessage({ errors }) {
  console.log(typeof errors);
  const keys = Object.keys(errors)[0];
  const { message } = errors[keys];
  return { message };
};

module.exports = { showErrorMessage };
