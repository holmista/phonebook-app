export const isValidUsername = (username) => {
  if (username.length >= 2) return true;
  return false;
};

export const isVAlidPassword = (password) => {
  if (password.length >= 6) return true;
  return false;
};
