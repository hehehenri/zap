import Cookies from 'js-cookie';

export const logout = () => {
  Cookies.remove('auth.token');    
}

// TODO: set ttl
export const login = (token: string) => {
  Cookies.set("auth.token", token);
}
