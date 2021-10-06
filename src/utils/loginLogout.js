const TOKEN_KEY = 'jwt';


export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  if (TOKEN_KEY) {
      return true;
  }
  return false;
}




/* export const login = () => {
  if(localStorage.getItem("authToken"))
}

export const logout = () => {
  setIslogin(false);
  localStorage.clear();
} 

export const isLogin = () => {
  if(local)
}
*/