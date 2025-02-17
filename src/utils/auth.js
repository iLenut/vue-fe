export const isAuthenticated = () => {
  return localStorage.getItem('auth_token') !== null;
};
