import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Anasayfa from "./pages/Anasayfa";
import EtutIste from "./pages/etut-iste";
import ForgotPassword from "./pages/ForgotPassword";
import EtutTalepleri from "./pages/etut-talepleri";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Taleplerim from "./pages/Taleplerim";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/anasayfa" element={<Anasayfa />} />
          <Route path="/taleplerim" element={<Taleplerim />} />
          <Route path="/etut-talepleri" element={<EtutTalepleri />} />
          <Route path="/etut-iste" element={<EtutIste />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
