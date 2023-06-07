import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import DashBoard from "./components/DashBoard";
import globalState from "./effector/src/globalState";
import { useStore } from "effector-react";
function App() {
  const { isLoggedIn } = useStore(globalState.$store);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Auth authRoute="login" />} />
      <Route path="/dashboard/*" element={<DashBoard />} />
      {/* <Route path="/register" element={<Auth authRoute="register" />} /> */}
    </Routes>
  );
}

export default App;
