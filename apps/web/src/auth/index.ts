import Cookies from 'js-cookie';

export const logout = () => {
  Cookies.remove('auth.token');
}

export type User = {
  id: string,
  username: string
};

export const login = (token: string) => {
  Cookies.set("auth.token", token);
}
