import axios from "axios";

import globalState from "../../effector/src/globalState";
import { API_ENDPOINT } from "../../constant";

export const LoginApi = async (loginForm) => {
  try {
    const res = await axios.post(`http://${API_ENDPOINT}/admin/auth/login`, {
      email: loginForm.email,
      password: loginForm.password,
    });
    if (res.status === 200) {
      globalState.action.LoginAction(res.data);
      return 1;
    }
  } catch (error) {
    console.log(error);
  }
};
