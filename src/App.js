import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AddTransaction } from "./pages/core/add_transaction";
import { AllData } from "./pages/core/all_transactions";
import { Transaction } from "./pages/core/transaction";
import { Login } from "./pages/auth_screens/login";
import { Protected } from "./protected";
import { NavBar } from "./components/navbar";

import AuthProvider from "./providers/authprovider";
import { Register } from "./pages/auth_screens/register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />}>
            {/* Public routes :- */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            {/* Protected routes :- */}
            <Route
              path="/"
              element={<Protected component={<AddTransaction />} />}
            ></Route>
            <Route
              path="/edit/:id"
              element={<Protected component={<AddTransaction />} />}
            ></Route>

            <Route
              path="/view"
              element={<Protected component={<AllData />} />}
            ></Route>

            <Route
              path="/view/:id"
              element={<Protected component={<Transaction />} />}
            ></Route>

            {/* Any other routes */}
            <Route
              path="/*"
              element={<Navigate to="/login" replace={true} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
