import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ROUTES } from "./routes";
import { CircularProgress } from "@mui/material";
const SessionPage = lazy(() => import("./modules/Session/pages/List"));

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<SessionPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
