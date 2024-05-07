import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/userContext";

import Dashboard from "./pages/dashboard";
import LoginForm from "./pages/loginForm";
import NotFound from "./pages/notFound";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
