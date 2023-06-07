import { createStore } from "effector";
import { LoginAction, LogoutAction } from "./action";
// import { persist } from "effector-storage/rn/async";

const handleLogin = (state, newData) => {
  return {
    ...state,
    user: newData.user,
    isLoggedIn: true,
    accessToken: newData.accessToken,
  };
};
const handleLogout = (state) => {
  return {
    ...state,
    user: null,
    isLoggedIn: false,
    accessToken: null,
  };
};

// Store reducer
const $store = createStore({
  user: null,
  isLoggedIn: false,
  accessToken: "",
})
  .on(LoginAction, handleLogin)
  .on(LogoutAction, handleLogout);
// persist({ store: $store });

export default $store;
