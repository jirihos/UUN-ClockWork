import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Table from "./pages/table";
import LoginForm from "./pages/loginForm";
import NotFound from "./pages/notFound";
import TestSite from "./pages/testSite";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/events" element={<Table />} />
        <Route path="/test" element={<TestSite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
