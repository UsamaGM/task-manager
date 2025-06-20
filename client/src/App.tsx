import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
