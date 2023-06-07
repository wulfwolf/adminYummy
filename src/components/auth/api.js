import axios from "axios";

import globalState from "../../effector/src/globalState";
import { API_ENDPOINT } from "../../constant";

export const LoginApi = async (loginForm) => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/admin/auth/login`, {
      email: loginForm.email,
      password: loginForm.password,
    });
    if (res.status === 200) {
      console.log(res);

      globalState.action.LoginAction(res.data);
      return 1;
    }
  } catch (error) {
    console.log(error);
  }
};
