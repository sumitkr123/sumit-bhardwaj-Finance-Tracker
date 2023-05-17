import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Protected } from "../protected";
import { Login } from "../pages/auth_screens/login";
import { Register } from "../pages/auth_screens/register";
import { AllData } from "../pages/core/all_transactions";
import { Transaction } from "../pages/core/transaction";
import { AddTransaction } from "../pages/core/add_transaction";
import { ErrorPage } from "../components/errorpage";

export const routeList = {
  path: "/",
  element: [
    { path: "", element: <Navigate to={"/transactions"} /> },
    {
      path: "login",
      element: <Protected public={true} component={<Login />} />,
    },
    {
      path: "register",
      element: <Protected public={true} component={<Register />} />,
    },
    {
      path: "transactions",
      element: [
        { path: "", element: <Protected component={<AllData />} /> },
        { path: ":id", element: <Protected component={<Transaction />} /> },
        {
          path: "create",
          element: <Protected component={<AddTransaction />} />,
        },
        {
          path: "edit/:id",
          element: <Protected component={<AddTransaction />} />,
        },
      ],
    },
    { path: "/*", element: <ErrorPage /> },
  ],
};

const routeMapper = (item) => {
  if (Array.isArray(item.element)) {
    return (
      <Route key={item} path={item.path}>
        {item.element.map((newItem) => {
          if (Array.isArray(newItem.element)) {
            return routeMapper(newItem);
          } else {
            return (
              <Route
                key={newItem}
                path={newItem.path}
                element={newItem.element}
              ></Route>
            );
          }
        })}
      </Route>
    );
  } else {
    return <Route path={item.path} element={item.element}></Route>;
  }
};

const newRoutes = routeMapper(routeList);

export const routes = createBrowserRouter(createRoutesFromElements(newRoutes));
