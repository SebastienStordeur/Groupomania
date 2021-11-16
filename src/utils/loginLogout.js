export const isLogin = () => {
  if(localStorage.getItem('authToken')) return true
  return false
}

export const isAdmin = () => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);

  if(userToken.isAdmin === true) return true
  return false
}