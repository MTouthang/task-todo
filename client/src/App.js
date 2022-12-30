import React, { useState } from "react";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";
import Signup from "./pages/Signup";

// react router --
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

//  context api
import userContext from "./contextAPI/userContext";
import dataContext from "./contextAPI/dataContext";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [dataContextValue, setDataContextValue] = useState(null);

  return (
    <>
      <userContext.Provider value={{ userDetails, setUserDetails }}>
        <dataContext.Provider value={{ dataContextValue, setDataContextValue }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </Router>
        </dataContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
