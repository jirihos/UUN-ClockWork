import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Table from "./pages/table";
import LoginForm from "./pages/loginForm";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/events" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
