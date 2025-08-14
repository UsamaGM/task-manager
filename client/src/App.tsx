import { ToastContainer } from "react-toastify";
import "./index.css";
import AppRouterProvider from "./routes/AppRouter";
import useAuthStore from "./stores/auth.store";
import { useEffect, useRef } from "react";
import { Loader } from "./components";

function App() {
  const init = useAuthStore((state) => state.init);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const initialized = useRef(false);

  useEffect(() => {
    init().then(() => {
      initialized.current = true;
    });
  }, []);

  if (!initialized && loading) return <Loader fullscreen />;

  return (
    <>
      <AppRouterProvider />
      <ToastContainer />
    </>
  );
}

export default App;
