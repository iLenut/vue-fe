export const isAuthenticated = () => {
  return localStorage.getItem('userProfile') !== null;
};
