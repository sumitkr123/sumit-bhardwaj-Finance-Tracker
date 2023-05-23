import { Navigate } from "react-router-dom";
import { Login } from "../pages/auth_screens/login";
import { Register } from "../pages/auth_screens/register";
import { AllData } from "../pages/core/all_transactions";
import { Transaction } from "../pages/core/transaction";
import { AddTransaction } from "../pages/core/add_transaction";
import { ErrorPage } from "../components/errorpage";

export type typeRoutes = {
  path: string;
  element: Array<object>;
};

export const routeList: typeRoutes = {
  path: "/",
  element: [
    { path: "", element: <Navigate to={"/transactions"} /> },
    {
      path: "login",
      element: <Login />,
      protected: false,
    },
    {
      path: "register",
      element: <Register />,
      protected: false,
    },
    {
      path: "transactions",
      element: [
        {
          path: "",
          element: <AllData />,
          protected: true,
        },

        {
          path: ":id",
          element: <Transaction />,
          protected: true,
        },
        {
          path: "create",
          element: <AddTransaction />,
          protected: true,
        },
        {
          path: "edit/:id",
          element: <AddTransaction />,
          protected: true,
        },
      ],
    },
    { path: "/*", element: <ErrorPage /> },
  ],
};
