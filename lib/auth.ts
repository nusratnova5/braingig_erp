export const logout = () => {
  localStorage.removeItem("erpUser"); // remove user session
  window.location.href = "/login"; // redirect to login page
};
