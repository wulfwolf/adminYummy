import axios from "axios";
import { localhost } from "../../constant/index";
import globalState from "../../effector/src/globalState";

export const LoginApi = async (loginForm) => {
  try {
    const res = await axios.post(
      `http://${localhost}:5000/api/admin/auth/login`,
      {
        email: loginForm.email,
        password: loginForm.password,
      }
    );
    if (res.status === 200) {
      globalState.action.LoginAction(res.data);
      return 1;
    }
  } catch (error) {
    console.log(error);
  }
};
