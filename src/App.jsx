import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import PhoneBookPage from "./pages/PhoneBookPage";

function App() {
  return (
    <div className="App bg-[#F5F5F5] h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<PhoneBookPage />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/contacts" element={<PhoneBookPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
