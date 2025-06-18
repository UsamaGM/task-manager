import { ToastContainer } from "react-toastify";
import "./index.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div>
      <AppRouter />;
      <ToastContainer />
    </div>
  );
}

export default App;
