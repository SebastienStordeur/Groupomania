const authToken = JSON.parse(localStorage.getItem("authToken"));

export const isLogin = () => {
  if(localStorage.getItem('authToken')) return true
  return false
}