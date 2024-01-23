import Cookies from 'js-cookie';

export const logout = () => {
  Cookies.remove('token');
}

export type User = {
  id: string,
  username: string
};

export const login = (token: string) => {
  Cookies.set("token", token, {
    sameSite: "none",
    secure: true,
  });
}
