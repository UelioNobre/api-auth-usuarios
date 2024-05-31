function handler(err, _req, res, _next) {

  console.error(`### ERROR: ${err.message}`)

  if (err.cause) {
    return res
      .status(err.cause.statusCode)
      .json({ message: err.message })
  }

  return res
    .status(500)
    .json({ message: err.message })
}

module.exports = handler;
