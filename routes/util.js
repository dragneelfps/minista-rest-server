const hasMissingErrors = (req, values) => {
  const errors = []
  values.forEach(value => {
    if (req.body[value] === undefined) {
      errors.push(value)
    }
  })
  if (errors.length > 0) {
    return `[${errors}] missing`
  }
  return null
}

module.exports = { hasMissingErrors }
