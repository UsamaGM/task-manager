import { ToastContainer } from "react-toastify";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouterProvider from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouterProvider />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
