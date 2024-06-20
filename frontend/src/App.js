import "./App.css";

import Header from "./pages/header-footer/Header";
import Footer from "./pages/header-footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const { isLoggedIn, username } = useSelector((state) => state.session);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
