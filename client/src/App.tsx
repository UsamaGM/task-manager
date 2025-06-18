import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "./index.css";

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
