import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { UserProvider } from "./components/userContext";

import Dashboard from "./pages/dashboard";
import LoginForm from "./pages/loginForm";
import ExportPage from "./pages/exportPage";
import NotFound from "./pages/notFound";

function App() {
  return (
    <UserProvider>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </UserProvider>
  );
}

export default App;
