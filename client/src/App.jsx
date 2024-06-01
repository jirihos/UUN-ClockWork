import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./components/UserContext";

import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import ExportPage from "./pages/ExportPage";
import NotFound from "./pages/NotFoundPage";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <UserProvider>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/employee/:code" element={<EmployeePage />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Container>
    </UserProvider>
  );
}

export default App;
