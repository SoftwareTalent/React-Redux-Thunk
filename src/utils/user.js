const USER_EMAIL = 'user';

export const setUser = (email) => {
  localStorage.setItem(USER_EMAIL, email);
};

export const getUser = () => {
  return localStorage.getItem(USER_EMAIL);
};
