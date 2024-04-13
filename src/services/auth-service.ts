import Cookies from "js-cookie";
// import { useContext } from "react";

export class AuthService {
  isAuthorized() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getToken() {
    const token = Cookies.get("token");
    if (token) {
      return token;
    }
    return null;
  }

  storeToken(token: string) {
    Cookies.set("token", token, { expires: 1 / 24});
  }

  removeToken() {
    Cookies.remove("token");
  }
}


