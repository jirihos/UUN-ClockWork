import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/userContext";

import Dashboard from "./pages/dashboard";
import Table from "./pages/table";
import LoginForm from "./pages/loginForm";
import NotFound from "./pages/notFound";
import TestSite from "./pages/testSite";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/events" element={<Table />} />
        <Route path="/test" element={<TestSite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
