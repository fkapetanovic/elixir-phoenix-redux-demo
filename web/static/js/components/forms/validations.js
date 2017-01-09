const DATE_FUTURE = 'Date is in the future'
const FIELD_REQUIRED = 'Required'
const INVALID_EMAIL = 'Invalid email address'
const PASS_LENGTH = 8
const INVALID_PASSWORD = `Password must be at least ${PASS_LENGTH} characters long`
const INVALID_VALUE = 'Invalid value'
const MAX_DISTANCE = 100000000
const MAX_HOURS = 1000
const TIME_MISSING = 'Time is required'

export const validateLogIn = values => {
  const errors = {}

  if (!values.email) {
    errors.email = FIELD_REQUIRED
  } else if (!isValidEmail(values.email)) {
    errors.email = INVALID_EMAIL
  }

  if (!values.password) {
    errors.password = FIELD_REQUIRED
  } else if (!isValidPassword(values.password)) {
    errors.password = INVALID_PASSWORD
  }

  return errors
}

export const validateJogUpdate = values => {
  if (Object.keys(values).length === 0) return {}

  return validateJog(values)
}

export const validateJogInsert = values => {
  return validateJog(values)
}

const validateJog = values => {
  const errors = {}

  if (!values.jog_date) {
    errors.jog_date = FIELD_REQUIRED
  } else {
    if (values.jog_date > new Date()) {
      errors.jog_date = DATE_FUTURE
    }
  }

  if (!values.distance) {
    errors.distance = FIELD_REQUIRED
  } else if (values.distance <= 0 || values.distance > MAX_DISTANCE) {
    errors.distance = INVALID_VALUE
  }

  if (!parseInt(values.hours) && !parseInt(values.minutes) && !parseInt(values.seconds)) {
    errors.hours = TIME_MISSING
  } else {
    if (values.hours && (values.hours < 0 || values.hours > MAX_HOURS)) {
      errors.hours = INVALID_VALUE
    }

    if (values.minutes && (values.minutes < 0 || values.minutes > 59)) {
      errors.minutes = INVALID_VALUE
    }

    if (values.seconds && (values.seconds < 0 || values.seconds > 59)) {
      errors.seconds = INVALID_VALUE
    }
  }

  return errors
}

export const validateUserInsert = values => {
  const errors = {}

  validateUserRequiredFields(values, errors)

  if (!values.password) {
    errors.password = FIELD_REQUIRED
  } else if (!isValidPassword(values.password)) {
    errors.password = INVALID_PASSWORD
  }

  return errors
}

export const validateUserUpdate = values => {
  if (Object.keys(values).length === 0) return {}

  const errors = {}

  validateUserRequiredFields(values, errors)

  if (values.password && !isValidPassword(values.password)) {
    errors.password = INVALID_PASSWORD
  }

  return errors
}

const validateUserRequiredFields = (values, errors) => {
  if (!values.first_name) {
    errors.first_name = FIELD_REQUIRED
  }

  if (!values.last_name) {
    errors.last_name = FIELD_REQUIRED
  }

  if (!values.email) {
    errors.email = FIELD_REQUIRED
  } else if (!isValidEmail(values.email)) {
    errors.email = INVALID_EMAIL
  }

  return errors
}

const isValidEmail = email => (
  (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
)

const isValidPassword = password => (
  password.length >= PASS_LENGTH
)
