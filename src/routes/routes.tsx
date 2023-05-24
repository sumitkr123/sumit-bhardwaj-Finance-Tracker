import { Navigate } from "react-router-dom";
import { Login } from "../pages/auth_screens/login";
import { Register } from "../pages/auth_screens/register";
import { AllData } from "../pages/core/all_transactions";
import { ViewTransaction } from "../pages/core/transaction";
import { AddTransaction } from "../pages/core/add_transaction";
import { ErrorPage } from "../components/errorpage";

export type TypeRoutes = {
  path: string;
  element: Array<TypeRoutes> | JSX.Element;
  protected?: boolean;
};

export const routeList: TypeRoutes = {
  path: "/",
  element: [
    {
      path: "",
      element: <Navigate to={"/transactions"} />,
    },
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
          element: <ViewTransaction />,
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
