const handleServerError = (error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message = "Sever Error";
  let errors = [];
  if (error.name === "ValidationError") {
    status = 400;
    message = "Bad Request";
    let errorsArray = Object.entries(error.errors);
    errorsArray.forEach((el) => {
      errors.push({
        field: el[0],
        message: el[1].message,
      });
    });
  }
  return res.status(status).send({
    error: error.message,
    message: message,
    errors,
    errorStack: error.stack,
  });
};

module.exports = handleServerError;
