export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 7) return 'Password must be at least 7 characters long.'
  return ''
}
