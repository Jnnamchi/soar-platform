/* eslint-disable no-useless-escape */

const checkEmailValidation = (email: string): boolean => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  )

  return emailRegex.test(email)
}

export {
  checkEmailValidation,
}
