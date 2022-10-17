import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { logout } from "./Redux/auth";
import { useDispatch } from "react-redux";
import RequiredRoute from "./Components/common/RequiredRoute";
function App() {
  const LoginPage = React.lazy(() => import("./Pages/Login/login"));
  const SignupPage = React.lazy(() => import("./Pages/Signup/signup"));
  const ForgetPassword = React.lazy(() =>
    import("./Pages/Login/forgetpassword")
  );
  const Contacts = React.lazy(() => import("./Pages/Dashboard/contacts"));
  const Modeles = React.lazy(() => import("./Pages/Dashboard/modeles"));
  const Rapports = React.lazy(() => import("./Pages/Dashboard/rapports"));
  const Dashboard = React.lazy(() => import("./Pages/Dashboard/dashboard"));
  const SignFile = React.lazy(() => import("./Pages/Dashboard/signfile"));
  const SignaturePage = React.lazy(() =>
    import("./Pages/Dashboard/signaturePage")
  );
  const RapportsList = React.lazy(() =>
    import("./Pages/Dashboard/rapportsList")
  );
  const dispatch = useDispatch();

  return (
    <Router>
      <Suspense fallback={"loading ............."}>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />

          <Route element={<RequiredRoute />}>
            <Route exact path="/documents" element={<Dashboard />} />

            <Route exact path="/documents/envoye" element={<Dashboard />} />
            <Route exact path="/documents/termine" element={<Dashboard />} />

            <Route exact path="/documents/supprime" element={<Dashboard />} />
            <Route exact path="/documents/expire" element={<Dashboard />} />
            <Route exact path="/documents/brouillon" element={<Dashboard />} />
            <Route exact path="/documents/encours" element={<Dashboard />} />
            <Route exact path="/modeles" element={<Modeles />} />
            <Route exact path="/rapports" element={<Rapports />} />
            <Route exact path="/contacts" element={<Contacts />} />
            <Route exact path="/signature" element={<SignaturePage />} />
            <Route exact path="/rapportsList" element={<RapportsList />} />

            <Route
              exact
              path="/signature/:envId/:envName"
              element={<SignaturePage />}
            />
          </Route>

          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
