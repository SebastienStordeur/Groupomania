

const TOKEN_KEY = 'jwt';
const authToken = JSON.parse(localStorage.getItem("authToken"));

/* export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
} */

export const isLogin = () => {
  if(localStorage.getItem('authToken')) return true
  return false
}