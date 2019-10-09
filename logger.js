const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} request received`)
  next()
}

module.exports = logger