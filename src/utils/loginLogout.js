const TOKEN_KEY = 'jwt';

const value_or_null = (document.cookie.match(/^(?:.*;)?\s*connect.sid\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]

export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  if (value_or_null) {
      return true;
  }
  return false;
}