import Cookies from 'js-cookie';
import { graphql } from 'relay-runtime';

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
